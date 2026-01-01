# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

個人サイト shirodarts.com のソースコード。HonoX + Cloudflare Pages で構築された静的サイト。

## Tech Stack

- HonoX: Ultra-fast web framework
- Cloudflare Pages: Deployment platform
- Vite: Build tool
- Biome: Linter & Formatter
- TypeScript: Type safety

## Project Structure

```
app/
├── routes/          # ファイルベースルーティング
│   ├── index.tsx    # トップページ
│   └── _renderer.tsx # 共通レイアウト
├── client.ts        # クライアントサイドエントリーポイント
└── global.d.ts      # 型定義
```

## Commands

```bash
# Development
pnpm dev                # Start dev server (http://localhost:5173)
pnpm build              # Build for production
pnpm preview            # Preview production build locally
pnpm deploy:cf          # Deploy to Cloudflare Pages

# Lint & Format
pnpm lint               # Check with Biome
pnpm lint:fix           # Auto-fix
pnpm typecheck          # Type check only
```

## Code Style

Biome の設定に従う（biome.json 参照）。ダブルクォート、セミコロンあり、末尾カンマあり。

## Adding New Pages

`app/routes/` 配下に `.tsx` ファイルを作成すると、自動的にルーティングされます。

例: `app/routes/about.tsx` → `/about`
