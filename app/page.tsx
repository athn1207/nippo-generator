"use client";

import { useState } from "react";

interface Product {
  name: string;
  sales: string;
  profit: string;
}

const defaultProducts = (): Product[] => [{ name: "", sales: "", profit: "" }];

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${m}/${day}`;
}

export default function Home() {
  const [date, setDate] = useState(getYesterday());
  const [noSales, setNoSales] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts());
  const [monthlySales, setMonthlySales] = useState("");
  const [monthlyProfit, setMonthlyProfit] = useState("");
  const defaultTasks = "アウトプット\nメルカリ新規出品、運用\nAIエンジニア課題取り組み";
  const [didToday, setDidToday] = useState(defaultTasks);
  const [felt, setFelt] = useState("");
  const [todoTomorrow, setTodoTomorrow] = useState(defaultTasks);
  const [tomorrowPlan, setTomorrowPlan] = useState("");
  const [copied, setCopied] = useState(false);

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, { name: "", sales: "", profit: "" }]);
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const formatNumber = (val: string) => {
    const n = parseInt(val.replace(/,/g, ""), 10);
    return isNaN(n) ? val : n.toLocaleString();
  };

  const buildPreview = (): string => {
    const lines: string[] = [];
    lines.push(`【日報】${date}`);
    lines.push("");

    if (!noSales) {
      const validProducts = products.filter((p) => p.name || p.sales || p.profit);
      if (validProducts.length > 0) {
        lines.push(`■本日の売上　${validProducts.length}点`);
        validProducts.forEach((p, i) => {
          lines.push(`${i + 1}．${p.name}　売上${formatNumber(p.sales)}円　利益${formatNumber(p.profit)}円`);
        });
        if (monthlySales) lines.push(`当月売上　${formatNumber(monthlySales)}円`);
        if (monthlyProfit) lines.push(`当月利益　${formatNumber(monthlyProfit)}円`);
        lines.push("");
      }
    }

    if (didToday) { lines.push("■今日したこと"); lines.push(didToday); lines.push(""); }
    if (felt) { lines.push("■感じたこと"); lines.push(felt); lines.push(""); }
    if (todoTomorrow) { lines.push("■明日のやること"); lines.push(todoTomorrow); lines.push(""); }
    if (tomorrowPlan) { lines.push("■明日どういう一日にするか"); lines.push(tomorrowPlan); }

    return lines.join("\n").trimEnd();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildPreview());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const preview = buildPreview();

  return (
    <div className="min-h-screen bg-[#f7fee7] text-gray-700 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#84cc16] mb-2 tracking-widest">日報ジェネレーター</h1>
        <p className="text-sm text-[#a3e635] mb-8">今日もお疲れさまでした！</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 入力フォーム */}
          <div className="space-y-6">

            {/* 日付 */}
            <div className="bg-white rounded-xl p-5 border border-[#bef264] shadow-sm">
              <label className="block text-sm text-[#65a30d] font-semibold mb-2">日付</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#f0fde8] text-gray-800 rounded-lg px-4 py-2 outline-none border border-[#bef264] focus:ring-2 focus:ring-[#a3e635]"
              />
            </div>

            {/* 物販セクション */}
            <div className="bg-white rounded-xl p-5 border border-[#bef264] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#65a30d] font-semibold">物販セクション</span>
                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noSales}
                    onChange={(e) => setNoSales(e.target.checked)}
                    className="accent-[#84cc16] w-4 h-4"
                  />
                  本日売上なし
                </label>
              </div>

              {!noSales && (
                <div className="space-y-3">
                  {products.map((p, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2 items-center">
                      <input
                        placeholder="商品名"
                        value={p.name}
                        onChange={(e) => updateProduct(i, "name", e.target.value)}
                        className="bg-[#f0fde8] text-gray-800 rounded-lg px-3 py-2 text-sm outline-none border border-[#bef264] focus:ring-2 focus:ring-[#a3e635]"
                      />
                      <input
                        placeholder="売上（円）"
                        value={p.sales}
                        onChange={(e) => updateProduct(i, "sales", e.target.value)}
                        className="bg-[#f0fde8] text-gray-800 rounded-lg px-3 py-2 text-sm outline-none border border-[#bef264] focus:ring-2 focus:ring-[#a3e635]"
                      />
                      <div className="flex gap-1">
                        <input
                          placeholder="利益（円）"
                          value={p.profit}
                          onChange={(e) => updateProduct(i, "profit", e.target.value)}
                          className="bg-[#f0fde8] text-gray-800 rounded-lg px-3 py-2 text-sm outline-none border border-[#bef264] focus:ring-2 focus:ring-[#a3e635] flex-1"
                        />
                        {products.length > 1 && (
                          <button
                            onClick={() => removeProduct(i)}
                            className="text-gray-400 hover:text-red-400 px-2 text-lg leading-none"
                          >×</button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addProduct}
                    className="mt-1 text-sm text-[#65a30d] border border-[#84cc16] rounded-lg px-4 py-1.5 hover:bg-[#84cc16] hover:text-white transition-colors"
                  >
                    ＋ 商品を追加
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#bef264]">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">当月売上（円）</label>
                      <input
                        placeholder="例：50000"
                        value={monthlySales}
                        onChange={(e) => setMonthlySales(e.target.value)}
                        className="w-full bg-[#f0fde8] text-gray-800 rounded-lg px-3 py-2 text-sm outline-none border border-[#bef264] focus:ring-2 focus:ring-[#a3e635]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">当月利益（円）</label>
                      <input
                        placeholder="例：20000"
                        value={monthlyProfit}
                        onChange={(e) => setMonthlyProfit(e.target.value)}
                        className="w-full bg-[#f0fde8] text-gray-800 rounded-lg px-3 py-2 text-sm outline-none border border-[#bef264] focus:ring-2 focus:ring-[#a3e635]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 振り返りセクション */}
            <div className="bg-white rounded-xl p-5 border border-[#bef264] shadow-sm space-y-4">
              <span className="block text-sm text-[#65a30d] font-semibold">振り返り</span>
              {[
                { label: "今日したこと", value: didToday, setter: setDidToday },
                { label: "感じたこと", value: felt, setter: setFelt },
                { label: "明日のやること", value: todoTomorrow, setter: setTodoTomorrow },
                { label: "明日どういう一日にするか", value: tomorrowPlan, setter: setTomorrowPlan },
              ].map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 mb-1">{label}</label>
                  <textarea
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    rows={2}
                    className="w-full bg-[#f0fde8] text-gray-800 rounded-lg px-3 py-2 text-sm outline-none border border-[#bef264] focus:ring-2 focus:ring-[#a3e635] resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* プレビュー */}
          <div className="flex flex-col">
            <div className="bg-white rounded-xl p-5 border border-[#bef264] shadow-sm flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#65a30d] font-semibold">プレビュー</span>
                <button
                  onClick={handleCopy}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    copied
                      ? "bg-[#84cc16] text-white"
                      : "bg-[#84cc16] text-white hover:brightness-110 active:scale-95"
                  }`}
                >
                  {copied ? "コピーしました！" : "コピーする"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed flex-1 bg-[#f0fde8] rounded-lg p-4 font-sans border border-[#bef264]">
                {preview || "入力すると、ここにLINE用テキストが表示されます"}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
