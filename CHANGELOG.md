## 2.1.3

- 修：部分机器上 一键安装.cmd 误报「没找到 DeepSeek Harness」——原来越过窄的路径判断会直接放弃。
- 安装器改为双路：先找 DSH 目录与 dsh 命令，找到就走 dsh plugin；找不到就直接写 profile（复制插件、改 package.json 的 dependencies 与 bundles、往 cordis.patch.yml 追加 insert），并逐步打印找到了什么。
- 安装/卸载逻辑移到 install.ps1 / uninstall.ps1（.cmd 只做启动器），并支持 EVA_SKIP_CLI=1 / EVA_NOPAUSE=1 两个调试开关。
- 卸载同样改为双路，并会清理 package.json 与 cordis.patch.yml 里的条目。
# 版本记录

只记录能感知到的变化：皮肤数、开机动画、配色与修复。

## 2.1.2

macOS 安装脚本加固（两个脚本都重写）：

- **查找方式**从「写死 3 个路径」改成四层：command -v dsh → 遍历 /Applications、~/Applications、~/Desktop、/Users/Shared × 三种包内路径 → mdfind（Spotlight）兜底。
- 安装前自动 xattr -dr com.apple.quarantine 并 chmod +x，免掉「无法验证开发者」。
- 安装失败时直接列出三种常见原因（DSH 还开着 / 断网 / 权限不足），不再只丢一句红字。
- 装完自动跑 plugin --profile desktop list，当场确认装上了。
- 提示文案补齐四套皮肤名称与快捷键（Control+Option+U 开关 / Control+Option+B 重播）。
- 卸载脚本同样加固，找不到 DSH 时会指引去「设置 → 插件」手动删。

注意：以上仍未在真机 Mac 上验证，路径结构是按 Windows 版推断的。
## 2.1.1

- **修 zip 路径分隔符**：2.1.0 的两个包用反斜杠做路径（.NET Framework 打包行为），
  macOS 上 unzip 会把 dsh-eva-skins\package.json 当成一个文件名，整个包解出来是碎的。
  现在改为正斜杠，Windows / macOS 都能正常解压。
- **安装脚本更稳**：一键安装.cmd 不再只认 %LOCALAPPDATA%，
  依次尝试 LocalAppData / Program Files / Program Files (x86) / where dsh，
  装在别的盘也能找到。
- 安装完成提示补上四套皮肤与「彻底退出再重开」的说明。
## 2.1.0

- 改名：dsh-unit02-skin → dsh-eva-skins（四套皮肤，不是一个机体）
- 仓库地址同步改为 https://github.com/Iris-change/dsh-eva-skins
- 内部存储键（unit02-skin / unit02-skin-set / unit02-boot-at）保持不变，老用户升级不掉设置
## 2.0.2

- 版权声明改成「粉丝创作、不主张权利、可应要求下架」的表述
- npm 包里补上 CHANGELOG.md
## 2.0.1

- 八号机补回边框花纹：左右 4px 粉导轨 + 135°/45° 粉黑斜纹 + 顶部黄绿警示带 + 底部粉绿渐变条（此前按需求关掉过，黑底上又需要了）

## 2.0.0

- 八号机新增工作台线稿层：右侧粉色单色线稿（18% 不透明、左缘渐隐），`right -160px`
- 包体 11.65 MB

## 1.9.9

- **修复**：批量换色时把带透明度的 8 位色（如 `#f06a2205`）转成了非法写法 `hsl(...)05`，canvas 会沿用上一个颜色，导致八号机开机动画出现不该有的网格。14 处改为 `hsla(...)`，网格回到 2% 不透明
- 核对二号机 / 零号机 / 初号机：它们的换色产出均为合法 hex，不受影响

## 1.9.1 – 1.9.8（八号机迭代）

- 1.9.1 八号机皮肤上线（鲜粉 + 绿，侧栏/座舱牌/边框/灯带全套）
- 1.9.2 左上角 NERV 叶标：SVG 里的 path 没有 `fill`，默认渲染成黑色几乎看不见 → 强制 `#FF9CC8`
- 1.9.5 确认卡换成真希波头像（抠白底）
- 1.9.6 头像改用黑底照片重新抠图
- 1.9.7 头像整体下移，避免头发被裁
- 1.9.8 换成最终版头像，头顶留 6% 空白

## 1.6.x

- 1.6.0 初号机皮肤上线（紫 + 酸绿，LCL 由橙改绿紫渐变）
- 1.6.1 侧栏 NERV 叶标补齐（初号机 `#C0A9EE`、零号机 `#2F7FBF`）
- 1.6.2 顶部 2px 皮肤色封边（弥补标题栏无法着色）
- 1.6.3 撤回初号机线稿方案，等素材

## 1.5.x

- 1.5.0 零号机皮肤上线（白蓝）
- 1.5.1 零号机线稿层（白底线稿需 `mix-blend-mode:multiply`）
- 1.5.2 零号机换真 NERV 标
- 1.5.5 – 1.5.7 零号机扫描线：`body::before` 是静态横纹、`body::after` 是灯带，来回收敛三次才对齐需求，最终只留蓝色灯带
- 1.5.8 零号机行内代码改成浅蓝底深蓝字（对比度 9.4:1）

## 1.4.x

- 1.4.0 改为可发布的 npm 包：`license`/`repository`/`engines`/`files`/`publishConfig`
- 新增 `一键安装.cmd` / `卸载.cmd` / `使用说明.txt` / `install-mac.command`
- 打包 win / mac 两个 zip

## 1.2.0

- 开机动画改为直接播放源仓库的 WebGL 序列（22 个文件原样搬入 `client/intro/`）
- 动画里的 OpenAI 结环换成 DeepSeek Harness 鲸鱼矢量 mark（取自客户端 DOM 中 `FishLogo` 的 path）
- 配色从冷蓝灰改为源仓库的暖黑系
- 工作台右侧加明日香线稿
- 修复：`await audio.play()` 在无声卡环境永不 resolve，导致序列卡在第 0 帧 → 改为不阻塞 + 挂钟回退

## 1.0.0

- 首个版本：二号机皮肤（红橙配色、工业控制台侧栏、扫描灯带、开机动画、`Ctrl+Alt+U` 开关）
