import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Screen, HomeScreen, RegisterScreen, ProfileScreen } from "./screens/HomeScreens";
import { BonusesScreen, HistoryScreen, MarketScreen } from "./screens/EcoScreens";
import { ScannerScreen, RatingScreen } from "./screens/ScannerScreens";
import { MapScreen, SupportScreen } from "./screens/InfoScreens";

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
