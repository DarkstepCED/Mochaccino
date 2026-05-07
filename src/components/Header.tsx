import { motion } from "framer-motion"
import { Coffee, Code, MessageCircle, Gamepad2 } from "lucide-react"
import { logo, navItems } from "../data"
import { s } from "../styles"

export const Header = ({ page, setPage, isMounted, timeLeft, handleLogoClick}: any) => {
    return (
        <header style={s.header}>
            <div style={s.timerBar}>
                <Coffee size={14} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                MOCHACCINO OPENING: {isMounted ? timeLeft : "..."}
            </div>
            <nav style={s.navBar}>
                <div 
                    style={{...s.logoWrap, cursor: "pointer"}} // Добавили cursor: pointer, чтобы палец появлялся при наведении
                    onClick={handleLogoClick}                  // Вот это событие клика
                        >
                        <motion.img 
                            whileHover={{ rotate: 180 }} 
                            whileTap={{ scale: 0.9 }} 
                            src={logo} 
                            style={s.miniLogo} 
                        />
                    <span style={s.brandText}>MOCHACCINO</span>
                </div>
                <div style={s.navLinks}>
                    {navItems.map(p => (
                        <div key={p} style={s.navItem} onClick={() => setPage(p)}>
                            <span style={s.navText(page === p)}>{p.toUpperCase()}</span>
                            {page === p && (
                                <motion.div layoutId="navActive" style={s.navActiveBox} />
                            )}
                        </div>
                    ))}
                </div>
                <div style={s.navBtns}>
                    <a href="https://github.com/..." target="_blank" style={s.btnLight}>
                        <Code size={16} /> {/* <-- ВОТ ТУТ */}
                    </a>
                    <a href="#" style={s.btnLight}>
                        <MessageCircle size={16} />
                    </a>
                    <a href="#" style={s.btnDark}>
                        <Gamepad2 size={16} />
                    </a>
                </div>
            </nav>
        </header>
    )
}