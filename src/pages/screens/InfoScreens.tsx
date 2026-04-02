import { useState } from "react";
import Icon from "@/components/ui/icon";

/* ─────────── MAP ─────────── */
export function MapScreen() {
  const [selected, setSelected] = useState<number | null>(null);

  const points = [
    { id: 1, x: 30, y: 28, name: "ЭкоСамара — Советский р-н", type: "Металл, стекло, пластик", rating: 4.8, emoji: "♻️" },
    { id: 2, x: 62, y: 45, name: "РециклТольятти — ул. Юбилейная", type: "Макулатура, ПЭТ, металл", rating: 4.6, emoji: "📦" },
    { id: 3, x: 48, y: 65, name: "Эко-маркет «Волга», Самара", type: "Партнёр, скидки за бонусы", rating: 4.9, emoji: "🌿" },
    { id: 4, x: 75, y: 30, name: "ЭкоПункт — Жигулёвск", type: "Электроника, батарейки", rating: 4.5, emoji: "🔋" },
    { id: 5, x: 20, y: 60, name: "Библиотека им. Ленина, Самара", type: "Партнёр, книги за бонусы", rating: 4.7, emoji: "📚" },
    { id: 6, x: 55, y: 38, name: "ЭкоПункт — 22 Партсъезда, 1Г", type: "Вторсырьё, металл, пластик", rating: 4.9, emoji: "♻️" },
  ];

  return (
    <div>
      <div className="eco-gradient px-5 pt-4 pb-5">
        <h2 className="text-white text-2xl font-black mb-1">Карта</h2>
        <p className="text-green-200 text-sm">Пункты приёма и эко-партнёры</p>
        <div className="flex items-center gap-2 mt-3 bg-white/20 rounded-2xl px-4 py-2.5">
          <Icon name="Search" size={16} className="text-white opacity-70" />
          <span className="text-white/60 text-sm">Самара, Тольятти, Сызрань...</span>
        </div>
      </div>

      <div className="px-5 -mt-3 pb-4">
        <div
          className="relative rounded-3xl overflow-hidden mb-3 shadow-lg"
          style={{ height: 220, background: "linear-gradient(160deg, #c8e6c9 0%, #a5d6a7 40%, #81c784 100%)" }}
        >
          {[20, 40, 60, 80].map((p) => (
            <div key={p}>
              <div className="absolute top-0 bottom-0 border-l border-green-300/30" style={{ left: `${p}%` }} />
              <div className="absolute left-0 right-0 border-t border-green-300/30" style={{ top: `${p}%` }} />
            </div>
          ))}
          <div
            className="absolute"
            style={{ top: "50%", left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.5)", transform: "translateY(-50%)" }}
          />
          <div
            className="absolute"
            style={{ left: "45%", top: 0, bottom: 0, width: 3, background: "rgba(255,255,255,0.5)", transform: "translateX(-50%)" }}
          />

          {points.map((point) => (
            <button
              key={point.id}
              onClick={() => setSelected(selected === point.id ? null : point.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 map-pin-bounce"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg border-2 transition-all duration-200 ${
                  selected === point.id ? "scale-125 border-yellow-400" : "border-white"
                }`}
                style={{ background: selected === point.id ? "#1a5c2e" : "white" }}
              >
                {point.emoji}
              </div>
            </button>
          ))}

          <div
            className="absolute animate-pulse-green"
            style={{ left: "50%", top: "52%", transform: "translate(-50%,-50%)" }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "#0d47a1", border: "3px solid white" }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {selected && (
          <div className="glass-card rounded-2xl p-4 shadow-lg mb-3 animate-scale-in">
            {(() => {
              const p = points.find((pt) => pt.id === selected)!;
              return (
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.emoji}</span>
                  <div className="flex-1">
                    <p className="text-green-900 font-bold text-sm">{p.name}</p>
                    <p className="text-green-600 text-xs mt-0.5">{p.type}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-yellow-500" />
                    <span className="text-green-700 font-bold text-sm">{p.rating}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <div className="space-y-2">
          {points.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`w-full glass-card rounded-2xl p-3 flex items-center gap-3 shadow text-left transition-all duration-200 animate-fade-in ${
                selected === p.id ? "ring-2 ring-green-500" : ""
              }`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="text-xl">{p.emoji}</span>
              <div className="flex-1">
                <p className="text-green-900 font-semibold text-sm">{p.name}</p>
                <p className="text-green-500 text-xs">{p.type}</p>
              </div>
              <div className="flex items-center gap-0.5">
                <Icon name="Star" size={12} className="text-yellow-500" />
                <span className="text-green-700 text-xs font-semibold">{p.rating}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SUPPORT ─────────── */
export function SupportScreen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Как начисляются бонусы?",
      a: "Бонусы начисляются автоматически после посещения пункта приёма или совершения эко-покупки у партнёра. Обычно в течение 24 часов.",
    },
    {
      q: "Как войти через Госуслуги?",
      a: "Нажмите «Войти через Госуслуги» на главной странице. Вы будете перенаправлены на портал для подтверждения личности.",
    },
    {
      q: "Где потратить бонусы?",
      a: "В разделе «Маркет» доступны театры, музеи, кино и магазины-партнёры. Также можно оплатить эко-товары у партнёров программы.",
    },
    {
      q: "Бонусы сгорают?",
      a: "Бонусы действительны 12 месяцев с момента начисления. Активные участники получают статус, который продлевает срок действия.",
    },
    {
      q: "Как найти пункт приёма?",
      a: "В разделе «Карта» отмечены все ближайшие пункты приёма вторсырья и эко-партнёры. Можно построить маршрут.",
    },
  ];

  return (
    <div>
      <div className="eco-gradient px-5 pt-4 pb-8">
        <h2 className="text-white text-2xl font-black mb-1">Поддержка</h2>
        <p className="text-green-200 text-sm">Всегда рядом, когда нужна помощь</p>
      </div>

      <div className="px-5 -mt-4 z-10 relative pb-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 animate-fade-in">
          {[
            { icon: "MessageCircle", label: "Чат с нами", sub: "Ответим за 5 мин", color: "#2d8f4e" },
            { icon: "Phone", label: "Позвонить", sub: "8-800-123-45-67", color: "#5aab6e" },
            { icon: "Mail", label: "Email", sub: "eco@samregion.ru", color: "#8bc34a" },
            { icon: "FileText", label: "Обращение", sub: "Официальный запрос", color: "#4caf6f" },
          ].map((item) => (
            <button
              key={item.label}
              className="glass-card rounded-2xl p-4 text-left shadow flex flex-col gap-2 active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.color }}>
                <Icon name={item.icon} size={20} className="text-white" />
              </div>
              <div>
                <p className="text-green-900 font-bold text-sm">{item.label}</p>
                <p className="text-green-600 text-xs">{item.sub}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="animate-fade-in delay-200">
          <h3 className="text-green-900 font-bold text-base mb-2">Частые вопросы</h3>
          <div className="glass-card rounded-2xl overflow-hidden shadow">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-green-50 last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className="flex-1 text-green-900 font-semibold text-sm">{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-green-500 shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <p className="text-green-700 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-4 flex items-center gap-3 animate-fade-in delay-300"
          style={{ background: "linear-gradient(135deg, #e8f5e9, #f0f9f4)" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#2d8f4e" }}>
            <Icon name="Leaf" size={18} className="text-white" />
          </div>
          <div>
            <p className="text-green-900 font-bold text-sm">Экстренная линия</p>
            <p className="text-green-600 text-xs">Министерство лесного хозяйства Самарской обл.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
