# Terraform による Cloudflare 設定管理

このディレクトリには、shirodarts.com の Cloudflare インフラ設定が含まれています。

**現在の方針:**
- セキュリティ・パフォーマンス設定は **Webコンソールで手動管理** を推奨
- Pagesプロジェクトのみ Terraform で管理

## 📁 ファイル構成

```
terraform/
├── versions.tf           # Terraform & Provider バージョン設定
├── variables.tf          # 変数定義
├── terraform.tfvars      # 変数の実際の値（Git管理外）
├── terraform.tfvars.example  # 変数のサンプル
├── pages.tf             # Cloudflare Pages プロジェクト設定
├── security.tf          # セキュリティ設定（SSL/TLS, WAF, ヘッダー）
├── performance.tf       # パフォーマンス設定（キャッシュ, 圧縮）
├── notifications.tf     # アラート通知設定
├── outputs.tf           # 出力値定義
└── README.md            # このファイル
```

## 🚀 初期セットアップ

### 1. 必要な情報を取得

Cloudflare ダッシュボードから以下の情報を取得してください：

#### Account ID の取得
1. https://dash.cloudflare.com/ にログイン
2. 右上のアカウント名をクリック
3. アカウント名の下に表示される `Account ID` をコピー

#### Zone ID の取得
1. https://dash.cloudflare.com/ にログイン
2. `shirodarts.com` ドメインをクリック
3. 右側の「API」セクションにある `Zone ID` をコピー

#### API Token の作成
1. https://dash.cloudflare.com/profile/api-tokens にアクセス
2. 「Create Token」をクリック
3. 「Edit Cloudflare Workers」テンプレートを選択
4. 以下の権限を追加：
   - Account Settings: Read
   - Account Resources: Edit
   - Zone Settings: Edit
   - Zone: Edit
5. トークンを生成してコピー

### 2. 設定ファイルの作成

```bash
cd terraform

# サンプルファイルをコピー
cp terraform.tfvars.example terraform.tfvars

# エディタで編集
vim terraform.tfvars
```

`terraform.tfvars` に取得した情報を記入：

```hcl
cloudflare_account_id = "your-account-id"
cloudflare_zone_id    = "your-zone-id"
domain                = "shirodarts.com"
pages_project_name    = "shirodarts-com"
github_repo           = ""  # GitHub連携する場合は "username/repo"
alert_email           = "your-email@example.com"
```

### 3. 環境変数の設定

```bash
export CLOUDFLARE_API_TOKEN="your-api-token"
```

または `~/.zshrc` / `~/.bashrc` に追加：

```bash
echo 'export CLOUDFLARE_API_TOKEN="your-api-token"' >> ~/.zshrc
source ~/.zshrc
```

## 📋 使い方

### 初期化

```bash
cd terraform
terraform init
```

### 設定の確認（Dry-run）

```bash
terraform plan
```

### 設定の適用

```bash
terraform apply
```

確認プロンプトで `yes` を入力してください。

### 設定の削除（注意！）

```bash
terraform destroy
```

## 🔍 各設定の Web コンソール上の場所

### Pages 設定 (`pages.tf`)
- **プロジェクト**: https://dash.cloudflare.com/[account-id]/pages/view/shirodarts-com
  - Overview
  - Deployments
  - Settings > Builds & deployments
  - Settings > Environment variables
  - Custom domains

### セキュリティ設定 (`security.tf`)

#### SSL/TLS
- https://dash.cloudflare.com/[account-id]/shirodarts.com/ssl-tls
  - **Overview**: 暗号化モード（Full strict推奨）
  - **Edge Certificates**:
    - Always Use HTTPS
    - Automatic HTTPS Rewrites
    - Minimum TLS Version
    - TLS 1.3
    - Opportunistic Encryption

#### Security
- https://dash.cloudflare.com/[account-id]/shirodarts.com/security
  - **Settings**:
    - Security Level (Medium推奨)
    - Challenge Passage
    - Browser Integrity Check
  - **Bots**: Bot Fight Mode

#### Scrape Shield
- https://dash.cloudflare.com/[account-id]/shirodarts.com/content
  - Email Address Obfuscation
  - Server Side Excludes
  - Hotlink Protection

#### Transform Rules
- https://dash.cloudflare.com/[account-id]/shirodarts.com/rules/transform-rules
  - Security Headers（セキュリティヘッダーの追加）

### パフォーマンス設定 (`performance.tf`)

#### Speed > Optimization
- https://dash.cloudflare.com/[account-id]/shirodarts.com/speed/optimization
  - **Content Optimization**:
    - Brotli
    - Auto Minify (HTML, CSS, JS)
    - Rocket Loader
  - **Protocol Optimization**:
    - Early Hints
    - HTTP/2
    - HTTP/3 (QUIC)
    - 0-RTT

#### Caching
- https://dash.cloudflare.com/[account-id]/shirodarts.com/caching/configuration
  - Caching Level (Aggressive推奨)
  - Browser Cache TTL
  - Development Mode

#### Page Rules
- https://dash.cloudflare.com/[account-id]/shirodarts.com/rules/page-rules
  - Cache Everything（全体）
  - Static Assets（静的ファイル長期キャッシュ）

### 通知設定 (`notifications.tf`)
- https://dash.cloudflare.com/[account-id]/notifications
  - **DDoS Attack Alert**: DDoS攻撃検知
  - **HTTP Error Rate Alert**: エラー率上昇
  - **Traffic Anomaly Alert**: トラフィック異常
  - **SSL Certificate Expiration**: SSL証明書期限
  - **Pages Deployment**: デプロイ完了通知

## 🎯 推奨される運用フロー

### 新しい設定を追加する場合

1. **Web コンソールで試す**
   ```
   まず手動でWebコンソールから設定を試して、動作を確認
   ```

2. **Terraform コードに落とし込む**
   ```bash
   # 該当する .tf ファイルを編集
   vim terraform/security.tf
   ```

3. **Plan で確認**
   ```bash
   terraform plan
   ```

4. **適用**
   ```bash
   terraform apply
   ```

5. **Git にコミット**
   ```bash
   git add terraform/
   git commit -m "Add new security setting"
   ```

### 既存設定を Import する場合

既にWebコンソールで設定済みのリソースをTerraformで管理する場合：

```bash
# 例: Zone設定のimport
terraform import cloudflare_zone_settings_override.shirodarts_security [zone-id]

# 例: Page Ruleのimport
terraform import cloudflare_page_rule.cache_everything [zone-id]/[page-rule-id]
```

## ⚠️ 注意事項

1. **terraform.tfvars は Git 管理しない**
   - `.gitignore` に追加済み
   - 機密情報が含まれるため

2. **Web コンソールとの併用は避ける**
   - Terraform で管理開始後は、Webコンソールでの手動変更は避ける
   - 手動変更すると、次回 `terraform apply` 時に上書きされる

3. **State ファイルの管理**
   - `terraform.tfstate` は重要なファイル
   - チームで使う場合は S3 などのリモートバックエンドを推奨
   - 個人利用の場合はローカルでOK（バックアップ推奨）

4. **プラン制限**
   - 一部の機能（Polish, Mirageなど）はPro以上のプランが必要
   - 該当リソースはコメントアウト済み

## 🔗 参考リンク

- [Cloudflare Terraform Provider Documentation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs)
- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
- [Terraform Best Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices/index.html)
