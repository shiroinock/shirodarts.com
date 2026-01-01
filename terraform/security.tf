# SSL/TLS設定
# Webコンソール: SSL/TLS > Overview
# Note: Cloudflare Provider v5 では zone_settings_override が廃止されました
# 各設定は個別のリソースまたはWebコンソールで管理してください
#
# 推奨される設定（Webコンソールで手動設定）:
# - SSL/TLS 暗号化モード: Full (strict)
# - Always Use HTTPS: On
# - Minimum TLS Version: 1.2
# - TLS 1.3: On
# - Security Level: Medium
# - Bot Fight Mode: On
#
# 参考: https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/guides/version-5-upgrade

# 将来的にv5対応のリソースで管理する場合のプレースホルダー
# resource "cloudflare_zone_settings" "shirodarts_security" {
#   zone_id = var.cloudflare_zone_id
#   settings {
#     ssl = "strict"
#     always_use_https = "on"
#     automatic_https_rewrites = "on"
#     min_tls_version = "1.2"
#     tls_1_3 = "on"
#     security_level = "medium"
#     bot_fight_mode = true
#   }
# }

# WAFマネージドルール（Freeプランでは制限あり）
# Webコンソール: Security > WAF > Managed rules
# Note: Free/Proプランでは一部機能が制限されます

# セキュリティヘッダー設定
# Webコンソール: Rules > Transform Rules > Modify Response Header
#
# Note: セキュリティヘッダーはWebコンソールで設定することを推奨
# 設定場所: https://dash.cloudflare.com/[account-id]/[domain]/rules/transform-rules
#
# 推奨されるヘッダー:
# - X-Content-Type-Options: nosniff
# - X-Frame-Options: DENY
# - X-XSS-Protection: 1; mode=block
# - Referrer-Policy: strict-origin-when-cross-origin
# - Permissions-Policy: geolocation=(), microphone=(), camera=()
