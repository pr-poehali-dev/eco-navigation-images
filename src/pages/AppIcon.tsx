export default function AppIcon() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-white text-xl font-bold opacity-60 tracking-widest uppercase">
          Иконка приложения
        </h1>

        {/* Phone homescreen mockup */}
        <div
          className="relative rounded-[36px] p-6 flex flex-col items-center gap-2"
          style={{
            background: "linear-gradient(180deg, #1c1c3e 0%, #2d2d5e 100%)",
            width: 340,
            boxShadow: "0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.1)",
          }}
        >
          {/* Status bar */}
          <div className="flex w-full justify-between px-2 mb-2">
            <span className="text-white text-xs opacity-70">9:41</span>
            <div className="w-16 h-4 bg-black rounded-full" />
            <span className="text-white text-xs opacity-70">100%</span>
          </div>

          {/* Wallpaper area with icons grid */}
          <div
            className="w-full rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              minHeight: 260,
            }}
          >
            {/* Fake other icons row */}
            <div className="flex gap-4 mb-4 justify-center">
              {["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3"].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-2xl opacity-60" style={{ background: c }} />
                  <span className="text-white text-xs opacity-50">Приложение</span>
                </div>
              ))}
            </div>

            {/* Our icon — highlighted */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1.5">
                {/* Glow ring */}
                <div
                  className="relative"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(76,175,111,0.8)) drop-shadow(0 0 40px rgba(76,175,111,0.4))",
                  }}
                >
                  <img
                    src="/app-icon.svg"
                    alt="ЭкоВклад"
                    className="w-20 h-20 rounded-[22px]"
                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
                  />
                </div>
                <span className="text-white text-xs font-semibold" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                  ЭкоВклад
                </span>
              </div>
            </div>
          </div>

          {/* Dock */}
          <div
            className="flex gap-4 mt-2 px-4 py-3 rounded-2xl w-full justify-center"
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}
          >
            {["#4cd964", "#007aff", "#ff9500", "#ff3b30"].map((c, i) => (
              <div key={i} className="w-14 h-14 rounded-2xl opacity-50" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Large standalone icon */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-white opacity-40 text-sm tracking-wider">Иконка крупно</p>
          <img
            src="/app-icon.svg"
            alt="ЭкоВклад"
            className="rounded-[48px]"
            style={{
              width: 180,
              height: 180,
              boxShadow: "0 20px 60px rgba(76,175,111,0.5), 0 8px 32px rgba(0,0,0,0.5)",
            }}
          />
          <p className="text-white font-bold text-lg">ЭкоВклад</p>
        </div>
      </div>
    </div>
  );
}
