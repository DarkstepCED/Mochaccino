import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import confetti from 'canvas-confetti'

// Импортируем наши чистые компоненты и страницы
import { Header } from "./components/Header"
import { Modal } from "./components/Modal"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Staff } from "./pages/Staff"
import { Menu } from "./pages/Menu"
import { Events } from "./pages/Events"
import { Alliances } from "./pages/Alliances"
import { FAQ } from "./pages/FAQ"

// Импортируем логику, данные и стили
import { useMochaccino } from "./hooks/useMochaccino"
import { theme } from "./data"
import { s } from "./styles"
import type { ModalItem } from "./types"

export default function App() {
    // 1. Вся тяжелая логика (таймеры, дискорд-статусы) теперь спрятана в хуке
    const { isMounted, timeLeft, liveStatuses, localTimes, getStatusColor } = useMochaccino()

    // 2. Состояние навигации и модалки
    const [page, setPage] = useState("home")
    const [selected, setSelected] = useState<ModalItem | null>(null)
    const [logoClicks, setLogoClicks] = useState(0)

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
                <iframe width="260" height="145" src="https://www.youtube.com/embed/jfKfPfyJRdk" title="Lofi Radio" frameBorder="0" allowFullScreen style={{ display: "block", opacity: 0.8 }}></iframe>
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