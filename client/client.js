window.__ModuleLoader__.load({
  id: "dsh-eva-skins",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    var React = require("react");
    var h = React.createElement;

    var STORAGE_KEY = "unit02-skin";
    var STORAGE_SET = "unit02-skin-set";
    var BOOT_KEY = "unit02-boot-at";
    /* the intro replays when the last one was longer ago than this, so a real
       app relaunch always shows it while a quick reload stays quiet */
    var BOOT_REPLAY_AFTER = 20 * 60 * 1000;

    /* ============================================================
     * 1. UNIT-02 theme layer
     * ============================================================ */

    var CSS = [
      /* ---------- palette + switches ---------- */
      'html[data-unit02="on"]{',
      '  --u2-void:#0A0B0D;',
      '  --u2-armor:#B62026;',
      '  --u2-armor-deep:#51161C;',
      '  --u2-orange:#F06A22;',
      '  --u2-amber:#E7BC35;',
      '  --u2-bone:#E8E2D7;',
      '}',

      /* ---------- dark cockpit (default look) ---------- */
      'html[data-unit02="on"] body[data-ds-dark-theme]{',
      '  --dsw-alias-bg-base:#0A0B0D;',
      '  --dsw-alias-bg-document-preview:#0A0B0D;',
      '  --dsw-alias-bg-document-selection:rgba(240,106,34,.24);',
      '  --dsw-alias-label-document-preview:#B4A99B;',
      '  --dsw-alias-bg-layer-1:#101216;',
      '  --dsw-alias-bg-layer-2:#15181D;',
      '  --dsw-alias-bg-layer-3:#1B1F25;',
      '  --dsw-alias-bg-mask-1:#000000b3;',
      '  --dsw-alias-bg-mask-2:#0000004d;',
      '  --dsw-alias-bg-mask-3:#0000008c;',
      '  --dsw-alias-bg-mask-photo:#000000e6;',
      '  --dsw-alias-bg-mask-drop:#15181dc4;',
      '  --dsw-alias-bg-module-platform:#1B1F25;',
      '  --dsw-alias-bg-multi-select:#1B1F25;',
      '  --dsw-alias-bg-overlay:#1B1F25;',
      '  --dsw-alias-bg-skeleton:#F06A2214;',
      '  --dsw-alias-border-inverted2:rgba(240,106,34,.18);',
      '  --dsw-alias-border-inverted:rgba(240,106,34,.12);',
      '  --dsw-alias-border-l1:rgba(240,106,34,.14);',
      '  --dsw-alias-border-l2:rgba(240,106,34,.26);',
      '  --dsw-alias-border-l2-darkmode-thin:rgba(240,106,34,.14);',
      '  --dsw-alias-border-l3:rgba(240,106,34,.42);',
      '  --dsw-alias-border-l4:rgba(240,106,34,.58);',
      '  --dsw-alias-brand-primary-invert:#E8E2D7;',
      '  --dsw-alias-brand-primary:#B62026;',
      '  --dsw-alias-brand-text:#FFF4EC;',
      '  --dsw-alias-button-contrast-fill:#E8E2D7;',
      '  --dsw-alias-button-elevated-fill:#1B1F25;',
      '  --dsw-alias-button-floating-fill:#15181D;',
      '  --dsw-alias-button-floating-hover:#1F242B;',
      '  --dsw-alias-button-ghost-active-border:rgba(240,106,34,.5);',
      '  --dsw-alias-button-ghost-active-fill:#1B1F25;',
      '  --dsw-alias-button-ghost-active-hover:#232830;',
      '  --dsw-alias-button-info-fill:#F06A22;',
      '  --dsw-alias-button-info-hover:#FF7C33;',
      '  --dsw-alias-button-primary-dimmed:#51161C;',
      '  --dsw-alias-button-primary-fill:#B62026;',
      '  --dsw-alias-button-primary-hover:#D4282E;',
      '  --dsw-alias-button-tool-bar-fill-invisible:#10121666;',
      '  --dsw-alias-button-tool-bar-fill:#23283080;',
      '  --dsw-alias-button-tool-bar-hover:#2B313A99;',
      '  --dsw-alias-illustration-background:#15181D;',
      '  --dsw-alias-illustration-backing:#1B1F25;',
      '  --dsw-alias-illustration-detail:#6B7480;',
      '  --dsw-alias-illustration-inset:#1B1F25;',
      '  --dsw-alias-illustration-shadow:#08090B;',
      '  --dsw-alias-illustration-surface:#1B1F25;',
      '  --dsw-alias-interactive-bg-active:rgba(240,106,34,.20);',
      '  --dsw-alias-interactive-bg-hover-accent:rgba(240,106,34,.30);',
      '  --dsw-alias-interactive-bg-hover-danger:rgba(255,90,78,.18);',
      '  --dsw-alias-interactive-bg-hover-solid:#1B1F25;',
      '  --dsw-alias-interactive-bg-hover:rgba(240,106,34,.10);',
      '  --dsw-alias-label-caption:#7A7066;',
      '  --dsw-alias-label-dimmed:#4E4740;',
      '  --dsw-alias-label-primary-bluish:#E8E2D7;',
      '  --dsw-alias-label-primary-dimmed:#D9D2C6;',
      '  --dsw-alias-label-primary-foreground:#0A0B0D;',
      '  --dsw-alias-label-primary-inverted:#0A0B0D;',
      '  --dsw-alias-label-primary:#E8E2D7;',
      '  --dsw-alias-label-secondary:#B4A99B;',
      '  --dsw-alias-label-tertiary:#8A7F74;',
      '  --dsw-alias-menu-icon:#C6BBAC;',
      '  --dsw-alias-link:#F06A22;',
      '  --dsw-alias-markdown-citation:#1B1F25;',
      '  --dsw-alias-markdown-code-block-banner:#14171C;',
      '  --dsw-alias-markdown-code-block:#0E1114;',
      '  --dsw-alias-markdown-code-segment-selected:#1E2228;',
      '  --dsw-alias-markdown-code-segment-unselected:#111418;',
      '  --dsw-alias-markdown-inline-code:#1E2228;',
      '  --dsw-alias-markdown-placeholder:#1B1F25;',
      '  --dsw-alias-markdown-tag:#1E2228;',
      '  --dsw-alias-scrollbar-bg-l1:#242A31;',
      '  --dsw-alias-scrollbar-bg-l2:#2E353D;',
      '  --dsw-alias-scrollbar-hover-l1:#3A424B;',
      '  --dsw-alias-scrollbar-hover-l2:#4A535D;',
      '  --dsw-alias-state-business-primary:#F06A22;',
      '  --dsw-alias-state-business-tertiary:#51161C;',
      '  --dsw-alias-code-diff-added:rgba(95,208,138,.14);',
      '  --dsw-alias-code-diff-deleted:rgba(255,90,78,.14);',
      '  --dsw-alias-file-diff-added-bg:#12241A;',
      '  --dsw-alias-file-diff-added-gutter:#0D1A12;',
      '  --dsw-alias-file-diff-added-marker:#5FD08A;',
      '  --dsw-alias-file-diff-deleted-bg:#2A1416;',
      '  --dsw-alias-file-diff-deleted-gutter:#1C0D0F;',
      '  --dsw-alias-file-diff-deleted-marker:#FF5A4E;',
      '  --dsw-alias-state-done-primary:#E7BC35;',
      '  --dsw-alias-state-error-primary:#FF5A4E;',
      '  --dsw-alias-state-error-secondary:#FF7A6E;',
      '  --dsw-alias-state-idle-primary:#6B7480;',
      '  --dsw-alias-state-success-primary:#5FD08A;',
      '  --dsw-alias-state-success-secondary:#7FE0A3;',
      '  --dsw-alias-state-success-tertiary:#12331F;',
      '  --dsw-alias-state-warn-label:#E7BC35;',
      '  --dsw-alias-state-warn-primary:#E7BC35;',
      '  --dsw-alias-state-warn-secondary:#F2CE5B;',
      '  --dsw-alias-state-warn-tertiary:#5A4A12;',
      '  --dsw-alias-switch-thumb:#F06A22;',
      '  --dsw-alias-toast-bg:#1B1F25;',
      '  --dsw-alias-toast-label:#E8E2D7;',
      '  --dsw-alias-turn-trigger-bg:rgba(240,106,34,.10);',
      '  --dsw-alias-turn-trigger-bg-hover:rgba(240,106,34,.18);',
      '  --dsw-alias-tooltip-bg:#1B1F25;',
      '  --dsw-alias-tooltip-key-bg:rgba(240,106,34,.18);',
      '  --dsw-specific-bubble-highlight:#1D2128;',
      '  --dsw-specific-bubble:#15181D;',
      '  --dsw-specific-input-major:#12151A;',
      '  --dsw-specific-login-input:#0E1114;',
      '  --dsw-menu-surface-fill:#14171CF2;',
      '  --dsw-alias-menu-group-header-fill:#0F1216F0;',
      '  --dsw-specific-menu:#14171CF2;',
      '  --dsw-specific-selector:#1B1F25;',
      '  --dsw-specific-sidebar-fill:#0D0F13;',
      '  --dsw-specific-sidebar-nav-item-active-accent:#F06A22;',
      '  --dsw-specific-sidebar-nav-item-active:#1D2128;',
      '  --dsw-specific-tip:#1B1F25;',
      '}',

      /* ---------- warm pass: align panels/borders with the source workbench ---------- */
      'html[data-unit02="on"] body[data-ds-dark-theme]{',
      '  --dsw-alias-bg-layer-1:#121315;',
      '  --dsw-alias-bg-layer-2:#17181A;',
      '  --dsw-alias-bg-layer-3:#1B1B1C;',
      '  --dsw-alias-bg-overlay:#1B1B1C;',
      '  --dsw-alias-bg-module-platform:#1B1B1C;',
      '  --dsw-alias-bg-multi-select:#1B1B1C;',
      '  --dsw-alias-bg-mask-drop:#1B1B1CC4;',
      '  --dsw-alias-border-l1:#2A2825;',
      '  --dsw-alias-border-l2:#33312E;',
      '  --dsw-alias-border-l3:#514034;',
      '  --dsw-alias-border-l4:#6B5544;',
      '  --dsw-alias-border-inverted:rgba(240,106,34,.14);',
      '  --dsw-alias-border-inverted2:rgba(240,106,34,.22);',
      '  --dsw-alias-label-secondary:#A29E97;',
      '  --dsw-alias-label-tertiary:#857F77;',
      '  --dsw-alias-label-caption:#7A7066;',
      '  --dsw-alias-menu-icon:#C6BBAC;',
      '  --dsw-alias-interactive-bg-hover-solid:#232120;',
      '  --dsw-alias-button-elevated-fill:#1B1B1C;',
      '  --dsw-alias-button-floating-fill:#17181A;',
      '  --dsw-alias-button-floating-hover:#232120;',
      '  --dsw-alias-button-ghost-active-fill:#231A18;',
      '  --dsw-alias-button-ghost-active-hover:#2C211E;',
      '  --dsw-alias-button-tool-bar-fill:#2A2724AA;',
      '  --dsw-alias-button-tool-bar-hover:#332F2BCC;',
      '  --dsw-alias-button-primary-fill:#B62026;',
      '  --dsw-alias-button-primary-hover:#C92730;',
      '  --dsw-alias-brand-primary:#B62026;',
      '  --dsw-alias-input-bg:#121315;',
      '  --dsw-alias-input-border:#3A3530;',
      '  --dsw-alias-markdown-code-block:#0E0F10;',
      '  --dsw-alias-markdown-code-block-banner:#161718;',
      '  --dsw-alias-markdown-citation:#1B1B1C;',
      '  --dsw-alias-markdown-inline-code:#22201E;',
      '  --dsw-alias-markdown-code-segment-selected:#26231F;',
      '  --dsw-alias-markdown-code-segment-unselected:#191A1B;',
      '  --dsw-alias-scrollbar-bg-l1:#2A2724;',
      '  --dsw-alias-scrollbar-bg-l2:#35312D;',
      '  --dsw-alias-scrollbar-hover-l1:#413B35;',
      '  --dsw-alias-scrollbar-hover-l2:#524A42;',
      '  --dsw-specific-bubble:#17181A;',
      '  --dsw-specific-bubble-highlight:#221E1C;',
      '  --dsw-specific-input-major:#121315;',
      '  --dsw-specific-login-input:#0E0F10;',
      '  --dsw-specific-sidebar-fill:#1A0F10;',
      '  --dsw-specific-sidebar-nav-item-active:#2A1518;',
      '  --dsw-specific-sidebar-nav-item-active-accent:#F06A22;',
      '  --dsw-specific-selector:#1B1B1C;',
      '  --dsw-specific-tip:#1B1B1C;',
      '  --dsw-specific-menu:#141416F2;',
      '  --dsw-menu-surface-fill:#141416F2;',
      '  --dsw-alias-menu-group-header-fill:#0F1011F0;',
      '  --dsw-alias-toast-bg:#1B1B1C;',
      '  --dsw-alias-tooltip-bg:#1B1B1C;',
      '}',

      /* ---------- UNIT-02 artwork layer (Asuka linework + red hairline) ---------- */
      'html[data-unit02="on"] .u2-art{',
      '  position:fixed;inset:0;z-index:2147482000;pointer-events:none;',
      '  background:url("/unit02-intro/media/pilot/asuka-linework.png") no-repeat right -150px center,',
      '    radial-gradient(62% 46% at 4% 0%,rgba(182,32,38,.20) 0%,rgba(182,32,38,.05) 45%,transparent 72%);',
      '  background-size:auto 104%;opacity:.11;',
      '  -webkit-mask-image:linear-gradient(90deg,transparent 52%,#000 80%,#000);',
      '  mask-image:linear-gradient(90deg,transparent 52%,#000 80%,#000);',
      '}',
      'html[data-unit02="on"] .u2-art::before{',
      '  content:"";position:absolute;top:0;left:0;right:0;height:120px;',
      '  background:linear-gradient(180deg,rgba(182,32,38,.10),transparent);',
      '  opacity:1;',
      '}',
      'html:not([data-unit02="on"]) .u2-art{display:none;}',

      /* ---------- workbench frame: NERV hazard tape, red rails, warning dashes ---------- */
      /* ---------- 2px seam that sits right under the window titlebar ---------- */
      'html[data-unit02="on"] .u2-seam{',
      '  position:fixed;top:0;left:0;right:0;height:2px;z-index:2147482400;pointer-events:none;',
      '  background:linear-gradient(90deg,#B62026 0%,#F06A22 55%,#B62026 100%);',
      '}',
      'html[data-unit02-set="rei"] .u2-seam{background:#3E8FD0;}',
      'html[data-unit02-set="shinji"] .u2-seam{background:linear-gradient(90deg,#6C4E9E 0%,#93DA2E 60%,#6C4E9E 100%);}',
      'html:not([data-unit02="on"]) .u2-seam{display:none;}',
      'html[data-unit02="on"] .u2-frame{',
      '  position:fixed;inset:0;z-index:2147482001;pointer-events:none;',
      '  border-left:4px solid #b62026;border-right:4px solid #b62026;',
      '  background:',
      '    repeating-linear-gradient(135deg,#b62026 0 6px,#0a0b0d 6px 13px) left 2px top 160px/8px calc(100% - 220px) no-repeat,',
      '    repeating-linear-gradient(45deg,#b62026 0 6px,#0a0b0d 6px 13px) right 2px top 160px/8px calc(100% - 220px) no-repeat;',
      '}',
      'html[data-unit02="on"] .u2-frame::before{',
      '  content:"";position:absolute;left:0;right:0;top:0;height:4px;',
      '  background:repeating-linear-gradient(125deg,#e7bc35 0 9px,#0a0b0d 9px 18px);opacity:.65;',
      '}',
      'html[data-unit02="on"] .u2-frame::after{',
      '  content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:#b62026;opacity:.9;',
      '}',
      'html:not([data-unit02="on"]) .u2-frame{display:none;}',

      /* ---------- sidebar: NERV command console ---------- */
      'html[data-unit02="on"] [class*="sidebarCol"]{',
      '  background:linear-gradient(165deg,#7E2A19 0%,#41161A 170px,#101113 350px)!important;',
      '  border-right:1px solid #703035!important;',
      '}',
      'html[data-unit02="on"] [class*="brand"][class*="wide"]{position:relative;}',
      'html[data-unit02="on"] [class*="brand"][class*="wide"] > *{opacity:0!important;}',
      'html[data-unit02="on"] [class*="brand"][class*="wide"]::before{',
      '  content:"";position:absolute;left:4px;top:50%;width:38px;height:38px;',
      '  transform:translateY(-50%);',
      '  background:url("/unit02-intro/media/eva/nerv-mark.svg") no-repeat center/contain;',
      '}',
      'html[data-unit02="on"] [class*="brand"][class*="wide"]::after{',
      '  content:"EVANGELION-02";position:absolute;left:52px;top:50%;transform:translateY(-50%);',
      '  font:700 13px/1 Bahnschrift,"Segoe UI","Microsoft YaHei UI",sans-serif;',
      '  letter-spacing:.10em;color:#E8E2D7;text-shadow:0 0 12px rgba(240,106,34,.35);',
      '  white-space:nowrap;',
      '}',
      'html[data-unit02="on"] [class*="newSession"]{',
      '  background:#B62026!important;border-color:#D8512F!important;color:#FFF4EC!important;',
      '  box-shadow:0 6px 20px rgba(182,32,38,.34);',
      '}',
      'html[data-unit02="on"] [class*="newSession"]:hover{background:#C92730!important;}',

      /* pilot plate above the account row: 02 / ASUKA · EVANGELION-02 */
      'html[data-unit02="on"] [class*="sidebarCol"]{position:relative;}',
      'html[data-unit02="on"] [class*="sidebarCol"]::before{',
      '  content:"02";position:absolute;left:18px;bottom:54px;pointer-events:none;',
      '  font:600 36px/1 Bahnschrift,"Segoe UI",sans-serif;color:#f06a22;',
      '  text-shadow:0 0 18px rgba(240,106,34,.32);',
      '}',
      'html[data-unit02="on"] [class*="sidebarCol"]::after{',
      '  content:"ASUKA / EVANGELION-02";position:absolute;left:74px;bottom:66px;pointer-events:none;',
      '  font:600 11px/1 Bahnschrift,"Segoe UI","Microsoft YaHei UI",sans-serif;',
      '  letter-spacing:.09em;color:#E8E2D7;white-space:nowrap;',
      '}',

      /* ---------- light "白装甲" maintenance variant ---------- */
      'html[data-unit02="on"] body:not([data-ds-dark-theme]){',
      '  --dsw-alias-bg-base:#EAE4D9;',
      '  --dsw-alias-bg-document-preview:#EAE4D9;',
      '  --dsw-alias-bg-document-selection:rgba(182,32,38,.18);',
      '  --dsw-alias-label-document-preview:#5B4F49;',
      '  --dsw-alias-bg-layer-1:#F1ECE2;',
      '  --dsw-alias-bg-layer-2:#F7F3EC;',
      '  --dsw-alias-bg-layer-3:#FFFFFF;',
      '  --dsw-alias-bg-overlay:#FFFFFF;',
      '  --dsw-alias-bg-skeleton:rgba(182,32,38,.08);',
      '  --dsw-alias-border-inverted2:rgba(182,32,38,.16);',
      '  --dsw-alias-border-inverted:rgba(182,32,38,.10);',
      '  --dsw-alias-border-l1:rgba(182,32,38,.14);',
      '  --dsw-alias-border-l2:rgba(182,32,38,.26);',
      '  --dsw-alias-border-l3:rgba(182,32,38,.40);',
      '  --dsw-alias-border-l4:rgba(182,32,38,.56);',
      '  --dsw-alias-brand-primary:#B62026;',
      '  --dsw-alias-brand-text:#FFF7EF;',
      '  --dsw-alias-brand-primary-invert:#1A1416;',
      '  --dsw-alias-button-primary-fill:#B62026;',
      '  --dsw-alias-button-primary-hover:#9C1A1F;',
      '  --dsw-alias-button-primary-dimmed:#E6C3C4;',
      '  --dsw-alias-button-ghost-active-fill:#FFFFFF;',
      '  --dsw-alias-button-ghost-active-hover:#F7F3EC;',
      '  --dsw-alias-button-ghost-active-border:rgba(182,32,38,.45);',
      '  --dsw-alias-label-primary:#1A1416;',
      '  --dsw-alias-label-primary-dimmed:#332527;',
      '  --dsw-alias-label-primary-foreground:#FFFFFF;',
      '  --dsw-alias-label-primary-inverted:#FFFFFF;',
      '  --dsw-alias-label-primary-bluish:#1A1416;',
      '  --dsw-alias-label-secondary:#5B4F49;',
      '  --dsw-alias-label-tertiary:#7C7168;',
      '  --dsw-alias-label-caption:#8E8378;',
      '  --dsw-alias-label-dimmed:#A79C92;',
      '  --dsw-alias-link:#C24A15;',
      '  --dsw-alias-state-business-primary:#D9561B;',
      '  --dsw-alias-state-business-tertiary:#F3D9C9;',
      '  --dsw-alias-state-error-primary:#C0281F;',
      '  --dsw-alias-state-error-secondary:#D8453B;',
      '  --dsw-alias-state-warn-primary:#B8891B;',
      '  --dsw-alias-state-warn-label:#8A6410;',
      '  --dsw-alias-state-success-primary:#2E7D4F;',
      '  --dsw-alias-interactive-bg-hover:rgba(182,32,38,.08);',
      '  --dsw-alias-interactive-bg-active:rgba(182,32,38,.14);',
      '  --dsw-alias-interactive-bg-hover-accent:rgba(182,32,38,.20);',
      '  --dsw-alias-interactive-bg-hover-solid:#FFFFFF;',
      '  --dsw-alias-markdown-inline-code:#E4DCCD;',
      '  --dsw-alias-markdown-code-block:#F3EEE4;',
      '  --dsw-alias-markdown-code-block-banner:#E9E2D4;',
      '  --dsw-alias-menu-icon:#5B4F49;',
      '  --dsw-alias-toast-bg:#1A1416;',
      '  --dsw-alias-toast-label:#F7F3EC;',
      '  --dsw-alias-tooltip-bg:#1A1416;',
      '  --dsw-specific-sidebar-fill:#DFD8CB;',
      '  --dsw-specific-sidebar-nav-item-active:#FFFFFF;',
      '  --dsw-specific-sidebar-nav-item-active-accent:rgba(182,32,38,.55);',
      '  --dsw-specific-bubble:#F4F0E7;',
      '  --dsw-specific-bubble-highlight:#FFFFFF;',
      '  --dsw-specific-input-major:#FBF8F1;',
      '  --dsw-specific-login-input:#FFFFFF;',
      '  --dsw-specific-selector:#FFFFFF;',
      '  --dsw-specific-tip:#FFFFFF;',
      '  --dsw-menu-surface-fill:#FFFFFFF2;',
      '}',

      /* ---------- typography: industrial console ---------- */
      'html[data-unit02="on"] body{',
      '  --dsw-font-family:Bahnschrift,"Segoe UI Variable Text","Segoe UI","Microsoft YaHei UI","Microsoft YaHei",system-ui,sans-serif;',
      '  font-family:var(--dsw-font-family);',
      '  letter-spacing:.005em;',
      '}',
      'html[data-unit02="on"] code,html[data-unit02="on"] pre,html[data-unit02="on"] kbd{',
      '  font-family:"Cascadia Mono",Consolas,"Courier New",monospace;',
      '}',
      /* squared-off, machined corners */
      'html[data-unit02="on"]{',
      '  --dsw-radius-md:2px;',
      '  --dsw-radius-lg:2px;',
      '  --dsw-radius-sm:1px;',
      '  --dsw-radius-xl:3px;',
      '}',

      /* ---------- global scan film + drifting scan band ---------- */
      'html[data-unit02="on"] body::before{',
      '  content:"";position:fixed;inset:0;z-index:2147482000;pointer-events:none;',
      '  background:repeating-linear-gradient(to bottom,rgba(0,0,0,0) 0 2px,rgba(0,0,0,.13) 2px 3px);',
      '  opacity:.42;',
      '}',
      'html[data-unit02="on"] body::after{',
      '  content:"";position:fixed;left:0;right:0;top:0;height:220px;z-index:2147482001;pointer-events:none;',
      '  background:linear-gradient(to bottom,rgba(240,106,34,0) 0%,rgba(240,106,34,.05) 42%,rgba(240,106,34,.10) 50%,rgba(240,106,34,.05) 58%,rgba(240,106,34,0) 100%);',
      '  animation:u2-sweep 8.5s linear infinite;',
      '}',
      '@keyframes u2-sweep{',
      '  0%{transform:translateY(-260px);opacity:0}',
      '  8%{opacity:1}',
      '  92%{opacity:1}',
      '  100%{transform:translateY(100vh);opacity:0}',
      '}',
      '@media (prefers-reduced-motion:reduce){',
      '  html[data-unit02="on"] body::after{animation:none;opacity:0}',
      '}',

      /* ---------- toggle chip in the composer ---------- */
      '.u2-chip{',
      '  display:inline-flex;align-items:center;gap:7px;height:28px;padding:0 10px;margin-right:2px;',
      '  border:1px solid rgba(240,106,34,.42);border-radius:2px;background:rgba(182,32,38,.10);',
      '  color:var(--dsw-alias-label-secondary,#B4A99B);cursor:pointer;user-select:none;',
      '  font-family:Bahnschrift,"Segoe UI",sans-serif;font-size:11px;letter-spacing:.09em;text-transform:uppercase;',
      '  transition:background .15s ease,border-color .15s ease,color .15s ease;',
      '}',
      '.u2-chip:hover{background:rgba(240,106,34,.18);border-color:rgba(240,106,34,.72);color:#E8E2D7}',
      '.u2-chip[data-on="false"]{border-color:rgba(255,255,255,.22);background:transparent;color:var(--dsw-alias-label-tertiary,#8A7F74)}',
      '.u2-chip-dot{width:6px;height:6px;border-radius:50%;background:#F06A22;box-shadow:0 0 6px #F06A22}',
      '.u2-chip[data-on="false"] .u2-chip-dot{background:#6B7480;box-shadow:none}',
      '.u2-chip-txt{white-space:nowrap}',

      /* ---------- boot sequence ---------- */
      '.u2-boot{position:fixed;inset:0;z-index:2147483000;overflow:hidden;',
      '  background-color:#07080A;',
      '  background-image:radial-gradient(120% 90% at 50% 42%,#1C0B0F 0%,#0B0C0F 52%,#040405 100%);',
      '  color:#E8E2D7;font-family:Bahnschrift,"Segoe UI",sans-serif;',
      '  animation:u2-boot-in .16s ease-out both;',
      '}',
      '.u2-boot[data-out="true"]{animation:u2-boot-out .46s ease-in both}',
      '@keyframes u2-boot-in{from{opacity:.74}to{opacity:1}}',
      '@keyframes u2-boot-out{from{opacity:1}to{opacity:0}}',
      '.u2-boot-film{position:absolute;inset:0;pointer-events:none;',
      '  background:repeating-linear-gradient(to bottom,rgba(0,0,0,0) 0 3px,rgba(0,0,0,.28) 3px 4px)}',
      '.u2-boot-band{position:absolute;left:0;right:0;height:280px;pointer-events:none;',
      '  background:linear-gradient(to bottom,rgba(240,106,34,0) 0%,rgba(240,106,34,.10) 45%,rgba(240,106,34,.22) 50%,rgba(240,106,34,.10) 55%,rgba(240,106,34,0) 100%);',
      '  animation:u2-boot-band 2.6s cubic-bezier(.4,0,.6,1) infinite}',
      '@keyframes u2-boot-band{0%{transform:translateY(-300px)}100%{transform:translateY(110vh)}}',
      '.u2-boot-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px}',
      '.u2-panel{position:relative;width:min(680px,100%);padding:26px 30px 22px;',
      '  border:1px solid rgba(240,106,34,.30);background:#0A0C0F;',
      '  box-shadow:0 0 0 1px rgba(182,32,38,.18) inset,0 0 60px rgba(182,32,38,.14)}',
      '.u2-panel::before,.u2-panel::after{content:"";position:absolute;width:14px;height:14px;border:2px solid #F06A22}',
      '.u2-panel::before{left:-2px;top:-2px;border-right:0;border-bottom:0}',
      '.u2-panel::after{right:-2px;bottom:-2px;border-left:0;border-top:0}',
      '.u2-panel-head{display:flex;align-items:baseline;gap:14px;border-bottom:1px solid rgba(240,106,34,.22);padding-bottom:12px}',
      '.u2-eva{font-size:13px;letter-spacing:.32em;color:#F06A22;text-transform:uppercase}',
      '.u2-eva small{display:block;font-size:10px;letter-spacing:.22em;color:#8A7F74;margin-top:5px}',
      '.u2-id{margin-left:auto;font-size:26px;letter-spacing:.14em;font-weight:600;color:#E8E2D7;',
      '  text-shadow:0 0 18px rgba(240,106,34,.55)}',
      '.u2-lines{margin:18px 0 20px;font-family:"Cascadia Mono",Consolas,monospace;font-size:12.5px;line-height:1.95;color:#B4A99B}',
      '.u2-line{opacity:0;animation:u2-line .3s ease-out both}',
      '.u2-line b{color:#F06A22;font-weight:500}',
      '.u2-line i{font-style:normal;color:#5FD08A}',
      '@keyframes u2-line{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:none}}',
      '.u2-bar{position:relative;height:4px;background:rgba(240,106,34,.14);overflow:hidden}',
      '.u2-bar>span{position:absolute;inset:0 auto 0 0;width:0;background:linear-gradient(90deg,#B62026,#F06A22);',
      '  box-shadow:0 0 12px rgba(240,106,34,.75);animation:u2-fill 3.45s cubic-bezier(.25,.8,.35,1) forwards}',
      '@keyframes u2-fill{to{width:100%}}',
      '.u2-panel-foot{display:flex;align-items:center;gap:12px;margin-top:12px;font-family:"Cascadia Mono",Consolas,monospace;font-size:10.5px;letter-spacing:.16em;color:#7A7066}',
      '.u2-skip{margin-left:auto;border:1px solid rgba(232,226,215,.28);background:transparent;color:#B4A99B;',
      '  padding:5px 12px;font-size:10.5px;letter-spacing:.18em;cursor:pointer;border-radius:2px;font-family:inherit}',
      '.u2-skip:hover{border-color:#F06A22;color:#F06A22}',
      '.u2-scan-tag{color:#F06A22}',

      /* ---------- identity sequence stage ---------- */
      '.u2-intro{position:fixed;inset:0;z-index:2147483000;background:#07080A;',
      '  transition:opacity .28s ease;overflow:hidden}',
      '.u2-intro-frame{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#07080A}',

      /* ---------- skin picker ---------- */
      '.u2-chip-caret{font-size:8px;line-height:1;margin-left:1px;opacity:.6;transform:translateY(-1px)}',
      '.u2-menu{position:fixed;z-index:2147482800;min-width:212px;padding:5px;',
      '  background:#0E0F11;border:1px solid #3A2A28;',
      '  box-shadow:0 16px 38px rgba(0,0,0,.66),0 0 0 1px rgba(240,106,34,.06) inset;',
      '  display:flex;flex-direction:column;gap:1px;',
      '  font:500 12px/1.4 Bahnschrift,"Segoe UI","Microsoft YaHei UI",sans-serif;color:#E8E2D7;',
      '  animation:u2-menu-in .12s ease-out both}',
      '@keyframes u2-menu-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}',
      '.u2-menu-item{all:unset;display:flex;align-items:baseline;justify-content:space-between;',
      '  gap:14px;padding:7px 9px 7px 11px;cursor:pointer;',
      '  border-left:2px solid transparent;transition:background .12s ease,border-color .12s ease}',
      '.u2-menu-item:hover{background:#1B1416;border-left-color:#F06A22}',
      '.u2-menu-item[data-active="true"]{background:#241012;border-left-color:#B62026}',
      '.u2-menu-lab{font-size:12px;letter-spacing:.05em}',
      '.u2-menu-sub{font-size:10px;color:#8B8078;white-space:nowrap}',
      '.u2-menu-item[data-active="true"] .u2-menu-sub{color:#C08A6A}',
      '.u2-menu-sep{height:1px;margin:4px 7px;background:rgba(240,106,34,.22)}',
      '.u2-menu-item[data-kind="update"] .u2-menu-lab{color:#FF8A5B}',
      '.u2-menu-item[data-kind="update"]:hover{background:#2A1410}',
      'html[data-unit02-update="1"] .u2-chip-dot{background:#FF3B30;box-shadow:0 0 8px rgba(255,59,48,.85);animation:u2-upd 1.7s ease-in-out infinite}',
      '@keyframes u2-upd{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.45);opacity:.72}}',

      /* ---------- REI skin: white / blue (EVANGELION-00) ---------- */
      'html[data-unit02-set="rei"] body,',
      'html[data-unit02-set="rei"] body[data-ds-dark-theme]{',
      '  --dsw-alias-bg-base:#F6FBFE;',
      '  --dsw-alias-bg-layer-1:#EDF5FB;',
      '  --dsw-alias-bg-layer-2:#FFFFFF;',
      '  --dsw-alias-bg-layer-3:#E6F1FA;',
      '  --dsw-alias-bg-overlay:#FFFFFF;',
      '  --dsw-alias-bg-module-platform:#EDF5FB;',
      '  --dsw-alias-bg-multi-select:#EDF5FB;',
      '  --dsw-alias-border-l1:#D3E6F2;',
      '  --dsw-alias-border-l2:#C0DAEB;',
      '  --dsw-alias-border-l3:#9CC6DF;',
      '  --dsw-alias-border-l4:#7FAFD0;',
      '  --dsw-alias-label-primary:#1E4A63;',
      '  --dsw-alias-label-secondary:#4C7A93;',
      '  --dsw-alias-label-tertiary:#6E94A8;',
      '  --dsw-alias-brand-primary:#347FC3;',
      '  --dsw-alias-button-primary-fill:#347FC3;',
      '  --dsw-alias-button-primary-hover:#226CAE;',
      '  --dsw-alias-button-info-fill:#3D8FD0;',
      '  --dsw-alias-input-bg:#FFFFFF;',
      '  --dsw-alias-input-border:#BBD9EC;',
      '  --dsw-alias-link:#2A7FA9;',
      '  --dsw-alias-state-business-primary:#2A7FA9;',
      '  --dsw-specific-sidebar-fill:#E8F3FC;',
      '  --dsw-specific-bubble:#F2F9FF;',
      '  --dsw-specific-input-major:#FFFFFF;',
      '  --dsw-alias-button-tool-bar-fill:#E4F0F9;',
      '  --dsw-alias-button-tool-bar-hover:#D5E9F7;',
      '  --dsw-alias-button-ghost-active-fill:#DCEEFB;',
      '  --dsw-alias-button-ghost-active-hover:#CDE6F9;',
      '  --dsw-alias-interactive-bg-hover:#E9F4FC;',
      '  --dsw-alias-hover:#E4F2FB;',
      '  --dsw-alias-hover-solid:#DCEEFB;',
      '  --dsw-alias-label-dimmed:#8FAEBF;',
      '  --dsw-alias-scrollbar-thumb:#BBD9EC;',
      '  --dsw-alias-scrollbar-thumb-hover:#9CC6DF;',
      '  --dsw-alias-button-contrast-fill:#347FC3;',
      '  --dsw-alias-button-contrast-text:#FFFFFF;',
      '  --dsw-alias-illustration-background:#EDF5FB;',
      '  --dsw-alias-illustration-backing:#E6F1FA;',
      '  --dsw-alias-illustration-detail:#7FAFD0;',
      /* 代码：白底主题下把芯片改成浅蓝，正文用的 #1E4A63 就压得住；
         不改成浅底的话，深色芯片 + 深色字 = 看不清 */
      '  --dsw-alias-markdown-inline-code:#D8EAF8;',
      '  --dsw-alias-markdown-code-block:#EAF4FC;',
      '  --dsw-alias-markdown-code-block-banner:#D6E8F7;',
      '  --dsw-alias-markdown-code-segment-selected:#CBE4F6;',
      '  --dsw-alias-markdown-code-segment-unselected:#E2F0FA;',
      '  --dsw-alias-markdown-citation:#E2F0FA;',
      '  --dsw-alias-markdown-tag:#D8EAF8;',
      '  --dsw-alias-markdown-placeholder:#E2F0FA;',
      '}',
      'html[data-unit02-set="rei"] .u2-art{display:none;}',
      /* 行内代码兜底：不管 renderer 用哪个变量取字色，白底主题下都强制成深蓝字 + 浅蓝底 */
      'html[data-unit02-set="rei"] :not(pre) > code{',
      '  background:#D8EAF8!important;color:#123D54!important;',
      '  border:1px solid #C3DEF3!important;',
      '}',
      'html[data-unit02-set="rei"] .u2-art.u2-art-rei{',
      '  display:block;opacity:0;transition:opacity .6s ease;',
      '}',
      'html[data-unit02-set="rei"] .u2-art.u2-art-rei.u2-art-on{',
      '  opacity:.17;mix-blend-mode:multiply;',
      '  background:url("/rei-intro/media/public/rei-lineart.png") no-repeat right -120px center;',
      '  background-size:auto 110%;',
      '  -webkit-mask-image:linear-gradient(90deg,transparent 42%,#000 76%,#000);',
      '  mask-image:linear-gradient(90deg,transparent 42%,#000 76%,#000);',
      '}',
      'html[data-unit02-set="rei"] .u2-art.u2-art-rei::before{',
      '  background:linear-gradient(90deg,#5AA7CA,#8CC6EA 45%,#3E86B5);',
      '}',
      /* 零号机：不要满屏静态横纹，只要那条往下扫的灯带（与二号机同一条，换成蓝色） */
      'html[data-unit02-set="rei"] body::before{display:none;}',
      'html[data-unit02-set="rei"] body::after{',
      '  display:block;',
      '  background:linear-gradient(to bottom,rgba(56,140,200,0) 0%,rgba(56,140,200,.06) 38%,rgba(56,140,200,.17) 50%,rgba(56,140,200,.06) 62%,rgba(56,140,200,0) 100%);',
      '}',
      'html[data-unit02-set="rei"] button[class*="_add"]{',
      '  background:#DCEBF7!important;color:#1E4A63!important;border:1px solid #C0DAEB!important;',
      '}',
      'html[data-unit02-set="rei"] button[class*="_add"]:hover{background:#CDE4F4!important;}',
      'html[data-unit02-set="rei"] .u2-frame{',
      '  border-left-color:#7FBCE6;border-right-color:#7FBCE6;',
      '  background:',
      '    repeating-linear-gradient(135deg,#8CC6EA 0 6px,#F2FAFF 6px 13px) left 2px top 160px/8px calc(100% - 220px) no-repeat,',
      '    repeating-linear-gradient(45deg,#8CC6EA 0 6px,#F2FAFF 6px 13px) right 2px top 160px/8px calc(100% - 220px) no-repeat;',
      '}',
      'html[data-unit02-set="rei"] .u2-frame::before{',
      '  background:repeating-linear-gradient(125deg,#BBDCF2 0 9px,#F6FBFF 9px 18px);opacity:.9;',
      '}',
      'html[data-unit02-set="rei"] .u2-frame::after{background:#5AA7CA;}',
      'html[data-unit02-set="rei"] [class*="sidebarCol"]{',
      '  background:linear-gradient(165deg,#BFE0F7 0%,#DCEFFB 170px,#F0F8FD 350px)!important;',
      '  border-right:1px solid #87B9DF!important;',
      '}',
      'html[data-unit02-set="rei"] [class*="brand"][class*="wide"]::before{',
      '  background-image:url("/rei-intro/media/public/nerv-00.svg")!important;filter:none!important;background-size:34px 34px!important;',
      '}',
      'html[data-unit02-set="rei"] [class*="brand"][class*="wide"]::after{',
      '  content:"EVANGELION-00";color:#2365A1;',
      '}',
      'html[data-unit02-set="rei"] [class*="sidebarCol"]::before{',
      '  content:"00";color:#3488B3;text-shadow:none;',
      '}',
      'html[data-unit02-set="rei"] [class*="sidebarCol"]::after{',
      '  content:"REI / EVANGELION-00";color:#2C6A94;',
      '}',
      'html[data-unit02-set="rei"] [class*="newSession"]{',
      '  background:#347FC3!important;box-shadow:0 6px 20px rgba(52,127,195,.32)!important;',
      '}',
      'html[data-unit02-set="rei"] .u2-chip{border-color:#7FB6D8;color:#2365A1;}',
      'html[data-unit02-set="rei"] .u2-intro{background:#F8FCFF}',
      'html[data-unit02-set="rei"] .u2-intro-frame{background:#F8FCFF}',
      'html[data-unit02-set="rei"] .u2-menu{background:#FBFDFF;border-color:#BBD9EC;color:#1E4A63;}',
      'html[data-unit02-set="rei"] .u2-menu-item:hover{background:#EAF5FD;border-left-color:#3D8FD0;}',
      'html[data-unit02-set="rei"] .u2-menu-item[data-active="true"]{background:#DCEEFB;border-left-color:#347FC3;}',
      /* ---------- SHINJI / UNIT-01 skin: violet + acid green ---------- */
      'html[data-unit02-set="shinji"] body,',
      'html[data-unit02-set="shinji"] body[data-ds-dark-theme]{',
      '  --dsw-alias-bg-base:#0B0A10;',
      '  --dsw-alias-bg-layer-1:#141020;',
      '  --dsw-alias-bg-layer-2:#1A1526;',
      '  --dsw-alias-bg-layer-3:#221B33;',
      '  --dsw-alias-bg-overlay:#221B33;',
      '  --dsw-alias-bg-module-platform:#1A1526;',
      '  --dsw-alias-bg-multi-select:#221B33;',
      '  --dsw-alias-border-l1:#2E2642;',
      '  --dsw-alias-border-l2:#3D3355;',
      '  --dsw-alias-border-l3:#5A4A7E;',
      '  --dsw-alias-border-l4:#7A66A8;',
      '  --dsw-alias-label-primary:#EDE7F3;',
      '  --dsw-alias-label-secondary:#B4A8C8;',
      '  --dsw-alias-label-tertiary:#8E82A8;',
      '  --dsw-alias-label-dimmed:#6A5F82;',
      '  --dsw-alias-brand-primary:#6C4E9E;',
      '  --dsw-alias-button-primary-fill:#6C4E9E;',
      '  --dsw-alias-button-primary-hover:#7E5DB3;',
      '  --dsw-alias-button-info-fill:#93DA2E;',
      '  --dsw-alias-link:#93DA2E;',
      '  --dsw-alias-state-business-primary:#93DA2E;',
      '  --dsw-alias-input-bg:#141020;',
      '  --dsw-alias-input-border:#3D3355;',
      '  --dsw-specific-sidebar-fill:#170F26;',
      '  --dsw-specific-bubble:#1A1526;',
      '  --dsw-specific-input-major:#141020;',
      '  --dsw-alias-button-tool-bar-fill:#2A2140AA;',
      '  --dsw-alias-button-tool-bar-hover:#372B52CC;',
      '  --dsw-alias-button-ghost-active-fill:#2A1F40;',
      '  --dsw-alias-button-ghost-active-hover:#352748;',
      '  --dsw-alias-interactive-bg-hover:#241B38;',
      '  --dsw-alias-hover:#201830;',
      '  --dsw-alias-hover-solid:#241B38;',
      '  --dsw-alias-scrollbar-thumb:#3D3355;',
      '  --dsw-alias-menu-surface-fill:#171122F2;',
      '  --dsw-alias-menu-group-header-fill:#100C1AF0;',
      '  --dsw-specific-sidebar-nav-item-active:#2A1F40;',
      '  --dsw-specific-sidebar-nav-item-active-accent:#93DA2E;',
      '}',
      /* 侧栏：紫黑渐变 + 紫色分隔 */
      'html[data-unit02-set="shinji"] [class*="sidebarCol"]{',
      '  background:linear-gradient(165deg,#3A2255 0%,#241536 165px,#0F0B17 350px)!important;',
      '  border-right:1px solid #453364!important;',
      '}',
      /* 品牌位：紫 NERV 叶标 + EVANGELION-01 */
      'html[data-unit02-set="shinji"] [class*="brand"][class*="wide"] > *{opacity:0!important;}',
      'html[data-unit02-set="shinji"] [class*="brand"][class*="wide"]::before{',
      '  content:"";position:absolute;left:6px;top:50%;transform:translateY(-50%);',
      '  width:34px;height:34px;background:url("/shinji-intro/media/eva/nerv-mark-01.svg") center/contain no-repeat;',
      '}',
      'html[data-unit02-set="shinji"] [class*="brand"][class*="wide"]::after{',
      '  content:"EVANGELION-01";position:absolute;left:52px;top:50%;transform:translateY(-50%);',
      '  font:700 13px/1 Bahnschrift,"Segoe UI",sans-serif;letter-spacing:.10em;color:#EDE7F3;white-space:nowrap;',
      '}',
      /* 新会话按钮：紫底绿边 */
      'html[data-unit02-set="shinji"] [class*="newSession"]{',
      '  background:#6C4E9E!important;',
      '  box-shadow:0 6px 20px rgba(108,78,158,.40)!important;',
      '}',
      'html[data-unit02-set="shinji"] [class*="newSession"]:hover{background:#7E5DB3!important;}',
      /* 侧栏底部 01 座舱牌 */
      'html[data-unit02-set="shinji"] [class*="sidebarCol"]{position:relative;}',
      'html[data-unit02-set="shinji"] [class*="sidebarCol"]::before{',
      '  content:"01";position:absolute;left:18px;bottom:54px;font:600 36px/1 Bahnschrift,sans-serif;',
      '  color:#93DA2E;text-shadow:0 0 16px rgba(147,218,46,.45);pointer-events:none;',
      '}',
      'html[data-unit02-set="shinji"] [class*="sidebarCol"]::after{',
      '  content:"SHINJI / EVANGELION-01";position:absolute;left:74px;bottom:66px;',
      '  font:600 11px/1 Bahnschrift,sans-serif;letter-spacing:.09em;color:#EDE7F3;white-space:nowrap;pointer-events:none;',
      '}',
      /* 边框花纹：紫导轨 + 紫黑斜纹 + 黄绿警示带 */
      'html[data-unit02-set="shinji"] .u2-frame{',
      '  border-left-color:#6C4E9E;border-right-color:#6C4E9E;',
      '  background:',
      '    repeating-linear-gradient(135deg,#6C4E9E 0 6px,#0B0A10 6px 13px) left 2px top 160px/8px calc(100% - 220px) no-repeat,',
      '    repeating-linear-gradient(45deg,#6C4E9E 0 6px,#0B0A10 6px 13px) right 2px top 160px/8px calc(100% - 220px) no-repeat;',
      '}',
      'html[data-unit02-set="shinji"] .u2-frame::before{',
      '  background:repeating-linear-gradient(125deg,#BCE455 0 9px,#0B0A10 9px 18px);opacity:.6;',
      '}',
      'html[data-unit02-set="shinji"] .u2-frame::after{background:linear-gradient(90deg,#6C4E9E,#93DA2E);opacity:.85;}',
      /* 灯带：绿色 */
      'html[data-unit02-set="shinji"] body::after{',
      '  background:linear-gradient(to bottom,rgba(147,218,46,0) 0%,rgba(147,218,46,.05) 42%,rgba(147,218,46,.11) 50%,rgba(147,218,46,.05) 58%,rgba(147,218,46,0) 100%);',
      '}',
      'html[data-unit02-set="shinji"] .u2-intro{background:#0B0A10;}',
      /* 初号机还没有自己的线稿，别继承二号机那张 */
      'html[data-unit02-set="shinji"] .u2-art{display:block!important;',
      '  background:url("/shinji-intro/media/pilot/shinji-lineart.png") no-repeat right -30px center!important;',
      '  background-size:auto 104%!important;opacity:.34!important;',
      '  -webkit-mask-image:linear-gradient(90deg,transparent 42%,#000 74%,#000)!important;',
      '  mask-image:linear-gradient(90deg,transparent 42%,#000 74%,#000)!important;}',      'html[data-unit02-set="shinji"] .u2-menu{background:#151021F2;border-color:#3D3355;color:#EDE7F3;}',
      'html[data-unit02-set="shinji"] .u2-menu-item:hover{background:#221A36;border-left-color:#93DA2E;}',
      'html[data-unit02-set="shinji"] .u2-menu-item[data-active="true"]{background:#2A1F40;border-left-color:#93DA2E;}',
      'html[data-unit02-set="shinji"] .u2-menu-sub{color:#9A8FB4;}',
      'html[data-unit02-set="shinji"] .u2-intro-frame{background:#0B0A10;}',
      /* ---------- MARI / UNIT-08 skin: dark plum + hot pink + green ---------- */
      'html[data-unit02-set="mari"] body,',
      'html[data-unit02-set="mari"] body[data-ds-dark-theme]{',
      '  --dsw-alias-bg-base:#120A10;',
      '  --dsw-alias-bg-layer-1:#1B0F1B;',
      '  --dsw-alias-bg-layer-2:#241428;',
      '  --dsw-alias-bg-layer-3:#2E1B33;',
      '  --dsw-alias-bg-overlay:#2E1B33;',
      '  --dsw-alias-bg-module-platform:#241428;',
      '  --dsw-alias-bg-multi-select:#2E1B33;',
      '  --dsw-alias-border-l1:#3B2144;',
      '  --dsw-alias-border-l2:#57345F;',
      '  --dsw-alias-border-l3:#7A4A86;',
      '  --dsw-alias-border-l4:#9A6BA6;',
      '  --dsw-alias-label-primary:#FBEFF6;',
      '  --dsw-alias-label-secondary:#CBA9C4;',
      '  --dsw-alias-label-tertiary:#A9879F;',
      '  --dsw-alias-label-dimmed:#7E5E78;',
      '  --dsw-alias-brand-primary:#F0629E;',
      '  --dsw-alias-button-primary-fill:#F0629E;',
      '  --dsw-alias-button-primary-hover:#FF86BE;',
      '  --dsw-alias-button-info-fill:#5FE08F;',
      '  --dsw-alias-link:#5FE08F;',
      '  --dsw-alias-state-business-primary:#5FE08F;',
      '  --dsw-alias-input-bg:#1B0F1B;',
      '  --dsw-alias-input-border:#57345F;',
      '  --dsw-specific-sidebar-fill:#1B0C18;',
      '  --dsw-specific-bubble:#241428;',
      '  --dsw-specific-input-major:#1B0F1B;',
      '  --dsw-alias-button-tool-bar-fill:#3A213CAA;',
      '  --dsw-alias-button-tool-bar-hover:#4A2A4CCC;',
      '  --dsw-alias-button-ghost-active-fill:#3A1230;',
      '  --dsw-alias-button-ghost-active-hover:#4A1840;',
      '  --dsw-alias-interactive-bg-hover:#301A2E;',
      '  --dsw-alias-hover:#2A1628;',
      '  --dsw-alias-hover-solid:#301A2E;',
      '  --dsw-alias-scrollbar-thumb:#57345F;',
      '  --dsw-alias-menu-surface-fill:#1B1020F2;',
      '  --dsw-alias-menu-group-header-fill:#150B17F0;',
      '  --dsw-specific-sidebar-nav-item-active:#3A1230;',
      '  --dsw-specific-sidebar-nav-item-active-accent:#F0629E;',
      '}',
      'html[data-unit02-set="mari"] [class*="sidebarCol"]{',
      '  background:linear-gradient(165deg,#5E1D44 0%,#33132C 165px,#120A10 350px)!important;',
      '  border-right:1px solid #6B3050!important;position:relative;',
      '}',
      'html[data-unit02-set="mari"] [class*="brand"][class*="wide"] > *{opacity:0!important;}',
      'html[data-unit02-set="mari"] [class*="brand"][class*="wide"]::before{',
      '  content:"";position:absolute;left:6px;top:50%;transform:translateY(-50%);',
      '  width:34px;height:34px;background:url("/mari-intro/media/eva/nerv-mark-08.svg") center/contain no-repeat;',
      '}',
      'html[data-unit02-set="mari"] [class*="brand"][class*="wide"]::after{',
      '  content:"EVANGELION-08";position:absolute;left:52px;top:50%;transform:translateY(-50%);',
      '  font:700 13px/1 Bahnschrift,"Segoe UI",sans-serif;letter-spacing:.10em;color:#FBD3E6;white-space:nowrap;',
      '}',
      'html[data-unit02-set="mari"] [class*="newSession"]{',
      '  background:#E24A8C!important;box-shadow:0 6px 20px rgba(226,74,140,.40)!important;',
      '}',
      'html[data-unit02-set="mari"] [class*="newSession"]:hover{background:#F0629E!important;}',
      'html[data-unit02-set="mari"] [class*="sidebarCol"]::before{',
      '  content:"08";position:absolute;left:18px;bottom:54px;font:600 36px/1 Bahnschrift,sans-serif;',
      '  color:#5FE08F;text-shadow:0 0 16px rgba(95,224,143,.45);pointer-events:none;',
      '}',
      'html[data-unit02-set="mari"] [class*="sidebarCol"]::after{',
      '  content:"MARI / EVANGELION-08";position:absolute;left:74px;bottom:66px;',
      '  font:600 11px/1 Bahnschrift,sans-serif;letter-spacing:.09em;color:#FBEFF6;white-space:nowrap;pointer-events:none;',
      '}',
      'html[data-unit02-set="mari"] .u2-frame{',
      '  border-left-color:#F0629E;border-right-color:#F0629E;',
      '  background:repeating-linear-gradient(135deg,#F0629E 0 6px,#120A10 6px 13px) left 2px top 160px/8px calc(100% - 220px) no-repeat,repeating-linear-gradient(45deg,#F0629E 0 6px,#120A10 6px 13px) right 2px top 160px/8px calc(100% - 220px) no-repeat;',
      '}',
      'html[data-unit02-set="mari"] .u2-frame::before{background:repeating-linear-gradient(125deg,#6FE39B 0 9px,#120A10 9px 18px);opacity:.65;}',
      'html[data-unit02-set="mari"] .u2-frame::after{background:linear-gradient(90deg,#F0629E,#6FE39B);opacity:.85;}',
      'html[data-unit02-set="mari"] .u2-seam{background:linear-gradient(90deg,#F0629E 0%,#5FE08F 60%,#F0629E 100%);}',
      'html[data-unit02-set="mari"] body::before{display:none!important;}',
      'html[data-unit02-set="mari"] body::after{',
      '  background:linear-gradient(to bottom,rgba(240,98,158,0) 0%,rgba(240,98,158,.05) 42%,rgba(240,98,158,.11) 50%,rgba(240,98,158,.05) 58%,rgba(240,98,158,0) 100%);',
      '}',
      'html[data-unit02-set="mari"] .u2-art{display:block!important;',       '  background:url("/mari-intro/media/pilot/mari-lineart.png") no-repeat right -160px center!important;',       '  background-size:auto 106%!important;opacity:.18!important;',       '  -webkit-mask-image:linear-gradient(90deg,transparent 44%,#000 76%,#000)!important;',       '  mask-image:linear-gradient(90deg,transparent 44%,#000 76%,#000)!important;',       '}',       'html[data-unit02-set="mari"] .u2-art::before{',       '  background:radial-gradient(60% 32% at 50% 0%,rgba(240,98,158,.20) 0%,rgba(240,98,158,0) 70%)!important;',       '}',
      'html[data-unit02-set="mari"] .u2-intro{background:#120A10;}',
      'html[data-unit02-set="mari"] .u2-intro-frame{background:#120A10;}',
      'html[data-unit02-set="mari"] .u2-menu{background:#1B1020F2;border-color:#57345F;color:#FBEFF6;}',
      'html[data-unit02-set="mari"] .u2-menu-item:hover{background:#2A1628;border-left-color:#5FE08F;}',
      'html[data-unit02-set="mari"] .u2-menu-item[data-active="true"]{background:#3A1230;border-left-color:#F0629E;}',
      'html[data-unit02-set="mari"] .u2-menu-sub{color:#CBA9C4;},'    ].join("\n");

    /* ============================================================
     * 2. state helpers
     * ============================================================ */

    /* 皮肤 id 白名单：新增号机时这里、SKINS、INTRO_SRC、CSS 块、lib MOUNTS 五处一起加 */
    var SKIN_IDS = ["off", "asuka", "rei", "shinji", "mari"];

    function readSkin() {
      try {
        var s = localStorage.getItem(STORAGE_SET);
        if (s && SKIN_IDS.indexOf(s) >= 0) return s;
        return localStorage.getItem(STORAGE_KEY) === "off" ? "off" : "asuka";
      } catch (e) {
        return "asuka";
      }
    }

    function readEnabled() {
      return readSkin() !== "off";
    }

    function applyAttr(skin) {
      var root = document.documentElement;
      if (!root) return;
      if (skin === "off") {
        root.removeAttribute("data-unit02");
        root.removeAttribute("data-unit02-set");
      } else {
        root.setAttribute("data-unit02", "on");
        root.setAttribute("data-unit02-set", skin);
      }
    }

    function setSkin(skin) {
      try {
        localStorage.setItem(STORAGE_SET, skin);
        localStorage.setItem(STORAGE_KEY, skin === "off" ? "off" : "on");
      } catch (e) {
        /* ignore */
      }
      applyAttr(skin);
      /* 皮肤变了就收起正在播的开机序列（它属于上一套皮肤），由调用方决定是否 replayBoot */
      closeIntro(false);
      window.dispatchEvent(
        new CustomEvent("unit02:change", {
          detail: { enabled: skin !== "off", skin: skin }
        })
      );
    }

    function setEnabled(on) {
      setSkin(on ? (readSkin() === "off" ? "asuka" : readSkin()) : "off");
    }

    function useSkin() {
      var s = React.useState(readSkin());
      var skin = s[0];
      var set = s[1];
      React.useEffect(function () {
        function on(e) {
          set((e && e.detail && e.detail.skin) || readSkin());
        }
        window.addEventListener("unit02:change", on);
        return function () {
          window.removeEventListener("unit02:change", on);
        };
      }, []);
      return skin;
    }

    /* ============================================================
     * 3. composer chip
     * ============================================================ */

    var SKINS = [
      { id: "off", label: "默认主题", sub: "DeepSeek Harness" },
      { id: "asuka", label: "ASUKA · UNIT-02", sub: "二号机 · 红橙" },
      { id: "rei", label: "REI · UNIT-00", sub: "零号机 · 白蓝" },
      { id: "shinji", label: "SHINJI · UNIT-01", sub: "初号机 · 紫绿" },
      { id: "mari", label: "MARI · UNIT-08", sub: "八号机 · 品红" }
    ];

    var skinMenu = null;

    function closeSkinMenu() {
      if (skinMenu) {
        skinMenu.remove();
        skinMenu = null;
      }
      document.removeEventListener("mousedown", onMenuDocDown, true);
    }

    function onMenuDocDown(e) {
      if (skinMenu && !skinMenu.contains(e.target)) closeSkinMenu();
    }

    /* ---------- update badge: installed version vs npm latest ---------- */

    var UPD_KEY = "unit02-update";
    var UPD_TTL = 6 * 60 * 60 * 1000;
    var updateInfo = null;

    function cmpVer(a, b) {
      var pa = String(a || "0").split(".");
      var pb = String(b || "0").split(".");
      for (var i = 0; i < 3; i++) {
        var na = parseInt(pa[i], 10) || 0;
        var nb = parseInt(pb[i], 10) || 0;
        if (na !== nb) return na > nb ? 1 : -1;
      }
      return 0;
    }

    function selfVersion() {
      if (updateInfo && updateInfo.self) return Promise.resolve(updateInfo.self);
      return fetch("/eva-skins-version", { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { return (j && j.version) || "0.0.0"; })
        .catch(function () { return "0.0.0"; });
    }

    function paintUpdateDot(info) {
      try {
        document.documentElement.setAttribute(
          "data-unit02-update",
          info && info.hasUpdate ? "1" : "0"
        );
      } catch (e) {
        /* ignore */
      }
    }

    function checkUpdate(force) {
      try {
        if (!force) {
          var cached = JSON.parse(localStorage.getItem(UPD_KEY) || "null");
          if (cached && cached.at && Date.now() - cached.at < UPD_TTL) {
            updateInfo = cached;
            paintUpdateDot(cached);
            return Promise.resolve(cached);
          }
        }
      } catch (e) {
        /* ignore */
      }
      return selfVersion().then(function (self) {
        return fetch("https://registry.npmjs.org/dsh-eva-skins/latest", {
          cache: "no-store",
          headers: { accept: "application/json" }
        })
          .then(function (r) {
            if (!r.ok) throw new Error("http " + r.status);
            return r.json();
          })
          .then(function (j) {
            var latest = String((j && j.version) || "");
            var info = {
              self: self,
              latest: latest,
              hasUpdate: !!latest && cmpVer(latest, self) > 0,
              at: Date.now()
            };
            updateInfo = info;
            try {
              localStorage.setItem(UPD_KEY, JSON.stringify(info));
            } catch (e) {
              /* ignore */
            }
            paintUpdateDot(info);
            return info;
          });
      }).catch(function (err) {
        var info = {
          self: (updateInfo && updateInfo.self) || "",
          latest: "",
          hasUpdate: false,
          at: Date.now(),
          err: String((err && err.message) || err)
        };
        updateInfo = info;
        paintUpdateDot(info);
        return info;
      });
    }

    function copyText(s) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(s);
      }
      return Promise.reject(new Error("no clipboard"));
    }

    function openSkinMenu(anchor) {
      closeSkinMenu();
      checkUpdate(false);
      var menu = document.createElement("div");
      menu.className = "u2-menu";
      menu.setAttribute("role", "menu");
      var cur = readSkin();
      SKINS.forEach(function (s) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "u2-menu-item";
        b.setAttribute("role", "menuitem");
        b.setAttribute("data-active", s.id === cur ? "true" : "false");
        var lab = document.createElement("span");
        lab.className = "u2-menu-lab";
        lab.textContent = s.label;
        var sub = document.createElement("span");
        sub.className = "u2-menu-sub";
        sub.textContent = s.sub;
        b.append(lab, sub);
        b.addEventListener("click", function () {
          setSkin(s.id);
          closeSkinMenu();
        });
        menu.appendChild(b);
      });
      if (updateInfo && updateInfo.hasUpdate) {
        var sep = document.createElement("div");
        sep.className = "u2-menu-sep";
        menu.appendChild(sep);
        var row = document.createElement("button");
        row.type = "button";
        row.className = "u2-menu-item";
        row.setAttribute("role", "menuitem");
        row.setAttribute("data-kind", "update");
        var rl = document.createElement("span");
        rl.className = "u2-menu-lab";
        rl.textContent = "新版本 " + updateInfo.latest;
        var rs = document.createElement("span");
        rs.className = "u2-menu-sub";
        rs.textContent = "复制更新命令";
        row.append(rl, rs);
        var cmd = "dsh plugin --profile desktop add dsh-eva-skins@" + updateInfo.latest;
        row.addEventListener("click", function () {
          copyText(cmd).then(function () {
            rs.textContent = "已复制 ✓";
          }).catch(function () {
            rs.textContent = "";
            rl.textContent = cmd;
          });
        });
        menu.appendChild(row);
      }
      document.body.appendChild(menu);
      var r = anchor.getBoundingClientRect();
      var mw = menu.offsetWidth || 220;
      var mh = menu.offsetHeight || 92;
      var left = Math.min(Math.max(8, r.left), (window.innerWidth || 1200) - mw - 8);
      var top = r.top - mh - 10;
      if (top < 8) top = r.bottom + 10;
      menu.style.left = left + "px";
      menu.style.top = top + "px";
      skinMenu = menu;
      setTimeout(function () {
        document.addEventListener("mousedown", onMenuDocDown, true);
      }, 0);
    }

    function SkinChip() {
      var skin = useSkin();
      var on = skin !== "off";
      var label = skin === "asuka" ? "UNIT-02" : skin === "rei" ? "REI" : skin === "shinji" ? "UNIT-01" : skin === "mari" ? "UNIT-08" : "默认";
      return h(
        "button",
        {
          type: "button",
          className: "u2-chip",
          "data-on": on ? "true" : "false",
          title: "皮肤 / 主题 — 点击选择",
          onClick: function (e) {
            if (skinMenu) {
              closeSkinMenu();
              return;
            }
            openSkinMenu(e.currentTarget);
          }
        },
        h("span", { className: "u2-chip-dot" }),
        h("span", { className: "u2-chip-txt" }, label),
        h("span", { className: "u2-chip-caret" }, "\u25BE")
      );
    }

    /* ============================================================
     * 4. identity intro — the real UNIT-02 sequence from the source workbench
     * ============================================================ */

    var INTRO_SRC = {
      asuka: "/unit02-intro/intro.html?embed=1&autostart=interactive",
      rei: "/rei-intro/intro.html?embed=1&autostart=interactive",
      shinji: "/shinji-intro/intro.html?embed=1&autostart=interactive",
      mari: "/mari-intro/intro.html?embed=1&autostart=interactive"
    };
    var INTRO_CSS =
      "#replay,#readout,#audioStatus,#identitySound{display:none!important}" +
      "#playback{display:flex!important;justify-content:flex-end;left:auto!important;right:26px!important;bottom:46px!important;background:none!important;border:0!important;padding:0!important}" +
      "#skipTransition{display:inline-flex!important;align-items:center;gap:6px;margin-left:0!important;opacity:.66;transition:opacity .18s ease}" +
      "#skipTransition:hover{opacity:1}";

    var intro = null;

    function bootDue() {
      try {
        var at = Number(sessionStorage.getItem(BOOT_KEY) || 0);
        return !(at && Date.now() - at < BOOT_REPLAY_AFTER);
      } catch (e) {
        return true;
      }
    }

    function markBootShown() {
      try {
        sessionStorage.setItem(BOOT_KEY, String(Date.now()));
      } catch (e) {
        /* ignore */
      }
    }

    function solidBitmap(color) {
      var canvas = document.createElement("canvas");
      canvas.width = 960;
      canvas.height = 540;
      var pen = canvas.getContext("2d");
      pen.fillStyle = color || "#0A0B0D";
      pen.fillRect(0, 0, canvas.width, canvas.height);
      return createImageBitmap(canvas).catch(function () {
        return null;
      });
    }

    function loadSnapshotLib() {
      if (window.htmlToImage) return Promise.resolve(window.htmlToImage);
      return new Promise(function (resolve) {
        var script = document.createElement("script");
        script.src = "/unit02-intro/vendor/html-to-image.js";
        script.onload = function () {
          resolve(window.htmlToImage || null);
        };
        script.onerror = function () {
          resolve(null);
        };
        document.head.append(script);
      });
    }

    /* the sequence hands off to a real workbench frame, so give it one */
    function captureWorkbench() {
      var background = "#0A0B0D";
      try {
        var painted = getComputedStyle(document.body).backgroundColor;
        if (painted && painted !== "rgba(0, 0, 0, 0)" && painted !== "transparent") {
          background = painted;
        }
      } catch (e) {
        /* ignore */
      }
      /* cloning the whole document is expensive; skip it on heavy pages so the
         first frame of the sequence can never block the app */
      var skip = false;
      try {
        var nodes = document.querySelectorAll("*").length;
        skip =
          document.body.scrollHeight > window.innerHeight * 2.5 ||
          nodes > 3500 ||
          localStorage.getItem("unit02-snapshot") === "0";
      } catch (e) {
        skip = true;
      }
      if (skip) return solidBitmap(background);

      return loadSnapshotLib().then(function (lib) {
        if (!lib || typeof lib.toCanvas !== "function") return solidBitmap(background);
        var started = Date.now();
        var capture = lib
          .toCanvas(document.body, {
            pixelRatio: 0.4,
            skipFonts: true,
            filter: function (node) {
              return !(node instanceof Element && node.hasAttribute("data-u2-intro"));
            }
          })
          .then(function (canvas) {
            return createImageBitmap(canvas);
          })
          .catch(function () {
            return null;
          });
        var budget = new Promise(function (resolve) {
          setTimeout(function () {
            resolve(null);
          }, 1400);
        });
        return Promise.race([capture, budget]).then(function (bitmap) {
          window.unit02SnapshotMs = Date.now() - started;
          return bitmap || solidBitmap(background);
        });
      });
    }

    function closeIntro(mark) {
      if (!intro) return;
      var closing = intro;
      intro = null;
      if (closing.guard) clearTimeout(closing.guard);
      if (closing.slow) clearTimeout(closing.slow);
      if (mark) markBootShown();
      window.removeEventListener("message", closing.onMessage);
      closing.layer.style.opacity = "0";
      setTimeout(function () {
        closing.layer.remove();
      }, 320);
    }

    function startIntro() {
      if (intro || !readEnabled() || !document.body) return;

      var layer = document.createElement("div");
      layer.className = "u2-intro";
      layer.setAttribute("data-u2-intro", "");

      var frame = document.createElement("iframe");
      frame.className = "u2-intro-frame";
      frame.setAttribute("title", "UNIT-02 identity sequence");
      frame.setAttribute("allow", "autoplay");

      layer.append(frame);
      document.body.append(layer);

      var state = { layer: layer, frame: frame, snapshot: captureWorkbench(), sent: false };

      function sendSnapshot() {
        if (!state.snapshot || state.sent) return;
        state.sent = true;
        state.snapshot.then(function (bitmap) {
          if (!bitmap || intro !== state) return;
          try {
            frame.contentWindow.postMessage(
              {
                type: "hackclaw:workbench-snapshot",
                bitmap: bitmap,
                codexTarget: null,
                connected: false
              },
              location.origin,
              [bitmap]
            );
          } catch (e) {
            /* ignore */
          }
        });
      }

      state.onMessage = function (event) {
        if (intro !== state || event.source !== frame.contentWindow) return;
        var data = event.data || {};
        if (state.guard && data.type) {
          clearTimeout(state.guard);
          state.guard = null;
        }
        if (data.type === "hackclaw:snapshot-request" || data.type === "hackclaw:intro-ready") {
          sendSnapshot();
        } else if (data.type === "hackclaw:intro-close") {
          closeIntro(true);
        }
      };

      intro = state;
      window.addEventListener("message", state.onMessage);

      frame.addEventListener("load", function () {
        if (state.slow) {
          clearTimeout(state.slow);
          state.slow = null;
        }
        try {
          var doc = frame.contentDocument;
          if (!doc || !doc.head) return;
          var style = doc.createElement("style");
          style.textContent = INTRO_CSS;
          doc.head.append(style);
        } catch (e) {
          /* ignore */
        }
      });

      /* failsafes: never trap the user behind a stuck overlay */
      state.slow = setTimeout(function () {
        if (intro === state) closeIntro(true);
      }, 12000);
      state.guard = setTimeout(function () {
        if (intro === state) closeIntro(true);
      }, 45000);

      frame.src = INTRO_SRC[readSkin()] || INTRO_SRC.asuka;
    }

    function replayIntro() {
      closeIntro(false);
      setTimeout(startIntro, 60);
    }

    /* ============================================================
     * 5. plugin entry
     * ============================================================ */

    const name = "dsh-eva-skins";
    const inject = ["slots"];

    function apply(ctx) {
      applyAttr(readSkin());

      ctx.effect(function () {
        var el = document.createElement("style");
        el.setAttribute("data-unit02-skin", "");
        el.textContent = CSS;
        document.head.append(el);
        return function () {
          el.remove();
        };
      });

      /* asuka linework + red haze overlay, painted above the shell */
      ctx.effect(function () {
        var art = document.createElement("div");
        art.className = "u2-art";
        art.setAttribute("aria-hidden", "true");
        var frame = document.createElement("div");
        frame.className = "u2-frame";
        frame.setAttribute("aria-hidden", "true");
        var seam = document.createElement("div");
        seam.className = "u2-seam";
        seam.setAttribute("aria-hidden", "true");
        document.body.append(art, frame, seam);

        /* rei linework is optional: only show it when the file exists */
        var reiArt = document.createElement("div");
        reiArt.className = "u2-art u2-art-rei";
        reiArt.setAttribute("aria-hidden", "true");
        document.body.append(reiArt);
        var probe = new Image();
        probe.onload = function () {
          reiArt.classList.add("u2-art-on");
        };
        probe.src = "/rei-intro/media/public/rei-lineart.png";

        return function () {
          art.remove();
          frame.remove();
          reiArt.remove();
        };
      });

      /* update badge: quiet check after the shell is up */
      ctx.effect(function () {
        var t = setTimeout(function () {
          checkUpdate(false);
        }, 9000);
        return function () {
          clearTimeout(t);
        };
      });

      /* the identity sequence plays on launch, once per session window */
      ctx.effect(function () {
        if (!readEnabled() || !bootDue()) return;
        var timer = setTimeout(startIntro, 120);
        return function () {
          clearTimeout(timer);
        };
      });

      /* keyboard: Ctrl+Alt+U toggles the skin, Ctrl+Alt+B replays the intro */
      ctx.effect(function () {
        function onKey(e) {
          if (e.ctrlKey && e.altKey && (e.key === "u" || e.key === "U")) {
            e.preventDefault();
            setEnabled(!readEnabled());
          }
          if (e.ctrlKey && e.altKey && (e.key === "b" || e.key === "B")) {
            e.preventDefault();
            replayIntro();
          }
          if (e.key === "Escape" && intro) {
            e.preventDefault();
            closeIntro(true);
          }
        }
        window.addEventListener("keydown", onKey);
        return function () {
          window.removeEventListener("keydown", onKey);
        };
      });

      /* public handle for scripting / verification */
      ctx.effect(function () {
        window.unit02Skin = {
          enable: function () { setEnabled(true); },
          disable: function () { setEnabled(false); },
          toggle: function () { setEnabled(!readEnabled()); },
          isOn: function () { return readEnabled(); },
          getSkin: function () { return readSkin(); },
          setSkin: function (id) {
            if (id === "off" || id === "asuka" || id === "rei" || id === "shinji") setSkin(id);
          },
          skins: function () { return SKINS.map(function (s) { return s.id; }); },
          openPicker: function () {
            var el = document.querySelector(".u2-chip");
            if (el) openSkinMenu(el);
          },
          replayBoot: replayIntro,
          checkUpdate: checkUpdate,
          getUpdate: function () {
            return updateInfo;
          }
        };
        return function () {
          try {
            delete window.unit02Skin;
          } catch (e) {
            window.unit02Skin = undefined;
          }
        };
      });

      if (ctx.slots && typeof ctx.slots.inject === "function") {
        ctx.slots.inject("conversation.input.left", function () {
          return ctx.slots.register(
            { name: "conversation.input.left", id: "unit02-skin-chip", order: 6 },
            SkinChip
          );
        });
      }
    }

    exports.name = name;
    exports.inject = inject;
    exports.apply = apply;
    return module.exports;
  }
});
