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
		const css = __SKIN_CSS__;
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
		const DEFAULTS = { on: true, fx: true, strength: 1, hue: __SKIN_DEFAULT_HUE__, fxTop: false };
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
		const HUES = __SKIN_HUES__;
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
