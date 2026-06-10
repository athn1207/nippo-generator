# 日報ジェネレーター

メンターへ毎日送るLINE日報を、フォームに入力するだけで自動生成するWebアプリです。

## スクリーンショット
<img width="914" height="845" alt="screenshot" src="https://github.com/user-attachments/assets/0b80b9fe-2abb-4ed1-ba37-981bf904b1ee" />


## 機能

- 昨日の日付を自動入力（手動変更も可能）
- 物販セクション：商品名・売上・利益を入力、商品行の追加・削除が可能
- 売上なしの日は物販セクションをチェックで非表示に
- 当月売上・当月利益の入力
- 振り返りセクション：今日したこと・感じたこと・明日のやること・明日どういう一日にするか
- リアルタイムプレビュー：入力と同時にLINE用テキストが生成される
- コピーボタン1つでLINEに貼り付け可能

## 技術スタック

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)（デプロイ）

## デモ

https://nippo-generator-qy7cphqlz-athn1207s-projects.vercel.app

## 開発背景

毎日メンターへLINEで日報を送る際、下書き→整形→コピペという作業が毎日発生していて非効率でした。このアプリを使うことで日報作成を効率化し、AI学習や物販運用に時間を使えるようにしました。
