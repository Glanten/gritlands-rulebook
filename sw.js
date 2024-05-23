// rulebook app service worker
const VERSION = "20240523";
const CACHE_NAME = `gritlands-rulebook-${VERSION}`;
const APP_STATIC_RESOURCES = [
  "/",
  "index.html",
  "README.md",
  "manifest.json",
  "static/default_style.css",
  "static/layout.js",
  "static/images/close_black_24dp.svg",
  "static/images/close_white_24dp.svg",
  "static/images/expand_less_black.svg",
  "static/images/expand_less_white.svg",
  "static/images/expand_more_black.svg",
  "static/images/expand_more_white.svg",
  "static/images/favicon.ico",
  "static/images/gritlands-big-splash.png",
  "static/images/gritlands-logo-512.png",
  "static/images/gritlands-logo.svg",
  "static/images/logo-kotr-off.svg",
  "static/images/logo-kotr.svg",
  "static/images/logo-ng-off.svg",
  "static/images/logo-ng.svg",
  "static/images/logo-uh-off.svg",
  "static/images/logo-uh.svg",
  "static/images/logo-wl-off.svg",
  "static/images/logo-wl.svg",
  "static/images/menu_black_24dp.svg",
  "static/images/menu_white_24dp.svg",
  "static/images/settings_black_24dp.svg",
  "static/images/settings_white_24dp.svg",
  "static/pagecontent/404.html",
  "static/pagecontent/armour.html",
  "static/pagecontent/characters.html",
  "static/pagecontent/coalition.html",
  "static/pagecontent/consequences.html",
  "static/pagecontent/disclaimers.html",
  "static/pagecontent/enabler.html",
  "static/pagecontent/engineer.html",
  "static/pagecontent/equipment.html",
  "static/pagecontent/grit.html",
  "static/pagecontent/health.html",
  "static/pagecontent/home.html",
  "static/pagecontent/hotzones.html",
  "static/pagecontent/mutations.html",
  "static/pagecontent/oddball.html",
  "static/pagecontent/scientist.html",
  "static/pagecontent/scout.html",
  "static/pagecontent/skills.html",
  "static/pagecontent/tags.html",
  "static/pagecontent/tasks.html",
  "static/pagecontent/warrior.html",
  "static/pagecontent/archetypes/agent.html",
  "static/pagecontent/archetypes/apothecary.html",
  "static/pagecontent/archetypes/artisan.html",
  "static/pagecontent/archetypes/blackthumb.html",
  "static/pagecontent/archetypes/boffin.html",
  "static/pagecontent/archetypes/bonesaw.html",
  "static/pagecontent/archetypes/broadcaster.html",
  "static/pagecontent/archetypes/bruiser.html",
  "static/pagecontent/archetypes/castellan.html",
  "static/pagecontent/archetypes/champion.html",
  "static/pagecontent/archetypes/chirurgeon.html",
  "static/pagecontent/archetypes/e-rector.html",
  "static/pagecontent/archetypes/enabler_default.html",
  "static/pagecontent/archetypes/enforcer.html",
  "static/pagecontent/archetypes/engineer_default.html",
  "static/pagecontent/archetypes/geepee.html",
  "static/pagecontent/archetypes/guardian.html",
  "static/pagecontent/archetypes/illuminator.html",
  "static/pagecontent/archetypes/preacher.html",
  "static/pagecontent/archetypes/quaestor.html",
  "static/pagecontent/archetypes/scavenger.html",
  "static/pagecontent/archetypes/scientist_default.html",
  "static/pagecontent/archetypes/scout_default.html",
  "static/pagecontent/archetypes/surveyor.html",
  "static/pagecontent/archetypes/warrior_default.html",
  "static/pagecontent/clans/host.html",
  "static/pagecontent/clans/knights.html",
  "static/pagecontent/clans/nugov.html",
  "static/pagecontent/clans/wastelanders.html",
  "static/pagecontent/skills/and_chewing_gum.html",
  "static/pagecontent/skills/assistant.html",
  "static/pagecontent/skills/carnage_skill.html",
  "static/pagecontent/skills/coordinator.html",
  "static/pagecontent/skills/counselling.html",
  "static/pagecontent/skills/d-fens.html",
  "static/pagecontent/skills/engineer_skill.html",
  "static/pagecontent/skills/first_aid.html",
  "static/pagecontent/skills/medic_skill.html",
  "static/pagecontent/skills/never_say_die.html",
  "static/pagecontent/skills/pharmacology_skill.html",
  "static/pagecontent/skills/psychoanalysis.html",
  "static/pagecontent/skills/reputation.html",
  "static/pagecontent/skills/resistance.html",
  "static/pagecontent/skills/scout_skill.html",
  "static/pagecontent/skills/second_wind.html",
  "static/pagecontent/skills/teamwork.html",
  "static/pagecontent/skills/thicker_than_water.html",
  "static/pagecontent/skills/tradition.html",
  "static/pagecontent/skills/true_grit.html",
];

// install PWA
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })()
  );
});

// remove old content once new content has been updated
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
      await clients.claim();
    })()
  );
});

// Fetch resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }
      const networkResponse = await fetch(event.request);
      await cache.put(event.request, networkResponse.clone());
      return networkResponse;
    })()
  );
});
