import { motion } from "framer-motion"
import { alliancesData } from "../data"
import { s } from "../styles"

export const Alliances = ({ setSelected }: any) => {
    return (
        <motion.div key="alliances" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
            <h2 style={s.pageTitle}>Partnerships</h2>
            <div style={s.grid}>
                {alliancesData.map(al => (
                    <div key={al.id} style={s.card} onClick={() => setSelected(al)}>
                        <div style={s.avatarWrap}>
                            <div style={{...s.avatarInner, background: "white", color: "black", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                LOGO
                            </div>
                        </div>
                        <h3 style={s.cardTitle}>{al.name}</h3>
                        <div style={s.badge}>{al.role}</div>
                        <button style={s.cardBtn}>Read Info</button>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}