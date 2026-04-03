const { DEFAULT_SETTINGS, FONT_PRESETS, FONT_STACKS } = window.CGC_SHARED;

const fields = {
  enabled: document.getElementById("enabled"),
  fontPreset: document.getElementById("fontPreset"),
  threadMaxPx: document.getElementById("threadMaxPx"),
  proseMaxCh: document.getElementById("proseMaxCh"),
  fontSizePx: document.getElementById("fontSizePx"),
  lineHeight: document.getElementById("lineHeight")
};

const outputs = {
  threadMaxPx: document.getElementById("threadMaxPxValue"),
  proseMaxCh: document.getElementById("proseMaxChValue"),
  fontSizePx: document.getElementById("fontSizePxValue"),
  lineHeight: document.getElementById("lineHeightValue")
};

const previewProse = document.getElementById("previewProse");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const openOptionsButton = document.getElementById("openOptions");

for (const preset of FONT_PRESETS) {
  const option = document.createElement("option");
  option.value = preset.id;
  option.textContent = preset.label;
  fields.fontPreset.appendChild(option);
}

function renderValues(settings) {
  outputs.threadMaxPx.textContent = `${settings.threadMaxPx}px`;
  outputs.proseMaxCh.textContent = `${settings.proseMaxCh}ch`;
  outputs.fontSizePx.textContent = `${Number(settings.fontSizePx).toFixed(1)}px`;
  outputs.lineHeight.textContent = Number(settings.lineHeight).toFixed(2);
}

function applyPreview(settings) {
  previewProse.style.setProperty("--preview-font", FONT_STACKS[settings.fontPreset]);
  previewProse.style.setProperty("--preview-size", `${Number(settings.fontSizePx).toFixed(1)}px`);
  previewProse.style.setProperty("--preview-line", Number(settings.lineHeight).toFixed(2));
  previewProse.style.maxWidth = `${settings.proseMaxCh}ch`;
}

function syncForm(settings) {
  fields.enabled.checked = Boolean(settings.enabled);
  fields.fontPreset.value = settings.fontPreset;
  fields.threadMaxPx.value = settings.threadMaxPx;
  fields.proseMaxCh.value = settings.proseMaxCh;
  fields.fontSizePx.value = settings.fontSizePx;
  fields.lineHeight.value = settings.lineHeight;
  renderValues(settings);
  applyPreview(settings);
}

function readForm() {
  return {
    enabled: fields.enabled.checked,
    fontPreset: fields.fontPreset.value,
    threadMaxPx: Number(fields.threadMaxPx.value),
    proseMaxCh: Number(fields.proseMaxCh.value),
    fontSizePx: Number(fields.fontSizePx.value),
    lineHeight: Number(fields.lineHeight.value)
  };
}

let flashTimer = null;

function flashStatus(message) {
  status.textContent = message;
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => {
    status.textContent = "";
  }, 1400);
}

function saveSettings() {
  const settings = readForm();
  renderValues(settings);
  applyPreview(settings);
  chrome.storage.sync.set(settings, () => {
    flashStatus("Saved");
  });
}

function restoreDefaults() {
  syncForm(DEFAULT_SETTINGS);
  chrome.storage.sync.set(DEFAULT_SETTINGS, () => {
    flashStatus("Defaults restored");
  });
}

chrome.storage.sync.get(DEFAULT_SETTINGS, syncForm);

for (const field of Object.values(fields)) {
  field.addEventListener("input", saveSettings);
  field.addEventListener("change", saveSettings);
}

resetButton.addEventListener("click", restoreDefaults);
openOptionsButton.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});
