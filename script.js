const products = [
  {
    id: "orbit-power",
    name: "Orbit 10K",
    subtitle: "Pocket power bank",
    price: 68,
    category: "power",
    image: "assets/orbit-power.webp",
    badge: "Best seller",
    description: "Ten thousand milliamp hours in a pocket-first silhouette. Enough reserve for the long day without turning your bag into a battery drawer.",
    specs: [["Capacity", "10,000 mAh"], ["Output", "USB-C · 30W"], ["Weight", "186 g"], ["Finish", "Soft-touch graphite"]]
  },
  {
    id: "relay-pouch",
    name: "Relay Pouch",
    subtitle: "Low-profile tech organizer",
    price: 52,
    category: "carry",
    image: "assets/relay-pouch.webp",
    badge: "New",
    description: "A structured home for the little things that usually find the bottom of your bag. One main compartment, one fast-access pocket, no wasted volume.",
    specs: [["Shell", "840D ballistic weave"], ["Capacity", "1.2 L"], ["Closure", "Coated zip"], ["Profile", "28 mm"]]
  },
  {
    id: "fold-stand",
    name: "Fold Stand",
    subtitle: "Adjustable phone dock",
    price: 39,
    category: "desk",
    image: "assets/fold-stand.webp",
    badge: "",
    description: "A pocketable stand that creates a steady screen angle wherever work lands. The weighted aluminum frame folds flat when the call is over.",
    specs: [["Material", "Anodized aluminum"], ["Angles", "15°–75°"], ["Folded", "8 mm"], ["Base", "Non-slip silicone"]]
  },
  {
    id: "link-cable",
    name: "Link Cable",
    subtitle: "Braided USB-C · 2 m",
    price: 29,
    category: "power",
    image: "assets/link-cable.webp",
    badge: "",
    description: "The cable that stays in the bag. Dense braided construction, restrained hardware, and a bright keeper you can find in low light.",
    specs: [["Length", "2 meters"], ["Power", "Up to 100W"], ["Data", "USB 2.0"], ["Keeper", "Signal silicone"]]
  },
  {
    id: "keyform",
    name: "Keyform 04",
    subtitle: "Silent key organizer",
    price: 44,
    category: "carry",
    image: "assets/keyform.webp",
    badge: "",
    description: "Four keys, one quiet form. The precision pivot removes pocket rattle while a high-visibility loop makes the set easy to grab.",
    specs: [["Capacity", "2–6 keys"], ["Frame", "6061 aluminum"], ["Hardware", "Stainless steel"], ["Carry", "Signal loop"]]
  },
  {
    id: "slate-wallet",
    name: "Slate Wallet",
    subtitle: "Minimal card system",
    price: 58,
    category: "carry",
    image: "assets/slate-wallet.webp",
    badge: "Staff pick",
    description: "A slim card system that keeps the essentials immediately accessible. Structured aluminum, flexible retention, and a single pull point.",
    specs: [["Capacity", "1–8 cards"], ["Body", "Anodized aluminum"], ["Band", "Woven elastic"], ["RFID", "Shielding concept"]]
  }
];

const notes = {
  audit: {
    index: "Field / 001 · 04 min read",
    title: "The one-bag audit: what actually deserves a pocket?",
    body: `<p>Empty the bag completely. The first useful signal is not what you own—it is what shows up every day with visible wear.</p><p>Build three groups: used daily, used weekly, and carried “just in case.” Put the last group aside for seven days. If nothing breaks, it probably did not deserve permanent space.</p><p>Then give each remaining object one home. A cable should not migrate between four pockets. A power bank should be reachable without unloading the bag. A small system beats a large collection when motion is the goal.</p>`
  },
  charge: {
    index: "Field / 002 · 03 min read",
    title: "A simple charging system for every room you work in.",
    body: `<p>Standardize the connector before you optimize the charger. One cable type across your everyday devices removes more friction than any clever charging hub.</p><p>Keep fixed power where work regularly happens. Keep one cable and one reserve battery in motion. Label nothing; use a single color cue so the travel set never becomes part of the room.</p><p>The best charging system is boring enough that you stop thinking about it.</p>`
  },
  quiet: {
    index: "Field / 003 · 05 min read",
    title: "Why quiet objects make better long-term companions.",
    body: `<p>Attention is a real material. Every blinking indicator, novelty texture, and unnecessary sound asks for a little of it.</p><p>Quiet products do their job and then disappear into the day. Their interfaces are legible, their materials age honestly, and their form does not depend on being the newest thing in the room.</p><p>When choosing an object for daily use, look for the feature you will appreciate in year three: a replaceable part, a surface that can take a mark, or a control you understand without a manual.</p>`
  }
};

let cart = loadCart();
let bundleSelection = [];
let activeFilter = "all";
let toastTimer;

const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
const byId = id => products.find(product => product.id === id);
const itemPrice = item => item.kitId ? byId(item.id).price * .88 : byId(item.id).price;

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("flux-demo-cart") || "[]");
    return Array.isArray(saved) ? saved.filter(item => products.some(product => product.id === item.id) && Number.isInteger(item.qty) && item.qty > 0) : [];
  } catch { return []; }
}

function saveCart() {
  localStorage.setItem("flux-demo-cart", JSON.stringify(cart));
}

function renderProducts(filter = activeFilter) {
  activeFilter = filter;
  const visible = filter === "all" ? products : products.filter(product => product.category === filter);
  const grid = document.querySelector("#product-grid");
  grid.innerHTML = visible.map(product => `
    <article class="product-card reveal is-visible" data-product="${product.id}">
      <div class="product-media" tabindex="0" role="button" aria-label="View ${product.name} details">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <img src="${product.image}" alt="${product.name}, ${product.subtitle.toLowerCase()}" width="1254" height="1254" decoding="async">
        <button class="quick-view" type="button" data-quick-view="${product.id}">Quick view</button>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3><span>${money(product.price)}</span>
        <p>${product.subtitle}</p>
        <div class="product-actions"><button type="button" data-quick-view="${product.id}">View details</button><button class="add-button" type="button" data-add="${product.id}">Add to bag ＋</button></div>
      </div>
    </article>`).join("");
}

function renderBundleOptions() {
  const container = document.querySelector("#bundle-options");
  container.innerHTML = products.map(product => `
    <label class="bundle-option" data-bundle-option="${product.id}">
      <input type="checkbox" value="${product.id}" ${bundleSelection.includes(product.id) ? "checked" : ""}>
      <img src="${product.image}" alt="" width="74" height="74" loading="lazy">
      <div><h3>${product.name}</h3><p>${product.subtitle}</p></div>
      <div class="bundle-option-price"><strong>${money(product.price)}</strong><i>${bundleSelection.includes(product.id) ? "✓" : "+"}</i></div>
    </label>`).join("");
  updateBundle();
}

function updateBundle() {
  document.querySelectorAll("[data-bundle-option]").forEach(option => {
    const input = option.querySelector("input");
    input.checked = bundleSelection.includes(input.value);
    option.classList.toggle("is-disabled", bundleSelection.length >= 3 && !input.checked);
    option.querySelector("i").textContent = input.checked ? "✓" : "+";
  });

  document.querySelectorAll("[data-slot]").forEach((slot, index) => {
    const product = byId(bundleSelection[index]);
    slot.classList.toggle("is-filled", Boolean(product));
    slot.querySelector("p").textContent = product ? product.name : "Choose an object";
  });

  const rawTotal = bundleSelection.reduce((sum, id) => sum + byId(id).price, 0);
  const total = bundleSelection.length === 3 ? rawTotal * .88 : rawTotal;
  document.querySelector("#bundle-total").textContent = money(total);
  document.querySelector("#bundle-savings").textContent = bundleSelection.length === 3
    ? `${money(rawTotal - total)} demo bundle savings applied.`
    : `Select ${3 - bundleSelection.length} more object${3 - bundleSelection.length === 1 ? "" : "s"} to unlock 12% off.`;
  document.querySelector("#add-bundle").disabled = bundleSelection.length !== 3;
}

function addToCart(id, qty = 1, announce = true) {
  const existing = cart.find(item => item.id === id && !item.kitId);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  saveCart();
  renderCart();
  if (announce) showToast(`${byId(id).name} added to your demo bag.`);
}

function addBundleToCart(ids) {
  const kitId = Date.now();
  ids.forEach(id => cart.push({ id, qty: 1, kitId }));
  saveCart();
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + itemPrice(item) * item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(node => {
    node.textContent = count;
    node.setAttribute("aria-label", `${count} item${count === 1 ? "" : "s"} in bag`);
  });
  document.querySelector("#drawer-count").textContent = `(${count})`;
  document.querySelector("#cart-subtotal").textContent = money(subtotal);
  document.querySelector("#cart-empty").hidden = count > 0;
  document.querySelector("#cart-footer").hidden = count === 0;
  document.querySelector("#cart-items").innerHTML = cart.map((item, index) => {
    const product = byId(item.id);
    return `<div class="cart-item">
      <img src="${product.image}" alt="" width="76" height="76">
      <div><h3>${product.name}</h3><p>${item.kitId ? "Kit item · 12% off" : product.subtitle}</p>${item.kitId ? "" : `<div class="qty-control" aria-label="Quantity for ${product.name}"><button type="button" data-qty="-1" data-index="${index}" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button type="button" data-qty="1" data-index="${index}" aria-label="Increase quantity">+</button></div>`}</div>
      <aside><strong>${money(itemPrice(item) * item.qty)}</strong><button class="remove-item" type="button" data-remove-index="${index}">${item.kitId ? "Remove kit" : "Remove"}</button></aside>
    </div>`;
  }).join("");

  const remaining = Math.max(0, 85 - subtotal);
  const percent = Math.min(100, Math.round(subtotal / 85 * 100));
  document.querySelector("#shipping-message").textContent = remaining ? `Add ${money(remaining)} for free demo shipping` : "Free demo shipping unlocked";
  document.querySelector("#shipping-percent").textContent = `${percent}%`;
  document.querySelector("#shipping-bar").style.width = `${percent}%`;
}

function changeQuantity(index, delta) {
  const item = cart[index];
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function openCart() {
  document.querySelector("#drawer-backdrop").hidden = false;
  const drawer = document.querySelector("#cart-drawer");
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.querySelectorAll(".cart-trigger").forEach(button => button.setAttribute("aria-expanded", "true"));
  document.body.classList.add("is-locked");
  window.setTimeout(() => drawer.querySelector(".close-cart").focus(), 50);
}

function closeCart() {
  const drawer = document.querySelector("#cart-drawer");
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.querySelectorAll(".cart-trigger").forEach(button => button.setAttribute("aria-expanded", "false"));
  document.querySelector("#drawer-backdrop").hidden = true;
  document.body.classList.remove("is-locked");
}

function openProduct(id) {
  const product = byId(id);
  const dialog = document.querySelector("#product-modal");
  document.querySelector("#product-modal-content").innerHTML = `
    <div class="product-modal-layout">
      <img src="${product.image}" alt="${product.name}, ${product.subtitle.toLowerCase()}" width="1254" height="1254">
      <div class="product-detail">
        <p class="eyebrow">${product.category} / Flux 01</p>
        <h2>${product.name}</h2>
        <div class="product-price">${money(product.price)}</div>
        <p class="product-description">${product.description}</p>
        <ul class="product-specs">${product.specs.map(spec => `<li><span>${spec[0]}</span><strong>${spec[1]}</strong></li>`).join("")}</ul>
        <button class="button button-accent" type="button" data-modal-add="${product.id}">Add to demo bag <span>＋</span></button>
        <small>Fictional product · No payment or fulfillment</small>
      </div>
    </div>`;
  dialog.showModal();
}

function openSearch() {
  const dialog = document.querySelector("#search-modal");
  renderSearchResults("");
  dialog.showModal();
  window.setTimeout(() => document.querySelector("#site-search").focus(), 50);
}

function renderSearchResults(query) {
  const normalized = query.trim().toLowerCase();
  const results = products.filter(product => [product.name, product.subtitle, product.category, product.description].join(" ").toLowerCase().includes(normalized));
  document.querySelector("#search-results").innerHTML = results.length ? results.map(product => `
    <button class="search-result" type="button" data-search-product="${product.id}">
      <img src="${product.image}" alt="" width="62" height="62">
      <span><strong>${product.name}</strong>${product.subtitle}</span><b>${money(product.price)}</b>
    </button>`).join("") : `<p class="search-none">No objects match “${escapeHtml(query)}”. Try power, carry, cable, or wallet.</p>`;
}

function escapeHtml(value) {
  const span = document.createElement("span");
  span.textContent = value;
  return span.innerHTML;
}

function openCheckout() {
  closeCart();
  renderCheckoutInformation();
  document.querySelector("#checkout-modal").showModal();
}

function setCheckoutProgress(step) {
  document.querySelectorAll(".checkout-progress span").forEach((node, index) => node.classList.toggle("is-active", index <= step));
}

function renderCheckoutInformation() {
  setCheckoutProgress(0);
  document.querySelector("#checkout-content").innerHTML = `
    <section class="checkout-step">
      <h2>Where would it go?</h2>
      <p>Walk through a realistic information step. Nothing entered here is sent or saved.</p>
      <div class="demo-callout"><strong>DEMO</strong><span>Use placeholder details. This concept site never transmits or stores this form.</span></div>
      <form id="checkout-form">
        <div class="form-grid">
          <div class="field field-wide"><label for="checkout-email">Email</label><input id="checkout-email" type="email" value="demo@example.com" required></div>
          <div class="field"><label for="checkout-first">First name</label><input id="checkout-first" value="Demo" required></div>
          <div class="field"><label for="checkout-last">Last name</label><input id="checkout-last" value="Shopper" required></div>
          <div class="field field-wide"><label for="checkout-address">Address</label><input id="checkout-address" value="123 Concept Street" required></div>
          <div class="field"><label for="checkout-city">City</label><input id="checkout-city" value="Chicago" required></div>
          <div class="field"><label for="checkout-zip">ZIP code</label><input id="checkout-zip" inputmode="numeric" value="60601" required></div>
        </div>
        <div class="checkout-actions"><button class="button button-accent" type="submit">Review demo order <span>→</span></button></div>
      </form>
    </section>`;
}

function renderCheckoutReview() {
  setCheckoutProgress(1);
  const subtotal = cart.reduce((sum, item) => sum + itemPrice(item) * item.qty, 0);
  document.querySelector("#checkout-content").innerHTML = `
    <section class="checkout-step">
      <h2>Review the fiction.</h2>
      <p>No payment fields appear because this is a portfolio experience. Confirm to complete the scripted order journey.</p>
      <div class="checkout-review-list">
        ${cart.map(item => `<div class="checkout-review-item"><span>${byId(item.id).name}${item.kitId ? " · kit" : ""} × ${item.qty}</span><strong>${money(itemPrice(item) * item.qty)}</strong></div>`).join("")}
        <div class="checkout-review-item"><span>Demo shipping</span><strong>${subtotal >= 85 ? "Free" : money(8)}</strong></div>
        <div class="checkout-review-total"><span>Demo total</span><strong>${money(subtotal + (subtotal >= 85 ? 0 : 8))}</strong></div>
      </div>
      <div class="checkout-actions"><button class="button" type="button" id="checkout-back">← Back</button><button class="button button-accent" type="button" id="checkout-confirm">Complete demo order <span>→</span></button></div>
    </section>`;
}

function renderCheckoutComplete() {
  setCheckoutProgress(2);
  const order = `FX-${Math.floor(100000 + Math.random() * 900000)}`;
  document.querySelector("#checkout-content").innerHTML = `
    <section class="checkout-step">
      <div class="complete-mark">✓</div>
      <h2>Demo dispatched.</h2>
      <p>The interaction is complete—nothing was purchased, charged, stored, or sent. Thanks for exploring the Flux Supply concept.</p>
      <div class="demo-order-number">FICTIONAL ORDER / ${order}</div>
      <div class="checkout-actions"><a class="button" href="https://payloadertech.com/samples">See more Payloader samples ↗</a><button class="button button-accent" type="button" id="checkout-done">Return to shop</button></div>
    </section>`;
  cart = [];
  saveCart();
  renderCart();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.setAttribute("aria-hidden", "false");
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.setAttribute("aria-hidden", "true");
  }, 2800);
}

function closeDialog(dialog) {
  if (dialog?.open) dialog.close();
}

document.addEventListener("click", event => {
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    document.querySelectorAll("[data-filter]").forEach(button => {
      const isActive = button === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    renderProducts(filter.dataset.filter);
  }

  const addButton = event.target.closest("[data-add]");
  if (addButton) addToCart(addButton.dataset.add);

  const quickView = event.target.closest("[data-quick-view]");
  if (quickView) openProduct(quickView.dataset.quickView);

  const media = event.target.closest(".product-media");
  if (media && !event.target.closest("button")) openProduct(media.closest("[data-product]").dataset.product);

  if (event.target.closest(".cart-trigger")) openCart();
  if (event.target.closest(".close-cart") || event.target.closest("#drawer-backdrop")) closeCart();
  if (event.target.closest(".search-trigger")) openSearch();

  const qty = event.target.closest("[data-qty]");
  if (qty) changeQuantity(Number(qty.dataset.index), Number(qty.dataset.qty));

  const remove = event.target.closest("[data-remove-index]");
  if (remove) {
    const index = Number(remove.dataset.removeIndex);
    const item = cart[index];
    cart = item?.kitId ? cart.filter(entry => entry.kitId !== item.kitId) : cart.filter((_, itemIndex) => itemIndex !== index);
    saveCart();
    renderCart();
  }

  const modalAdd = event.target.closest("[data-modal-add]");
  if (modalAdd) {
    addToCart(modalAdd.dataset.modalAdd);
    closeDialog(document.querySelector("#product-modal"));
    openCart();
  }

  const searchProduct = event.target.closest("[data-search-product]");
  if (searchProduct) {
    closeDialog(document.querySelector("#search-modal"));
    openProduct(searchProduct.dataset.searchProduct);
  }

  const noteTrigger = event.target.closest("[data-note]");
  if (noteTrigger) {
    const note = notes[noteTrigger.dataset.note];
    document.querySelector("#note-content").innerHTML = `<p>${note.index}</p><h2>${note.title}</h2><div>${note.body}</div>`;
    document.querySelector("#note-modal").showModal();
  }

  if (event.target.closest(".modal-close")) closeDialog(event.target.closest("dialog"));
  if (event.target.closest(".checkout-trigger")) openCheckout();
  if (event.target.closest("#checkout-back")) renderCheckoutInformation();
  if (event.target.closest("#checkout-confirm")) renderCheckoutComplete();
  if (event.target.closest("#checkout-done")) closeDialog(document.querySelector("#checkout-modal"));

  const menu = event.target.closest(".menu-toggle");
  if (menu) {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    document.querySelector("#site-nav").classList.toggle("is-open", open);
  }
  if (event.target.closest("#site-nav a")) {
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    document.querySelector("#site-nav").classList.remove("is-open");
  }
});

document.addEventListener("change", event => {
  const checkbox = event.target.closest("[data-bundle-option] input");
  if (!checkbox) return;
  if (checkbox.checked && bundleSelection.length < 3) bundleSelection.push(checkbox.value);
  else if (!checkbox.checked) bundleSelection = bundleSelection.filter(id => id !== checkbox.value);
  else checkbox.checked = false;
  updateBundle();
});

document.addEventListener("submit", event => {
  if (event.target.id === "newsletter-form") {
    event.preventDefault();
    const status = document.querySelector("#newsletter-status");
    status.textContent = "You’re on the fictional dispatch list. Nothing was sent or stored.";
    event.target.reset();
    showToast("Demo signup complete. No data was sent.");
  }
  if (event.target.id === "checkout-form") {
    event.preventDefault();
    renderCheckoutReview();
  }
});

document.querySelector("#site-search").addEventListener("input", event => renderSearchResults(event.target.value));
document.querySelector("#add-bundle").addEventListener("click", () => {
  addBundleToCart(bundleSelection);
  showToast("Three-piece kit added with 12% demo savings.");
  bundleSelection = [];
  updateBundle();
  openCart();
});

document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) {
    event.preventDefault();
    openSearch();
  }
  if (event.key === "Escape" && document.querySelector("#cart-drawer").classList.contains("is-open")) closeCart();
  if ((event.key === "Enter" || event.key === " ") && document.activeElement.classList.contains("product-media")) {
    event.preventDefault();
    openProduct(document.activeElement.closest("[data-product]").dataset.product);
  }
});

const revealObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .08, rootMargin: "0px 0px -30px" }) : null;

renderProducts();
renderBundleOptions();
renderCart();
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll(".reveal").forEach(element => revealObserver ? revealObserver.observe(element) : element.classList.add("is-visible"));
