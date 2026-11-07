# NOTICE · 第三方素材与代码

`LICENSE` 里的 MIT 授权**只覆盖本仓库的源代码**。本文件说明哪些内容不在 MIT 范围内。

---

## 1. EVA 相关素材（不属于 MIT）

本主题引用了《新世纪福音战士》(Neon Genesis Evangelion) 的角色、名称与美术素材：
`EVANGELION`、`NERV`、`ASUKA`、`REI`、`SHINJI`、`MARI`、`UNIT-00/01/02/08` 等。

这些内容的权利归其各自权利人（khara, inc. 及其他）所有，**不在本仓库的 MIT 授权范围内**。

`client/intro/media/`、`client/intro-rei/media/`、`client/intro-shinji/media/`、
`client/intro-mari/media/` 下复现官方美术的文件，仅以**个人、非商业的同人使用**为目的随包分发；
本项目不对其主张任何权利，权利人如要求，会立即移除。

若你要公开再分发本包，请把上述文件替换为你自己的素材（或仓库内 `media/placeholders/` 的占位版本），
并把代码授权与美术素材分开处理。

## 2. 随包分发的第三方代码

位于 `client/intro/vendor/` 与 `client/intro-*/vendor/`：

| 组件 | 授权 | 版权 |
| --- | --- | --- |
| three.js (`three.module.js`, `three.core.js`) | MIT | Copyright (c) 2010-2024 three.js authors |
| html-to-image (`html-to-image.js`) | MIT | Copyright (c) 2017 W.Y. |
| Montserrat / Unit02 Mincho 字体 | SIL Open Font License 1.1 | 各自字体作者 |
| 日语播报音轨 (`voice.wav`) | 由 edge-tts 生成 | 见下 |

`voice.wav` 是用 Microsoft Edge 的 TTS（`ja-JP-NanamiNeural`）在本地合成的系统播报音，
不含音乐或第三方录音。使用时请遵守你所使用 TTS 服务本身的条款。

## 3. 与本插件无关的商标

`DeepSeek`、`DeepSeek Harness` 属其各自权利人。本项目是第三方插件，与官方无隶属关系。
