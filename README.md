# dsh-ui-skin-wave

**中文** | [English](README.en.md)

DSH Web GUI 的**皮肤插件**：六套配色（蓝 / 橘 / 绿 / 灰 / 紫 / 玫红）× 明暗两系，外加页面上可开关的**六边形数字波纹**特效。

- 完全**增量**：一个 style 标签、一个特效层 div、三个 body 属性；关闭即 100% 恢复 DSH 默认外观；
- 不改动任何 DSH 上游文件，DSH 升级不会覆盖它；
- 深浅色系交给 DSH 自带的「设置 → 通用 → 外观」，插件只管色相。

---

## 界面预览

**新会话页 · 蓝色** —— 鼠标划过时，六边形波纹铺满整页：

![新会话页 蓝色](design/preview.png)

**新会话页 · 紫色** —— 同一布局换一种配色，其余完全一致：

![新会话页 紫色](design/ui-home-ripple.png)

**皮肤设置页** —— 六色色条、四个开关、底部实时诊断行；浅色下选中态带同色柔光：

| 设置页 · 深海蓝 | 设置页 · 浅色（灰色选中） |
|---|---|
| ![设置页 深色](design/ui-settings-blue.png) | ![设置页 浅色](design/ui-settings-light.png) |
| 六色色条 · 四个开关 · 底部实时诊断行 | 色条可横滑，选中态带同色柔光 |

> 截图中的会话名、项目名与示例内容均为**演示用途**，非真实数据。

---

## 一、前置条件

| 项 | 要求 |
|---|---|
| DSH | Web GUI 可正常启动（dsh web） |
| Node.js | 18+（构建与安装脚本都用 Node 实现） |
| profile | 默认 web profile —— Windows：%USERPROFILE%\.dsh\profiles\web；macOS / Linux：~/.dsh/profiles/web |
| pnpm | 可在 profile 目录执行（DSH 自带环境即可） |
| 权限 | 能写 profile 目录（克隆位置随意，构建链用的是仓库内相对路径） |

### 平台支持

**插件运行时是纯浏览器 JS，三个平台完全一致** —— 皮肤就是一段 CSS 加一个 canvas 特效层，不碰系统 API。
需要区分的只有**安装脚本**，它由同一份 Node 实现驱动：

| 平台 | 安装命令 |
|---|---|
| Windows | powershell -ExecutionPolicy Bypass -File install.ps1（转发到 install.mjs） |
| **macOS** | ./install.sh 或 node install.mjs |
| Linux | ./install.sh 或 node install.mjs |

| 平台相关点 | 处理 |
|---|---|
| PowerShell 在 macOS 不存在 | 安装逻辑重写为 install.mjs，PowerShell 脚本只剩转发壳 |
| 路径分隔符 | 全部用 node:path / os.homedir()，无硬编码盘符 |
| npx 在 Windows 上是 npx.cmd | 按 process.platform 选择可执行名 |
| macOS 换行符 | install.sh 为纯 LF（且已置可执行位） |
| 视网膜屏 | canvas 按 min(devicePixelRatio, 2) 缩放，Retina 下清晰不发虚 |
| 触控板点击 | 走 pointerdown，鼠标 / 触控板 / 触摸行为一致 |
| 系统「减少动态效果」 | macOS 辅助功能的 Reduce Motion 与 Windows 一样被识别（只显示网格、不生成波纹） |

---

## 二、安装

### 方式 A：一键脚本（推荐）

    # Windows
    powershell -ExecutionPolicy Bypass -File install.ps1

    # macOS / Linux（二者等价，install.sh 只是转发）
    ./install.sh
    node install.mjs

脚本做四件事，且**幂等**（重复执行安全）：

1. 校验插件源（package.json 与 lib/client.js）；
2. **让你从 6 种候选色里选 4 种作为「首选四色」**，并按选择重新构建插件 bundle（6 套调色板都会打进包里，运行时随时可换）；
3. 通过官方通道把本包登记进 profile（npx -y @deepseek-ai/dsh plugin --profile web add link:<本目录>），被拒时自动回退 file:；也支持 --pnpm 改走 pnpm + 写入 dsh.profile.bundles；
4. 清理旧名（dsh-client-ui-skin）残留：从 profile 依赖里摘掉旧包、从 cordis.patch.yml 删掉旧的手写 insert（改动前备份）。

> 本包**自带挂载**（package.json 的 `dsh.bundle.patch` → 包根 `cordis.patch.yml`），所以安装器**不再往 profile 手写 insert** —— 手写 insert 与包内挂载若用同一 id，会造成 duplicate entry id 导致启动失败。

### 配色选择：安装时 6 选 4（决定首选与默认色）

直接运行安装命令会弹出交互选择（**直接回车 = 保持当前组合**）：

    请选择 4 种配色（共 6 种可选）:
       1) 蓝色   #2563eb      2) 橘色   #e2670a      3) 绿色   #0f9d63
       4) 灰色   #4b5563      5) 紫色   #7c3aed      6) 玫红   #e11d48

    当前组合：蓝色 / 橘色 / 绿色 / 灰色
    输入 4 个编号（逗号分隔；直接回车保持当前）:

不想交互就用 -Hues 参数，**键名或编号都可以**：

    powershell -ExecutionPolicy Bypass -File .\install.ps1 -Hues blue,orange,purple,rose
    powershell -ExecutionPolicy Bypass -File .\install.ps1 -Hues 1,2,5,6

选择结果写入 **skin\hues.json**，它决定两件事：

1. 设置面板色条里**排在前面的 4 色**（后面的 2 色会以「更多」分组跟在一条细分隔线之后，同样可以点选）；
2. **首次运行的默认色** = 首选里的第一个。

> 调色板一律生成**全部 6 套**，所以装完之后**不需要重装就能换到任意一色**。
> 想调整「首选四色」或默认色，带 -Hues 重跑一次安装命令即可（也可只跑 node build\select-hues.mjs 1,2,5,6 加两个 build 脚本）。

可选参数：

跨平台通用参数（install.mjs）：

    --hues <list>     四个色相（键名或编号），省略则交互选择
    --profile <dir>   web profile 目录（默认 ~/.dsh/profiles/web）
    --pnpm            改用 pnpm 注册 + 写入 dsh.profile.bundles
    --dry-run         只打印计划，不改动任何文件

Windows 转发壳同时接受 PowerShell 风格写法：-Hues / -DryRun / -ProfileDir / -Pnpm。

### 方式 C：从 GitHub 安装（推荐给其他用户）

    npx -y @deepseek-ai/dsh plugin --profile web add git+https://github.com/seabiscuit29/dsh-ui-skin-wave.git

包内自带挂载补丁，装完重启一次 dsh web 即可。想换配色组合就克隆下来跑安装器：

    git clone https://github.com/seabiscuit29/dsh-ui-skin-wave.git
    powershell -ExecutionPolicy Bypass -File dsh-ui-skin-wave\install.ps1 -Hues 1,2,5,6

### 方式 B：手动安装（等价三步）

    # 1) 登记依赖（用 link: 而不是 file:）
    cd $env:USERPROFILE\.dsh\profiles\web
    pnpm add link:D:/DSH/dsh-ui-skin-wave

    # 2) 把包名加进 profiles\web\package.json 的 dsh.profile.bundles 数组：
    #        "dsh-ui-skin-wave"
    #    包根自带的 cordis.patch.yml 会据此完成挂载。
    #    ⚠ 不要额外往 profile 的 cordis.patch.yml 手写 insert：同一个 entry id
    #      被"追加"两次会导致 duplicate entry id，dsh 启动即崩。

    # 3) 重启 dsh web

> 强烈建议用 **link:** 而非 **file:**。pnpm 对 file: 目录依赖做**快照复制**，改源码必须重装才生效；link: 是软链，profile 直接读源码目录。

### 安装后必做

**重启一次 dsh web**（新 loader 条目需要重新加载）。之后改 lib/client.js 走客户端 HMR，无需再重启。

---

## 三、验证安装

1. 打开 DSH Web GUI，整个界面应立即变成所选配色（默认蓝色）；
2. **设置 → 左侧导航**出现「**皮肤**」，位于「技能」下方；
3. 进入后可见五行设置与底部一行诊断，形如：

       底 #080d18 · 卡片 #101c2c · 主色 #3b82f6 · 特效层 已挂载 1650 格 (1440x826)

   这行实时显示生效中的令牌色值与特效层状态，是排障的第一手信息。

---

## 四、使用方法

### 设置项

| 行 | 选项 | 说明 |
|---|---|---|
| 皮肤 | 开 / 关 | 总开关。关闭 = 移除 body[data-dsh-skin] + 卸载特效层，**立即**恢复默认，无需重启 |
| 配色 | 蓝色 / 橘色 / 绿色 / 灰色 ｜ 更多：紫色 / 玫红 | **可左右滑动**的色条，共 6 色；首选 4 色在前，细分隔线之后是其余 2 色（略淡显示）。任意一色点击即切换，即时生效 |
| 特效层置顶 | 开 / 关 | 排查用。波纹若被界面底色遮住，打开可把特效层提到最上层（会压住内容，属排查态） |
| 波纹特效 | 开 / 关 | 六边形网格 + 鼠标波纹的总开关 |
| 波纹强度 | 淡 / 标准 / 明显 | 波纹不透明度系数 0.6 / 1 / 1.5 |

### 深浅色系

由 **设置 → 通用 → 外观** 控制，插件自动跟随：浅色外观 → 浅蓝/浅橘/浅绿/浅灰；深色外观 → 深海蓝/深橘/深绿/深灰。

### 波纹特效行为

| 操作 | 效果 |
|---|---|
| 鼠标移动 | 每移动 54px（且间隔 ≥95ms）落一朵涟漪；波前从 22px 扩到 172px，约 1 秒淡出 |
| 鼠标点击（含触屏） | 落一朵更大更慢的涟漪（半径 ×1.5、寿命 ×1.5） |
| 同屏上限 | 5 朵，超出时最老的被移除 |
| 窗口缩放 | 自动重建网格与画布（防抖 180ms） |
| 鼠标静止 | 动画循环自动停止并清空动态层，不占 CPU |
| 系统开启「减少动态效果」 | 只显示静态六边形网格，不生成波纹 |

### 控制台快捷方式（不装插件也能试色）

tools\try-skin.js 是自包含的试验版，粘进浏览器 Console 即可预览：

    __ocean.on()              开启
    __ocean.off()             关闭，完全恢复默认
    __ocean.hue('orange')     切色相（blue/orange/green/gray）
    __ocean.light() / dark()  临时切明暗

---

## 五、工作原理

| 层 | 位置 | 做法 |
|---|---|---|
| L1 令牌层 | skin.css 色相块 | 改 --dsw-static-neutral-bluish-* 色阶（明暗共用）+ 明暗两套 --dsw-alias-* 语义覆盖 |
| L2 页面层 | skin.css 结构段 | body 画渐变底；--dsw-alias-bg-base 置为 transparent，使任何容器都不会遮挡特效层 |
| L3 特效层 | lib/client.js 的 createFx() | 固定层 div#dsh-ocean-fx（z-index:-1）+ 两块 canvas：静态六边形网格、动态波纹 |
| L4 开关层 | lib/client.js 的 SkinSection | 注册 settings.section（id=skin, order=17）；状态存 localStorage 并在首帧同步应用 |

运行时它在 DOM 里只留下三样东西，删除即完全复原：

1. head 里带 data-plugin / data-plugin-css 标记的一个 style 标签；
2. body 末尾的 div#dsh-ocean-fx；
3. body 属性：data-dsh-skin=ocean、data-dsh-hue=...、data-dsh-fx=on|off。

状态持久化键：localStorage 的 **dsh.skin.ocean**（同步读取，避免首帧闪默认色）。

---

## 六、仓库结构与重新构建

调色板是**生成**的：脚本从「蓝色基准」做 HSL 色相旋转，产出 6 色 × 明暗的完整样式。

    dsh-ui-skin-wave/
    ├─ package.json / cordis.patch.yml    包契约与自挂载补丁
    ├─ install.mjs                        一键安装（选色 + 构建 + 注册 + 清旧名，跨平台）
    ├─ install.sh / install.ps1           macOS·Linux / Windows 转发壳
    ├─ lib/index.js                       宿主半区（空实现，仅占位）
    ├─ lib/client.js                      ← 生成物：浏览器半区（样式 + 特效 + 设置面板）
    ├─ skin/structure.css                 与色相无关的结构样式（手写）
    ├─ skin/hues.json                     首选四色 + 默认色
    ├─ skin/skin.css                      ← 生成物：结构 + 6 套调色板
    ├─ build/palettes.mjs                 色相定义（HUES 表）+ 旋转算法
    ├─ build/templates/{ramp,light,dark}.css   蓝色基准模板（含 {TINT}/{BRAND} 占位符）
    ├─ build/build-skin.mjs               生成 skin/skin.css
    ├─ build/build-plugin.mjs             把 skin.css 注入 lib/client.js
    ├─ build/select-hues.mjs              交互式 6 选 4
    ├─ build/plugin-client.template.js    浏览器半区源码模板
    ├─ tests/client-bundle.mjs            无头测试（渲染 + 点击 + 状态断言）
    ├─ tools/probe-*.js                   真机诊断探针
    └─ design/                            设计原型与效果图

改动流程（两步，顺序不能反）：

    node build\build-skin.mjs
    node build\build-plugin.mjs

| 想改什么 | 改哪里 |
|---|---|
| **更换「首选四色」/ 默认色** | 重跑安装器并带 -Hues，或 node build\select-hues.mjs，或直接改 skin\hues.json 后跑两步构建（不改也能在设置里直接选到全部 6 色） |
| 增加候选色（第 7 种） | build\palettes.mjs 的 HUES 表加一项；设置面板的按钮会自动跟着生成，无需改 lib/client.js |
| 调某色相的深色浓淡 | 该项的 darkS（饱和度系数）/ darkLift（明暗提亮量） |
| 调波纹疏密 / 大小 / 寿命 | build\plugin-client.template.js 里 createFx() 的 MIN_DIST / MIN_GAP / MAXW / LIFE / front 公式 |
| 调设置面板样式 | skin\structure.css 的 .dshsk_* 段 |

---

## 七、卸载与回退

1. **临时关闭**：设置 → 皮肤 → 皮肤「关」。立即恢复默认，无需重启，随时可再开；
2. **彻底卸载**：移除 cordis.patch.yml 中含 dsh-ui-skin-wave 的 3 行 insert 条目，然后

    cd $env:USERPROFILE\.dsh\profiles\web
    pnpm remove dsh-ui-skin-wave
    # 重启 dsh web

3. **应急**（设置面板打不开、界面异常）：浏览器 Console 执行

    localStorage.removeItem('dsh.skin.ocean'); location.reload();

---

## 八、故障排查

| 症状 | 原因 | 处理 |
|---|---|---|
| 设置里没有「皮肤」 | 插件未挂载或装后没重启 | 检查 cordis.patch.yml 的 insert 条目；重启一次 |
| 有「皮肤」但内容空白 | 客户端 bundle 执行报错 | F12 看 Console；历史上是 jsx runtime 用法错误，升级 bundle 即可 |
| 点开关没反应 + ReferenceError | 旧 bundle 的 bug（patch 函数被误删） | 升级 bundle（node build-plugin.mjs） |
| 设置按钮文字看不清 | 旧版按钮借用 DSH 的 brand 令牌，深色主题下是近白色 | 已修（改用 --dsh-skin-accent）；升级 bundle |
| 波纹完全不出现 | ① 开关被关；② 系统开了「减少动态效果」；③ 被不透明容器遮挡 | 先看诊断行：「已挂载」= 被遮挡 → 开「特效层置顶」验证；再用 tools\probe-occluder.js 定位 |
| 控制台刷 clearRect 报错 | 旧版卸载后仍有排队动画帧 | 已修（加空引用防护）；升级 bundle |
| 改了 CSS 界面没变 | 只跑 build-skin 没跑 build-plugin，或依赖是 file: 快照 | 两步都跑；确认 profile 用 link: 协议 |
| PowerShell 报「字符串缺少终止符」/ 中文乱码 | .ps1 含中文，被 PowerShell 5.1 按 ANSI 解码 | .ps1 必须纯 ASCII（install.ps1 已如此） |

定位工具（均在 tools\）：

| 文件 | 用途 |
|---|---|
| probe-dom.js | 在新会话页采集 hero / composer 的 DOM 结构（做精细排版用） |
| probe-fx.js | 打印特效层挂载状态、画布尺寸、是否被遮挡 |
| probe-occluder.js | 用 elementsFromPoint 找出具体哪个元素遮挡特效层 |
| test-plugin-render.mjs | 无头测试台：假 jsx runtime + DOM 桩真跑插件，渲染 + 逐按钮点击 + 状态断言 |
| check-ascii.mjs / verify-parse.ps1 | 校验 .ps1 的 ASCII 纯度与语法 |
| check-palettes.mjs / check-dark.mjs | 打印生成后各色相的调色板取值 |

---

## 九、已知限制

- **L2 精细排版未做**：hero 标题字号、composer 圆角与内边距尚未对齐原型（需真机 DOM 才能写出抗升级的选择器）；
- **特效层全局生效**：波纹垫在所有内容之下，不区分页面；若只想在新会话页出现，需接入会话状态判断；
- **与官方 theme 插件互不干扰**：同时启用时以本插件作用域优先。
