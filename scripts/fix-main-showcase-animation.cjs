const fs = require("node:fs");
const path = require("node:path");

const [homepageInput, scriptInput] = process.argv.slice(2);
if (!homepageInput || !scriptInput) {
  throw new Error("Usage: node scripts/fix-main-showcase-animation.cjs <homepage.html> <landing-interactions-v5.js>");
}

const homepagePath = path.resolve(homepageInput);
const scriptPath = path.resolve(scriptInput);
let homepage = fs.readFileSync(homepagePath, "utf8").replace(/\r\n/g, "\n");
let script = fs.readFileSync(scriptPath, "utf8").replace(/\r\n/g, "\n");

function replaceOnce(source, before, after, label) {
  if (!source.includes(before)) throw new Error(`Could not find ${label}`);
  return source.replace(before, after);
}

homepage = replaceOnce(
  homepage,
  "/assets/landing-interactions-v5.js?v=three-live-samples-1",
  "/assets/landing-interactions-v5.js?v=showcase-lifecycle-1",
  "homepage showcase cache key",
);

script = replaceOnce(
  script,
  `  const visual = hero.querySelector('.hero-visual');
  const graphic = document.createElement('div');
  graphic.className = 'build-graphic';`,
  `  const visual = hero.querySelector('.hero-visual');
  if (!visual) return null;
  // Reuse the server-rendered showcase so hydration cannot detach the animated copy.
  const existingGraphic = visual.querySelector(':scope > .build-graphic');
  const graphic = existingGraphic || document.createElement('div');
  graphic.className = 'build-graphic';
  graphic.dataset.buildMounted = 'true';`,
  "showcase mount",
);
script = replaceOnce(script, "  visual.append(graphic);", "  if (!existingGraphic) visual.append(graphic);", "showcase append");
script = replaceOnce(
  script,
  "  function resumeShowcase() { startAmbient(); scheduleNext(); }",
  `  function resumeShowcase() {
    cancel();
    startAmbient();
    scheduleNext();
  }`,
  "showcase resume",
);

script = replaceOnce(
  script,
  `  if (observer) observer.observe(graphic);
  else { visible = true; introduced = true; animateBuild(); }
  document.addEventListener('visibilitychange', syncPlayback, {signal});
  preference.addEventListener('change', syncPlayback, {signal});
  signal.addEventListener('abort', () => { cancel(); observer?.disconnect(); graphic.remove(); visual.classList.remove('has-build-graphic'); }, {once:true});`,
  `  if (observer) observer.observe(graphic);
  else { visible = true; introduced = true; animateBuild(); }

  const refreshVisibility = (force = false) => {
    const bounds = graphic.getBoundingClientRect();
    const nextVisible = graphic.isConnected && bounds.bottom > 0 && bounds.top < window.innerHeight;
    const changed = nextVisible !== visible;
    visible = nextVisible;
    if (changed || force || (visible && !introduced)) syncPlayback();
  };
  requestAnimationFrame(() => { if (!signal.aborted) refreshVisibility(); });
  window.addEventListener('pageshow', () => refreshVisibility(true), {signal});
  document.addEventListener('visibilitychange', syncPlayback, {signal});
  preference.addEventListener('change', syncPlayback, {signal});

  const mountRoot = document.querySelector('#root');
  const mountGuard = mountRoot && 'MutationObserver' in window ? new MutationObserver(() => {
    if (!graphic.isConnected) queueRouteSync();
  }) : null;
  mountGuard?.observe(mountRoot, {childList:true, subtree:true});
  signal.addEventListener('abort', () => {
    cancel();
    observer?.disconnect();
    mountGuard?.disconnect();
    graphic.remove();
    visual.classList.remove('has-build-graphic');
  }, {once:true});`,
  "showcase lifecycle guards",
);

script = replaceOnce(
  script,
  "let landingCleanup = null;\nlet processCleanup = null;",
  "let landingCleanup = null;\nlet landingHero = null;\nlet processCleanup = null;",
  "landing hero owner",
);
script = replaceOnce(
  script,
  `function initializeLanding() {
  if (!isLandingPage() || document.body.classList.contains("is-landing")) return;

  const proofStrip = document.querySelector("main .proof-strip");
  const hero = document.querySelector("main .hero");`,
  `function initializeLanding() {
  if (!isLandingPage()) return;

  const currentHero = document.querySelector("main .hero");
  if (document.body.classList.contains("is-landing")) {
    const activeGraphic = currentHero?.querySelector('.build-graphic[data-build-mounted="true"]');
    if (landingCleanup && landingHero === currentHero && activeGraphic?.isConnected) return;
    if (landingCleanup) landingCleanup();
    else document.body.classList.remove("is-landing", "landing-ready");
  }

  const proofStrip = document.querySelector("main .proof-strip");
  const hero = currentHero;`,
  "landing remount recovery",
);
script = replaceOnce(
  script,
  '  document.body.classList.add("is-landing");',
  '  document.body.classList.add("is-landing");\n  landingHero = hero;',
  "landing hero assignment",
);
script = replaceOnce(
  script,
  '    document.body.classList.remove("is-landing", "landing-ready");\n        landingCleanup = null;',
  '    document.body.classList.remove("is-landing", "landing-ready");\n    if (landingHero === hero) landingHero = null;\n        landingCleanup = null;',
  "landing hero cleanup",
);

fs.writeFileSync(homepagePath, homepage);
fs.writeFileSync(scriptPath, script);
console.log("Applied resilient lifecycle handling to the seven-concept showcase.");
