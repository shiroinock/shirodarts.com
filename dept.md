# dept: 91

依存ライブラリが最新版からどれだけ遅れているか。最新版までに出たリリースを major / minor / patch に分けて数え、重みを掛けて足したもの([スコアの定義](https://github.com/shiroinock/dept#スコアの定義))。

- 合計 **91** = major 1 × 30 + minor 15 × 3 + patch 16 × 1
- 6 / 14 パッケージが遅れている、0.2 libyears
- ロックファイル:`./pnpm-lock.yaml`

| SCORE | PACKAGE | CURRENT | LATEST | MAJ | MIN | PAT | LIBYEAR | KIND |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| 61 | `@types/node` | 25.9.9 | 26.6.7 | 1 | 6 | 13 | 0.1 | dev |
| 15 | `@cloudflare/workers-types` | 5.20261119.1 | 5.20261124.1 | 0 | 5 | 0 | 0.0 | dev |
| 9 | `wrangler` | 4.165.0 | 4.168.0 | 0 | 3 | 0 | 0.0 | dev |
| 3 | `marked` | 18.2.1 | 18.3.0 | 0 | 1 | 0 | 0.0 | prod |
| 2 | `hono` | 4.13.19 | 4.13.21 | 0 | 0 | 2 | 0.0 | prod |
| 1 | `@biomejs/biome` | 2.6.8 | 2.6.9 | 0 | 0 | 1 | 0.0 | dev |

<details>
<summary>最新の依存(8 件)</summary>

| PACKAGE | VERSION | KIND |
| --- | --- | --- |
| `@hono/vite-build` | 1.11.1 | dev |
| `@hono/vite-dev-server` | 0.26.1 | dev |
| `honox` | 0.1.63 | prod |
| `husky` | 9.1.7 | dev |
| `tsx` | 4.23.15 | dev |
| `typescript` | 7.0.2 | dev |
| `vite` | 8.3.8 | dev |
| `vitest` | 5.1.1 | dev |

</details>

---

[dept](https://github.com/shiroinock/dept) で作成
