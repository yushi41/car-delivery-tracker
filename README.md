# 🚗 納車待ち管理アプリ

> 世界をとるアプリ - Appleのような洗練された美しさで、納車待ちをワクワクする体験に変える

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## 🚀 開発を始める

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリが表示されます。

### 3. ファイルを編集

`src/app/page.tsx` を編集すると、ブラウザが自動的にリロードされます。

## 📚 技術スタック

- **Next.js 14** - Reactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Vercel** - デプロイ（予定）

## 📂 プロジェクト構造

```
car-delivery-tracker/
├── src/
│   └── app/
│       ├── layout.tsx    # ルートレイアウト
│       ├── page.tsx      # トップページ
│       └── globals.css   # グローバルスタイル
├── public/               # 静的ファイル
├── package.json          # 依存関係
├── tsconfig.json         # TypeScript設定
├── tailwind.config.ts    # Tailwind CSS設定
└── next.config.ts        # Next.js設定
```

## ✨ 実装済み機能

1. ✅ 美しいUI（カードレイアウト、モノクロアイコン）
2. ✅ Supabaseデータベース接続
3. ✅ 車両一覧表示（カウントダウン、サマリー）
4. ✅ 新規登録機能
5. ✅ 編集・削除機能
6. ✅ レスポンシブデザイン

## 🔧 環境変数の設定

`.env`ファイルを作成して、以下を設定してください：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📝 開発ルール

### 学習記録の管理
- **`car-delivery-tracker/学習記録.md`** に開発中の質問・解答・学習内容を随時記録する
- 質問した内容、実施した内容、理解したことを記録していく
- 新しい技術用語が出てきた場合は用語集に追加する
- これにより学習の進捗を可視化し、後から振り返れるようにする

### ドキュメント管理
- 要件や仕様が変更された場合は、該当するドキュメントを更新する
- `car-delivery-tracker/` フォルダ内に全てのプロジェクトドキュメントを集約

## 📝 メモ

このプロジェクトは、中古車の納車待ち状況を管理するための美しいウェブアプリです。

