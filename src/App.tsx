import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { theme } from "./data"
import { Modal } from "./components/Modal"
import { Header } from "./components/Header"
import type { ModalItem } from "./types"
import { Home } from "./pages/Home"
import { Menu } from "./pages/Menu"
import { Staff } from "./pages/Staff"
import { About } from "./pages/About"
import { FAQ } from "./pages/FAQ"
import { Events } from "./pages/Events"
import { Alliances } from "./pages/Alliances"
import { useMochaccino } from "./hooks/useMochaccino"
import { s } from "./styles"
import confetti from 'canvas-confetti';

export default function App() {
    // --- СОСТОЯНИЕ (STATE) ---
    // 1. Приветствие в консоли (сработает 1 раз при загрузке)
useEffect(() => {
    console.log(
        "%c☕ MOCHACCINO V3 %cBuilt with a passion for coding. Hello, developer!", 
        "color: #6F4E37; font-size: 20px; font-weight: bold; font-family: serif;", 
        "color: #FFFDD0; font-size: 14px;"
    );
}, []);

// 2. Логика пасхалки
const [logoClicks, setLogoClicks] = useState(0);

const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);

    if (newCount === 10) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6F4E37', '#A855F7', '#FFFDD0']
        });
        setLogoClicks(0); // Сброс счетчика
        console.log("🎉 EASTER EGG UNLOCKED!");
    }
};
    const [page, setPage] = useState("home")
    const [selected, setSelected] = useState<ModalItem | null>(null)
    const { timeLeft, isMounted, liveStatuses, localTimes, getStatusColor } = useMochaccino()
    useEffect(() => {
    console.log(
        "%c☕ MOCHACCINO V3 %cBuilt with a passion for coding. Hello, developer!", 
        "color: #6F4E37; font-size: 20px; font-weight: bold; font-family: serif;", 
        "color: #FFFDD0; font-size: 14px;"
    );
}, []);
    // --- ВЕРСТКА (JSX) ---
    return (
        <div style={s.root}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Inter:wght@400;600;800&display=swap');
                html, body { margin: 0; padding: 0; min-height: 100vh; background-color: #1a0f0d; font-family: 'Inter', sans-serif; color: #FFFDD0; overflow-x: hidden; }
                * { box-sizing: border-box; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-thumb { background: #6F4E37; border-radius: 10px; }
            `}</style>

            <div style={s.bgContainer}>
                <div style={s.bgImage} />
                <div style={s.bgGlass} />
                <motion.div animate={{ x: [0, 80, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 25, repeat: Infinity }} style={s.blob} />
            </div>

            <Header page={page} setPage={setPage} isMounted={isMounted} timeLeft={timeLeft} handleLogoClick={handleLogoClick}/>

            <main style={s.mainContent}>
                <AnimatePresence mode="wait">
                    {page === "home" && <Home setPage={setPage} />}
                    {page === "about" && <About />}
                    {page === "menu" && <Menu />}
                    {page === "staff" && <Staff setSelected={setSelected} getStatusColor={getStatusColor} />}
                    {page === "faq" && <FAQ />}
                    {page === "events" && <Events setSelected={setSelected} localTimes={localTimes} isMounted={isMounted} />}
                    {page === "alliances" && <Alliances setSelected={setSelected} />}

                </AnimatePresence>
            </main>

            <div style={{ position: "fixed", bottom: "25px", left: "25px", zIndex: 90, borderRadius: "20px", overflow: "hidden", background: "#000" }}>
                <iframe width="260" height="145" src="https://www.youtube.com/embed/jfKfPfyJRdk" title="Lofi Radio" frameBorder="0" allowFullScreen style={{ display: "block", opacity: 0.8 }}></iframe>
            </div>

            <footer style={s.footer}>
                © 2026 MOCHACCINO CAFE. ALL RIGHTS RESERVED. <br/>
                <span style={{ fontSize: '10px', letterSpacing: '4px', color: theme.accent }}>EST. 2026</span>
            </footer>

            <AnimatePresence>
    <Modal 
        selected={selected} 
        setSelected={setSelected} 
        liveStatus={liveStatuses[selected?.id || ""]} 
        statusColor={getStatusColor(selected?.id || "")}
    />
</AnimatePresence>
        </div>
    )
}