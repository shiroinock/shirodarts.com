#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "..", "content", "blog");

/**
 * 新しいブログ記事のテンプレートを生成する
 */
function createNewPost(slug: string): void {
	// スラッグのバリデーション（英数字とハイフンのみ）
	if (!/^[a-z0-9-]+$/.test(slug)) {
		console.error("❌ エラー: スラッグは英小文字、数字、ハイフンのみ使用できます");
		console.log("例: my-first-post");
		process.exit(1);
	}

	// ファイルパス
	const filePath = path.join(postsDir, `${slug}.md`);

	// すでに存在する場合はエラー
	if (fs.existsSync(filePath)) {
		console.error(`❌ エラー: ${slug}.md はすでに存在します`);
		process.exit(1);
	}

	// content/blog ディレクトリがなければ作成
	if (!fs.existsSync(postsDir)) {
		fs.mkdirSync(postsDir, { recursive: true });
	}

	// 現在の日付を取得 (YYYY-MM-DD)
	const today = new Date().toISOString().split("T")[0];

	// テンプレート
	const template = `---
title: "タイトルをここに入力"
date: "${today}"
---

# タイトルをここに入力

本文をここに書き始めてください...

## セクション 1

内容...

## セクション 2

内容...

## まとめ

まとめ...
`;

	// ファイルを作成
	fs.writeFileSync(filePath, template, "utf8");

	console.log(`✅ 新しい記事を作成しました: ${slug}.md`);
	console.log(`📝 ファイルパス: ${filePath}`);
	console.log("\n次のステップ:");
	console.log(`1. ${filePath} を開く`);
	console.log("2. frontmatter (title) を編集");
	console.log("3. 本文を書く");
	console.log("4. git add & commit でコミット");
}

// メイン処理
function main(): void {
	// 引数からスラッグを取得
	const slug = process.argv[2];

	if (!slug) {
		console.error("❌ エラー: スラッグを指定してください");
		console.log("\n使い方:");
		console.log("  pnpm new-post <slug>");
		console.log("\n例:");
		console.log("  pnpm new-post my-first-post");
		process.exit(1);
	}

	createNewPost(slug);
}

main();
