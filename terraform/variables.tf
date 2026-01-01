# Cloudflare設定
variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for shirodarts.com"
  type        = string
}

# ドメイン設定
variable "domain" {
  description = "メインドメイン"
  type        = string
  default     = "shirodarts.com"
}

# Pages設定
variable "pages_project_name" {
  description = "Cloudflare Pages プロジェクト名"
  type        = string
  default     = "shirodarts-com"
}

variable "github_repo" {
  description = "GitHubリポジトリ (owner/repo形式)"
  type        = string
  default     = ""
}

# 通知設定
variable "alert_email" {
  description = "アラート通知先メールアドレス"
  type        = string
}
