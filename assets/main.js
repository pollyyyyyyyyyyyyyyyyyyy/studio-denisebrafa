/* ==========================================================================
   CONFIGURAZIONE: l'unica parte da modificare
   --------------------------------------------------------------------------
   Link delle pagine di prenotazione Cal.com, SENZA "https://cal.com/".
   Esempio: se il link è https://cal.com/denisebrafa
            scrivere  "denisebrafa"
   Finché un link resta vuoto, al posto del calendario compare il pulsante email.

   Con solo il nome utente ("denisebrafa") il paziente vede l'elenco
   di tutti i tipi di colloquio e sceglie.
   ========================================================================== */
const CAL_MAIN = "denise-brafa-rbcmxz/calendario-studio-privato";

/* ---------- menu su telefono ---------- */
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  })
);

/* ---------- recensioni: mostra le prime, poi tutte ---------- */
const reviews = document.getElementById("reviews-list");
const reviewsBtn = document.getElementById("reviews-toggle");
if (reviews && reviewsBtn) {
  reviewsBtn.addEventListener("click", () => {
    const open = reviews.classList.toggle("all");
    reviewsBtn.textContent = open ? "Mostra meno" : "Mostra tutte le recensioni";
    if (!open) reviews.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ---------- pulsante fisso "Prenota" su telefono: si nasconde vicino al calendario ---------- */
const sticky = document.querySelector(".sticky-cta");
const prenota = document.getElementById("prenota");
if (sticky && prenota && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => sticky.classList.toggle("hidden", e.isIntersecting), {
    threshold: 0.02,
  }).observe(prenota);
}

/* ---------- calendari Cal.com ---------- */
const calendars = { main: CAL_MAIN };
const active = Object.entries(calendars).filter(([, link]) => link);

if (active.length) {
  (function (C, A, L) {
    const p = (a, ar) => a.q.push(ar);
    const d = C.document;
    C.Cal = C.Cal || function () {
      const cal = C.Cal;
      const ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  for (const [name, link] of active) {
    const box = document.querySelector(`[data-cal="${name}"]`);
    if (!box) continue;
    box.classList.add("has-cal");
    box.innerHTML = `<div id="cal-${name}" class="cal-inline"></div>`;
    Cal("init", name, { origin: "https://cal.com" });
    Cal.ns[name]("inline", {
      elementOrSelector: `#cal-${name}`,
      calLink: link,
      config: { layout: "month_view" },
    });
    Cal.ns[name]("ui", {
      theme: "light",
      styles: { branding: { brandColor: "#5e7a6c" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }
}
