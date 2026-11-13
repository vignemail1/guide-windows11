(() => {
  "use strict";

  function configureExternalLinks() {
    for (const link of document.querySelectorAll("a[href]")) {
      // Respecter les exceptions explicites et les téléchargements.
      if (
        link.hasAttribute("data-same-tab") ||
        link.hasAttribute("download")
      ) {
        continue;
      }

      let url;

      try {
        url = new URL(link.getAttribute("href"), document.baseURI);
      } catch {
        continue;
      }

      // Ne pas toucher aux ancres internes, mailto:, tel:, etc.
      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.origin === window.location.origin
      ) {
        continue;
      }

      // Préserver une cible explicite, par exemple target="_self".
      if (link.hasAttribute("target") && link.target !== "_blank") {
        continue;
      }

      link.target = "_blank";

      // Conserver les relations existantes, comme nofollow.
      link.relList.remove("opener");
      link.relList.add("noopener");
    }
  }

  // Zensical / Material : relancer après chaque navigation instantanée.
  if (typeof document$ !== "undefined") {
    document$.subscribe(configureExternalLinks);
  } else if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      configureExternalLinks,
      { once: true },
    );
  } else {
    configureExternalLinks();
  }
})();
