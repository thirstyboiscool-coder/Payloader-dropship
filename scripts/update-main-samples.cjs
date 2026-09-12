const fs = require("node:fs");
const path = require("node:path");

const target = process.argv[2];
if (!target) throw new Error("Usage: node scripts/update-main-samples.cjs <download-directory>");

const homePath = path.join(target, "index.html");
const samplesPath = path.join(target, "samples-index.html");
const cssPath = path.join(target, "samples-v3.css");

let home = fs.readFileSync(homePath, "utf8");
let samples = fs.readFileSync(samplesPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceOnce(source, needle, replacement, label) {
  if (!source.includes(needle)) throw new Error(`Expected ${label} was not found`);
  return source.replace(needle, replacement);
}

home = home
  .replace("3 websites available now", "4 websites available now")
  .replace("Explore three complete websites in action.", "Explore four complete websites in action.")
  .replace(
    "Plan an outdoor transformation with Payloader Earthworks, shape a stay at Northstar House, or browse race-day favorites at Payloader Eats. Each has its own visual identity, customer journey, and interactive depth.",
    "Build an everyday-carry kit at Flux Supply, plan an outdoor transformation with Payloader Earthworks, shape a stay at Northstar House, or browse race-day favorites at Payloader Eats. Each has its own visual identity, customer journey, and interactive depth."
  )
  .replace("https://landscaping.payloadertech.com/\" target=\"_blank\" rel=\"noopener\">Open newest sample", "https://dropship.payloadertech.com/\" target=\"_blank\" rel=\"noopener\">Open newest sample")
  .replace("<span>3 live demos</span>", "<span>4 live demos</span>");

const oldHomePrimary = `        <a class="samples-home-preview landing-reveal is-visible" href="/samples/#payloader-earthworks" aria-label="Explore the Payloader Earthworks landscaping sample website" style="--reveal-delay: 140ms;">
          <div class="samples-home-browser-bar"><i></i><i></i><i></i><small>landscaping.payloadertech.com</small></div>
          <img src="/assets/sample-payloader-earthworks.jpg" sizes="(max-width: 860px) calc(100vw - 40px), (max-width: 1200px) 56vw, 700px" width="1440" height="900" alt="Payloader Earthworks landscaping website homepage" loading="lazy" decoding="async">
          <span class="samples-home-preview-label"><small>Newest sample 03</small><strong>Payloader Earthworks</strong><b>View the sample <span aria-hidden="true">→</span></b></span>
        </a>`;
const newHomePrimary = `        <a class="samples-home-preview landing-reveal is-visible" href="/samples/#flux-supply" aria-label="Explore the Flux Supply ecommerce sample website" style="--reveal-delay: 140ms;">
          <div class="samples-home-browser-bar"><i></i><i></i><i></i><small>dropship.payloadertech.com</small></div>
          <img src="/assets/sample-flux-supply.webp" sizes="(max-width: 860px) calc(100vw - 40px), (max-width: 1200px) 56vw, 700px" width="1440" height="900" alt="Flux Supply fictional ecommerce website homepage" loading="lazy" decoding="async">
          <span class="samples-home-preview-label"><small>Newest sample 04</small><strong>Flux Supply</strong><b>View the sample <span aria-hidden="true">→</span></b></span>
        </a>`;
home = replaceOnce(home, oldHomePrimary, newHomePrimary, "homepage sample preview");

samples = samples
  .replaceAll(
    "Explore Payloader Tech website samples for landscaping, hospitality, and restaurant businesses, each with a distinct brand system and interactive customer journey.",
    "Explore Payloader Tech website samples for ecommerce, landscaping, hospitality, and restaurant businesses, each with a distinct brand system and interactive customer journey."
  )
  .replace("samples-v3.css?v=three-live-samples-1", "samples-v3.css?v=four-live-samples-2")
  .replace("Three live sample websites", "Four live sample websites")
  .replace("Three worlds. <em>Each built to be explored.</em>", "Four worlds. <em>Each built to be explored.</em>")
  .replace(
    "Compare a precision landscaping company, a nocturnal design hotel, and a race-day restaurant: three complete concepts with distinct visual systems, useful interactions, and responsive customer journeys.",
    "Compare a precision ecommerce shop, a premium landscaping company, a nocturnal design hotel, and a race-day restaurant: four complete concepts with distinct visual systems, useful interactions, and responsive customer journeys."
  )
  .replace("https://landscaping.payloadertech.com/\" target=\"_blank\" rel=\"noopener\">Open newest sample", "https://dropship.payloadertech.com/\" target=\"_blank\" rel=\"noopener\">Open newest sample")
  .replace("<span><i></i> 3 live concepts</span>", "<span><i></i> 4 live concepts</span>")
  .replace("<div><span>03</span><strong>Live sample websites</strong>", "<div><span>04</span><strong>Live sample websites</strong>")
  .replace("<div><span>03</span><strong>Distinct industries</strong><small>Home services, hospitality, and dining</small>", "<div><span>04</span><strong>Distinct industries</strong><small>Ecommerce, home services, hospitality, and dining</small>");

const oldHeroCards = `            <a class="samples-hero-card samples-hero-card-primary" href="#payloader-earthworks" aria-label="Explore the Payloader Earthworks sample">
              <div class="samples-hero-card-bar"><i></i><i></i><i></i><small>landscaping.payloadertech.com</small></div>
              <img src="/assets/sample-payloader-earthworks.jpg" alt="Payloader Earthworks landscaping website homepage" />
              <div class="samples-hero-card-label"><span>03</span><strong>Payloader Earthworks</strong><small>Newest · Landscaping &amp; outdoor living</small></div>
            </a>
            <a class="samples-hero-card samples-hero-card-secondary" href="#northstar-house" aria-label="Explore the Northstar House sample">
              <div class="samples-hero-card-bar"><i></i><i></i><i></i><small>hotel.payloadertech.com</small></div>
              <img src="/assets/sample-northstar-house.jpg" alt="Northstar House fictional hotel website homepage" />
              <div class="samples-hero-card-label"><span>02</span><strong>Northstar House</strong><small>Design hotel</small></div>
            </a>
            <a class="samples-hero-card samples-hero-card-tertiary" href="#payloader-eats" aria-label="Explore the Payloader Eats sample">
              <div class="samples-hero-card-bar"><i></i><i></i><i></i><small>grill.payloadertech.com</small></div>
              <img src="/assets/sample-payloader-eats.jpg" alt="Payloader Eats racing bar and grill website homepage" />
              <div class="samples-hero-card-label"><span>01</span><strong>Payloader Eats</strong><small>Racing Bar &amp; Grill</small></div>
            </a>`;
const newHeroCards = `            <a class="samples-hero-card samples-hero-card-primary" href="#flux-supply" aria-label="Explore the Flux Supply sample">
              <div class="samples-hero-card-bar"><i></i><i></i><i></i><small>dropship.payloadertech.com</small></div>
              <img src="/assets/sample-flux-supply.webp" alt="Flux Supply fictional ecommerce website homepage" />
              <div class="samples-hero-card-label"><span>04</span><strong>Flux Supply</strong><small>Newest · Ecommerce &amp; everyday carry</small></div>
            </a>
            <a class="samples-hero-card samples-hero-card-secondary" href="#payloader-earthworks" aria-label="Explore the Payloader Earthworks sample">
              <div class="samples-hero-card-bar"><i></i><i></i><i></i><small>landscaping.payloadertech.com</small></div>
              <img src="/assets/sample-payloader-earthworks.jpg" alt="Payloader Earthworks landscaping website homepage" />
              <div class="samples-hero-card-label"><span>03</span><strong>Payloader Earthworks</strong><small>Landscaping &amp; outdoor living</small></div>
            </a>
            <a class="samples-hero-card samples-hero-card-tertiary" href="#northstar-house" aria-label="Explore the Northstar House sample">
              <div class="samples-hero-card-bar"><i></i><i></i><i></i><small>hotel.payloadertech.com</small></div>
              <img src="/assets/sample-northstar-house.jpg" alt="Northstar House fictional hotel website homepage" />
              <div class="samples-hero-card-label"><span>02</span><strong>Northstar House</strong><small>Design hotel</small></div>
            </a>
            <a class="samples-hero-card samples-hero-card-quaternary" href="#payloader-eats" aria-label="Explore the Payloader Eats sample">
              <div class="samples-hero-card-bar"><i></i><i></i><i></i><small>grill.payloadertech.com</small></div>
              <img src="/assets/sample-payloader-eats.jpg" alt="Payloader Eats racing bar and grill website homepage" />
              <div class="samples-hero-card-label"><span>01</span><strong>Payloader Eats</strong><small>Racing Bar &amp; Grill</small></div>
            </a>`;
samples = replaceOnce(samples, oldHeroCards, newHeroCards, "samples hero cards");
samples = samples.replace(
  '          <div class="samples-hero-collection samples-reveal" aria-label="Available sample websites">',
  '          <div class="samples-hero-mobile-guide" aria-hidden="true"><span>Swipe through all four</span><i></i><b>→</b></div>\n          <div class="samples-hero-collection samples-reveal" aria-label="Available sample websites">'
);

const collectionNeedle = `          <div class="sample-collection-grid">
            <article class="sample-collection-card sample-collection-earthworks samples-reveal">`;
const collectionReplacement = `          <div class="sample-collection-grid">
            <article class="sample-collection-card sample-collection-flux samples-reveal">
              <a class="sample-collection-image" href="#flux-supply"><img src="/assets/sample-flux-supply.webp" alt="Flux Supply ecommerce website preview" /><span>Newest sample</span></a>
              <div class="sample-collection-body"><span>04 · Ecommerce &amp; everyday carry</span><h3>Flux Supply</h3><p>A design-led storefront with product filtering, search, quick views, persistent bag tools, a live kit builder, field notes, and a transparent demo checkout.</p><div><a href="#flux-supply">Explore case study ↓</a><a href="https://dropship.payloadertech.com/" target="_blank" rel="noopener">Visit live ↗</a></div></div>
            </article>
            <article class="sample-collection-card sample-collection-earthworks samples-reveal">`;
samples = replaceOnce(samples, collectionNeedle, collectionReplacement, "sample collection grid");
samples = samples.replace(
  `<a class="sample-collection-image" href="#payloader-earthworks"><img src="/assets/sample-payloader-earthworks.jpg" alt="Payloader Earthworks landscaping website preview" /><span>Newest sample</span></a>`,
  `<a class="sample-collection-image" href="#payloader-earthworks"><img src="/assets/sample-payloader-earthworks.jpg" alt="Payloader Earthworks landscaping website preview" /><span>Live sample</span></a>`
);

const fluxFeature = `      <section class="sample-feature sample-feature-flux samples-section" id="flux-supply" aria-labelledby="flux-title">
        <div class="samples-shell">
          <div class="sample-heading samples-reveal">
            <div><div class="eyebrow"><span></span> Sample 04 · Live ecommerce concept</div><h2 id="flux-title">Flux Supply</h2></div>
            <div class="sample-heading-meta"><span>Everyday carry, edited</span><a href="https://dropship.payloadertech.com/" target="_blank" rel="noopener">Visit live website ↗</a></div>
          </div>
          <div class="sample-overview samples-reveal">
            <div class="sample-overview-copy">
              <span class="sample-status"><i></i> Live functional demo</span>
              <h3>A focused product system, shaped into a complete store journey.</h3>
              <p>Flux Supply turns a fictional everyday-carry label into a premium ecommerce experience with original product photography, collection filtering, keyboard search, product quick views, persistent bag tools, a discounted kit builder, editorial field notes, and a clearly labeled checkout simulation that never takes payment.</p>
              <div class="sample-tags"><span>Ecommerce</span><span>Kit builder</span><span>Demo checkout</span><span>Responsive</span></div>
            </div>
            <div class="sample-facts">
              <div><small>Primary goal</small><strong>Move shoppers from product discovery to a confident, transparent demo order</strong></div>
              <div><small>Visual direction</small><strong>Monochrome utility + signal-lime precision</strong></div>
              <div><small>Experience depth</small><strong>Filters, search, quick views, bag, bundle pricing, editorial notes, checkout</strong></div>
            </div>
          </div>
          <div class="sample-preview sample-preview-desktop samples-reveal" data-sample-preview data-sample-url="https://dropship.payloadertech.com/" data-sample-name="Flux Supply">
            <div class="sample-preview-toolbar">
              <div class="sample-preview-address"><i></i><span>https://dropship.payloadertech.com</span></div>
              <div class="sample-device-toggle" role="group" aria-label="Flux Supply preview width"><button class="active" type="button" data-sample-device="desktop" aria-pressed="true">Desktop</button><button type="button" data-sample-device="mobile" aria-pressed="false">Mobile</button></div>
              <a href="https://dropship.payloadertech.com/" target="_blank" rel="noopener" aria-label="Open Flux Supply in a new tab">Open ↗</a>
            </div>
            <div class="sample-device-stage"><div class="sample-device-frame"><img class="sample-preview-image" src="/assets/sample-flux-supply.webp" alt="Preview of the Flux Supply ecommerce website" /><div class="sample-preview-cover"><span>Interactive preview</span><strong>Filter the collection, inspect product details, build a kit, and complete the transparent demo checkout.</strong><button class="button sample-load-preview" type="button">Load live website <span aria-hidden="true">→</span></button><small>The live site loads from dropship.payloadertech.com.</small></div></div></div>
            <p class="sample-preview-status" role="status" aria-live="polite">Visual preview shown. Load the live website when you are ready to interact.</p>
          </div>
          <div class="sample-mobile-card samples-reveal" aria-label="Flux Supply mobile preview">
            <div class="sample-mobile-browser-header">
              <div class="browser-dot-group"><span class="browser-dot red"></span><span class="browser-dot yellow"></span><span class="browser-dot green"></span></div>
              <div class="sample-mobile-url-bar"><span class="ssl-lock-icon">🔒</span><span>dropship.payloadertech.com</span></div>
              <span class="mobile-live-tag">Live Concept</span>
            </div>
            <div class="sample-mobile-media-frame">
              <img class="sample-mobile-img" src="/assets/sample-flux-supply.webp" alt="Flux Supply live website preview for mobile" loading="lazy" />
              <div class="sample-mobile-gradient-overlay"><span class="mobile-badge-pill">📱 Mobile Experience</span><h4>Explore Flux Supply</h4><p>Product search, filterable shopping, a live kit builder, bag tools, and transparent demo checkout.</p></div>
            </div>
            <div class="sample-mobile-actions-bar">
              <a class="button button-mobile-launch" href="https://dropship.payloadertech.com/" target="_blank" rel="noopener">Launch Live Ecommerce Website <span aria-hidden="true">↗</span></a>
              <div class="sample-mobile-feature-pills"><span>🛍 Product Discovery</span><span>＋ Live Kit Builder</span><span>✓ Demo Checkout</span></div>
              <small class="sample-mobile-desktop-hint">💡 Note: Interactive in-frame device simulator is available on desktop computers.</small>
            </div>
          </div>
        </div>
      </section>

`;
samples = replaceOnce(
  samples,
  `      <section class="sample-feature sample-feature-earthworks samples-section" id="payloader-earthworks" aria-labelledby="earthworks-title">`,
  fluxFeature + `      <section class="sample-feature sample-feature-earthworks samples-section" id="payloader-earthworks" aria-labelledby="earthworks-title">`,
  "Flux feature insertion point"
);

samples = samples
  .replace(
    "The visual language changes completely, but all three concepts stay clear, useful, responsive, and grounded in the journey a real customer would take.",
    "The visual language changes completely, but all four concepts stay clear, useful, responsive, and grounded in the journey a real customer would take."
  )
  .replace(
    "Industrial outdoor craft, warm nocturnal hospitality, and bold motorsport energy feel intentionally different, not like three versions of one template.",
    "Minimal utility ecommerce, industrial outdoor craft, warm nocturnal hospitality, and bold motorsport energy feel intentionally different—not like four versions of one template."
  )
  .replace(
    "Homeowners move from inspiration to a site survey, guests shape a demo stay, and diners move from food discovery toward ordering and return visits.",
    "Shoppers build a carry kit, homeowners move toward a site survey, guests shape a demo stay, and diners move from discovery toward ordering and return visits."
  )
  .replace(
    "Project estimates, transformation tools, itinerary building, concierge prompts, rewards, and mini-games give each brand its own behavior.",
    "Product search, kit building, project estimates, transformation tools, itinerary building, concierge prompts, rewards, and mini-games give each brand its own behavior."
  )
  .replace(
    "One concept is rugged and exacting, another is quiet and cinematic, and the third is loud and appetite-driven. All three are built with the same attention to clarity and interaction.",
    "One concept is minimal and product-led, another is rugged and exacting, another is quiet and cinematic, and the fourth is loud and appetite-driven. All four are built with the same attention to clarity and interaction."
  )
  .replace(
    `          <div class="sample-brand-contrast">
            <a href="https://landscaping.payloadertech.com/"`,
    `          <div class="sample-brand-contrast">
            <a href="https://dropship.payloadertech.com/" target="_blank" rel="noopener"><small>Flux Supply</small><strong>Carry less.<br />Move better.</strong><span>Open ecommerce ↗</span></a>
            <a href="https://landscaping.payloadertech.com/"`
  );

css += `

/* Fourth sample: Flux Supply */
.sample-feature-flux {
  border-top: 1px solid var(--samples-line);
  background:
    radial-gradient(circle at 88% 8%, rgba(200, 255, 47, 0.09), transparent 28%),
    linear-gradient(180deg, #080b07, #050507);
}
.sample-feature-flux .sample-overview {
  border-color: rgba(200, 255, 47, 0.18);
  background: linear-gradient(145deg, rgba(200, 255, 47, 0.07), rgba(255, 255, 255, 0.02));
}
.sample-feature-flux .sample-heading .eyebrow,
.sample-feature-flux .sample-facts small,
.sample-feature-flux .sample-preview-cover > span { color: #c8ff2f; }
.sample-feature-flux .sample-tags span {
  border-color: rgba(200, 255, 47, 0.22);
  background: rgba(200, 255, 47, 0.06);
}
.sample-collection-flux .sample-collection-image span { background: #c8ff2f; color: #080a08; }
@media (min-width: 1121px) {
  .sample-collection-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .sample-brand-contrast { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
.sample-brand-contrast a:first-child {
  border-color: rgba(200, 255, 47, 0.24);
  background: linear-gradient(150deg, rgba(200, 255, 47, 0.12), #0c1009);
}
.sample-brand-contrast a:nth-child(2) {
  border-color: rgba(70, 220, 164, 0.22);
  background: linear-gradient(150deg, rgba(29, 209, 145, 0.11), #0b110e);
}
.sample-brand-contrast a:nth-child(3) {
  border-color: rgba(217, 174, 114, 0.2);
  background: linear-gradient(150deg, rgba(217, 174, 114, 0.11), #0d1016);
}
.sample-brand-contrast a:nth-child(4) {
  border-color: rgba(235, 40, 48, 0.2);
  background: linear-gradient(150deg, rgba(214, 29, 39, 0.13), #0d0b0d);
}

/* Mobile sample rail: replace the layered desktop collage with a compact,
   touch-native carousel that keeps every live concept within one swipe. */
.samples-hero-mobile-guide,
.samples-hero-collection .samples-hero-card-quaternary {
  display: none;
}

@media (max-width: 700px) {
  .samples-hero-mobile-guide {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 4px 0 -2px;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }
  .samples-hero-mobile-guide i {
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, rgba(200, 255, 47, 0.55), transparent);
  }
  .samples-hero-mobile-guide b { color: #c8ff2f; font-size: 1rem; }
  .samples-hero-collection {
    width: calc(100% + 20px);
    max-width: none;
    min-height: 0;
    margin-right: -20px;
    display: flex;
    align-items: stretch;
    gap: 12px;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    padding: 4px 42px 20px 0;
    scroll-padding-inline: 0 42px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .samples-hero-collection::-webkit-scrollbar { display: none; }
  .samples-hero-collection .samples-hero-card {
    position: relative;
    inset: auto;
    display: block;
    flex: 0 0 min(82vw, 350px);
    width: auto !important;
    margin: 0 !important;
    transform: none !important;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    border-color: rgba(255, 255, 255, 0.14);
    box-shadow: 0 18px 46px rgba(0, 0, 0, 0.42);
  }
  .samples-hero-collection .samples-hero-card-quaternary { display: block; }
  .samples-hero-collection .samples-hero-card > img,
  .samples-hero-card-primary > img,
  .samples-hero-card-secondary > img,
  .samples-hero-card-tertiary > img,
  .samples-hero-card-quaternary > img {
    height: 226px;
    object-position: top center;
  }
  .samples-hero-collection .samples-hero-card-label {
    right: 14px;
    bottom: 14px;
    left: 14px;
    grid-template-columns: 34px 1fr;
    padding: 11px 12px;
    background: rgba(6, 6, 8, 0.91);
    backdrop-filter: blur(12px);
  }
  .samples-hero-collection .samples-hero-card-label small {
    grid-column: 2;
    line-height: 1.3;
  }
}

@media (max-width: 430px) {
  .samples-hero-collection .samples-hero-card { flex-basis: calc(100vw - 56px); }
  .samples-hero-collection .samples-hero-card > img { height: 210px; }
}
`;

fs.writeFileSync(homePath, home);
fs.writeFileSync(samplesPath, samples);
fs.writeFileSync(cssPath, css);
console.log("Updated Payloader Tech homepage and samples collection for Flux Supply.");
