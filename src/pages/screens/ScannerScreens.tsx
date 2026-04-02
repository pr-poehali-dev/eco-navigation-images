import { useState } from "react";
import Icon from "@/components/ui/icon";

/* ─────────── SCANNER ─────────── */
export function ScannerScreen({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<"scan" | "confirm" | "success">("scan");
  const [earned] = useState(45);

  const fakePoints = [
    { x: 22, y: 30 }, { x: 78, y: 25 }, { x: 18, y: 72 }, { x: 80, y: 75 },
  ];

  return (
    <div className="flex flex-col min-h-full bg-black">
      {/* Header */}
      <div className="relative px-5 pt-5 pb-3 flex items-center justify-between z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"
        >
          <Icon name="ArrowLeft" size={18} className="text-white" />
        </button>
        <span className="text-white font-bold text-base">Сканер QR</span>
        <button className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
          <Icon name="Zap" size={18} className="text-white" />
        </button>
      </div>

      {phase === "scan" && (
        <>
          {/* Camera area */}
          <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: 340 }}>
            {/* Dark overlay with cutout */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" />
              <div
                className="relative z-10 rounded-3xl"
                style={{ width: 240, height: 240, boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)" }}
              >
                {/* Animated scan line */}
                <div
                  className="absolute left-4 right-4 h-0.5 rounded-full z-20"
                  style={{
                    background: "linear-gradient(90deg, transparent, #4caf6f, transparent)",
                    animation: "scanLine 2s ease-in-out infinite",
                    top: "50%",
                  }}
                />
                <style>{`
                  @keyframes scanLine {
                    0%, 100% { top: 15%; opacity: 0.6; }
                    50% { top: 85%; opacity: 1; }
                  }
                `}</style>

                {/* Corner brackets */}
                {[
                  { top: 0, left: 0, borderTop: "3px solid #4caf6f", borderLeft: "3px solid #4caf6f", borderRadius: "12px 0 0 0" },
                  { top: 0, right: 0, borderTop: "3px solid #4caf6f", borderRight: "3px solid #4caf6f", borderRadius: "0 12px 0 0" },
                  { bottom: 0, left: 0, borderBottom: "3px solid #4caf6f", borderLeft: "3px solid #4caf6f", borderRadius: "0 0 0 12px" },
                  { bottom: 0, right: 0, borderBottom: "3px solid #4caf6f", borderRight: "3px solid #4caf6f", borderRadius: "0 0 12px 0" },
                ].map((s, i) => (
                  <div key={i} className="absolute w-7 h-7" style={s} />
                ))}

                {/* Fake QR grid */}
                <div className="absolute inset-6 grid grid-cols-7 gap-0.5 opacity-20">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{ background: Math.random() > 0.4 ? "#fff" : "transparent", aspectRatio: "1" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pb-6 z-20">
            <p className="text-white/70 text-sm text-center mb-6">
              Наведите камеру на QR-код в пункте приёма вторсырья
            </p>

            {/* QR dots animation */}
            <div className="flex justify-center gap-2 mb-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#4caf6f",
                    animation: `wave 1.2s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setPhase("confirm")}
              className="w-full py-4 rounded-2xl font-bold text-white text-base shimmer-btn"
              style={{ background: "linear-gradient(135deg, #2d8f4e, #8bc34a)" }}
            >
              Симулировать сканирование
            </button>

            <div className="mt-3 p-3 rounded-2xl flex items-center gap-2" style={{ background: "rgba(255,255,255,0.08)" }}>
              <Icon name="Info" size={15} className="text-green-400 shrink-0" />
              <p className="text-white/60 text-xs">QR-код выдаётся сотрудником пункта приёма после взвешивания сырья</p>
            </div>
          </div>
        </>
      )}

      {phase === "confirm" && (
        <div className="flex-1 px-5 py-4 flex flex-col animate-scale-in">
          <div
            className="rounded-3xl p-5 mb-4"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <p className="text-green-400 text-xs uppercase tracking-widest font-semibold mb-3">QR отсканирован</p>

            {/* Fake QR decoded */}
            <div
              className="w-28 h-28 rounded-2xl mx-auto mb-4 flex items-center justify-center relative overflow-hidden"
              style={{ background: "white" }}
            >
              <div className="grid grid-cols-7 gap-0.5 p-2 w-full h-full">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm"
                    style={{ background: [0,1,7,8,14,6,13,42,43,48,47,41,35,36,24,25].includes(i) ? "#1a5c2e" : "transparent" }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label: "Пункт приёма", value: "ЭкоПункт — 22 Партсъезда, 1Г" },
                { label: "Материал", value: "Пластик ПЭТ, 1.8 кг" },
                { label: "Дата", value: "31 марта 2026, 14:22" },
                { label: "Начислено бонусов", value: `+${earned} ЭКО` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2 border-b border-white/10 last:border-0">
                  <span className="text-white/50 text-sm">{row.label}</span>
                  <span
                    className="font-bold text-sm"
                    style={{ color: row.label === "Начислено бонусов" ? "#4caf6f" : "white" }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPhase("success")}
            className="w-full py-4 rounded-2xl font-bold text-white text-base mb-2 shimmer-btn"
            style={{ background: "linear-gradient(135deg, #2d8f4e, #8bc34a)" }}
          >
            Подтвердить начисление
          </button>
          <button onClick={() => setPhase("scan")} className="w-full py-3 text-white/50 text-sm">
            Сканировать заново
          </button>
        </div>
      )}

      {phase === "success" && (
        <div className="flex-1 flex flex-col items-center justify-center px-5 animate-scale-in">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mb-5 animate-bounce-in"
            style={{ background: "linear-gradient(135deg, #2d8f4e, #8bc34a)" }}
          >
            <Icon name="Check" size={52} className="text-white" />
          </div>
          <h3 className="text-white text-2xl font-black mb-1">+{earned} ЭКО</h3>
          <p className="text-green-400 text-base font-semibold mb-1">Бонусы начислены!</p>
          <p className="text-white/50 text-sm mb-8 text-center">
            Спасибо за сдачу вторсырья на пункте<br />22 Партсъезда, 1Г
          </p>

          <div
            className="w-full rounded-2xl p-4 flex items-center gap-3 mb-4"
            style={{ background: "rgba(76,175,111,0.15)", border: "1px solid rgba(76,175,111,0.3)" }}
          >
            <span className="text-2xl">🌍</span>
            <div>
              <p className="text-white font-semibold text-sm">Вы сохранили природу!</p>
              <p className="text-green-400 text-xs">1.8 кг пластика не попало на свалку</p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: "linear-gradient(135deg, #2d8f4e, #8bc34a)" }}
          >
            На главную
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────── RATING ─────────── */
export function RatingScreen() {
  const [tab, setTab] = useState<"monthly" | "quarterly">("monthly");

  const monthlyRanks = [
    {
      place: 1,
      title: "Эко-лидер",
      medal: "🥇",
      gradient: "linear-gradient(135deg, #f6c94e, #e8a800)",
      border: "#f6c94e",
      name: "Мария К.",
      points: 4_820,
      desc: "Лидер месяца среди сдатчиков вторсырья",
      icon: "Crown",
    },
    {
      place: 2,
      title: "Эко-активист",
      medal: "🥈",
      gradient: "linear-gradient(135deg, #c0d6e4, #8fafc2)",
      border: "#c0d6e4",
      name: "Дмитрий В.",
      points: 3_610,
      desc: "Активно участвует во всех акциях",
      icon: "Flame",
    },
    {
      place: 3,
      title: "Эко-сторонник",
      medal: "🥉",
      gradient: "linear-gradient(135deg, #d4a574, #a97c4f)",
      border: "#d4a574",
      name: "Анна С.",
      points: 2_940,
      desc: "Постоянный участник программы",
      icon: "Star",
    },
  ];

  const quarterlyRanks = [
    {
      place: 1,
      title: "Эко-герой квартала",
      medal: "🏆",
      gradient: "linear-gradient(135deg, #f6c94e, #e8a800)",
      border: "#f6c94e",
      name: "Александр Н.",
      points: 14_200,
      desc: "Лучший результат за 3 месяца",
      icon: "Crown",
    },
    {
      place: 2,
      title: "Эко-инноватор квартала",
      medal: "🌟",
      gradient: "linear-gradient(135deg, #c0d6e4, #8fafc2)",
      border: "#c0d6e4",
      name: "Ольга М.",
      points: 11_450,
      desc: "Привлекла более 10 новых участников",
      icon: "Lightbulb",
    },
    {
      place: 3,
      title: "Эко-вдохновитель квартала",
      medal: "💚",
      gradient: "linear-gradient(135deg, #a8d5b5, #4caf6f)",
      border: "#a8d5b5",
      name: "Игорь Т.",
      points: 9_870,
      desc: "Вдохновляет других своим примером",
      icon: "Heart",
    },
  ];

  const ranks = tab === "monthly" ? monthlyRanks : quarterlyRanks;
  const period = tab === "monthly" ? "Апрель 2026" : "I квартал 2026";

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#f0f9f4" }}>
      {/* Header */}
      <div
        className="px-5 pt-5 pb-5"
        style={{ background: "linear-gradient(160deg, #1a4a25 0%, #2d8f4e 100%)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Icon name="Trophy" size={20} className="text-yellow-300" />
          </div>
          <div>
            <h2 className="text-white text-xl font-black">Рейтинг участников</h2>
            <p className="text-green-200 text-xs">{period}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div
          className="flex rounded-2xl p-1"
          style={{ background: "rgba(0,0,0,0.25)" }}
        >
          {(["monthly", "quarterly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-xl text-sm font-bold transition-all duration-300"
              style={
                tab === t
                  ? { background: "white", color: "#1a4a25" }
                  : { color: "rgba(255,255,255,0.6)" }
              }
            >
              {t === "monthly" ? "Ежемесячный" : "Квартальный"}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="px-5 py-5">
        {/* Top-3 podium visual */}
        <div className="flex items-end justify-center gap-3 mb-5" style={{ height: 120 }}>
          {[1, 0, 2].map((idx) => {
            const r = ranks[idx];
            const heights = [88, 120, 72];
            const podiumH = heights[idx === 0 ? 1 : idx === 1 ? 0 : 2];
            return (
              <div key={r.place} className="flex flex-col items-center gap-1" style={{ width: 90 }}>
                <span className="text-lg">{r.medal}</span>
                <p className="text-green-900 font-bold text-xs text-center leading-tight">{r.name}</p>
                <div
                  className="w-full flex items-center justify-center rounded-t-2xl"
                  style={{
                    height: podiumH,
                    background: r.gradient,
                    boxShadow: `0 4px 16px ${r.border}55`,
                  }}
                >
                  <span className="text-white font-black text-lg">#{r.place}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {ranks.map((r) => (
            <div
              key={r.place}
              className="rounded-3xl overflow-hidden"
              style={{
                background: "white",
                border: `2px solid ${r.border}66`,
                boxShadow: `0 4px 16px ${r.border}22`,
              }}
            >
              <div className="flex items-center gap-3 p-4">
                {/* Medal badge */}
                <div
                  className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0"
                  style={{ background: r.gradient }}
                >
                  <span className="text-xl leading-none">{r.medal}</span>
                  <span className="text-white font-black text-xs">#{r.place}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon name={r.icon as "Crown"} size={14} className="text-yellow-500 shrink-0" />
                    <p className="text-green-800 font-black text-sm truncate">{r.title}</p>
                  </div>
                  <p className="text-green-900 font-bold text-base">{r.name}</p>
                  <p className="text-green-600 text-xs leading-tight">{r.desc}</p>
                </div>

                {/* Points */}
                <div className="flex flex-col items-end shrink-0">
                  <p className="font-black text-lg text-green-900">{r.points.toLocaleString("ru")}</p>
                  <p className="text-green-500 text-xs">ЭКО баллов</p>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ background: "#f0f9f4", padding: "0 16px 12px" }}>
                <div className="flex justify-between text-xs text-green-500 mb-1">
                  <span>Прогресс</span>
                  <span>{Math.round((r.points / (tab === "monthly" ? 6000 : 18000)) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#d4edd9" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.round((r.points / (tab === "monthly" ? 6000 : 18000)) * 100)}%`,
                      background: r.gradient,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My place hint */}
        <div
          className="mt-4 rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, #e8f5ec, #d4edd9)", border: "1px solid #b2dbbf" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "#2d8f4e" }}
          >
            <Icon name="User" size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-green-900 font-bold text-sm">Ваше место</p>
            <p className="text-green-600 text-xs">Вы на 12-м месте • 1 240 ЭКО баллов</p>
          </div>
          <div className="text-right">
            <p className="text-green-900 font-black text-base">#12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
