(function () {
  const FONT_PRESETS = [
    {
      id: "claudeSans",
      label: "Claude-like Sans",
      stack: '"Avenir Next", "Segoe UI Variable Text", "Segoe UI", "Helvetica Neue", Arial, sans-serif'
    },
    {
      id: "openAIDefault",
      label: "OpenAI Default",
      stack: '"Soehne", "Sohne", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    {
      id: "humanistSans",
      label: "Humanist Sans",
      stack: '"Optima", "Segoe UI Variable Text", "Segoe UI", Candara, "Trebuchet MS", sans-serif'
    },
    {
      id: "modernSans",
      label: "Modern Sans",
      stack: '"Aptos", "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    },
    {
      id: "roundedSans",
      label: "Rounded Sans",
      stack: '"Avenir Next Rounded", "Arial Rounded MT Bold", "Trebuchet MS", Verdana, sans-serif'
    },
    {
      id: "editorialSerif",
      label: "Editorial Serif",
      stack: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif'
    },
    {
      id: "bookSerif",
      label: "Book Serif",
      stack: '"Baskerville", Georgia, "Times New Roman", serif'
    },
    {
      id: "technicalSans",
      label: "Technical Sans",
      stack: '"IBM Plex Sans", "Roboto", "Segoe UI", Arial, sans-serif'
    }
  ];

  const FONT_STACKS = Object.fromEntries(
    FONT_PRESETS.map((preset) => [preset.id, preset.stack])
  );

  const DEFAULT_SETTINGS = {
    enabled: true,
    threadMaxPx: 920,
    proseMaxCh: 70,
    fontSizePx: 15.8,
    lineHeight: 1.72,
    fontPreset: "claudeSans"
  };

  window.CGC_SHARED = {
    DEFAULT_SETTINGS,
    FONT_PRESETS,
    FONT_STACKS
  };
})();
