# Cloudflare Pages プロジェクト
# Webコンソール: Workers & Pages > Overview
resource "cloudflare_pages_project" "shirodarts" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = "main"

  # GitHub連携設定
  source = {
    type = "github"
    config = {
      owner                         = "shiroinock"
      repo_name                     = "shirodarts.com"
      production_branch             = "main"
      pr_comments_enabled           = true  # PRにプレビューURLを自動コメント
      deployments_enabled           = true  # プレビューデプロイを有効化
      preview_deployment_setting    = "all" # 全てのブランチでプレビュー作成
      preview_branch_includes       = ["*"] # 全ブランチ対象
      production_deployment_enabled = true  # mainブランチで本番デプロイ
    }
  }

  # ビルド設定
  build_config = {
    build_command       = "pnpm build"
    destination_dir     = "dist"
    root_dir            = ""
    web_analytics_tag   = null
    web_analytics_token = null
  }

  # デプロイ設定
  deployment_configs = {
    production = {
      compatibility_date  = "2024-01-01"
      compatibility_flags = ["nodejs_compat"]
    }
    preview = {
      compatibility_date = "2024-01-01"
      compatibility_flags = ["nodejs_compat"]
    }
  }
}

# カスタムドメイン設定
# Note: カスタムドメインを追加する場合は以下のリソースを有効化してください
#
# resource "cloudflare_pages_domain" "shirodarts" {
#   account_id   = var.cloudflare_account_id
#   project_name = cloudflare_pages_project.shirodarts.name
#   domain       = var.domain
# }

# Note: GitHub連携の初回セットアップ
#
# 1. Cloudflare DashboardでGitHubアプリのインストールが必要です:
#    https://dash.cloudflare.com/[account-id]/pages
#    "Connect to Git" でGitHubを認証
#
# 2. 初回認証後、terraform apply でこの設定を適用できます
#
# 自動デプロイの動作:
# - PRを作成 → プレビューURL自動生成 (例: https://abc123.shirodarts-com.pages.dev)
# - PRにコメント投稿 → プレビューURLが記載される
# - mainにマージ → 本番環境に自動デプロイ
#
# 設定の確認:
# - プロジェクト設定: https://dash.cloudflare.com/[account-id]/pages/view/shirodarts-com
# - デプロイ履歴: Deployments タブ
# - ビルドログ: 各デプロイメントの詳細ページ
