import { motion } from "framer-motion"
import { theme, logo } from "../data"
import { s } from "../styles"

export const Home = ({ setPage }: { setPage: (p: string) => void }) => {
    return (
        <motion.div key="home" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={s.page}>
            <div style={s.heroCard}>
                <img src={logo} style={s.heroLogo} alt="Mochaccino Logo" />
                <h1 style={s.h1}>Aesthetically <br/> Brewed.</h1>
                <p style={s.p}>Where every cup is a masterpiece and every guest is family.</p>
                <button onClick={() => setPage("menu")} style={s.ctaButton}>View Menu</button>
            </div>
            <div style={{ display: "flex", gap: "20px", marginTop: "40px", flexWrap: "wrap", justifyContent: "center" }}>
                {["10K+", "24/7", "V3"].map((stat, i) => (
                    <div key={i} style={{ padding: "20px 40px", background: "rgba(255,255,255,0.05)", borderRadius: "20px", backdropFilter: "blur(10px)" }}>
                        <h3 style={{ margin: 0, color: theme.text, fontSize: "24px" }}>{stat}</h3>
                        <span style={{ fontSize: "12px", opacity: 0.6, letterSpacing: "2px" }}>{["MEMBERS", "ACTIVE", "VERSION"][i]}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}