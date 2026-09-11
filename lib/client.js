window.__ModuleLoader__.load({
	id: "dsh-ui-skin-wave",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		const jsxRuntime = require("react/jsx-runtime");
		const jsx = jsxRuntime.jsx;

		//#region skin.css
		const css = "/* =====================================================================\n   DSH 皮肤插件 · 结构层（与色相无关）\n   · 调色板（蓝/橘/绿/灰 × 明/暗，共 8 套）由 tools/palettes.mjs 生成，\n     在文件末尾的 /* ============ 色相：蓝色 ============ */\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"] {\n  --dsw-static-neutral-bluish-00:   #ffffff;\n  --dsw-static-neutral-bluish-50:   #f8fbff;\n  --dsw-static-neutral-bluish-60:   #f4f9ff;\n  --dsw-static-neutral-bluish-75:   #eef5ff;\n  --dsw-static-neutral-bluish-100:  #e8f1fd;\n  --dsw-static-neutral-bluish-150:  #e1ebfa;\n  --dsw-static-neutral-bluish-200:  #d8e5f8;\n  --dsw-static-neutral-bluish-300:  #c4d6f0;\n  --dsw-static-neutral-bluish-400:  #a7bcd9;\n  --dsw-static-neutral-bluish-500:  #8fa6c6;\n  --dsw-static-neutral-bluish-600:  #7a8da8;\n  --dsw-static-neutral-bluish-700:  #637a9a;\n  --dsw-static-neutral-bluish-750:  #455c7c;\n  --dsw-static-neutral-bluish-800:  #334a6a;\n  --dsw-static-neutral-bluish-850:  #263c5a;\n  --dsw-static-neutral-bluish-875:  #1c2c42;\n  --dsw-static-neutral-bluish-900:  #142031;\n  --dsw-static-neutral-bluish-950:  #080f18;\n  --dsw-static-neutral-bluish-1000: #0c1624;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"]:not([data-ds-dark-theme]) {\n  /* 页面底色交给 body 的渐变来画；令该令牌透明，避免任何容器遮挡特效层 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #ffffff;\n  --dsw-alias-bg-layer-2:           #ffffff;\n  --dsw-alias-bg-layer-3:           #f8fbff;\n  --dsw-alias-bg-overlay:           #e9f2ff;\n  --dsw-alias-bg-module-platform:   #eef5ff;\n  --dsw-alias-bg-multi-select:      #eef5ff;\n  --dsw-alias-bg-skeleton:          rgba(47, 107, 255, .06);\n  --dsw-alias-bg-mask-drop:         rgba(255, 255, 255, .72);\n  --dsw-alias-border-l1:            rgba(47, 107, 255, .10);\n  --dsw-alias-border-l2:            rgba(47, 107, 255, .17);\n  --dsw-alias-border-l2-darkmode-thin: rgba(47, 107, 255, .17);\n  --dsw-alias-border-l3:            rgba(47, 107, 255, .26);\n  --dsw-alias-border-l4:            rgba(47, 107, 255, .34);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #0e1d33;\n  --dsw-alias-label-secondary:      #7a8da8;\n  --dsw-alias-label-tertiary:       #93a5be;\n  --dsw-alias-label-caption:        #9faec4;\n  --dsw-alias-label-dimmed:         #c4d6f0;\n  --dsw-alias-label-primary-bluish: #1e4d8f;\n  --dsw-alias-label-primary-dimmed: #d8e5f8;\n  --dsw-alias-brand-primary:        #2563eb;\n  --dsw-alias-brand-primary-invert: #ffffff;\n  --dsw-alias-brand-text:           #2563eb;\n  --dsw-alias-link:                 #2563eb;\n  --dsw-alias-button-primary-fill:  #2563eb;\n  --dsw-alias-button-primary-hover: #1d4ed8;\n  --dsw-alias-button-primary-dimmed:#c4d6f0;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover:#f1f7ff;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-contrast-fill:#0e1d33;\n  --dsw-alias-button-tool-bar-fill: rgba(47, 107, 255, .10);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(20, 48, 92, .16);\n  --dsw-alias-button-tool-bar-hover:rgba(47, 107, 255, .16);\n  --dsw-alias-interactive-bg-hover:        rgba(47, 107, 255, .07);\n  --dsw-alias-interactive-bg-active:       rgba(47, 107, 255, .12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(47, 107, 255, .16);\n  --dsw-alias-interactive-bg-hover-solid:  #eef5ff;\n  --dsw-alias-state-business-primary:  #2563eb;\n  --dsw-alias-state-business-tertiary: #e8f1fd;\n  --dsw-alias-toast-bg:                #334a6a;\n  --dsw-alias-tooltip-bg:              #263c5a;\n  --dsw-alias-scrollbar-bg-l1:      #d8e5f8;\n  --dsw-alias-scrollbar-bg-l2:      #d8e5f8;\n  --dsw-alias-scrollbar-hover-l1:   #c4d6f0;\n  --dsw-alias-scrollbar-hover-l2:   #c4d6f0;\n  --dsw-alias-markdown-code-block:         #f8fbff;\n  --dsw-alias-markdown-code-block-banner:  #eef5ff;\n  --dsw-alias-markdown-inline-code:        #f1f7ff;\n  --dsw-alias-markdown-tag:                #eef5ff;\n  --dsw-alias-markdown-citation:           #e8f1fd;\n  --dsw-elevation-stroke-color: rgba(47, 107, 255, .16);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(47, 107, 255, .10);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(47, 107, 255, .12);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(47, 107, 255, .18), 0 14px 38px 0 rgba(47, 107, 255, .20);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 10px 30px -12px rgba(47, 107, 255, .35), 0 0 24px 0 rgba(47, 107, 255, .10);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 24px 56px -24px rgba(47, 107, 255, .55), 0 0 30px 0 rgba(47, 107, 255, .16);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 16px 40px -18px rgba(47, 107, 255, .40), 0 0 30px 0 rgba(47, 107, 255, .12);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"][data-ds-dark-theme] {\n  /* 同上：页面底色由 body 渐变负责 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #101c2c;\n  --dsw-alias-bg-layer-2:           #142236;\n  --dsw-alias-bg-layer-3:           #1b2c44;\n  --dsw-alias-bg-overlay:           #263c5a;\n  --dsw-alias-bg-module-platform:   #1b2c44;\n  --dsw-alias-bg-multi-select:      #1c2c42;\n  --dsw-alias-bg-skeleton:          rgba(98, 150, 255, .10);\n  --dsw-alias-bg-mask-drop:         rgba(12, 20, 36, .72);\n  --dsw-alias-border-l1:            rgba(98, 150, 255, .12);\n  --dsw-alias-border-l2:            rgba(98, 150, 255, .18);\n  --dsw-alias-border-l2-darkmode-thin: rgba(98, 150, 255, .12);\n  --dsw-alias-border-l3:            rgba(98, 150, 255, .26);\n  --dsw-alias-border-l4:            rgba(98, 150, 255, .36);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #e9f2ff;\n  --dsw-alias-label-secondary:      #c2d2e8;\n  --dsw-alias-label-tertiary:       #9bb0ce;\n  --dsw-alias-label-caption:        #7d91ad;\n  --dsw-alias-label-dimmed:         #455c7c;\n  --dsw-alias-label-primary-bluish: #cfe3ff;\n  --dsw-alias-label-primary-dimmed: #1c2c42;\n  --dsw-alias-brand-primary:        #3b82f6;\n  --dsw-alias-brand-primary-invert: #080f18;\n  --dsw-alias-brand-text:           #7fb0ff;\n  --dsw-alias-link:                 #7fb0ff;\n  --dsw-alias-button-primary-fill:  #3b82f6;\n  --dsw-alias-button-primary-hover: #2563eb;\n  --dsw-alias-button-primary-dimmed:#334a6a;\n  --dsw-alias-button-floating-fill: #142236;\n  --dsw-alias-button-floating-hover:#1b2c44;\n  --dsw-alias-button-elevated-fill: #263c5a;\n  --dsw-alias-button-tool-bar-fill: rgba(98, 150, 255, .14);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(8, 16, 32, .36);\n  --dsw-alias-button-tool-bar-hover:rgba(98, 150, 255, .22);\n  --dsw-alias-interactive-bg-hover:        rgba(98, 150, 255, .12);\n  --dsw-alias-interactive-bg-active:       rgba(98, 150, 255, .20);\n  --dsw-alias-interactive-bg-hover-accent: rgba(98, 150, 255, .28);\n  --dsw-alias-interactive-bg-hover-solid:  #1b2c44;\n  --dsw-alias-state-business-primary:  #3b82f6;\n  --dsw-alias-state-business-tertiary: #142236;\n  --dsw-alias-toast-bg:                #1b2c44;\n  --dsw-alias-tooltip-bg:              #263c5a;\n  --dsw-alias-scrollbar-bg-l1:      #334a6a;\n  --dsw-alias-scrollbar-bg-l2:      #334a6a;\n  --dsw-alias-scrollbar-hover-l1:   #455c7c;\n  --dsw-alias-scrollbar-hover-l2:   #455c7c;\n  --dsw-alias-markdown-code-block:         #101c2c;\n  --dsw-alias-markdown-code-block-banner:  #1c2c42;\n  --dsw-alias-markdown-inline-code:        #1c2c42;\n  --dsw-alias-markdown-tag:                #1b2c44;\n  --dsw-alias-markdown-citation:           #1c2c42;\n  --dsw-elevation-stroke-color: rgba(98, 150, 255, .18);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(0, 0, 0, .45);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(0, 0, 0, .50);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(98, 150, 255, .22), 0 14px 38px 0 rgba(0, 0, 0, .60);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 4px 12px 0 rgba(0, 0, 0, .35), 0 0 22px 0 rgba(98, 150, 255, .18);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 4px 14px 0 rgba(0, 0, 0, .40), 0 0 26px 0 rgba(98, 150, 255, .26);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 6px 20px 0 rgba(0, 0, 0, .35), 0 0 30px 0 rgba(98, 150, 255, .18);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"]:not([data-ds-dark-theme]) {\n  background-color: #dfeaff;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(91, 156, 255, .34), transparent 64%),\n    linear-gradient(180deg, #f9fcff 0%, #dfeaff 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"][data-ds-dark-theme] {\n  background-color: #070b14;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(37, 99, 235, .30), transparent 64%),\n    linear-gradient(180deg, #0a1020 0%, #070b14 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"]:not([data-ds-dark-theme]) { --dsh-skin-accent: #2563eb; --dsh-skin-accent-rgb: 37, 99, 235; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"][data-ds-dark-theme] { --dsh-skin-accent: #3b82f6; --dsh-skin-accent-rgb: 59, 130, 246; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"] #dsh-ocean-fx { --dsh-fx: 79, 140, 255; --dsh-fx-grid: .042; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"blue\"][data-ds-dark-theme] #dsh-ocean-fx { --dsh-fx: 118, 166, 255; --dsh-fx-grid: .055; }\n\n/* ============ 色相：橘色 ============ */\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"] {\n  --dsw-static-neutral-bluish-00:   #ffffff;\n  --dsw-static-neutral-bluish-50:   #f8fbff;\n  --dsw-static-neutral-bluish-60:   #fff9f4;\n  --dsw-static-neutral-bluish-75:   #fff5ee;\n  --dsw-static-neutral-bluish-100:  #fdf1e8;\n  --dsw-static-neutral-bluish-150:  #faece1;\n  --dsw-static-neutral-bluish-200:  #f8e6d8;\n  --dsw-static-neutral-bluish-300:  #f0d7c4;\n  --dsw-static-neutral-bluish-400:  #d9bda7;\n  --dsw-static-neutral-bluish-500:  #c6a78f;\n  --dsw-static-neutral-bluish-600:  #a88e7a;\n  --dsw-static-neutral-bluish-700:  #9a7b63;\n  --dsw-static-neutral-bluish-750:  #7c5d45;\n  --dsw-static-neutral-bluish-800:  #6a4b33;\n  --dsw-static-neutral-bluish-850:  #5a3d26;\n  --dsw-static-neutral-bluish-875:  #422c1c;\n  --dsw-static-neutral-bluish-900:  #312114;\n  --dsw-static-neutral-bluish-950:  #180f08;\n  --dsw-static-neutral-bluish-1000: #24160c;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"]:not([data-ds-dark-theme]) {\n  /* 页面底色交给 body 的渐变来画；令该令牌透明，避免任何容器遮挡特效层 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #ffffff;\n  --dsw-alias-bg-layer-2:           #ffffff;\n  --dsw-alias-bg-layer-3:           #f8fbff;\n  --dsw-alias-bg-overlay:           #fff3e9;\n  --dsw-alias-bg-module-platform:   #fff5ee;\n  --dsw-alias-bg-multi-select:      #fff5ee;\n  --dsw-alias-bg-skeleton:          rgba(242, 122, 32, .06);\n  --dsw-alias-bg-mask-drop:         rgba(255, 255, 255, .72);\n  --dsw-alias-border-l1:            rgba(242, 122, 32, .10);\n  --dsw-alias-border-l2:            rgba(242, 122, 32, .17);\n  --dsw-alias-border-l2-darkmode-thin: rgba(242, 122, 32, .17);\n  --dsw-alias-border-l3:            rgba(242, 122, 32, .26);\n  --dsw-alias-border-l4:            rgba(242, 122, 32, .34);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #331e0e;\n  --dsw-alias-label-secondary:      #a88e7a;\n  --dsw-alias-label-tertiary:       #bea693;\n  --dsw-alias-label-caption:        #c4af9f;\n  --dsw-alias-label-dimmed:         #f0d7c4;\n  --dsw-alias-label-primary-bluish: #8f4f1e;\n  --dsw-alias-label-primary-dimmed: #f8e6d8;\n  --dsw-alias-brand-primary:        #e2670a;\n  --dsw-alias-brand-primary-invert: #ffffff;\n  --dsw-alias-brand-text:           #e2670a;\n  --dsw-alias-link:                 #e2670a;\n  --dsw-alias-button-primary-fill:  #e2670a;\n  --dsw-alias-button-primary-hover: #c4550a;\n  --dsw-alias-button-primary-dimmed:#f0d7c4;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover:#fff7f1;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-contrast-fill:#331e0e;\n  --dsw-alias-button-tool-bar-fill: rgba(242, 122, 32, .10);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(20, 48, 92, .16);\n  --dsw-alias-button-tool-bar-hover:rgba(242, 122, 32, .16);\n  --dsw-alias-interactive-bg-hover:        rgba(242, 122, 32, .07);\n  --dsw-alias-interactive-bg-active:       rgba(242, 122, 32, .12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(242, 122, 32, .16);\n  --dsw-alias-interactive-bg-hover-solid:  #fff5ee;\n  --dsw-alias-state-business-primary:  #e2670a;\n  --dsw-alias-state-business-tertiary: #fdf1e8;\n  --dsw-alias-toast-bg:                #6a4b33;\n  --dsw-alias-tooltip-bg:              #5a3d26;\n  --dsw-alias-scrollbar-bg-l1:      #f8e6d8;\n  --dsw-alias-scrollbar-bg-l2:      #f8e6d8;\n  --dsw-alias-scrollbar-hover-l1:   #f0d7c4;\n  --dsw-alias-scrollbar-hover-l2:   #f0d7c4;\n  --dsw-alias-markdown-code-block:         #f8fbff;\n  --dsw-alias-markdown-code-block-banner:  #fff5ee;\n  --dsw-alias-markdown-inline-code:        #fff7f1;\n  --dsw-alias-markdown-tag:                #fff5ee;\n  --dsw-alias-markdown-citation:           #fdf1e8;\n  --dsw-elevation-stroke-color: rgba(242, 122, 32, .16);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(242, 122, 32, .10);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(242, 122, 32, .12);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(242, 122, 32, .18), 0 14px 38px 0 rgba(242, 122, 32, .20);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 10px 30px -12px rgba(242, 122, 32, .35), 0 0 24px 0 rgba(242, 122, 32, .10);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 24px 56px -24px rgba(242, 122, 32, .55), 0 0 30px 0 rgba(242, 122, 32, .16);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 16px 40px -18px rgba(242, 122, 32, .40), 0 0 30px 0 rgba(242, 122, 32, .12);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"][data-ds-dark-theme] {\n  /* 同上：页面底色由 body 渐变负责 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #2c1c10;\n  --dsw-alias-bg-layer-2:           #362314;\n  --dsw-alias-bg-layer-3:           #442d1b;\n  --dsw-alias-bg-overlay:           #5a3d26;\n  --dsw-alias-bg-module-platform:   #442d1b;\n  --dsw-alias-bg-multi-select:      #422c1c;\n  --dsw-alias-bg-skeleton:          rgba(255, 163, 92, .10);\n  --dsw-alias-bg-mask-drop:         rgba(12, 20, 36, .72);\n  --dsw-alias-border-l1:            rgba(255, 163, 92, .12);\n  --dsw-alias-border-l2:            rgba(255, 163, 92, .18);\n  --dsw-alias-border-l2-darkmode-thin: rgba(255, 163, 92, .12);\n  --dsw-alias-border-l3:            rgba(255, 163, 92, .26);\n  --dsw-alias-border-l4:            rgba(255, 163, 92, .36);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #fff3e9;\n  --dsw-alias-label-secondary:      #e8d2c2;\n  --dsw-alias-label-tertiary:       #ceb19b;\n  --dsw-alias-label-caption:        #ad927d;\n  --dsw-alias-label-dimmed:         #7c5d45;\n  --dsw-alias-label-primary-bluish: #ffe4cf;\n  --dsw-alias-label-primary-dimmed: #422c1c;\n  --dsw-alias-brand-primary:        #f5883a;\n  --dsw-alias-brand-primary-invert: #180f08;\n  --dsw-alias-brand-text:           #ffb478;\n  --dsw-alias-link:                 #ffb478;\n  --dsw-alias-button-primary-fill:  #f5883a;\n  --dsw-alias-button-primary-hover: #e2670a;\n  --dsw-alias-button-primary-dimmed:#6a4b33;\n  --dsw-alias-button-floating-fill: #362314;\n  --dsw-alias-button-floating-hover:#442d1b;\n  --dsw-alias-button-elevated-fill: #5a3d26;\n  --dsw-alias-button-tool-bar-fill: rgba(255, 163, 92, .14);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(8, 16, 32, .36);\n  --dsw-alias-button-tool-bar-hover:rgba(255, 163, 92, .22);\n  --dsw-alias-interactive-bg-hover:        rgba(255, 163, 92, .12);\n  --dsw-alias-interactive-bg-active:       rgba(255, 163, 92, .20);\n  --dsw-alias-interactive-bg-hover-accent: rgba(255, 163, 92, .28);\n  --dsw-alias-interactive-bg-hover-solid:  #442d1b;\n  --dsw-alias-state-business-primary:  #f5883a;\n  --dsw-alias-state-business-tertiary: #362314;\n  --dsw-alias-toast-bg:                #442d1b;\n  --dsw-alias-tooltip-bg:              #5a3d26;\n  --dsw-alias-scrollbar-bg-l1:      #6a4b33;\n  --dsw-alias-scrollbar-bg-l2:      #6a4b33;\n  --dsw-alias-scrollbar-hover-l1:   #7c5d45;\n  --dsw-alias-scrollbar-hover-l2:   #7c5d45;\n  --dsw-alias-markdown-code-block:         #2c1c10;\n  --dsw-alias-markdown-code-block-banner:  #422c1c;\n  --dsw-alias-markdown-inline-code:        #422c1c;\n  --dsw-alias-markdown-tag:                #442d1b;\n  --dsw-alias-markdown-citation:           #422c1c;\n  --dsw-elevation-stroke-color: rgba(255, 163, 92, .18);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(0, 0, 0, .45);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(0, 0, 0, .50);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(255, 163, 92, .22), 0 14px 38px 0 rgba(0, 0, 0, .60);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 4px 12px 0 rgba(0, 0, 0, .35), 0 0 22px 0 rgba(255, 163, 92, .18);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 4px 14px 0 rgba(0, 0, 0, .40), 0 0 26px 0 rgba(255, 163, 92, .26);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 6px 20px 0 rgba(0, 0, 0, .35), 0 0 30px 0 rgba(255, 163, 92, .18);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"]:not([data-ds-dark-theme]) {\n  background-color: #ffe8d6;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(255, 156, 82, .30), transparent 64%),\n    linear-gradient(180deg, #fffaf5 0%, #ffe8d6 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"][data-ds-dark-theme] {\n  background-color: #0f0a06;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(226, 103, 10, .28), transparent 64%),\n    linear-gradient(180deg, #181008 0%, #0f0a06 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"]:not([data-ds-dark-theme]) { --dsh-skin-accent: #e2670a; --dsh-skin-accent-rgb: 226, 103, 10; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"][data-ds-dark-theme] { --dsh-skin-accent: #f5883a; --dsh-skin-accent-rgb: 245, 136, 58; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"] #dsh-ocean-fx { --dsh-fx: 242, 146, 58; --dsh-fx-grid: .042; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"orange\"][data-ds-dark-theme] #dsh-ocean-fx { --dsh-fx: 255, 172, 98; --dsh-fx-grid: .055; }\n\n/* ============ 色相：绿色 ============ */\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"] {\n  --dsw-static-neutral-bluish-00:   #ffffff;\n  --dsw-static-neutral-bluish-50:   #f8fbff;\n  --dsw-static-neutral-bluish-60:   #f5fefa;\n  --dsw-static-neutral-bluish-75:   #effef7;\n  --dsw-static-neutral-bluish-100:  #eafbf3;\n  --dsw-static-neutral-bluish-150:  #e3f8ee;\n  --dsw-static-neutral-bluish-200:  #daf6e9;\n  --dsw-static-neutral-bluish-300:  #c7eddb;\n  --dsw-static-neutral-bluish-400:  #abd5c1;\n  --dsw-static-neutral-bluish-500:  #93c2ac;\n  --dsw-static-neutral-bluish-600:  #7da592;\n  --dsw-static-neutral-bluish-700:  #679680;\n  --dsw-static-neutral-bluish-750:  #497862;\n  --dsw-static-neutral-bluish-800:  #376650;\n  --dsw-static-neutral-bluish-850:  #2a5641;\n  --dsw-static-neutral-bluish-875:  #1f3f30;\n  --dsw-static-neutral-bluish-900:  #162f23;\n  --dsw-static-neutral-bluish-950:  #091710;\n  --dsw-static-neutral-bluish-1000: #0e2219;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"]:not([data-ds-dark-theme]) {\n  /* 页面底色交给 body 的渐变来画；令该令牌透明，避免任何容器遮挡特效层 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #ffffff;\n  --dsw-alias-bg-layer-2:           #ffffff;\n  --dsw-alias-bg-layer-3:           #f8fbff;\n  --dsw-alias-bg-overlay:           #ebfdf5;\n  --dsw-alias-bg-module-platform:   #effef7;\n  --dsw-alias-bg-multi-select:      #effef7;\n  --dsw-alias-bg-skeleton:          rgba(22, 163, 106, .06);\n  --dsw-alias-bg-mask-drop:         rgba(255, 255, 255, .72);\n  --dsw-alias-border-l1:            rgba(22, 163, 106, .10);\n  --dsw-alias-border-l2:            rgba(22, 163, 106, .17);\n  --dsw-alias-border-l2-darkmode-thin: rgba(22, 163, 106, .17);\n  --dsw-alias-border-l3:            rgba(22, 163, 106, .26);\n  --dsw-alias-border-l4:            rgba(22, 163, 106, .34);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #113022;\n  --dsw-alias-label-secondary:      #7da592;\n  --dsw-alias-label-tertiary:       #96bbaa;\n  --dsw-alias-label-caption:        #a2c1b3;\n  --dsw-alias-label-dimmed:         #c7eddb;\n  --dsw-alias-label-primary-bluish: #26875a;\n  --dsw-alias-label-primary-dimmed: #daf6e9;\n  --dsw-alias-brand-primary:        #0f9d63;\n  --dsw-alias-brand-primary-invert: #ffffff;\n  --dsw-alias-brand-text:           #0f9d63;\n  --dsw-alias-link:                 #0f9d63;\n  --dsw-alias-button-primary-fill:  #0f9d63;\n  --dsw-alias-button-primary-hover: #0b7d4f;\n  --dsw-alias-button-primary-dimmed:#c7eddb;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover:#f2fef8;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-contrast-fill:#113022;\n  --dsw-alias-button-tool-bar-fill: rgba(22, 163, 106, .10);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(20, 48, 92, .16);\n  --dsw-alias-button-tool-bar-hover:rgba(22, 163, 106, .16);\n  --dsw-alias-interactive-bg-hover:        rgba(22, 163, 106, .07);\n  --dsw-alias-interactive-bg-active:       rgba(22, 163, 106, .12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(22, 163, 106, .16);\n  --dsw-alias-interactive-bg-hover-solid:  #effef7;\n  --dsw-alias-state-business-primary:  #0f9d63;\n  --dsw-alias-state-business-tertiary: #eafbf3;\n  --dsw-alias-toast-bg:                #376650;\n  --dsw-alias-tooltip-bg:              #2a5641;\n  --dsw-alias-scrollbar-bg-l1:      #daf6e9;\n  --dsw-alias-scrollbar-bg-l2:      #daf6e9;\n  --dsw-alias-scrollbar-hover-l1:   #c7eddb;\n  --dsw-alias-scrollbar-hover-l2:   #c7eddb;\n  --dsw-alias-markdown-code-block:         #f8fbff;\n  --dsw-alias-markdown-code-block-banner:  #effef7;\n  --dsw-alias-markdown-inline-code:        #f2fef8;\n  --dsw-alias-markdown-tag:                #effef7;\n  --dsw-alias-markdown-citation:           #eafbf3;\n  --dsw-elevation-stroke-color: rgba(22, 163, 106, .16);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(22, 163, 106, .10);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(22, 163, 106, .12);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(22, 163, 106, .18), 0 14px 38px 0 rgba(22, 163, 106, .20);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 10px 30px -12px rgba(22, 163, 106, .35), 0 0 24px 0 rgba(22, 163, 106, .10);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 24px 56px -24px rgba(22, 163, 106, .55), 0 0 30px 0 rgba(22, 163, 106, .16);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 16px 40px -18px rgba(22, 163, 106, .40), 0 0 30px 0 rgba(22, 163, 106, .12);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"][data-ds-dark-theme] {\n  /* 同上：页面底色由 body 渐变负责 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #1e2d26;\n  --dsw-alias-bg-layer-2:           #24352d;\n  --dsw-alias-bg-layer-3:           #2d4138;\n  --dsw-alias-bg-overlay:           #3b5448;\n  --dsw-alias-bg-module-platform:   #2d4138;\n  --dsw-alias-bg-multi-select:      #2d4037;\n  --dsw-alias-bg-skeleton:          rgba(74, 214, 150, .10);\n  --dsw-alias-bg-mask-drop:         rgba(12, 20, 36, .72);\n  --dsw-alias-border-l1:            rgba(74, 214, 150, .12);\n  --dsw-alias-border-l2:            rgba(74, 214, 150, .18);\n  --dsw-alias-border-l2-darkmode-thin: rgba(74, 214, 150, .12);\n  --dsw-alias-border-l3:            rgba(74, 214, 150, .26);\n  --dsw-alias-border-l4:            rgba(74, 214, 150, .36);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #eff9f4;\n  --dsw-alias-label-secondary:      #d6e3dd;\n  --dsw-alias-label-tertiary:       #b3c6bd;\n  --dsw-alias-label-caption:        #93a69d;\n  --dsw-alias-label-dimmed:         #5c7569;\n  --dsw-alias-label-primary-bluish: #ddf1e8;\n  --dsw-alias-label-primary-dimmed: #2d4037;\n  --dsw-alias-brand-primary:        #22c98a;\n  --dsw-alias-brand-primary-invert: #131d18;\n  --dsw-alias-brand-text:           #6ee7b7;\n  --dsw-alias-link:                 #6ee7b7;\n  --dsw-alias-button-primary-fill:  #22c98a;\n  --dsw-alias-button-primary-hover: #0f9d63;\n  --dsw-alias-button-primary-dimmed:#496357;\n  --dsw-alias-button-floating-fill: #24352d;\n  --dsw-alias-button-floating-hover:#2d4138;\n  --dsw-alias-button-elevated-fill: #3b5448;\n  --dsw-alias-button-tool-bar-fill: rgba(74, 214, 150, .14);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(8, 16, 32, .36);\n  --dsw-alias-button-tool-bar-hover:rgba(74, 214, 150, .22);\n  --dsw-alias-interactive-bg-hover:        rgba(74, 214, 150, .12);\n  --dsw-alias-interactive-bg-active:       rgba(74, 214, 150, .20);\n  --dsw-alias-interactive-bg-hover-accent: rgba(74, 214, 150, .28);\n  --dsw-alias-interactive-bg-hover-solid:  #2d4138;\n  --dsw-alias-state-business-primary:  #22c98a;\n  --dsw-alias-state-business-tertiary: #24352d;\n  --dsw-alias-toast-bg:                #2d4138;\n  --dsw-alias-tooltip-bg:              #3b5448;\n  --dsw-alias-scrollbar-bg-l1:      #496357;\n  --dsw-alias-scrollbar-bg-l2:      #496357;\n  --dsw-alias-scrollbar-hover-l1:   #5c7569;\n  --dsw-alias-scrollbar-hover-l2:   #5c7569;\n  --dsw-alias-markdown-code-block:         #1e2d26;\n  --dsw-alias-markdown-code-block-banner:  #2d4037;\n  --dsw-alias-markdown-inline-code:        #2d4037;\n  --dsw-alias-markdown-tag:                #2d4138;\n  --dsw-alias-markdown-citation:           #2d4037;\n  --dsw-elevation-stroke-color: rgba(74, 214, 150, .18);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(0, 0, 0, .45);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(0, 0, 0, .50);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(74, 214, 150, .22), 0 14px 38px 0 rgba(0, 0, 0, .60);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 4px 12px 0 rgba(0, 0, 0, .35), 0 0 22px 0 rgba(74, 214, 150, .18);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 4px 14px 0 rgba(0, 0, 0, .40), 0 0 26px 0 rgba(74, 214, 150, .26);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 6px 20px 0 rgba(0, 0, 0, .35), 0 0 30px 0 rgba(74, 214, 150, .18);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"]:not([data-ds-dark-theme]) {\n  background-color: #d9f7e9;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(74, 214, 150, .28), transparent 64%),\n    linear-gradient(180deg, #f7fffb 0%, #d9f7e9 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"][data-ds-dark-theme] {\n  background-color: #081310;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(15, 157, 99, .22), transparent 64%),\n    linear-gradient(180deg, #0c1a14 0%, #081310 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"]:not([data-ds-dark-theme]) { --dsh-skin-accent: #0f9d63; --dsh-skin-accent-rgb: 15, 157, 99; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"][data-ds-dark-theme] { --dsh-skin-accent: #22c98a; --dsh-skin-accent-rgb: 34, 201, 138; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"] #dsh-ocean-fx { --dsh-fx: 46, 190, 125; --dsh-fx-grid: .042; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"green\"][data-ds-dark-theme] #dsh-ocean-fx { --dsh-fx: 88, 220, 150; --dsh-fx-grid: .055; }\n\n/* ============ 色相：灰色 ============ */\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"] {\n  --dsw-static-neutral-bluish-00:   #ffffff;\n  --dsw-static-neutral-bluish-50:   #f8fbff;\n  --dsw-static-neutral-bluish-60:   #f9f9fa;\n  --dsw-static-neutral-bluish-75:   #f6f6f7;\n  --dsw-static-neutral-bluish-100:  #f2f2f3;\n  --dsw-static-neutral-bluish-150:  #ededee;\n  --dsw-static-neutral-bluish-200:  #e7e8e9;\n  --dsw-static-neutral-bluish-300:  #d8dadc;\n  --dsw-static-neutral-bluish-400:  #bec0c2;\n  --dsw-static-neutral-bluish-500:  #a9aaac;\n  --dsw-static-neutral-bluish-600:  #8f9193;\n  --dsw-static-neutral-bluish-700:  #7d7e80;\n  --dsw-static-neutral-bluish-750:  #5f6062;\n  --dsw-static-neutral-bluish-800:  #4d4e50;\n  --dsw-static-neutral-bluish-850:  #3e4042;\n  --dsw-static-neutral-bluish-875:  #2e2f30;\n  --dsw-static-neutral-bluish-900:  #212224;\n  --dsw-static-neutral-bluish-950:  #0f1011;\n  --dsw-static-neutral-bluish-1000: #171819;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"]:not([data-ds-dark-theme]) {\n  /* 页面底色交给 body 的渐变来画；令该令牌透明，避免任何容器遮挡特效层 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #ffffff;\n  --dsw-alias-bg-layer-2:           #ffffff;\n  --dsw-alias-bg-layer-3:           #f8fbff;\n  --dsw-alias-bg-overlay:           #f3f4f5;\n  --dsw-alias-bg-module-platform:   #f6f6f7;\n  --dsw-alias-bg-multi-select:      #f6f6f7;\n  --dsw-alias-bg-skeleton:          rgba(110, 120, 138, .06);\n  --dsw-alias-bg-mask-drop:         rgba(255, 255, 255, .72);\n  --dsw-alias-border-l1:            rgba(110, 120, 138, .10);\n  --dsw-alias-border-l2:            rgba(110, 120, 138, .17);\n  --dsw-alias-border-l2-darkmode-thin: rgba(110, 120, 138, .17);\n  --dsw-alias-border-l3:            rgba(110, 120, 138, .26);\n  --dsw-alias-border-l4:            rgba(110, 120, 138, .34);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #1f2022;\n  --dsw-alias-label-secondary:      #8f9193;\n  --dsw-alias-label-tertiary:       #a7a8aa;\n  --dsw-alias-label-caption:        #b0b1b3;\n  --dsw-alias-label-dimmed:         #d8dadc;\n  --dsw-alias-label-primary-bluish: #53565a;\n  --dsw-alias-label-primary-dimmed: #e7e8e9;\n  --dsw-alias-brand-primary:        #4b5563;\n  --dsw-alias-brand-primary-invert: #ffffff;\n  --dsw-alias-brand-text:           #4b5563;\n  --dsw-alias-link:                 #4b5563;\n  --dsw-alias-button-primary-fill:  #4b5563;\n  --dsw-alias-button-primary-hover: #3b4453;\n  --dsw-alias-button-primary-dimmed:#d8dadc;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover:#f8f8f8;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-contrast-fill:#1f2022;\n  --dsw-alias-button-tool-bar-fill: rgba(110, 120, 138, .10);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(20, 48, 92, .16);\n  --dsw-alias-button-tool-bar-hover:rgba(110, 120, 138, .16);\n  --dsw-alias-interactive-bg-hover:        rgba(110, 120, 138, .07);\n  --dsw-alias-interactive-bg-active:       rgba(110, 120, 138, .12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(110, 120, 138, .16);\n  --dsw-alias-interactive-bg-hover-solid:  #f6f6f7;\n  --dsw-alias-state-business-primary:  #4b5563;\n  --dsw-alias-state-business-tertiary: #f2f2f3;\n  --dsw-alias-toast-bg:                #4d4e50;\n  --dsw-alias-tooltip-bg:              #3e4042;\n  --dsw-alias-scrollbar-bg-l1:      #e7e8e9;\n  --dsw-alias-scrollbar-bg-l2:      #e7e8e9;\n  --dsw-alias-scrollbar-hover-l1:   #d8dadc;\n  --dsw-alias-scrollbar-hover-l2:   #d8dadc;\n  --dsw-alias-markdown-code-block:         #f8fbff;\n  --dsw-alias-markdown-code-block-banner:  #f6f6f7;\n  --dsw-alias-markdown-inline-code:        #f8f8f8;\n  --dsw-alias-markdown-tag:                #f6f6f7;\n  --dsw-alias-markdown-citation:           #f2f2f3;\n  --dsw-elevation-stroke-color: rgba(110, 120, 138, .16);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(110, 120, 138, .10);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(110, 120, 138, .12);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(110, 120, 138, .18), 0 14px 38px 0 rgba(110, 120, 138, .20);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 10px 30px -12px rgba(110, 120, 138, .35), 0 0 24px 0 rgba(110, 120, 138, .10);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 24px 56px -24px rgba(110, 120, 138, .55), 0 0 30px 0 rgba(110, 120, 138, .16);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 16px 40px -18px rgba(110, 120, 138, .40), 0 0 30px 0 rgba(110, 120, 138, .12);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"][data-ds-dark-theme] {\n  /* 同上：页面底色由 body 渐变负责 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #262728;\n  --dsw-alias-bg-layer-2:           #2d2e2f;\n  --dsw-alias-bg-layer-3:           #37383a;\n  --dsw-alias-bg-overlay:           #47494a;\n  --dsw-alias-bg-module-platform:   #37383a;\n  --dsw-alias-bg-multi-select:      #373839;\n  --dsw-alias-bg-skeleton:          rgba(150, 162, 180, .10);\n  --dsw-alias-bg-mask-drop:         rgba(12, 20, 36, .72);\n  --dsw-alias-border-l1:            rgba(150, 162, 180, .12);\n  --dsw-alias-border-l2:            rgba(150, 162, 180, .18);\n  --dsw-alias-border-l2-darkmode-thin: rgba(150, 162, 180, .12);\n  --dsw-alias-border-l3:            rgba(150, 162, 180, .26);\n  --dsw-alias-border-l4:            rgba(150, 162, 180, .36);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #f3f4f5;\n  --dsw-alias-label-secondary:      #dddedf;\n  --dsw-alias-label-tertiary:       #bcbdbf;\n  --dsw-alias-label-caption:        #9d9e9f;\n  --dsw-alias-label-dimmed:         #68696b;\n  --dsw-alias-label-primary-bluish: #e6e7e8;\n  --dsw-alias-label-primary-dimmed: #373839;\n  --dsw-alias-brand-primary:        #9aa3b2;\n  --dsw-alias-brand-primary-invert: #18191a;\n  --dsw-alias-brand-text:           #c3cad6;\n  --dsw-alias-link:                 #c3cad6;\n  --dsw-alias-button-primary-fill:  #9aa3b2;\n  --dsw-alias-button-primary-hover: #7c8798;\n  --dsw-alias-button-primary-dimmed:#565759;\n  --dsw-alias-button-floating-fill: #2d2e2f;\n  --dsw-alias-button-floating-hover:#37383a;\n  --dsw-alias-button-elevated-fill: #47494a;\n  --dsw-alias-button-tool-bar-fill: rgba(150, 162, 180, .14);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(8, 16, 32, .36);\n  --dsw-alias-button-tool-bar-hover:rgba(150, 162, 180, .22);\n  --dsw-alias-interactive-bg-hover:        rgba(150, 162, 180, .12);\n  --dsw-alias-interactive-bg-active:       rgba(150, 162, 180, .20);\n  --dsw-alias-interactive-bg-hover-accent: rgba(150, 162, 180, .28);\n  --dsw-alias-interactive-bg-hover-solid:  #37383a;\n  --dsw-alias-state-business-primary:  #9aa3b2;\n  --dsw-alias-state-business-tertiary: #2d2e2f;\n  --dsw-alias-toast-bg:                #37383a;\n  --dsw-alias-tooltip-bg:              #47494a;\n  --dsw-alias-scrollbar-bg-l1:      #565759;\n  --dsw-alias-scrollbar-bg-l2:      #565759;\n  --dsw-alias-scrollbar-hover-l1:   #68696b;\n  --dsw-alias-scrollbar-hover-l2:   #68696b;\n  --dsw-alias-markdown-code-block:         #262728;\n  --dsw-alias-markdown-code-block-banner:  #373839;\n  --dsw-alias-markdown-inline-code:        #373839;\n  --dsw-alias-markdown-tag:                #37383a;\n  --dsw-alias-markdown-citation:           #373839;\n  --dsw-elevation-stroke-color: rgba(150, 162, 180, .18);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(0, 0, 0, .45);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(0, 0, 0, .50);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(150, 162, 180, .22), 0 14px 38px 0 rgba(0, 0, 0, .60);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 4px 12px 0 rgba(0, 0, 0, .35), 0 0 22px 0 rgba(150, 162, 180, .18);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 4px 14px 0 rgba(0, 0, 0, .40), 0 0 26px 0 rgba(150, 162, 180, .26);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 6px 20px 0 rgba(0, 0, 0, .35), 0 0 30px 0 rgba(150, 162, 180, .18);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"]:not([data-ds-dark-theme]) {\n  background-color: #e7ebf2;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(150, 162, 180, .26), transparent 64%),\n    linear-gradient(180deg, #fbfcfe 0%, #e7ebf2 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"][data-ds-dark-theme] {\n  background-color: #0d0f12;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(120, 130, 150, .18), transparent 64%),\n    linear-gradient(180deg, #13161a 0%, #0d0f12 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"]:not([data-ds-dark-theme]) { --dsh-skin-accent: #4b5563; --dsh-skin-accent-rgb: 75, 85, 99; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"][data-ds-dark-theme] { --dsh-skin-accent: #9aa3b2; --dsh-skin-accent-rgb: 154, 163, 178; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"] #dsh-ocean-fx { --dsh-fx: 120, 130, 150; --dsh-fx-grid: .042; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"gray\"][data-ds-dark-theme] #dsh-ocean-fx { --dsh-fx: 150, 162, 180; --dsh-fx-grid: .055; }\n\n/* ============ 色相：紫色 ============ */\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"] {\n  --dsw-static-neutral-bluish-00:   #ffffff;\n  --dsw-static-neutral-bluish-50:   #f8fbff;\n  --dsw-static-neutral-bluish-60:   #f8f5fe;\n  --dsw-static-neutral-bluish-75:   #f4effe;\n  --dsw-static-neutral-bluish-100:  #f0e9fc;\n  --dsw-static-neutral-bluish-150:  #ebe2f9;\n  --dsw-static-neutral-bluish-200:  #e4daf6;\n  --dsw-static-neutral-bluish-300:  #d5c6ee;\n  --dsw-static-neutral-bluish-400:  #baaad7;\n  --dsw-static-neutral-bluish-500:  #a492c3;\n  --dsw-static-neutral-bluish-600:  #8b7ca6;\n  --dsw-static-neutral-bluish-700:  #786697;\n  --dsw-static-neutral-bluish-750:  #5a4879;\n  --dsw-static-neutral-bluish-800:  #483667;\n  --dsw-static-neutral-bluish-850:  #3a2957;\n  --dsw-static-neutral-bluish-875:  #2a1e40;\n  --dsw-static-neutral-bluish-900:  #1f1530;\n  --dsw-static-neutral-bluish-950:  #0e0917;\n  --dsw-static-neutral-bluish-1000: #150d23;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"]:not([data-ds-dark-theme]) {\n  /* 页面底色交给 body 的渐变来画；令该令牌透明，避免任何容器遮挡特效层 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #ffffff;\n  --dsw-alias-bg-layer-2:           #ffffff;\n  --dsw-alias-bg-layer-3:           #f8fbff;\n  --dsw-alias-bg-overlay:           #f1eafe;\n  --dsw-alias-bg-module-platform:   #f4effe;\n  --dsw-alias-bg-multi-select:      #f4effe;\n  --dsw-alias-bg-skeleton:          rgba(124, 92, 214, .06);\n  --dsw-alias-bg-mask-drop:         rgba(255, 255, 255, .72);\n  --dsw-alias-border-l1:            rgba(124, 92, 214, .10);\n  --dsw-alias-border-l2:            rgba(124, 92, 214, .17);\n  --dsw-alias-border-l2-darkmode-thin: rgba(124, 92, 214, .17);\n  --dsw-alias-border-l3:            rgba(124, 92, 214, .26);\n  --dsw-alias-border-l4:            rgba(124, 92, 214, .34);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #1c1031;\n  --dsw-alias-label-secondary:      #8b7ca6;\n  --dsw-alias-label-tertiary:       #a395bc;\n  --dsw-alias-label-caption:        #ada1c2;\n  --dsw-alias-label-dimmed:         #d5c6ee;\n  --dsw-alias-label-primary-bluish: #492489;\n  --dsw-alias-label-primary-dimmed: #e4daf6;\n  --dsw-alias-brand-primary:        #7c3aed;\n  --dsw-alias-brand-primary-invert: #ffffff;\n  --dsw-alias-brand-text:           #7c3aed;\n  --dsw-alias-link:                 #7c3aed;\n  --dsw-alias-button-primary-fill:  #7c3aed;\n  --dsw-alias-button-primary-hover: #6d28d9;\n  --dsw-alias-button-primary-dimmed:#d5c6ee;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover:#f6f2fe;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-contrast-fill:#1c1031;\n  --dsw-alias-button-tool-bar-fill: rgba(124, 92, 214, .10);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(20, 48, 92, .16);\n  --dsw-alias-button-tool-bar-hover:rgba(124, 92, 214, .16);\n  --dsw-alias-interactive-bg-hover:        rgba(124, 92, 214, .07);\n  --dsw-alias-interactive-bg-active:       rgba(124, 92, 214, .12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(124, 92, 214, .16);\n  --dsw-alias-interactive-bg-hover-solid:  #f4effe;\n  --dsw-alias-state-business-primary:  #7c3aed;\n  --dsw-alias-state-business-tertiary: #f0e9fc;\n  --dsw-alias-toast-bg:                #483667;\n  --dsw-alias-tooltip-bg:              #3a2957;\n  --dsw-alias-scrollbar-bg-l1:      #e4daf6;\n  --dsw-alias-scrollbar-bg-l2:      #e4daf6;\n  --dsw-alias-scrollbar-hover-l1:   #d5c6ee;\n  --dsw-alias-scrollbar-hover-l2:   #d5c6ee;\n  --dsw-alias-markdown-code-block:         #f8fbff;\n  --dsw-alias-markdown-code-block-banner:  #f4effe;\n  --dsw-alias-markdown-inline-code:        #f6f2fe;\n  --dsw-alias-markdown-tag:                #f4effe;\n  --dsw-alias-markdown-citation:           #f0e9fc;\n  --dsw-elevation-stroke-color: rgba(124, 92, 214, .16);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(124, 92, 214, .10);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(124, 92, 214, .12);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(124, 92, 214, .18), 0 14px 38px 0 rgba(124, 92, 214, .20);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 10px 30px -12px rgba(124, 92, 214, .35), 0 0 24px 0 rgba(124, 92, 214, .10);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 24px 56px -24px rgba(124, 92, 214, .55), 0 0 30px 0 rgba(124, 92, 214, .16);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 16px 40px -18px rgba(124, 92, 214, .40), 0 0 30px 0 rgba(124, 92, 214, .12);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"][data-ds-dark-theme] {\n  /* 同上：页面底色由 body 渐变负责 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #20182f;\n  --dsw-alias-bg-layer-2:           #261d38;\n  --dsw-alias-bg-layer-3:           #302544;\n  --dsw-alias-bg-overlay:           #403159;\n  --dsw-alias-bg-module-platform:   #302544;\n  --dsw-alias-bg-multi-select:      #302543;\n  --dsw-alias-bg-skeleton:          rgba(162, 132, 255, .10);\n  --dsw-alias-bg-mask-drop:         rgba(12, 20, 36, .72);\n  --dsw-alias-border-l1:            rgba(162, 132, 255, .12);\n  --dsw-alias-border-l2:            rgba(162, 132, 255, .18);\n  --dsw-alias-border-l2-darkmode-thin: rgba(162, 132, 255, .12);\n  --dsw-alias-border-l3:            rgba(162, 132, 255, .26);\n  --dsw-alias-border-l4:            rgba(162, 132, 255, .36);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #f2ecfc;\n  --dsw-alias-label-secondary:      #d7cee6;\n  --dsw-alias-label-tertiary:       #b5a9ca;\n  --dsw-alias-label-caption:        #968aaa;\n  --dsw-alias-label-dimmed:         #60517a;\n  --dsw-alias-label-primary-bluish: #e3d6f8;\n  --dsw-alias-label-primary-dimmed: #302543;\n  --dsw-alias-brand-primary:        #a78bfa;\n  --dsw-alias-brand-primary-invert: #130e1c;\n  --dsw-alias-brand-text:           #c4b5fd;\n  --dsw-alias-link:                 #c4b5fd;\n  --dsw-alias-button-primary-fill:  #a78bfa;\n  --dsw-alias-button-primary-hover: #7c3aed;\n  --dsw-alias-button-primary-dimmed:#4e3f68;\n  --dsw-alias-button-floating-fill: #261d38;\n  --dsw-alias-button-floating-hover:#302544;\n  --dsw-alias-button-elevated-fill: #403159;\n  --dsw-alias-button-tool-bar-fill: rgba(162, 132, 255, .14);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(8, 16, 32, .36);\n  --dsw-alias-button-tool-bar-hover:rgba(162, 132, 255, .22);\n  --dsw-alias-interactive-bg-hover:        rgba(162, 132, 255, .12);\n  --dsw-alias-interactive-bg-active:       rgba(162, 132, 255, .20);\n  --dsw-alias-interactive-bg-hover-accent: rgba(162, 132, 255, .28);\n  --dsw-alias-interactive-bg-hover-solid:  #302544;\n  --dsw-alias-state-business-primary:  #a78bfa;\n  --dsw-alias-state-business-tertiary: #261d38;\n  --dsw-alias-toast-bg:                #302544;\n  --dsw-alias-tooltip-bg:              #403159;\n  --dsw-alias-scrollbar-bg-l1:      #4e3f68;\n  --dsw-alias-scrollbar-bg-l2:      #4e3f68;\n  --dsw-alias-scrollbar-hover-l1:   #60517a;\n  --dsw-alias-scrollbar-hover-l2:   #60517a;\n  --dsw-alias-markdown-code-block:         #20182f;\n  --dsw-alias-markdown-code-block-banner:  #302543;\n  --dsw-alias-markdown-inline-code:        #302543;\n  --dsw-alias-markdown-tag:                #302544;\n  --dsw-alias-markdown-citation:           #302543;\n  --dsw-elevation-stroke-color: rgba(162, 132, 255, .18);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(0, 0, 0, .45);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(0, 0, 0, .50);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(162, 132, 255, .22), 0 14px 38px 0 rgba(0, 0, 0, .60);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 4px 12px 0 rgba(0, 0, 0, .35), 0 0 22px 0 rgba(162, 132, 255, .18);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 4px 14px 0 rgba(0, 0, 0, .40), 0 0 26px 0 rgba(162, 132, 255, .26);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 6px 20px 0 rgba(0, 0, 0, .35), 0 0 30px 0 rgba(162, 132, 255, .18);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"]:not([data-ds-dark-theme]) {\n  background-color: #ece7ff;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(140, 110, 240, .30), transparent 64%),\n    linear-gradient(180deg, #fbfaff 0%, #ece7ff 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"][data-ds-dark-theme] {\n  background-color: #0b0813;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(124, 58, 237, .30), transparent 64%),\n    linear-gradient(180deg, #100c1c 0%, #0b0813 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"]:not([data-ds-dark-theme]) { --dsh-skin-accent: #7c3aed; --dsh-skin-accent-rgb: 124, 58, 237; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"][data-ds-dark-theme] { --dsh-skin-accent: #a78bfa; --dsh-skin-accent-rgb: 167, 139, 250; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"] #dsh-ocean-fx { --dsh-fx: 140, 110, 240; --dsh-fx-grid: .042; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"purple\"][data-ds-dark-theme] #dsh-ocean-fx { --dsh-fx: 170, 145, 255; --dsh-fx-grid: .055; }\n\n/* ============ 色相：玫红 ============ */\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"] {\n  --dsw-static-neutral-bluish-00:   #ffffff;\n  --dsw-static-neutral-bluish-50:   #f8fbff;\n  --dsw-static-neutral-bluish-60:   #fff4f7;\n  --dsw-static-neutral-bluish-75:   #ffeef2;\n  --dsw-static-neutral-bluish-100:  #fce9ed;\n  --dsw-static-neutral-bluish-150:  #f9e2e7;\n  --dsw-static-neutral-bluish-200:  #f7d9df;\n  --dsw-static-neutral-bluish-300:  #efc5ce;\n  --dsw-static-neutral-bluish-400:  #d8a8b3;\n  --dsw-static-neutral-bluish-500:  #c5909c;\n  --dsw-static-neutral-bluish-600:  #a77b85;\n  --dsw-static-neutral-bluish-700:  #996470;\n  --dsw-static-neutral-bluish-750:  #7b4652;\n  --dsw-static-neutral-bluish-800:  #693440;\n  --dsw-static-neutral-bluish-850:  #592732;\n  --dsw-static-neutral-bluish-875:  #411d25;\n  --dsw-static-neutral-bluish-900:  #30151b;\n  --dsw-static-neutral-bluish-950:  #18080c;\n  --dsw-static-neutral-bluish-1000: #230d12;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"]:not([data-ds-dark-theme]) {\n  /* 页面底色交给 body 的渐变来画；令该令牌透明，避免任何容器遮挡特效层 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #ffffff;\n  --dsw-alias-bg-layer-2:           #ffffff;\n  --dsw-alias-bg-layer-3:           #f8fbff;\n  --dsw-alias-bg-overlay:           #feeaee;\n  --dsw-alias-bg-module-platform:   #ffeef2;\n  --dsw-alias-bg-multi-select:      #ffeef2;\n  --dsw-alias-bg-skeleton:          rgba(225, 29, 72, .06);\n  --dsw-alias-bg-mask-drop:         rgba(255, 255, 255, .72);\n  --dsw-alias-border-l1:            rgba(225, 29, 72, .10);\n  --dsw-alias-border-l2:            rgba(225, 29, 72, .17);\n  --dsw-alias-border-l2-darkmode-thin: rgba(225, 29, 72, .17);\n  --dsw-alias-border-l3:            rgba(225, 29, 72, .26);\n  --dsw-alias-border-l4:            rgba(225, 29, 72, .34);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #320f17;\n  --dsw-alias-label-secondary:      #a77b85;\n  --dsw-alias-label-tertiary:       #bd949d;\n  --dsw-alias-label-caption:        #c3a0a8;\n  --dsw-alias-label-dimmed:         #efc5ce;\n  --dsw-alias-label-primary-bluish: #8c2138;\n  --dsw-alias-label-primary-dimmed: #f7d9df;\n  --dsw-alias-brand-primary:        #e11d48;\n  --dsw-alias-brand-primary-invert: #ffffff;\n  --dsw-alias-brand-text:           #e11d48;\n  --dsw-alias-link:                 #e11d48;\n  --dsw-alias-button-primary-fill:  #e11d48;\n  --dsw-alias-button-primary-hover: #be123c;\n  --dsw-alias-button-primary-dimmed:#efc5ce;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover:#fff1f4;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-contrast-fill:#320f17;\n  --dsw-alias-button-tool-bar-fill: rgba(225, 29, 72, .10);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(20, 48, 92, .16);\n  --dsw-alias-button-tool-bar-hover:rgba(225, 29, 72, .16);\n  --dsw-alias-interactive-bg-hover:        rgba(225, 29, 72, .07);\n  --dsw-alias-interactive-bg-active:       rgba(225, 29, 72, .12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(225, 29, 72, .16);\n  --dsw-alias-interactive-bg-hover-solid:  #ffeef2;\n  --dsw-alias-state-business-primary:  #e11d48;\n  --dsw-alias-state-business-tertiary: #fce9ed;\n  --dsw-alias-toast-bg:                #693440;\n  --dsw-alias-tooltip-bg:              #592732;\n  --dsw-alias-scrollbar-bg-l1:      #f7d9df;\n  --dsw-alias-scrollbar-bg-l2:      #f7d9df;\n  --dsw-alias-scrollbar-hover-l1:   #efc5ce;\n  --dsw-alias-scrollbar-hover-l2:   #efc5ce;\n  --dsw-alias-markdown-code-block:         #f8fbff;\n  --dsw-alias-markdown-code-block-banner:  #ffeef2;\n  --dsw-alias-markdown-inline-code:        #fff1f4;\n  --dsw-alias-markdown-tag:                #ffeef2;\n  --dsw-alias-markdown-citation:           #fce9ed;\n  --dsw-elevation-stroke-color: rgba(225, 29, 72, .16);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(225, 29, 72, .10);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(225, 29, 72, .12);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(225, 29, 72, .18), 0 14px 38px 0 rgba(225, 29, 72, .20);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 10px 30px -12px rgba(225, 29, 72, .35), 0 0 24px 0 rgba(225, 29, 72, .10);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 24px 56px -24px rgba(225, 29, 72, .55), 0 0 30px 0 rgba(225, 29, 72, .16);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 16px 40px -18px rgba(225, 29, 72, .40), 0 0 30px 0 rgba(225, 29, 72, .12);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"][data-ds-dark-theme] {\n  /* 同上：页面底色由 body 渐变负责 */\n  --dsw-alias-bg-base:              transparent;\n  --dsw-alias-bg-layer-1:           #31181d;\n  --dsw-alias-bg-layer-2:           #3a1c23;\n  --dsw-alias-bg-layer-3:           #47242c;\n  --dsw-alias-bg-overlay:           #5c313a;\n  --dsw-alias-bg-module-platform:   #47242c;\n  --dsw-alias-bg-multi-select:      #46252c;\n  --dsw-alias-bg-skeleton:          rgba(255, 120, 150, .10);\n  --dsw-alias-bg-mask-drop:         rgba(12, 20, 36, .72);\n  --dsw-alias-border-l1:            rgba(255, 120, 150, .12);\n  --dsw-alias-border-l2:            rgba(255, 120, 150, .18);\n  --dsw-alias-border-l2-darkmode-thin: rgba(255, 120, 150, .12);\n  --dsw-alias-border-l3:            rgba(255, 120, 150, .26);\n  --dsw-alias-border-l4:            rgba(255, 120, 150, .36);\n  --dsw-alias-border-inverted:      rgba(255, 255, 255, .60);\n  --dsw-alias-border-inverted2:     rgba(255, 255, 255, .40);\n  --dsw-alias-label-primary:        #fcecef;\n  --dsw-alias-label-secondary:      #e7cfd5;\n  --dsw-alias-label-tertiary:       #cca9b1;\n  --dsw-alias-label-caption:        #ac8a92;\n  --dsw-alias-label-dimmed:         #7d515a;\n  --dsw-alias-label-primary-bluish: #f9d5dd;\n  --dsw-alias-label-primary-dimmed: #46252c;\n  --dsw-alias-brand-primary:        #fb7185;\n  --dsw-alias-brand-primary-invert: #1f0e12;\n  --dsw-alias-brand-text:           #fda4af;\n  --dsw-alias-link:                 #fda4af;\n  --dsw-alias-button-primary-fill:  #fb7185;\n  --dsw-alias-button-primary-hover: #e11d48;\n  --dsw-alias-button-primary-dimmed:#6b3f48;\n  --dsw-alias-button-floating-fill: #3a1c23;\n  --dsw-alias-button-floating-hover:#47242c;\n  --dsw-alias-button-elevated-fill: #5c313a;\n  --dsw-alias-button-tool-bar-fill: rgba(255, 120, 150, .14);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(8, 16, 32, .36);\n  --dsw-alias-button-tool-bar-hover:rgba(255, 120, 150, .22);\n  --dsw-alias-interactive-bg-hover:        rgba(255, 120, 150, .12);\n  --dsw-alias-interactive-bg-active:       rgba(255, 120, 150, .20);\n  --dsw-alias-interactive-bg-hover-accent: rgba(255, 120, 150, .28);\n  --dsw-alias-interactive-bg-hover-solid:  #47242c;\n  --dsw-alias-state-business-primary:  #fb7185;\n  --dsw-alias-state-business-tertiary: #3a1c23;\n  --dsw-alias-toast-bg:                #47242c;\n  --dsw-alias-tooltip-bg:              #5c313a;\n  --dsw-alias-scrollbar-bg-l1:      #6b3f48;\n  --dsw-alias-scrollbar-bg-l2:      #6b3f48;\n  --dsw-alias-scrollbar-hover-l1:   #7d515a;\n  --dsw-alias-scrollbar-hover-l2:   #7d515a;\n  --dsw-alias-markdown-code-block:         #31181d;\n  --dsw-alias-markdown-code-block-banner:  #46252c;\n  --dsw-alias-markdown-inline-code:        #46252c;\n  --dsw-alias-markdown-tag:                #47242c;\n  --dsw-alias-markdown-citation:           #46252c;\n  --dsw-elevation-stroke-color: rgba(255, 120, 150, .18);\n  --dsw-shadow-lv1: 0 2px 6px 0 rgba(0, 0, 0, .45);\n  --dsw-shadow-lv2: 0 6px 18px 0 rgba(0, 0, 0, .50);\n  --dsw-shadow-lv3: 0 0 1px 0 rgba(255, 120, 150, .22), 0 14px 38px 0 rgba(0, 0, 0, .60);\n  --dsw-elevation-panel:     var(--dsw-elevation-stroke), 0 4px 12px 0 rgba(0, 0, 0, .35), 0 0 22px 0 rgba(255, 120, 150, .18);\n  --dsw-elevation-prominent: var(--dsw-elevation-stroke), 0 4px 14px 0 rgba(0, 0, 0, .40), 0 0 26px 0 rgba(255, 120, 150, .26);\n  --dsw-elevation-soft:      var(--dsw-elevation-stroke), 0 6px 20px 0 rgba(0, 0, 0, .35), 0 0 30px 0 rgba(255, 120, 150, .18);\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"]:not([data-ds-dark-theme]) {\n  background-color: #ffe4ea;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(240, 90, 120, .28), transparent 64%),\n    linear-gradient(180deg, #fffafb 0%, #ffe4ea 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"][data-ds-dark-theme] {\n  background-color: #12080c;\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, rgba(225, 29, 72, .28), transparent 64%),\n    linear-gradient(180deg, #1a0c11 0%, #12080c 100%);\n  background-attachment: fixed;\n}\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"]:not([data-ds-dark-theme]) { --dsh-skin-accent: #e11d48; --dsh-skin-accent-rgb: 225, 29, 72; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"][data-ds-dark-theme] { --dsh-skin-accent: #fb7185; --dsh-skin-accent-rgb: 251, 113, 133; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"] #dsh-ocean-fx { --dsh-fx: 240, 90, 120; --dsh-fx-grid: .042; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-hue=\"rose\"][data-ds-dark-theme] #dsh-ocean-fx { --dsh-fx: 255, 130, 155; --dsh-fx-grid: .055; }\n 处插入\n   · 全部为增量覆盖：样式标签 + 特效层节点 + body 属性，关闭即 100% 复原\n   ===================================================================== */\n\n/* ---------- P2 页面层：让 body 的底色/渐变透出来 ----------\n   选择器全部走 data-slot 结构（不用哈希类名，抗版本升级） */\nbody[data-dsh-skin=\"ocean\"] [data-slot=\"root\"] > *,\nbody[data-dsh-skin=\"ocean\"] [data-slot=\"main.conversation\"] > *,\nbody[data-dsh-skin=\"ocean\"] [data-slot=\"conversation.session\"] > *,\nbody[data-dsh-skin=\"ocean\"] [data-slot=\"conversation.view\"] > *,\nbody[data-dsh-skin=\"ocean\"] [data-slot=\"conversation.composer\"] > * {\n  background-color: transparent;\n  background-image: none;\n}\n\n/* ---------- L3 特效层：六边形网格 + 数字波纹 ---------- */\n#dsh-ocean-fx {\n  position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden;\n  --dsh-fx: 79, 140, 255;\n  --dsh-fx-grid: .042;\n}\n#dsh-ocean-fx canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }\nbody[data-dsh-skin=\"ocean\"][data-dsh-fx=\"off\"] #dsh-ocean-fx { display: none; }\n/* 排查用：某些版本若仍被不透明容器遮挡，可把特效层强行提到最上层 */\nbody[data-dsh-skin=\"ocean\"][data-dsh-fx-top=\"1\"] #dsh-ocean-fx { z-index: 9999; }\n\n/* ---------- P4 设置面板 ---------- */\n.dshsk_section { max-width: 760px; display: flex; flex-direction: column; gap: 14px; color: var(--dsw-alias-label-primary); }\n.dshsk_heading { margin: 0; font-size: 16px; font-weight: 700; }\n.dshsk_intro { margin: 0; font-size: 13px; line-height: 1.7; color: var(--dsw-alias-label-tertiary); }\n.dshsk_row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 14px; border-radius: 12px;\n             background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l2); }\n.dshsk_text { flex: 0 1 auto; min-width: 0; max-width: min(46%, 320px); }\n.dshsk_label { font-size: 14px; }\n.dshsk_hint { font-size: 12px; color: var(--dsw-alias-label-tertiary); margin-top: 2px; }\n.dshsk_group { display: flex; gap: 6px; flex: 0 1 auto; min-width: 0; }\n/* 配色色条：横向可滑动，隐藏滚动条 */\n.dshsk_stripwrap { display: flex; align-items: center; gap: 2px; flex: 0 1 auto; min-width: 0; }\n.dshsk_strip { display: flex; align-items: center; gap: 6px; overflow-x: auto; padding: 5px 0;\n               scrollbar-width: none; -ms-overflow-style: none; scroll-snap-type: x proximity; scroll-behavior: smooth; }\n.dshsk_strip::-webkit-scrollbar { display: none; }\n.dshsk_strip .dshsk_btn { flex: none; scroll-snap-align: start; }\n/* 色条宽度由 JS 量成\"恰好 4 个按钮\"，超出部分滚出视野 */\n.dshsk_strip { max-width: 100%; }\n/* 箭头是普通 flex 项（与色条并排），占据真实空间 —— 结构上不可能压住按钮 */\n.dshsk_nav { flex: none; width: 16px; height: 24px; padding: 0; border: 0; margin: 0;\n             display: flex; align-items: center; justify-content: center;\n             background: transparent; cursor: pointer; color: var(--dsw-alias-label-tertiary); }\n.dshsk_nav::before { content: ''; width: 6px; height: 6px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; }\n.dshsk_nav[data-side=\"right\"]::before { transform: rotate(-45deg); }\n.dshsk_nav[data-side=\"left\"]::before  { transform: rotate(135deg); }\n.dshsk_nav:hover { color: var(--dsw-alias-label-primary); }\n.dshsk_btn[data-dim=\"true\"] { opacity: .5; }\n.dshsk_btn { border: 1px solid var(--dsw-alias-border-l2); background: transparent; color: var(--dsw-alias-label-secondary);\n             font: inherit; font-size: 13px; padding: 6px 12px; border-radius: 999px; cursor: pointer; white-space: nowrap; }\n/* 选中态：同色柔光 + 隐藏色块（色块与背景同色会看不见，且会把文字挤偏） */\n.dshsk_btn[data-on=\"true\"] { background: var(--dsh-skin-accent, #2563eb); border-color: transparent; color: #fff;\n                             box-shadow: 0 0 0 3px rgba(var(--dsh-skin-accent-rgb, 37, 99, 235), .22); }\n.dshsk_btn[data-on=\"true\"] .dshsk_swatch { display: none; }\n.dshsk_btn:hover { border-color: var(--dsw-alias-border-l3); }\n.dshsk_swatch { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 6px; vertical-align: -1px; }\n\n/*__PALETTES__*/\n";
		const tagId = "dsh-ui-skin-wave/skin.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-ui-skin-wave";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion

		//#region 状态与持久化（localStorage：同步读，避免首帧闪默认色）
		const LS_KEY = "dsh.skin.ocean";
		// hue: 色相（blue/orange/green/gray）；明暗仍由 DSH 的「设置→通用→外观」控制
		const DEFAULTS = { on: true, fx: true, strength: 1, hue: "blue", fxTop: false };
		function loadState() {
			try {
				const raw = localStorage.getItem(LS_KEY);
				return raw ? Object.assign({}, DEFAULTS, JSON.parse(raw)) : Object.assign({}, DEFAULTS);
			} catch (e) { return Object.assign({}, DEFAULTS); }
		}
		function saveState(s) { try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch (e) {} }
		let state = loadState();
		//#endregion

		//#region L3 六边形数字波纹引擎（与原型 dsh-home-blue-home 同一套算法）
		function createFx() {
			const R = 19, COL = 1.5 * R, ROW = Math.sqrt(3) * R;
			const LIFE = 1000, MAXW = 5, MIN_DIST = 54, MIN_GAP = 95;
			const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			let host = null, gridCv = null, waveCv = null, gctx = null, wctx = null;
			let W = 0, H = 0, DPR = 1, rgb = "79,140,255", gridA = 0.042, strength = 1;
			let cells = [], waves = [];
			let running = false, lastTs = 0, lastX = -1e5, lastY = -1e5, lastT = 0;

			function hexPath(ctx, x, y, r) {
				ctx.beginPath();
				for (let i = 0; i < 6; i++) {
					const a = Math.PI / 180 * (60 * i);
					const px = x + r * Math.cos(a), py = y + r * Math.sin(a);
					if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
				}
				ctx.closePath();
			}
			function readTheme() {
				if (!host) return;
				const cs = getComputedStyle(host);
				rgb = (cs.getPropertyValue("--dsh-fx") || "79,140,255").trim();
				gridA = parseFloat(cs.getPropertyValue("--dsh-fx-grid")) || 0;
			}
			function build() {
				if (!host) return;
				readTheme();
				DPR = Math.min(window.devicePixelRatio || 1, 2);
				W = host.clientWidth; H = host.clientHeight;
				if (!W || !H) return;
				[gridCv, waveCv].forEach((c) => {
					c.width = Math.round(W * DPR); c.height = Math.round(H * DPR);
					c.getContext("2d").setTransform(DPR, 0, 0, DPR, 0, 0);
				});
				cells.length = 0;
				gctx.clearRect(0, 0, W, H);
				const cols = Math.ceil(W / COL) + 2, rows = Math.ceil(H / ROW) + 2;
				gctx.lineWidth = 1;
				gctx.strokeStyle = "rgba(" + rgb + "," + gridA + ")";
				for (let c = -1; c <= cols; c++) {
					const x = c * COL;
					const yOff = ((c % 2) + 2) % 2 ? ROW / 2 : 0;
					for (let r = -1; r <= rows; r++) {
						const y = r * ROW + yOff;
						cells.push(x, y);
						hexPath(gctx, x, y, R - 1.3);
						gctx.stroke();
					}
				}
			}
			function spawn(x, y, power, scale) {
				if (reduce || !host || !wctx) return;
				waves.push({ x: x, y: y, t: 0, p: power || 1, k: scale || 1 });
				if (waves.length > MAXW) waves.shift();
				if (!running) { running = true; lastTs = 0; requestAnimationFrame(frame); }
			}
			function frame(ts) {
				// 卸载后可能仍有已排队的帧：直接停循环，别碰空上下文
				if (!host || !wctx || !waveCv) { running = false; lastTs = 0; return; }
				if (!lastTs) lastTs = ts;
				const dt = Math.min(48, ts - lastTs);
				lastTs = ts;
				wctx.clearRect(0, 0, W, H);
				let alive = 0;
				for (let i = 0; i < waves.length; i++) {
					const w = waves[i];
					w.t += dt;
					const life = LIFE * w.p;
					if (w.t >= life) continue;
					alive++;
					const prog = w.t / life;
					const front = (22 + 150 * Math.pow(prog, 0.72)) * w.k;
					const sig = (13 + 17 * prog) * Math.sqrt(w.k);
					const lo = front - 3 * sig, hi = front + 3 * sig;
					const amax = 0.72 * strength * (1 - prog) * (reduce ? 0 : 1);
					const i2 = sig * sig;
					for (let k = 0; k < cells.length; k += 2) {
						const cx = cells[k], cy = cells[k + 1];
						const dx = cx - w.x, dy = cy - w.y;
						const d2 = dx * dx + dy * dy;
						if (d2 < lo * lo || d2 > hi * hi) continue;
						const d = Math.sqrt(d2);
						const diff = d - front;
						const a = amax * Math.exp(-(diff * diff) / i2);
						if (a < 0.02) continue;
						hexPath(wctx, cx, cy, R - 1.6);
						wctx.fillStyle = "rgba(" + rgb + "," + (a * 0.16).toFixed(3) + ")";
						wctx.fill();
						wctx.strokeStyle = "rgba(" + rgb + "," + (a > 0.72 ? 0.72 : a).toFixed(3) + ")";
						wctx.lineWidth = 1.15;
						wctx.stroke();
					}
					if (prog < 0.66) {
						const fp = prog / 0.66;
						const ca = Math.min(1, fp / 0.10) * Math.pow(1 - fp, 0.85) * strength;
						const rad = (6 + 10 * fp) * w.k;
						const grd = wctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, rad * 1.9);
						grd.addColorStop(0, "rgba(255,255,255," + Math.min(1, 0.38 * ca).toFixed(3) + ")");
						grd.addColorStop(0.30, "rgba(" + rgb + "," + Math.min(1, 0.34 * ca).toFixed(3) + ")");
						grd.addColorStop(1, "rgba(" + rgb + ",0)");
						wctx.fillStyle = grd;
						wctx.beginPath();
						wctx.arc(w.x, w.y, rad * 1.9, 0, 6.2832);
						wctx.fill();
					}
				}
				const keep = [];
				for (let j = 0; j < waves.length; j++) if (waves[j].t < LIFE * waves[j].p) keep.push(waves[j]);
				waves = keep;
				if (alive || waves.length) requestAnimationFrame(frame);
				else { running = false; lastTs = 0; wctx.clearRect(0, 0, W, H); }
			}
			function onMove(e) {
				const now = performance.now();
				const dx = e.clientX - lastX, dy = e.clientY - lastY;
				if (dx * dx + dy * dy < MIN_DIST * MIN_DIST) return;
				if (now - lastT < MIN_GAP) return;
				lastX = e.clientX; lastY = e.clientY; lastT = now;
				spawn(e.clientX, e.clientY, 1);
			}
			function onDown(e) {
				if (e.button !== 0 && e.pointerType === "mouse") return;
				spawn(e.clientX, e.clientY, 1.5, 1.5);
			}
			let rt = 0;
			function onResize() { clearTimeout(rt); rt = setTimeout(build, 180); }
			function mount() {
				if (host) return;   // 系统「减少动态效果」时仍然挂载：网格保留，只是不生成波纹
				host = document.createElement("div");
				host.id = "dsh-ocean-fx";
				gridCv = document.createElement("canvas");
				waveCv = document.createElement("canvas");
				host.appendChild(gridCv); host.appendChild(waveCv);
				document.body.appendChild(host);
				gctx = gridCv.getContext("2d"); wctx = waveCv.getContext("2d");
				build();
				window.addEventListener("mousemove", onMove, { passive: true });
				window.addEventListener("pointerdown", onDown, { passive: true });
				window.addEventListener("resize", onResize);
				window.addEventListener("dsh:skin", build);
			}
			function unmount() {
				if (!host) return;
				window.removeEventListener("mousemove", onMove);
				window.removeEventListener("pointerdown", onDown);
				window.removeEventListener("resize", onResize);
				window.removeEventListener("dsh:skin", build);
				host.remove();
				host = null; gridCv = null; waveCv = null; gctx = null; wctx = null;
				cells.length = 0; waves.length = 0; running = false;
			}
			return {
				set: function (on, st) {
					strength = st || 1;
					if (on) { if (!host) mount(); else build(); } else if (host) unmount();
				},
				destroy: unmount,
				info: function () { return { mounted: !!host, cells: cells.length / 2, waves: waves.length, reduced: reduce, w: W, h: H }; }
			};
		}
		const fx = createFx();
		//#endregion

		//#region 应用 / 复原
		function applyState() {
			const body = document.body;
			if (state.on) body.dataset.dshSkin = "ocean"; else delete body.dataset.dshSkin;
			body.dataset.dshHue = state.hue || "blue";
			body.dataset.dshFx = state.on && state.fx ? "on" : "off";
			if (state.on && state.fx && state.fxTop) body.dataset.dshFxTop = "1"; else delete body.dataset.dshFxTop;
			fx.set(state.on && state.fx, state.strength);
		}
		//#endregion

		//#region P4 设置面板
		function patch(key, value) { const p = {}; p[key] = value; return p; }
		function reduceFlag() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
		function Row(props) {
			return jsx("div", {
				className: "dshsk_row",
				children: [
					jsx("div", {
						className: "dshsk_text",
						children: [
							jsx("div", { className: "dshsk_label", children: props.title }),
							props.hint ? jsx("div", { className: "dshsk_hint", children: props.hint }) : null
						]
					}),
					jsx("div", { className: "dshsk_group", children: props.children })
				]
			});
		}
		function Btn(props) {
			return jsx("button", {
				className: "dshsk_btn",
				"data-on": String(props.on),
				"data-dim": String(!!props.dim),
				onClick: props.onClick,
				children: props.children
			});
		}
		// 由构建脚本按 skin/hues.json 注入，保证与 skin.css 里的调色板一一对应
		const HUES = [
		   {
		      "key": "blue",
		      "label": "蓝色",
		      "swatch": "#2563eb",
		      "primary": true
		   },
		   {
		      "key": "orange",
		      "label": "橘色",
		      "swatch": "#e2670a",
		      "primary": true
		   },
		   {
		      "key": "green",
		      "label": "绿色",
		      "swatch": "#0f9d63",
		      "primary": true
		   },
		   {
		      "key": "gray",
		      "label": "灰色",
		      "swatch": "#4b5563",
		      "primary": true
		   },
		   {
		      "key": "purple",
		      "label": "紫色",
		      "swatch": "#7c3aed",
		      "primary": false
		   },
		   {
		      "key": "rose",
		      "label": "玫红",
		      "swatch": "#e11d48",
		      "primary": false
		   }
		];
		/** 配色色条：可横滑；内容溢出时两端浮现箭头提示 */
		function HueStrip(props) {
			const ref = react.useRef(null);
			const pair = react.useState({ left: false, right: false });
			const ov = pair[0], setOv = pair[1];
			const VISIBLE = 4;   // 可视区恰好放 4 个按钮，其余滚出视野
			const measure = function () {
				const el = ref.current;
				if (!el || !el.scrollWidth) return;
				// 量出"前 4 个按钮"占的总宽，写死为色条可视宽度（第 5 个起自动落在视野外）
				const btns = el.querySelectorAll(".dshsk_btn");
				if (btns.length > VISIBLE) {
					const w = btns[VISIBLE].offsetLeft - btns[0].offsetLeft;
					if (w > 0 && Math.abs(el.offsetWidth - w) > 1) el.style.width = w + "px";
				}
				const left = el.scrollLeft > 4;
				const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
				setOv(function (p) { return (p.left === left && p.right === right) ? p : { left: left, right: right }; });
			};
			react.useEffect(function () {
				measure();
				const timer = setTimeout(measure, 80);
				window.addEventListener("resize", measure);
				return function () { clearTimeout(timer); window.removeEventListener("resize", measure); };
			}, []);
			const nudge = function (dir) {
				const el = ref.current;
				if (el && el.scrollBy) el.scrollBy({ left: dir * 150, behavior: "smooth" });
			};
			return jsx("div", {
				className: "dshsk_stripwrap",
				"data-left": String(ov.left),
				"data-right": String(ov.right),
				children: [
					ov.left ? jsx("button", { key: "l", className: "dshsk_nav", "data-side": "left", title: "向左", onClick: function () { nudge(-1); } }) : null,
					jsx("div", { key: "s", className: "dshsk_strip", ref: ref, onScroll: measure, children: props.children }),
					ov.right ? jsx("button", { key: "r", className: "dshsk_nav", "data-side": "right", title: "向右", onClick: function () { nudge(1); } }) : null
				]
			});
		}
		function SkinSection() {
			const bump = react.useState(0)[1];
			function update(p) {
				state = Object.assign({}, state, p);
				saveState(state);
				applyState();
				bump(function (n) { return n + 1; });
			}
			const info = fx.info();
			const cs = getComputedStyle(document.body);
			const line = "底 " + cs.getPropertyValue("--dsw-alias-bg-base").trim() +
				" · 卡片 " + cs.getPropertyValue("--dsw-alias-bg-layer-1").trim() +
				" · 主色 " + cs.getPropertyValue("--dsw-alias-brand-primary").trim() +
				" · 特效层 " + (info.mounted ? "已挂载 " + info.cells + " 格" + (info.w > 0 ? " (" + info.w + "x" + info.h + ")" : " ⚠尺寸为0") : "未挂载") +
				(reduceFlag() ? " · 系统已开启减少动态效果（只显示网格）" : "");
			/** 色条：首选 4 色 + 细分隔线 + 其余色（都可点选） */
			const hueStrip = function () {
				const nodes = [];
				HUES.forEach(function (h, i) {
					nodes.push(jsx(Btn, {
						key: h.key,
						on: state.hue === h.key,
						dim: !h.primary,
						onClick: function () { update(patch("hue", h.key)); },
						children: [
							jsx("span", { className: "dshsk_swatch", style: { background: h.swatch } }),
							h.label
						]
					}));
				});
				return nodes;
			};
			const onOff = function (key, on) {
				return [
					jsx(Btn, { on: on, onClick: function () { update(patch(key, true)); }, children: "开" }),
					jsx(Btn, { on: !on, onClick: function () { update(patch(key, false)); }, children: "关" })
				];
			};
			return jsx("div", {
				className: "dshsk_section",
				children: [
					jsx("h2", { className: "dshsk_heading", children: "皮肤配色" }),
					jsx("p", {
						className: "dshsk_intro",
						children: "给 DSH 换一套配色（蓝 / 橘 / 绿 / 灰），并可在页面上泛起六边形数字波纹。深浅色系跟随 设置 → 通用 → 外观；全部为增量覆盖，关闭后立即恢复默认样式。"
					}),
					jsx(Row, { title: "皮肤", hint: "总开关；关闭即 100% 恢复 DSH 默认外观", children: onOff("on", state.on) }),
					jsx(Row, {
						title: "配色",
						hint: ["可左右滑动查看全部 " + HUES.length + " 色；深浅色系", jsx("br", { key: "br" }), "仍由 设置 → 通用 → 外观 控制"],
						children: jsx(HueStrip, { children: hueStrip() })
					}),
					jsx(Row, { title: "波纹特效", hint: "鼠标移动泛起六边形波纹；受系统「减少动态效果」约束", children: onOff("fx", state.fx) }),
					jsx(Row, {
						title: "波纹强度",
						hint: "影响波纹的不透明度",
						children: [
							jsx(Btn, { on: state.strength === 0.6, onClick: function () { update(patch("strength", 0.6)); }, children: "淡" }),
							jsx(Btn, { on: state.strength === 1, onClick: function () { update(patch("strength", 1)); }, children: "标准" }),
							jsx(Btn, { on: state.strength === 1.5, onClick: function () { update(patch("strength", 1.5)); }, children: "明显" })
						]
					}),
					jsx(Row, { title: "特效层置顶", hint: "排查用：若波纹被界面底色遮住，打开此项可强行置顶", children: onOff("fxTop", state.fxTop) }),
						jsx("div", { className: "dshsk_hint", children: line })
				]
			});
		}
		//#endregion

		/**
		 * 客户端插件入口：立即应用皮肤（首帧不闪），注册设置区块。
		 */
		function apply(ctx) {
			applyState();
			ctx.effect(function () { return function () { fx.destroy(); }; }, "ocean-skin:fx");
			ctx.slots.inject("settings.section", function () {
				return ctx.slots.register({
					name: "settings.section",
					id: "skin",
					order: 17,
					label: function () { return "皮肤"; }
				}, SkinSection);
			});
		}
		exports.apply = apply;
		exports.inject = ["slots"];
		return module.exports;
	}
});
