import { useState } from "react";
import Icon from "@/components/ui/icon";

type Screen =
  | "home"
  | "register"
  | "profile"
  | "scanner"
  | "bonuses"
  | "history"
  | "market"
  | "map"
  | "rating"
  | "support";

const BG_IMAGE =
  "https://cdn.poehali.dev/projects/1f3a7081-4499-4f28-b41f-34a5a13e1a10/files/4b21c598-f3c4-4180-9e11-26c75180e13c.jpg";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [bonuses] = useState(1_240);
  const [registered, setRegistered] = useState(false);

  const navItems = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "scanner", icon: "ScanLine", label: "Сканер" },
    { id: "bonuses", icon: "Leaf", label: "Бонусы" },
    { id: "rating", icon: "Trophy", label: "Рейтинг" },
    { id: "market", icon: "ShoppingBag", label: "Маркет" },
  ] as const;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #0d2b14 0%, #1a4a25 40%, #2d7a3e 100%)" }}
    >
      <div
        className="relative w-full max-w-[390px] rounded-[48px] overflow-hidden shadow-2xl"
        style={{
          height: "844px",
          background: "#f0f9f4",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.15)",
        }}
      >
        {/* Status bar */}
        <div className="eco-gradient px-6 pt-4 pb-2 flex items-center justify-between relative">
          <span className="text-white text-xs font-semibold opacity-90">9:41</span>
          <div className="w-28 h-6 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-3" />
          <div className="flex gap-1 items-center">
            <div className="flex gap-0.5 items-end">
              <div className="w-1 h-2 bg-white rounded-sm opacity-90" />
              <div className="w-1 h-3 bg-white rounded-sm opacity-90" />
              <div className="w-1 h-4 bg-white rounded-sm" />
            </div>
            <Icon name="Wifi" size={14} className="text-white" />
            <Icon name="Battery" size={16} className="text-white" />
          </div>
        </div>

        {/* Screen content */}
        <div className="relative overflow-y-auto" style={{ height: "calc(844px - 56px - 76px)" }}>
          {screen === "home" && <HomeScreen onNavigate={setScreen} bonuses={bonuses} />}
          {screen === "register" && (
            <RegisterScreen
              onBack={() => setScreen("home")}
              onSuccess={() => { setRegistered(true); setScreen("home"); }}
              registered={registered}
            />
          )}
          {screen === "profile" && <ProfileScreen onBack={() => setScreen("home")} bonuses={bonuses} />}
          {screen === "scanner" && <ScannerScreen onBack={() => setScreen("home")} />}
          {screen === "bonuses" && <BonusesScreen bonuses={bonuses} />}
          {screen === "history" && <HistoryScreen onBack={() => setScreen("home")} />}
          {screen === "market" && <MarketScreen bonuses={bonuses} />}
          {screen === "map" && <MapScreen />}
          {screen === "rating" && <RatingScreen />}
          {screen === "support" && <SupportScreen />}
        </div>

        {/* Bottom navigation */}
        <div
          className="absolute bottom-0 left-0 right-0 glass-card border-t border-green-100"
          style={{ height: "76px", paddingBottom: "16px" }}
        >
          <div className="flex items-center justify-around h-full px-2">
            {navItems.map((item, i) => {
              const isActive = screen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setScreen(item.id as Screen)}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-300 ${
                    isActive ? "nav-item-active scale-105" : "text-green-600 hover:bg-green-50"
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <Icon
                    name={item.icon}
                    size={22}
                    className={isActive ? "text-white" : "text-green-700"}
                  />
                  <span className={`text-[10px] font-semibold ${isActive ? "text-white" : "text-green-700"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── HOME ─────────── */
function HomeScreen({ onNavigate, bonuses }: { onNavigate: (s: Screen) => void; bonuses: number }) {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
        <img src={BG_IMAGE} alt="eco" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(26,92,46,0.6) 0%, rgba(26,92,46,0.88) 100%)" }}
        />
        <div className="relative z-10 px-5 pt-5 pb-7">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-200 text-sm font-medium">Самарская область 🌍</p>
              <h1 className="text-white text-2xl font-black tracking-tight">ЭкоБонус 🌿</h1>
            </div>
            <button
              onClick={() => onNavigate("profile")}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30"
            >
              <Icon name="User" size={22} className="text-white" />
            </button>
          </div>

          <div className="bonus-card rounded-3xl p-5 animate-fade-in">
            <div className="relative z-10">
              <p className="text-green-200 text-xs font-medium uppercase tracking-widest mb-1">Ваши бонусы</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-white text-4xl font-black">{bonuses.toLocaleString("ru")}</span>
                <span className="text-green-300 text-lg font-semibold mb-1">ЭКО</span>
              </div>
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                🌱 Уровень: Эко-друг
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 z-10 relative animate-slide-up">
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { icon: "Leaf", label: "Бонусы", color: "#2d8f4e", screen: "bonuses" as Screen },
            { icon: "Clock", label: "История", color: "#5aab6e", screen: "history" as Screen },
            { icon: "ShoppingBag", label: "Маркет", color: "#8bc34a", screen: "market" as Screen },
            { icon: "MapPin", label: "Карта", color: "#4caf6f", screen: "map" as Screen },
          ].map((item, i) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.screen)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl animate-fade-in"
              style={{
                background: item.color + "18",
                border: `1.5px solid ${item.color}30`,
                animationDelay: `${(i + 1) * 0.1}s`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: item.color }}
              >
                <Icon name={item.icon} size={20} className="text-white" />
              </div>
              <span className="text-xs font-semibold" style={{ color: item.color }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate("register")}
          className="w-full rounded-2xl p-4 flex items-center gap-3 mb-4 animate-fade-in shimmer-btn"
          style={{ background: "linear-gradient(135deg, #0d47a1, #1565c0)", animationDelay: "0.3s" }}
        >
          <div
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl font-black shrink-0"
            style={{ color: "#0d47a1" }}
          >
            Г
          </div>
          <div className="text-left flex-1">
            <p className="text-white font-bold text-sm">Войти через Госуслуги</p>
            <p className="text-blue-200 text-xs">Быстрая регистрация за 1 клик</p>
          </div>
          <Icon name="ChevronRight" size={18} className="text-blue-200" />
        </button>

        <h2 className="text-green-900 font-bold text-base mb-3">Новости эко-программы</h2>
        <div className="space-y-3 pb-4">
          {[
            { emoji: "♻️", title: "Сдай вторсырьё в Самаре — получи 50 бонусов!", time: "2 часа назад", color: "#e8f5e9" },
            { emoji: "🎭", title: "СамАрт и Драмтеатр — скидка 20% за бонусы", time: "вчера", color: "#fff8e1" },
            { emoji: "🌳", title: "Новый пункт приёма на ул. Ново-Садовой", time: "3 дня назад", color: "#e8f5e9" },
          ].map((n, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 flex items-center gap-3 animate-fade-in"
              style={{ background: n.color, animationDelay: `${(i + 4) * 0.1}s` }}
            >
              <span className="text-2xl">{n.emoji}</span>
              <div>
                <p className="text-green-900 font-semibold text-sm">{n.title}</p>
                <p className="text-green-600 text-xs mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── REGISTER ─────────── */
function RegisterScreen({
  onBack,
  onSuccess,
  registered,
}: {
  onBack: () => void;
  onSuccess: () => void;
  registered: boolean;
}) {
  const [step, setStep] = useState(registered ? 2 : 0);

  return (
    <div className="flex flex-col min-h-full">
      <div className="eco-gradient px-5 pt-4 pb-8">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-4"
        >
          <Icon name="ArrowLeft" size={18} className="text-white" />
        </button>
        <h2 className="text-white text-2xl font-black">Регистрация</h2>
        <p className="text-green-200 text-sm mt-1">Создайте аккаунт через Госуслуги</p>
      </div>

      <div className="flex-1 px-5 -mt-4">
        {step === 0 && (
          <div className="animate-scale-in">
            <div className="glass-card rounded-3xl p-6 mb-4 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0"
                  style={{ background: "#0d47a1", color: "white" }}
                >
                  Г
                </div>
                <div>
                  <p className="font-bold text-green-900">Госуслуги</p>
                  <p className="text-green-600 text-sm">Единый портал гос. услуг</p>
                </div>
              </div>
              <p className="text-green-800 text-sm mb-5 leading-relaxed">
                Для регистрации используется ваш аккаунт на портале Госуслуги. Это безопасно и занимает 30 секунд.
              </p>
              <div className="space-y-2 mb-6">
                {["Имя и фамилия", "ИНН (для начисления бонусов)", "Адрес регистрации"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "#2d8f4e" }}
                    >
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                    <span className="text-green-800 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="w-full py-4 rounded-2xl font-bold text-white text-base shimmer-btn"
                style={{ background: "#0d47a1" }}
              >
                Войти через Госуслуги
              </button>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-xs">Нажимая кнопку, вы соглашаетесь с</p>
              <p className="text-green-700 text-xs font-semibold">Политикой конфиденциальности</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-scale-in">
            <div className="glass-card rounded-3xl p-6 mb-4 shadow-lg text-center">
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl font-black"
                style={{ background: "#0d47a1", color: "white" }}
              >
                Г
              </div>
              <h3 className="font-bold text-green-900 text-lg mb-2">Подтверждение</h3>
              <p className="text-green-600 text-sm mb-6 leading-relaxed">
                Открываем Госуслуги для авторизации. После подтверждения вы вернётесь в приложение.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "#e8f5e9" }}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#2d8f4e" }}
                  >
                    <Icon name="Shield" size={18} className="text-white" />
                  </div>
                  <p className="text-green-800 text-sm font-medium text-left">
                    Данные защищены протоколом OAuth 2.0
                  </p>
                </div>
                <button
                  onClick={() => { setStep(2); setTimeout(onSuccess, 1500); }}
                  className="w-full py-4 rounded-2xl font-bold text-white text-base eco-gradient"
                >
                  Подтвердить и продолжить
                </button>
                <button onClick={() => setStep(0)} className="w-full py-3 text-green-600 text-sm font-medium">
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-scale-in text-center py-8">
            <div
              className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center animate-bounce-in"
              style={{ background: "linear-gradient(135deg, #2d8f4e, #8bc34a)" }}
            >
              <Icon name="Check" size={44} className="text-white" />
            </div>
            <h3 className="font-black text-green-900 text-2xl mb-2">Вы в системе!</h3>
            <p className="text-green-600 text-sm mb-6">Аккаунт успешно создан через Госуслуги</p>
            <div className="glass-card rounded-3xl p-5 mb-4 shadow-lg text-left">
              <p className="text-green-700 text-xs uppercase tracking-widest font-semibold mb-3">Данные аккаунта</p>
              {[
                { label: "Имя", value: "Иван Петров" },
                { label: "Статус", value: "🌱 Эко-новичок" },
                { label: "Стартовые бонусы", value: "50 ЭКО" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2 border-b border-green-100 last:border-0">
                  <span className="text-green-600 text-sm">{row.label}</span>
                  <span className="text-green-900 font-semibold text-sm">{row.value}</span>
                </div>
              ))}
            </div>
            <button onClick={onBack} className="w-full py-4 rounded-2xl font-bold text-white eco-gradient">
              На главную
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────── PROFILE ─────────── */
function ProfileScreen({ onBack, bonuses }: { onBack: () => void; bonuses: number }) {
  return (
    <div>
      <div className="eco-gradient px-5 pt-4 pb-10">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <Icon name="ArrowLeft" size={18} className="text-white" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/25 flex items-center justify-center text-3xl border-2 border-white/40 animate-float">
            🌿
          </div>
          <div>
            <h2 className="text-white text-xl font-black">Иван Петров</h2>
            <p className="text-green-200 text-sm">ivan.petrov@mail.ru</p>
            <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium mt-1 inline-block">
              🌱 Эко-друг
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 z-10 relative space-y-3 pb-4">
        <div className="glass-card rounded-3xl p-4 shadow-lg animate-fade-in">
          <p className="text-green-700 text-xs uppercase tracking-widest font-semibold mb-3">Статистика</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "1 240", label: "ЭКО бонусов", color: "#2d8f4e" },
              { value: "23", label: "Сдач вторсырья", color: "#5aab6e" },
              { value: "4.8 кг", label: "CO₂ сохранено", color: "#8bc34a" },
            ].map((s) => (
              <div key={s.label} className="text-center p-2 rounded-2xl" style={{ background: s.color + "15" }}>
                <p className="font-black text-lg" style={{ color: s.color }}>
                  {s.value}
                </p>
                <p className="text-green-700 text-[10px] font-medium leading-tight mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-4 shadow-lg animate-fade-in delay-100">
          <div className="flex justify-between items-center mb-2">
            <p className="text-green-700 text-xs uppercase tracking-widest font-semibold">Прогресс уровня</p>
            <span className="text-green-600 text-xs font-bold">1240 / 2000</span>
          </div>
          <div className="w-full h-3 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full eco-gradient-vivid" style={{ width: "62%" }} />
          </div>
          <p className="text-green-600 text-xs mt-2">760 бонусов до уровня «Эко-герой» 🏆</p>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden shadow-lg animate-fade-in delay-200">
          {[
            { icon: "CreditCard", label: "Реквизиты и платежи", color: "#2d8f4e" },
            { icon: "Bell", label: "Уведомления", color: "#5aab6e" },
            { icon: "Shield", label: "Конфиденциальность", color: "#4caf6f" },
            { icon: "LogOut", label: "Выйти из аккаунта", color: "#e57373" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-green-50 last:border-0 active:bg-green-50 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: item.color + "20" }}
              >
                <Icon name={item.icon} size={18} style={{ color: item.color }} />
              </div>
              <span className="flex-1 text-green-900 font-medium text-sm text-left">{item.label}</span>
              <Icon name="ChevronRight" size={16} className="text-green-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SCANNER ─────────── */
function ScannerScreen({ onBack }: { onBack: () => void }) {
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

/* ─────────── BONUSES ─────────── */
function BonusesScreen({ bonuses }: { bonuses: number }) {
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
function HistoryScreen({ onBack }: { onBack: () => void }) {
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
function MarketScreen({ bonuses }: { bonuses: number }) {
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

/* ─────────── RATING ─────────── */
function RatingScreen() {
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

/* ─────────── MAP ─────────── */
function MapScreen() {
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
                    <div className="flex items-center gap-1 mt-1">
                      <Icon name="Star" size={12} className="text-yellow-500" />
                      <span className="text-green-700 text-xs font-semibold">{p.rating}</span>
                    </div>
                  </div>
                  <button className="px-3 py-2 rounded-xl text-white text-xs font-bold eco-gradient">
                    Маршрут
                  </button>
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
function SupportScreen() {
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