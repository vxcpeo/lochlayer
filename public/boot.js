/*
  Miston website: the part that has to run before the page is drawn.

  A classic script, loaded from this origin in <head>. It does three things
  and nothing else:
    1. says that JavaScript is on (data-js on <html>), unless the page is
       being shown inside another page;
    2. applies the palette the visitor chose last time, so the page never
       flashes the other one;
    3. narrows the Content-Security-Policy to the one RPC endpoint in use.

  On 1: this site is never meant to be framed. The page's policy says so
  where it can; if it is ever lost on the way, a framed page gets
  data-framed instead of data-js and stays the page a visitor without
  JavaScript gets.

  On 3: the policy in the page has to admit any https endpoint, because a
  visitor may name their own. Policies only ever add up, so this adds a second
  one that names exactly one endpoint: the visitor's if they saved a usable
  one, the site's default otherwise. From then on the page can connect to its
  own origin, that endpoint and the waitlist, and nowhere else. Changing the
  endpoint takes a reload, because a policy cannot be taken back.

  The same rules live in src/lib/endpoint.ts and src/lib/policy.ts, which the
  site and its tests use; unit/policy.test.ts runs the two side by side.

  It reads localStorage and writes nothing. No network requests.
*/
(function () {
  var root = document.documentElement;
  var framed = true;
  try {
    framed = window.top !== window.self;
  } catch (e) {
    // Not allowed to look: it is another site's frame.
  }
  root.setAttribute(framed ? "data-framed" : "data-js", "");

  var read = function (key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };
  var meta = function (name) {
    var el = document.querySelector('meta[name="' + name + '"]');
    return el ? el.getAttribute("content") || "" : "";
  };

  // ?theme=night or ?theme=dusk shows the page in that palette without saving it.
  var asked = /[?&]theme=(dusk|night)(?:&|$)/.exec(window.location.search);
  var theme = asked ? asked[1] : read("miston:theme");
  if (theme === "night" || theme === "dusk") root.setAttribute("data-theme", theme);

  // http or https, a host of letters, digits and hyphens in labels parted by dots, an optional port.
  // And no longer than "https://", the longest host name there is (253), and ":65535".
  var PLAIN_ORIGIN = /^https?:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)*(?::[0-9]{1,5})?$/;
  var plain = function (origin) {
    return origin.length <= 267 && PLAIN_ORIGIN.test(origin) ? origin : null;
  };
  var plainOrigin = function (value) {
    try {
      return plain(new URL(value).origin);
    } catch (e) {
      return null;
    }
  };
  // A visitor's own endpoint: https anywhere, or http on this machine, and no credentials. The same rule the form applies.
  var ownEndpoint = function (value) {
    try {
      var url = new URL(String(value).trim());
      var local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
      if (url.protocol !== "https:" && !(url.protocol === "http:" && local)) return null;
      if (url.username !== "" || url.password !== "") return null;
      return plain(url.origin);
    } catch (e) {
      return null;
    }
  };

  var sources = ["'self'"];
  var allow = function (origin) {
    if (origin && origin !== window.location.origin && sources.indexOf(origin) < 0) sources.push(origin);
  };
  var stored = meta("miston:custom-rpc") === "any" ? read("miston:rpc") : null;
  allow((stored !== null && ownEndpoint(stored)) || plainOrigin(meta("miston:rpc")));
  allow(plainOrigin(meta("miston:waitlist")));

  // The policy the server wrote into the page, with its connect-src narrowed.
  var narrow = "connect-src " + sources.join(" ");
  var page = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  var directives = (page ? page.getAttribute("content") || "" : "").split(";");
  var replaced = false;
  for (var i = 0; i < directives.length; i++) {
    directives[i] = directives[i].trim();
    if (directives[i].indexOf("connect-src ") === 0 || directives[i] === "connect-src") {
      directives[i] = narrow;
      replaced = true;
    }
  }
  if (!replaced) directives.push(narrow);
  directives = directives.filter(function (directive) {
    return directive !== "";
  });

  var policy = document.createElement("meta");
  policy.setAttribute("http-equiv", "Content-Security-Policy");
  policy.setAttribute("content", directives.join("; "));
  policy.setAttribute("data-miston-policy", "");
  document.head.appendChild(policy);
})();
