#!/usr/bin/env node
/** Normalizes source line endings and repairs the last structural wrappers. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const src = path.join(root, 'src');
const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(vue|ts|html|css)$/.test(entry.name)) files.push(p);
  }
};
walk(src);
let converted = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(/\r\n/g, '\n');
  if (after !== before) {
    fs.writeFileSync(file, after);
    converted += 1;
  }
}
console.log(`Normalized ${converted} file(s) to LF.`);

const fixed = (name, pairs) => {
  const file = path.join(src, 'views', name);
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!text.includes(from)) throw new Error(`${name}: missing ${JSON.stringify(from.slice(0, 60))}`);
    text = text.replace(from, to);
  }
  fs.writeFileSync(file, text);
};

fixed('InstallView.vue', [[
  '      </div>\n    </section>\n  </section>\n  </BlueprintShell>',
  '      </div>\n    </div>\n  </section>\n  </BlueprintShell>',
]]);
fixed('PrivacyView.vue', [[
  '      </div>\n    </section>\n  </section>\n  </BlueprintShell>',
  '      </div>\n    </div>\n  </section>\n  </BlueprintShell>',
]]);
fixed('VerifyView.vue', [[
  '    </section>\n  </section>\n  </BlueprintShell>',
  '    </div>\n  </section>\n  </BlueprintShell>',
]]);
fixed('DocsView.vue', [
  [
    '    <div class="bp-doc">\n      <div class="bp-doc__rail">',
    '      <nav class="bp-tile bp-tile--4 bp-doc__rail" aria-labelledby="contents-title">',
  ],
  [
    '        </ol>\n      </div>\n\n      <div class="bp-doc__sections">',
    '        </ol>\n      </nav>\n\n      <div class="bp-doc__sections">',
  ],
  [
    '      </div>\n    </div>\n  </section>\n  </BlueprintShell>',
    '      </div>\n  </section>\n  </BlueprintShell>',
  ],
]);
console.log('Tail wrappers repaired.');
