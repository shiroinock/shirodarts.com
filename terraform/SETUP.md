# Terraform セットアップガイド

## 前提条件

- [x] Terraform がインストール済み（tfenv推奨）
- [x] Cloudflareアカウントがある
- [x] shirodarts.com ドメインがCloudflareに登録済み

## ステップバイステップ ガイド

### Step 1: 必要な情報の取得

#### 1-1. Account ID の取得

1. https://dash.cloudflare.com/ にログイン
2. 右上のアカウント名をクリック
3. アカウント名の下に表示される **Account ID** をコピー

```
例: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

#### 1-2. Zone ID の取得

1. https://dash.cloudflare.com/ にログイン
2. **shirodarts.com** ドメインをクリック
3. 右側の「概要」タブの下部、「API」セクションにある **Zone ID** をコピー

```
例: z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4
```

#### 1-3. API Token の作成

1. https://dash.cloudflare.com/profile/api-tokens にアクセス
2. **「トークンを作成」** をクリック
3. 以下の権限を持つカスタムトークンを作成：

   **Account 権限:**
   - Account Settings: Read
   - Account Resources Include: All accounts

   **Zone 権限:**
   - Zone Settings: Edit
   - Zone: Edit
   - Page Rules: Edit

   **Zone Resources Include:**
   - Specific zone: `shirodarts.com`

4. **「概要に進む」** → **「トークンを作成」** をクリック
5. 表示されたトークンをコピー（**一度しか表示されません！**）

```
例: 1a2b3c4d5e6f7g8h9i0j_k1l2m3n4o5p6q7r8s9t0
```

### Step 2: 設定ファイルの作成

#### 2-1. terraform.tfvars の作成

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

#### 2-2. 値を記入

エディタで `terraform.tfvars` を開いて、取得した値を記入：

```hcl
# terraform.tfvars

# Step 1-1 で取得した Account ID
cloudflare_account_id = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"

# Step 1-2 で取得した Zone ID
cloudflare_zone_id = "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4"

# ドメイン名
domain = "shirodarts.com"

# Pagesプロジェクト名
pages_project_name = "shirodarts-com"

# GitHub連携する場合（オプション）
github_repo = "" # 例: "username/shirodarts.com"

# アラート通知先メールアドレス
alert_email = "your-email@example.com"
```

#### 2-3. API Token の環境変数設定

**方法1: .envファイル（推奨）**

```bash
# プロジェクトルートに.envファイルを作成
cd ..
echo 'export CLOUDFLARE_API_TOKEN="1a2b3c4d5e6f7g8h9i0j_k1l2m3n4o5p6q7r8s9t0"' >> .env
source .env
```

**方法2: シェル設定ファイル**

```bash
# ~/.zshrc または ~/.bashrc に追加
echo 'export CLOUDFLARE_API_TOKEN="1a2b3c4d5e6f7g8h9i0j_k1l2m3n4o5p6q7r8s9t0"' >> ~/.zshrc
source ~/.zshrc
```

### Step 3: 設定の確認

```bash
cd terraform

# 環境変数が設定されているか確認
echo $CLOUDFLARE_API_TOKEN

# Terraformの設定を検証
terraform validate

# 実行プランを確認（Dry-run）
terraform plan
```

実行プランには、以下のリソースが表示されるはずです：

- `cloudflare_pages_project.shirodarts` - Pagesプロジェクト
- `cloudflare_zone_settings_override.shirodarts_security` - セキュリティ設定
- `cloudflare_zone_settings_override.shirodarts_performance` - パフォーマンス設定
- `cloudflare_page_rule.cache_everything` - キャッシュルール

### Step 4: 既存リソースのインポート（重要！）

**既にCloudflare Pagesプロジェクトが存在する場合、先にインポートが必要です：**

#### 4-1. 既存のPagesプロジェクトを確認

```bash
# wrangler CLIで確認
npx wrangler pages project list

# または、Webコンソールで確認
# https://dash.cloudflare.com/[account-id]/pages
```

#### 4-2. 既存プロジェクトをインポート

プロジェクトが既に存在する場合：

```bash
# Pagesプロジェクトのインポート
terraform import cloudflare_pages_project.shirodarts [account-id]/shirodarts-com

# Zone設定のインポート
terraform import cloudflare_zone_settings_override.shirodarts_security [zone-id]
terraform import cloudflare_zone_settings_override.shirodarts_performance [zone-id]
```

**注意:** `[account-id]` と `[zone-id]` は、Step 1で取得した実際の値に置き換えてください。

#### 4-3. インポート後の確認

```bash
terraform plan
```

変更がほとんどない状態（`No changes`）になればOKです。

### Step 5: 設定の適用

```bash
# 設定を適用
terraform apply

# 確認プロンプトで 'yes' を入力
```

### Step 6: 設定の確認

適用後、Webコンソールで設定を確認：

1. **Pages設定:**
   https://dash.cloudflare.com/[account-id]/pages/view/shirodarts-com

2. **セキュリティ設定:**
   https://dash.cloudflare.com/[account-id]/shirodarts.com/ssl-tls

3. **パフォーマンス設定:**
   https://dash.cloudflare.com/[account-id]/shirodarts.com/speed/optimization

## トラブルシューティング

### エラー: "Error: resource already exists"

既存のリソースがある場合は、Step 4でインポートが必要です。

### エラー: "Error: Invalid API Token"

API Tokenが正しく設定されているか確認：

```bash
echo $CLOUDFLARE_API_TOKEN
```

空の場合は、Step 2-3を再実行してください。

### エラー: "Error: zone not found"

Zone IDが正しいか確認してください。Webコンソールで再度確認：
https://dash.cloudflare.com/

### 変更を元に戻したい

```bash
# 特定のリソースのみ削除
terraform destroy -target=cloudflare_page_rule.cache_everything

# すべて削除（注意！）
terraform destroy
```

## 次のステップ

- [ ] Webコンソールで各設定を確認
- [ ] 通知設定をWebコンソールで手動追加（notifications.tfは現在コメントアウト）
- [ ] セキュリティヘッダーをTransform Rulesで追加
- [ ] 定期的に `terraform plan` で設定のドリフトを確認

## 参考リンク

- [Cloudflare Terraform Provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs)
- [Terraform CLI Documentation](https://developer.hashicorp.com/terraform/cli)
- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
