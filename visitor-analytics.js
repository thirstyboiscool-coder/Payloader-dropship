/* Cookie-free, anonymous page-view measurement for the Operations dashboard. */
(() => {
  if (navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true) return;
  const endpoint = "https://manage.payloadertech.com/api/site-visit";
  const initialReferrer = document.referrer;
  let lastPath = "";

  function track() {
    const path = location.pathname;
    if (path === lastPath || path.length > 255) return;
    lastPath = path;
    try {
      fetch(endpoint, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        keepalive: true,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ path, referrer: initialReferrer }),
      }).catch(() => {});
    } catch { /* Analytics must never interrupt the site. */ }
  }

  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function (...args) {
      const result = original.apply(this, args);
      queueMicrotask(track);
      return result;
    };
  }
  addEventListener("popstate", track);
  track();
})();
