<div align="center">

# 喫茶みどり / KISSA MIDORI

**A bilingual, wa-modern landing page for a fictional matcha café in Gion, Kyoto.**
**京都・祇園の架空の抹茶カフェを題材にした、和モダン × 二言語対応のランディングページ。**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![next-intl](https://img.shields.io/badge/next--intl-i18n-7BAE84)](https://next-intl.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-live-000000?logo=vercel&logoColor=white)](https://matcha-cafe-lp.vercel.app)

**🌿 Live demo → [matcha-cafe-lp.vercel.app](https://matcha-cafe-lp.vercel.app)**

[English](#english) · [日本語](#日本語)

</div>

---

<a id="english"></a>

## English

### Overview

**Kissa Midori** is a portfolio piece: a production-grade marketing landing page for a
matcha café. It targets two audiences — locals in Kyoto and the growing wave of overseas
matcha lovers visiting Japan — so the entire site can be switched between **Japanese and
English** with a single click. There is no reservation or e-commerce flow; this is an
information / brand site focused on atmosphere, craft, and conversion to an in-person visit.

> The visual base started from a Claude Design HTML mockup and was rebuilt from scratch as a
> fully typed, internationalized Next.js application.

### Highlights

- 🌐 **Full bilingual support (JA / EN)** via `next-intl` with locale-prefixed routing
  (`/ja`, `/en`) and an in-nav language switcher. All copy lives in JSON catalogs.
- 🎨 **Distinctive wa-modern design** — first-harvest matcha greens, warm cream tones,
  Cormorant Garamond × Noto Serif/Sans JP typography, hand-authored CSS (no UI kit).
- ✨ **Crafted micro-interactions** — scroll-reveal animations, an animated count-up for
  stats, a slow hero pan, a scroll-progress bar, and a subtle film-grain texture.
- 🗺️ **Embedded Google Map** that renders immediately (no click required).
- ♿ **Accessible & resilient** — keyboard focus styles, ARIA labels, and full
  `prefers-reduced-motion` support.
- ⚡ **Fast by default** — statically generated per locale (SSG), optimized fonts via
  `next/font`, and an SEO/Open Graph metadata layer.

### Tech stack

| Category    | Choice                                            |
|-------------|---------------------------------------------------|
| Framework   | Next.js 15 (App Router) + React 19                |
| Language    | TypeScript                                        |
| i18n        | next-intl (`/ja`, `/en`)                          |
| Styling     | Hand-written CSS (`src/app/globals.css`)          |
| Fonts       | `next/font` — Cormorant Garamond, Noto Serif/Sans JP |
| Deployment  | Vercel                                            |

### Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /ja
```

Switch language with the **JA / EN** toggle in the navigation, or visit `/en` directly.

```bash
npm run build    # production build
npm run start    # serve the production build
```

### Project structure

```
src/
  app/
    globals.css            # all visual styling (wa-modern theme)
    [locale]/
      layout.tsx           # html/body, fonts, metadata, i18n provider
      page.tsx             # assembles the sections
  components/              # Nav, Hero, About, Menu, Story, Gallery,
                           # Reviews, Visit, Access, Footer, …
  i18n/                    # next-intl routing / request config
  middleware.ts           # locale negotiation & redirects
messages/
  ja.json                 # 🇯🇵 all Japanese copy & content data
  en.json                 # 🇺🇸 all English copy & content data
```

### Editing content

All text and menu / review / gallery data live in `messages/ja.json` and `messages/en.json`.
Keep both files in sync (identical keys). Images currently use Unsplash URLs — drop your own
photos into `public/` and reference them as `/your-image.jpg`. The map location is set via
the `access.mapEmbed` query in each message file.

---

<a id="日本語"></a>

## 日本語

### 概要

**喫茶みどり** はポートフォリオ用に制作した、抹茶カフェの集客用ランディングページです。
ターゲットは「京都の地元客」と「抹茶を目当てに訪日する海外客」の二層。そのため、サイト全体を
**日本語・英語ワンクリックで切り替え**できる構成にしています。予約・EC機能は持たず、
空間と作り手のこだわりを伝えて来店につなげる、情報・ブランドサイトとして設計しました。

> ビジュアルの土台は Claude Design の HTML モックアップから出発し、型安全で多言語対応の
> Next.js アプリとしてゼロから再構築しています。

### 見どころ

- 🌐 **完全な日英対応** — `next-intl` によるロケール付きルーティング（`/ja`・`/en`）と
  ナビ内の言語スイッチャー。文言はすべて JSON で一元管理。
- 🎨 **個性のある和モダンデザイン** — 一番摘み抹茶のグリーンと温かいクリーム色、
  Cormorant Garamond × Noto Serif/Sans JP の組み合わせ。UIキットに頼らない手書きCSS。
- ✨ **作り込んだ演出** — スクロールリビール、数値カウントアップ、ヒーローのゆるやかなパン、
  スクロール進捗バー、フィルムグレインの質感。
- 🗺️ **Googleマップ埋め込み** — クリック不要で最初から地図を表示。
- ♿ **アクセシビリティ配慮** — キーボードフォーカス、ARIAラベル、`prefers-reduced-motion` 対応。
- ⚡ **高速** — ロケール別の静的生成（SSG）、`next/font` によるフォント最適化、SEO/OGメタ対応。

### 技術スタック

| カテゴリ      | 採用                                               |
|--------------|----------------------------------------------------|
| フレームワーク | Next.js 15（App Router）+ React 19                 |
| 言語          | TypeScript                                         |
| 多言語化      | next-intl（`/ja`・`/en`）                           |
| スタイリング  | 手書きCSS（`src/app/globals.css`）                  |
| フォント      | `next/font` — Cormorant Garamond, Noto Serif/Sans JP |
| デプロイ      | Vercel                                             |

### セットアップ

```bash
npm install
npm run dev      # http://localhost:3000  → /ja にリダイレクト
```

ナビの **JA / EN** トグルで言語を切り替え、または `/en` に直接アクセスできます。

```bash
npm run build    # 本番ビルド
npm run start    # 本番ビルドを配信
```

### ディレクトリ構成

```
src/
  app/
    globals.css            # すべてのスタイル（和モダンテーマ）
    [locale]/
      layout.tsx           # html/body・フォント・メタデータ・i18nプロバイダ
      page.tsx             # 各セクションの組み立て
  components/              # Nav, Hero, About, Menu, Story, Gallery,
                           # Reviews, Visit, Access, Footer ほか
  i18n/                    # next-intl のルーティング/リクエスト設定
  middleware.ts           # ロケール判定・リダイレクト
messages/
  ja.json                 # 🇯🇵 日本語の文言・コンテンツデータ
  en.json                 # 🇺🇸 英語の文言・コンテンツデータ
```

### コンテンツの編集

文言・メニュー・レビュー・ギャラリーのデータはすべて `messages/ja.json` と
`messages/en.json` にあります（キーは両ファイルで一致させてください）。画像は現在 Unsplash の
URL を使用しているため、`public/` に自前の写真を置いて `/your-image.jpg` で参照してください。
地図の位置は各メッセージファイルの `access.mapEmbed` のクエリで指定できます。

---

<div align="center">

Built with 🍵 by **Tatsuya Ogawa** · Powered by [Next.js](https://nextjs.org/) & [Vercel](https://vercel.com/)

</div>
