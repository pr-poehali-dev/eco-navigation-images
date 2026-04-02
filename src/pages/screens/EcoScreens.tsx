import { useState } from "react";
import Icon from "@/components/ui/icon";

/* ─────────── BONUSES ─────────── */
export function BonusesScreen({ bonuses }: { bonuses: number }) {
  const [activeTab, setActiveTab] = useState<"earn" | "spend">("earn");

  const earnItems = [
    { emoji: "♻️", title: "Сдача вторсырья", desc: "До 50 бонусов за визит", bonus: "+50" },
    { emoji: "📱", title: "Отчёт в приложении", desc: "Фото и данные об объёме", bonus: "+20" },
    { emoji: "🚲", title: "Экологичный транспорт", desc: "Велосипед, самокат", bonus: "+10" },
    { emoji: "🛍️", title: "Эко-покупки", desc: "У партнёров программы", bonus: "+5%" },
  ];

  const spendItems = [
    { emoji: "🎭", title: "Театры и музеи", desc: "Скидки до 30%", bonus: "от 100" },
    { emoji: "🎬", title: "Кино", desc: "Билеты со скидкой", bonus: "от 50" },
    { emoji: "🛒", title: "Магазины-партнёры", desc: "Оплата бонусами", bonus: "любая" },
    { emoji: "🌿", title: "Эко-товары", desc: "Саженцы, семена", bonus: "от 200" },
  ];

  return (
    <div>
      <div className="eco-gradient px-5 pt-4 pb-8">
        <h2 className="text-white text-2xl font-black mb-1">Мои бонусы</h2>
        <p className="text-green-200 text-sm">Зарабатывайте и тратьте</p>
        <div className="bonus-card rounded-3xl p-5 mt-4">
          <div className="relative z-10">
            <p className="text-green-200 text-xs uppercase tracking-widest">Баланс</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-white text-4xl font-black">{bonuses.toLocaleString("ru")}</span>
              <span className="text-green-300 text-lg font-semibold mb-1">ЭКО</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 z-10 relative">
        <div className="glass-card rounded-2xl p-1 flex mb-4 shadow">
          {(["earn", "spend"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab ? "eco-gradient text-white shadow-md" : "text-green-600"
              }`}
            >
              {tab === "earn" ? "🌱 Заработать" : "🛍️ Потратить"}
            </button>
          ))}
        </div>

        <div className="space-y-2 pb-4">
          {(activeTab === "earn" ? earnItems : spendItems).map((item, i) => (
            <div
              key={item.title}
              className="glass-card rounded-2xl p-4 flex items-center gap-3 shadow animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="text-green-900 font-bold text-sm">{item.title}</p>
                <p className="text-green-600 text-xs mt-0.5">{item.desc}</p>
              </div>
              <span
                className="font-black text-sm px-3 py-1.5 rounded-xl"
                style={{ background: "#2d8f4e20", color: "#2d8f4e" }}
              >
                {item.bonus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── HISTORY ─────────── */
export function HistoryScreen({ onBack }: { onBack: () => void }) {
  const transactions = [
    {
      date: "Сегодня",
      items: [
        { emoji: "♻️", title: "Сдача макулатуры", subtitle: "Пункт «ЭкоСамара», Советский р-н", amount: "+40", positive: true },
        { emoji: "🎬", title: "Кинотеатр «Вертикаль»", subtitle: "Оплата бонусами", amount: "-80", positive: false },
      ],
    },
    {
      date: "Вчера",
      items: [
        { emoji: "🚲", title: "Велопоездка", subtitle: "Самокат / Набережная Волги", amount: "+10", positive: true },
        { emoji: "🎭", title: "Самарский драмтеатр", subtitle: "Скидка на билет", amount: "-150", positive: false },
      ],
    },
    {
      date: "28 марта",
      items: [
        { emoji: "♻️", title: "Сдача стекла", subtitle: "Пункт «РециклТольятти»", amount: "+55", positive: true },
        { emoji: "🛍️", title: "Магазин «Добрянка»", subtitle: "Покупка эко-товаров", amount: "+15", positive: true },
      ],
    },
  ];

  return (
    <div>
      <div className="eco-gradient px-5 pt-4 pb-6">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <Icon name="ArrowLeft" size={18} className="text-white" />
        </button>
        <h2 className="text-white text-2xl font-black">История</h2>
        <p className="text-green-200 text-sm mt-0.5">Все транзакции и активности</p>
      </div>

      <div className="px-5 -mt-3 pb-4 space-y-4">
        {transactions.map((group, gi) => (
          <div key={group.date} className="animate-fade-in" style={{ animationDelay: `${gi * 0.15}s` }}>
            <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-2">{group.date}</p>
            <div className="glass-card rounded-2xl overflow-hidden shadow">
              {group.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-3 px-4 py-3.5 border-b border-green-50 last:border-0">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="text-green-900 font-semibold text-sm">{item.title}</p>
                    <p className="text-green-500 text-xs mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className={`font-black text-base ${item.positive ? "text-green-600" : "text-red-400"}`}>
                    {item.amount} ЭКО
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── MARKET ─────────── */
export function MarketScreen({ bonuses }: { bonuses: number }) {
  const categories = [
    {
      title: "🎭 Театры",
      items: [
        { name: "Самарский драмтеатр", desc: "Скидка 25% на любой спектакль", price: 300 },
        { name: "СамАрт (ТЮЗ)", desc: "Льготные билеты для семей", price: 200 },
      ],
    },
    {
      title: "🏛️ Музеи",
      items: [
        { name: "Музей Алабина", desc: "Бесплатный вход 1 раз/мес", price: 150 },
        { name: "Самарский зоопарк", desc: "Скидка 30% на посещение", price: 120 },
      ],
    },
    {
      title: "🎬 Кино",
      items: [
        { name: "Кинотеатр «Вертикаль»", desc: "Билет 2D за полцены", price: 80 },
        { name: "IMAX Самара Молл", desc: "Скидка 20% на все сеансы", price: 120 },
      ],
    },
  ];

  return (
    <div>
      <div className="eco-gradient px-5 pt-4 pb-8">
        <h2 className="text-white text-2xl font-black mb-1">Маркет</h2>
        <p className="text-green-200 text-sm">Обменяйте бонусы на впечатления</p>
        <div className="flex items-center gap-2 mt-3 bg-white/20 rounded-2xl px-4 py-2.5">
          <Icon name="Search" size={16} className="text-white opacity-70" />
          <span className="text-white/60 text-sm">Найти предложение...</span>
        </div>
      </div>

      <div className="px-5 -mt-4 z-10 relative">
        <div className="glass-card rounded-2xl px-4 py-3 mb-4 flex items-center justify-between shadow">
          <span className="text-green-700 text-sm font-medium">Ваш баланс:</span>
          <span className="font-black text-green-800">{bonuses.toLocaleString("ru")} ЭКО</span>
        </div>

        <div className="space-y-4 pb-4">
          {categories.map((cat, ci) => (
            <div key={cat.title} className="animate-fade-in" style={{ animationDelay: `${ci * 0.12}s` }}>
              <h3 className="text-green-900 font-bold text-base mb-2">{cat.title}</h3>
              <div className="space-y-2">
                {cat.items.map((item, ii) => (
                  <div key={ii} className="glass-card rounded-2xl p-4 flex items-center gap-3 shadow">
                    <div className="flex-1">
                      <p className="text-green-900 font-bold text-sm">{item.name}</p>
                      <p className="text-green-600 text-xs mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      className="flex flex-col items-center px-3 py-2 rounded-xl shimmer-btn"
                      style={{
                        background:
                          bonuses >= item.price
                            ? "linear-gradient(135deg, #2d8f4e, #8bc34a)"
                            : "#e0e0e0",
                      }}
                    >
                      <span className="font-black text-sm" style={{ color: bonuses >= item.price ? "white" : "#999" }}>
                        {item.price}
                      </span>
                      <span className="text-[10px]" style={{ color: bonuses >= item.price ? "rgba(255,255,255,0.8)" : "#bbb" }}>
                        ЭКО
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
