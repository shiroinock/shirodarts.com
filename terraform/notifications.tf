# 通知ポリシー設定
# Webコンソール: Notifications

# Note: Cloudflareの通知設定はTerraformで管理するのが複雑なため、
# 以下の設定はWebコンソールで手動設定することを推奨します。
#
# 推奨される通知設定（Webコンソールで設定）:
# - DDoS Attack Alerting (dos_attack_l7)
# - HTTP Error Rate Alert (http_alert_edge_error)
# - Traffic Anomalies Alert (traffic_anomalies_alert)
# - SSL/TLS Certificate Expiration (universal_ssl_event_type)
# - Pages Deployment Status (pages_event_alert)
#
# 設定場所: https://dash.cloudflare.com/[account-id]/notifications
#
# Terraformで管理する場合は、以下のリソースを有効化してください:

# 例: DDoS攻撃アラート
# resource "cloudflare_notification_policy" "ddos_attack" {
#   account_id  = var.cloudflare_account_id
#   name        = "DDoS Attack Alert"
#   description = "DDoS攻撃を検知した場合に通知"
#   enabled     = true
#   alert_type  = "dos_attack_l7"
# }

# 例: HTTPエラー率アラート
# resource "cloudflare_notification_policy" "http_error_rate" {
#   account_id  = var.cloudflare_account_id
#   name        = "HTTP Error Rate Alert"
#   description = "HTTPエラー率が閾値を超えた場合に通知"
#   enabled     = true
#   alert_type  = "http_alert_edge_error"
# }
