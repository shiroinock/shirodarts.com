terraform {
  required_version = ">= 1.9.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
}

provider "cloudflare" {
  # API トークンは環境変数 CLOUDFLARE_API_TOKEN で設定
  # または terraform.tfvars で cloudflare_api_token を設定
}
