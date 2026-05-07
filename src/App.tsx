import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Modal } from "./components/Modal"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Staff } from "./pages/Staff"
import { Menu } from "./pages/Menu"
import { Events } from "./pages/Events"
import { Alliances } from "./pages/Alliances"
import { FAQ } from "./pages/FAQ"
import { theme, themes} from "./data"
import confetti from 'canvas-confetti' // Решает ошибку с 'confetti'
import { Header } from "./components/Header" // Решает ошибку с 'Header'
// Импортируем логику, данные и стили
import { useMochaccino } from "./hooks/useMochaccino"
import { s } from "./styles"

import type { ModalItem } from "./types"

export default function App() {
    // 1. Вся тяжелая логика (таймеры, дискорд-статусы) теперь спрятана в хуке
    const { isMounted, timeLeft, liveStatuses, localTimes, getStatusColor } = useMochaccino()
    const [currentTheme, setCurrentTheme] = useState(themes.dark);

// Добавь это в return внутри <div style={...}>
// Чтобы фон менялся динамически:
<div style={{...s.root, backgroundColor: currentTheme.bg, color: currentTheme.text}}></div>

    const [showToast, setShowToast] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 3000); // Показать через 3 сек
    return () => clearTimeout(timer);
}, []);

// В JSX (внизу, перед закрывающим </div>):
<AnimatePresence>
    {showToast && (
        <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            style={s.toast}
        >
            {/* Сама ссылка на анкету */}
            <a 
                href="https://forms.gle/eiWDDY42wUKAKCgv6" // Твоя ссылка из раздела Staff
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit' }}
                onClick={() => setShowToast(false)} // Закрываем тост после клика
            >
                <div style={{fontSize: '24px'}}>☕</div>
                <div>
                    <b style={{display: 'block', color: currentTheme.text}}>Набор открыт!</b>
                    <span style={{fontSize: '12px', opacity: 0.8, color: currentTheme.text}}>
                        Нажми, чтобы подать заявку в Staff
                    </span>
                </div>
            </a>

            {/* Кнопка закрытия (чтобы просто убрать уведомление) */}
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Важно: чтобы клик по крестику не открывал ссылку
                    setShowToast(false);
                }} 
                style={s.toastClose}
            >
                ×
            </button>
        </motion.div>
    )}
</AnimatePresence>
    // 2. Состояние навигации и модалки
    const [page, setPage] = useState("home")
    const [selected, setSelected] = useState<ModalItem | null>(null)
    const [logoClicks, setLogoClicks] = useState(0)
    const toggleTheme = () => {
        setCurrentTheme(currentTheme.id === "dark" ? themes.light : themes.dark);
        };
    // 3. Пасхалка и приветствие в консоли
    useEffect(() => {
        console.log(
            "%c☕ MOCHACCINO V3 %cBuilt with a passion for coding. Hello, developer!",
            "color: #6F4E37; font-size: 20px; font-weight: bold; font-family: serif;",
            "color: #FFFDD0; font-size: 14px;"
        );
    }, []);

    const handleLogoClick = () => {
        const newCount = logoClicks + 1;
        setLogoClicks(newCount);
        if (newCount === 10) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: [theme.accent, theme.purple, '#FFFDD0']
            });
            setLogoClicks(0);
            console.log("🎉 EASTER EGG UNLOCKED!");
        }
    };

    return (
        <div style={s.root}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Inter:wght@400;600;800&display=swap');
                html, body { margin: 0; padding: 0; min-height: 100vh; background-color: #1a0f0d; font-family: 'Inter', sans-serif; color: #FFFDD0; overflow-x: hidden; }
                * { box-sizing: border-box; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-thumb { background: #6F4E37; border-radius: 10px; }
            `}</style>

            {/* Фоновый слой */}
            <div style={s.bgContainer}>
                <div style={s.bgImage} />
                <div style={s.bgGlass} />
            </div>

            {/* Шапка сайта */}
            <Header 
                page={page} 
                setPage={setPage} 
                isMounted={isMounted} 
                timeLeft={timeLeft} 
                handleLogoClick={handleLogoClick}
                toggleTheme={toggleTheme}     // ВОТ ЭТО решает ошибку toggleTheme
                currentTheme={currentTheme}
            />

            {/* Основной контент (переключение страниц) */}
            <main style={s.mainContent}>
                <AnimatePresence mode="wait">
                    {page === "home" && <Home setPage={setPage} />}
                    {page === "about" && <About />}
                    {page === "menu" && <Menu />}
                    {page === "staff" && <Staff setSelected={setSelected} getStatusColor={getStatusColor} />}
                    {page === "events" && <Events setSelected={setSelected} localTimes={localTimes} isMounted={isMounted} />}
                    {page === "alliances" && <Alliances setSelected={setSelected} />}
                    {page === "faq" && <FAQ />}
                </AnimatePresence>
            </main>

            {/* Музыкальный плеер */}
            <div style={{ position: "fixed", bottom: "25px", left: "25px", zIndex: 90, borderRadius: "20px", overflow: "hidden", background: "#000" }}>
                <div style={s.radioPlayer}>
                    <div style={s.radioInfo}>
                        <div style={s.radioDot} />
                        <span>LOFI RADIO — 24/7 AESTHETIC BEATS</span>
                    </div>
                <iframe 
                    width="0" height="0" 
                    src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1" 
                    style={{ position: "absolute", pointerEvents: "none", opacity: 0 }}
                />
                <div style={s.radioControls}>
                    <button style={s.radioBtn}>PAUSE</button>
                    <input type="range" style={s.volumeSlider} />
                </div>
</div>
            </div>

            {/* Футер */}
            <footer style={s.footer}>
                © 2026 MOCHACCINO CAFE. ALL RIGHTS RESERVED. <br/>
                <span style={{ fontSize: '10px', letterSpacing: '4px', color: theme.accent }}>EST. 2026</span>
            </footer>

            {/* Модальное окно */}
            <Modal 
                selected={selected} 
                setSelected={setSelected} 
                statusColor={getStatusColor(selected?.id || "")} 
                liveStatus={liveStatuses[selected?.id || ""]}
            />
        </div>
    )
}