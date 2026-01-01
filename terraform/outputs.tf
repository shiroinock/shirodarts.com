# 出力値の定義

output "pages_project_id" {
  description = "Cloudflare Pages プロジェクトID"
  value       = cloudflare_pages_project.shirodarts.id
}

output "pages_project_subdomain" {
  description = "Cloudflare Pages サブドメイン (*.pages.dev)"
  value       = cloudflare_pages_project.shirodarts.subdomain
}

# output "pages_custom_domain" {
#   description = "カスタムドメイン"
#   value       = cloudflare_pages_domain.shirodarts.domain
# }

output "zone_id" {
  description = "Cloudflare Zone ID"
  value       = var.cloudflare_zone_id
}

output "management_urls" {
  description = "Cloudflare Webコンソールの管理URL"
  value = {
    pages_overview = "https://dash.cloudflare.com/${var.cloudflare_account_id}/pages/view/${var.pages_project_name}"
    ssl_tls        = "https://dash.cloudflare.com/${var.cloudflare_account_id}/${var.domain}/ssl-tls"
    security       = "https://dash.cloudflare.com/${var.cloudflare_account_id}/${var.domain}/security"
    speed          = "https://dash.cloudflare.com/${var.cloudflare_account_id}/${var.domain}/speed"
    caching        = "https://dash.cloudflare.com/${var.cloudflare_account_id}/${var.domain}/caching"
    notifications  = "https://dash.cloudflare.com/${var.cloudflare_account_id}/notifications"
  }
}
