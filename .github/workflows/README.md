# GitHub Actions Workflows

このディレクトリには、CI/CDワークフローが含まれています。

## 📋 ワークフロー一覧

### CI (`ci.yml`)
- **トリガー**: mainへのpush、PRの作成/更新
- **内容**: Lint、Type check、Build確認

### Security Scan (`security-scan.yml`)
- **トリガー**: mainへのpush、PRの作成/更新
- **内容**: Gitleaksによるシークレットスキャン

### Deploy (`deploy.yml`)
- **トリガー**: PRの作成/更新(プレビュー)、main で CI が通ったとき(本番。`workflow_run`)
  - マージ予約の自動マージは GITHUB_TOKEN で行うので push のイベントが出ない。マージ予約がそのあと main の CI を走らせ直すので、CI の完了を合図に本番へ出す
- **内容**: Cloudflare Pagesへの自動デプロイ

## 🚀 デプロイワークフローのセットアップ

### 必要なGitHub Secrets

以下のSecretsをリポジトリに設定する必要があります：

#### 1. `CLOUDFLARE_API_TOKEN`

Cloudflare API Tokenを作成：

1. https://dash.cloudflare.com/profile/api-tokens にアクセス
2. 「Create Token」をクリック
3. 「Edit Cloudflare Workers」テンプレートを選択
4. 以下の権限を確認/追加：
   - **Account Settings**: Read
   - **Account Resources**: Edit (Cloudflare Pages含む)
5. 「Continue to summary」→「Create Token」
6. トークンをコピー（再表示できないので注意）

#### 2. `CLOUDFLARE_ACCOUNT_ID`

Account IDを取得：

1. https://dash.cloudflare.com/ にログイン
2. 右上のアカウント名をクリック
3. アカウント名の下に表示される `Account ID` をコピー

### GitHub Secretsの設定方法

1. GitHubリポジトリのページを開く
2. 「Settings」タブをクリック
3. 左サイドバーから「Secrets and variables」→「Actions」を選択
4. 「New repository secret」をクリック
5. 以下の2つのSecretを追加：

   **Secret 1:**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: (上記で作成したAPI Token)

   **Secret 2:**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: (上記で取得したAccount ID)

## 🔄 デプロイの仕組み

### PRの場合
1. PRを作成/更新すると自動でビルド
2. プレビュー環境にデプロイ
3. PRにコメントでプレビューURLを投稿

プレビューURL例: `https://abc123.shirodarts-com.pages.dev`

### mainブランチの場合
1. mainにマージすると自動でビルド
2. 本番環境にデプロイ

本番URL: `https://shirodarts.com`（カスタムドメイン設定時）

## 🔍 デプロイ状況の確認

### GitHub上で確認
- リポジトリの「Actions」タブで実行状況を確認
- 各ワークフローの詳細ログを表示

### Cloudflare上で確認
- https://dash.cloudflare.com/[account-id]/pages/view/shirodarts-com
- 「Deployments」タブでデプロイ履歴を確認

## 🛠️ トラブルシューティング

### デプロイが失敗する場合

1. **Secretsが正しく設定されているか確認**
   ```
   Error: Authentication error
   ```
   → `CLOUDFLARE_API_TOKEN`の値を確認

2. **Account IDが正しいか確認**
   ```
   Error: Project not found
   ```
   → `CLOUDFLARE_ACCOUNT_ID`の値を確認

3. **プロジェクト名が一致しているか確認**
   - Cloudflare Pagesのプロジェクト名: `shirodarts-com`
   - ワークフロー内のproject-name: `shirodarts-com`
   - 不一致の場合は`.github/workflows/deploy.yml`を修正

### ビルドが失敗する場合

1. **ローカルでビルドを確認**
   ```bash
   pnpm install
   pnpm build
   ```

2. **依存関係の問題**
   - `pnpm-lock.yaml`がコミットされているか確認
   - Node.jsバージョンが20以上か確認

## 📚 参考リンク

- [Cloudflare Wrangler Action](https://github.com/cloudflare/wrangler-action)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
