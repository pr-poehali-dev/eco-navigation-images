export default function AppIcon() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}
    >
      <div className="flex flex-col items-center gap-10">

        <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Иконка приложения</p>

        {/* Смартфон */}
        <div
          style={{
            width: 320,
            background: "linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%)",
            borderRadius: 52,
            padding: "14px 14px 20px",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Статус-бар */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 16px 10px" }}>
            <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>9:41</span>
            <div style={{ width: 80, height: 22, background: "#000", borderRadius: 20 }} />
            <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>100%</span>
          </div>

          {/* Экран */}
          <div
            style={{
              borderRadius: 38,
              overflow: "hidden",
              background: "linear-gradient(160deg, #1a3a5c 0%, #0d2137 40%, #1a1a3e 100%)",
              padding: 20,
              minHeight: 380,
              position: "relative",
            }}
          >
            {/* Обои */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(100,120,255,0.15)", filter: "blur(40px)" }} />
              <div style={{ position: "absolute", bottom: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(180,80,200,0.12)", filter: "blur(40px)" }} />
            </div>

            {/* Время */}
            <div style={{ textAlign: "center", marginBottom: 24, position: "relative" }}>
              <div style={{ color: "white", fontSize: 48, fontWeight: 100, letterSpacing: -1 }}>9:41</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>среда, 2 апреля</div>
            </div>

            {/* Сетка иконок */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, position: "relative" }}>
              {[
                { bg: "linear-gradient(135deg,#ff6b6b,#ee5a24)", label: "Почта" },
                { bg: "linear-gradient(135deg,#feca57,#ff9f43)", label: "Карты" },
                { bg: "linear-gradient(135deg,#48dbfb,#0abde3)", label: "Камера" },
                { bg: "linear-gradient(135deg,#ff9ff3,#f368e0)", label: "Музыка" },
                { bg: "linear-gradient(135deg,#a29bfe,#6c5ce7)", label: "Фото" },
                { bg: "linear-gradient(135deg,#55efc4,#00b894)", label: "Здоровье" },
                { bg: "linear-gradient(135deg,#74b9ff,#0984e3)", label: "Браузер" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: item.bg, opacity: 0.45 }} />
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, textAlign: "center" }}>{item.label}</span>
                </div>
              ))}

              {/* НАША ИКОНКА */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  boxShadow: "0 0 0 2.5px rgba(76,175,111,0.9), 0 0 24px rgba(76,175,111,0.7), 0 8px 24px rgba(0,0,0,0.5)",
                  overflow: "hidden",
                }}>
                  <img src="/app-icon.svg" alt="ЭкоВклад" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <span style={{ color: "white", fontSize: 9, fontWeight: 700, textAlign: "center", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>ЭкоВклад</span>
              </div>
            </div>
          </div>
        </div>

        {/* Иконка крупно */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>Иконка крупно</p>
          <div style={{
            borderRadius: 40,
            overflow: "hidden",
            boxShadow: "0 0 0 1px rgba(76,175,111,0.4), 0 20px 60px rgba(76,175,111,0.4), 0 8px 32px rgba(0,0,0,0.6)",
          }}>
            <img src="/app-icon.svg" alt="ЭкоВклад" style={{ width: 160, height: 160, display: "block" }} />
          </div>
          <p style={{ color: "white", fontWeight: 700, fontSize: 16 }}>ЭкоВклад</p>
        </div>

      </div>
    </div>
  );
}
