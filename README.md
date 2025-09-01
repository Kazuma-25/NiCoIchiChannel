# 251-Channel

ニッチな情報を気軽に交換できる、クリーンで広告のない掲示板風SPAです。  
Vue.jsとMySQLの習得を目的に開発しました。  
既存の掲示板にありがちな広告の多さを排除し、より快適な情報交換の場を目指しています。

---

## 🛠 使用技術

- **フロントエンド**：Vue.js, Tailwind CSS  
- **バックエンド**：Node.js  
- **データベース**：MySQL

---

## 📦 機能概要

- スレッドの作成・閲覧
- レスの投稿と編集
- スレッドの削除（通報機能）
- SPA構成による快適な操作性

---

## 🎨 こだわりポイント

- UIは2chリスペクトで構築
- SQLインジェクション対策としてプレースホルダーを使用
- レスポンシブ対応は現在進行中
- DB設計はシンプルかつ拡張性を意識

---

## 🌐 デモサイト

[251-Channel 公開版](https://nicoichichannel.onrender.com/)

## 🧪 以下、開発環境でのセットアップ（開発者向け）
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
