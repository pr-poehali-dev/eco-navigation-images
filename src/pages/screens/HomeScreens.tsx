import { useState } from "react";
import Icon from "@/components/ui/icon";

export type Screen =
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

export const BG_IMAGE =
  "https://cdn.poehali.dev/projects/1f3a7081-4499-4f28-b41f-34a5a13e1a10/files/4b21c598-f3c4-4180-9e11-26c75180e13c.jpg";

/* ─────────── HOME ─────────── */
export function HomeScreen({ onNavigate, bonuses }: { onNavigate: (s: Screen) => void; bonuses: number }) {
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
              <h1 className="text-white text-2xl font-black tracking-tight">ЭкоВклад 🌿</h1>
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
            <p className="text-blue-200 text-xs">Получите +50 бонусов за регистрацию</p>
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
export function RegisterScreen({
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
export function ProfileScreen({ onBack, bonuses }: { onBack: () => void; bonuses: number }) {
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
