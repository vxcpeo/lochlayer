import http from 'node:http';
import type { AddressInfo } from 'node:net';
import { expect, test } from '@playwright/test';

/**
 * The scanner's whole path, not mocked: the page is pointed at a JSON-RPC
 * server on this machine (which the site's policy allows), and the scan really
 * runs scanner-core over the answers. The wallet has one inbound SOL transfer,
 * so the reference scanner's rules give it 90: funding source is public.
 */

const ME = 'Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K';
const FUNDER = '5tzFvgZoiXzNoHthSU8f84Fhx6vEKD3mJ5eg4w7yuAi9';
const SIGNATURE = '4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi5xDqjft2Qf3VZk9rxPN9fY7dY7xQ4r8kXvW3n8pLQ2QqY';
const BLOCK_TIME = 1_785_542_400;

let server: http.Server;
let port = 0;

function transaction(): unknown {
  return {
    slot: 1,
    blockTime: BLOCK_TIME,
    transaction: {
      signatures: [SIGNATURE],
      message: {
        accountKeys: [
          { pubkey: FUNDER, signer: true, writable: true, source: 'transaction' },
          { pubkey: ME, signer: false, writable: true, source: 'transaction' },
        ],
        recentBlockhash: '11111111111111111111111111111111',
        instructions: [
          {
            program: 'system',
            programId: '11111111111111111111111111111111',
            parsed: {
              type: 'transfer',
              info: { source: FUNDER, destination: ME, lamports: 5_000_000_000 },
            },
          },
        ],
      },
    },
    meta: {
      err: null,
      fee: 5_000,
      innerInstructions: [],
      preBalances: [6_000_000_000, 5_000_000_000],
      postBalances: [1_000_000_000, 10_000_000_000],
      preTokenBalances: [],
      postTokenBalances: [],
      logMessages: [],
    },
  };
}

function answers(method: string, params: unknown): unknown {
  switch (method) {
    case 'getBalance':
      return { context: { slot: 1 }, value: 5_000_000_000 };
    case 'getTokenAccountsByOwner':
      return { context: { slot: 1 }, value: [] };
    case 'getSignaturesForAddress': {
      const options = (Array.isArray(params) ? params[1] : undefined) as { before?: string } | undefined;
      if (options?.before !== undefined) return [];
      return [{ signature: SIGNATURE, slot: 1, err: null, memo: null, blockTime: BLOCK_TIME, confirmationStatus: 'finalized' }];
    }
    case 'getTransaction':
    case 'getParsedTransaction':
      return transaction();
    default:
      return null;
  }
}

test.beforeAll(async () => {
  server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (request.method === 'OPTIONS') {
      response.writeHead(204);
      response.end();
      return;
    }
    let body = '';
    request.on('data', (chunk) => (body += chunk));
    request.on('end', () => {
      response.setHeader('Content-Type', 'application/json');
      let parsed: unknown;
      try {
        parsed = JSON.parse(body);
      } catch {
        response.writeHead(400);
        response.end('{}');
        return;
      }
      const one = (message: { id?: unknown; method?: string }) => ({
        jsonrpc: '2.0',
        id: message.id ?? null,
        result: answers(message.method ?? '', (message as { params?: unknown }).params),
      });
      const payload = Array.isArray(parsed) ? (parsed as { id?: unknown; method?: string }[]).map(one) : one(parsed as { id?: unknown; method?: string });
      response.end(JSON.stringify(payload));
    });
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  port = (server.address() as AddressInfo).port;
});

test.afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

test('scans a wallet through a real RPC and draws the report', async ({ page }) => {
  await page.goto('/?theme=dusk');
  await page.locator('#rpc-own summary').click();
  await page.fill('#rpc-url', `http://127.0.0.1:${port}`);
  await page.click('#rpc-save');
  await page.waitForURL(/#scanner/, { timeout: 30_000 });

  await expect
    .poll(async () =>
      page.evaluate(() =>
        [...document.querySelectorAll('meta[data-velaira-policy]')].map((meta) => meta.getAttribute('content') ?? '').join(';'),
      ),
    )
    .toContain(`http://127.0.0.1:${port}`);

  await page.fill('#address', ME);
  await page.click('#scan-submit');
  const report = page.locator('#scan-report .rd-sheet');
  await expect(report.locator('.rd-name')).toBeVisible({ timeout: 30_000 });
  await expect(report.locator('.rd-score-figure')).toContainText('90');
  await expect(report.locator('.rd-score-verdict')).toContainText('Deep water.');
  await expect(report.locator('.rd-list')).toContainText('Funding source is public');
  await expect(report.locator('.rd-list')).toContainText('5tzF…uAi9');
  await expect(report.locator('[data-chart="bed"] svg')).toHaveCount(1);
  await expect(report.locator('[data-chart="hours"] svg')).toHaveCount(1);
  await expect(report.locator('[data-chart="who"] svg')).toHaveCount(1);
  await expect(page.locator('#scan-report [data-clear-report]')).toBeVisible();

  // Clearing puts the example back.
  await page.click('#scan-report [data-clear-report]');
  await expect(page.locator('#scan-report .rd-example')).toBeVisible();
  await expect(page.locator('#scan-note')).toContainText('Report cleared.');
});
