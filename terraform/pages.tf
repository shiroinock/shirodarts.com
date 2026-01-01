# Cloudflare Pages プロジェクト
# Webコンソール: Workers & Pages > Overview
resource "cloudflare_pages_project" "shirodarts" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = "main"

  # ビルド設定（インポートした既存の設定）
  build_config = {
    destination_dir = "dist"
  }

  # デプロイ設定
  deployment_configs = {
    production = {
      compatibility_date  = "2024-01-01"
      compatibility_flags = ["nodejs_compat"]
    }
    preview = {
      compatibility_date = "2026-01-01"
    }
  }
}

# Note: Cloudflare Pagesの詳細設定（ビルドコマンド、環境変数、カスタムドメインなど）は
# Webコンソールまたは wrangler CLI で管理することを推奨します。
#
# 理由:
# - ビルド設定は wrangler.toml で管理される
# - カスタムドメインは自動的にDNS設定と連携される
# - GitHub連携はWebコンソールの方が設定しやすい
#
# 設定場所:
# - プロジェクト設定: https://dash.cloudflare.com/[account-id]/pages/view/[project-name]
# - ビルド設定: Settings > Builds & deployments
# - 環境変数: Settings > Environment variables
# - カスタムドメイン: Custom domains
#
# wrangler CLIでのデプロイ:
# pnpm deploy:cf
