const { DEFAULT_SETTINGS, FONT_STACKS } = window.CGC_SHARED;

const ROOT = document.documentElement;

function normalizeSettings(settings = {}) {
  const merged = { ...DEFAULT_SETTINGS, ...settings };
  return {
    enabled: Boolean(merged.enabled),
    threadMaxPx: clampNumber(merged.threadMaxPx, 820, 1280, DEFAULT_SETTINGS.threadMaxPx),
    proseMaxCh: clampNumber(merged.proseMaxCh, 62, 90, DEFAULT_SETTINGS.proseMaxCh),
    fontSizePx: clampNumber(merged.fontSizePx, 15, 19, DEFAULT_SETTINGS.fontSizePx),
    lineHeight: clampNumber(merged.lineHeight, 1.5, 1.9, DEFAULT_SETTINGS.lineHeight),
    fontPreset: FONT_STACKS[merged.fontPreset] ? merged.fontPreset : DEFAULT_SETTINGS.fontPreset
  };
}

function clampNumber(value, min, max, fallback) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, num));
}

function applySettings(rawSettings) {
  const settings = normalizeSettings(rawSettings);

  ROOT.dataset.cgcEnabled = settings.enabled ? "true" : "false";
  ROOT.dataset.cgcFontPreset = settings.fontPreset;

  ROOT.style.setProperty("--cgc-thread-max", `${settings.threadMaxPx}px`);
  ROOT.style.setProperty("--cgc-prose-max", `${settings.proseMaxCh}ch`);
  ROOT.style.setProperty("--cgc-font-size", `${settings.fontSizePx}px`);
  ROOT.style.setProperty("--cgc-line-height", String(settings.lineHeight));
  ROOT.style.setProperty("--cgc-body-font", FONT_STACKS[settings.fontPreset]);
}

function loadAndApplySettings() {
  applySettings(DEFAULT_SETTINGS);
  chrome.storage.sync.get(DEFAULT_SETTINGS, applySettings);
}

function ensureRouteMarker() {
  const route = window.location.pathname.startsWith("/c/") ? "thread" : "surface";
  ROOT.dataset.cgcRoute = route;
}

function boot() {
  loadAndApplySettings();
  ensureRouteMarker();

  let lastUrl = window.location.href;
  const observer = new MutationObserver(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      ensureRouteMarker();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") {
    return;
  }

  chrome.storage.sync.get(DEFAULT_SETTINGS, applySettings);
});

boot();
