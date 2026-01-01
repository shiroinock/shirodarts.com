# パフォーマンス最適化設定
# Note: Cloudflare Provider v5 では zone_settings_override が廃止されました
# 各設定はWebコンソールで手動設定してください
#
# 推奨される設定:
# - Brotli: On
# - HTTP/2: On
# - HTTP/3 (QUIC): On
# - 0-RTT: On
# - Auto Minify (HTML/CSS/JS): On
# - Early Hints: On
# - Cache Level: Aggressive
# - Browser Cache TTL: 4 hours (14400 seconds)
#
# 設定場所:
# - Speed > Optimization: https://dash.cloudflare.com/[account-id]/[domain]/speed/optimization
# - Caching > Configuration: https://dash.cloudflare.com/[account-id]/[domain]/caching/configuration
# - Network: https://dash.cloudflare.com/[account-id]/[domain]/network

# ページルール: キャッシュ設定の詳細化
# Webコンソール: Rules > Page Rules
# https://dash.cloudflare.com/[account-id]/[domain]/rules/page-rules
#
# Note: Page Rulesは廃止予定のため、新しいCache Rulesの使用を推奨
# Webコンソール: Caching > Cache Rules
# https://dash.cloudflare.com/[account-id]/[domain]/caching/cache-rules
