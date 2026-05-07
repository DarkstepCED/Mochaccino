import { useState } from "react"
import { motion } from "framer-motion"
import { staffList, theme } from "../data"
import { s } from "../styles"

export const Staff = ({ setSelected, getStatusColor }: any) => {
    const [staffTab, setStaffTab] = useState("All")

    return (
        <motion.div key="staff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
            <h2 style={s.pageTitle}>Elite Team</h2>
            <div style={s.menuFilterWrap}>
                {["All", "Presidential Team", "Development Team", "Chief Executive Director", "Chief of Public Relations"].map(tab => (
                    <div key={tab} style={s.filterBtn(staffTab === tab)} onClick={() => setStaffTab(tab)}>
                        {tab.toUpperCase()}
                    </div>
                ))}
            </div>
            <div style={s.grid}>
                {staffList.filter(m => staffTab === "All" || m.team === staffTab).map(m => (
                    <motion.div layout key={m.id} style={s.card} onClick={() => setSelected(m)}>
                        <div style={s.avatarWrap}>
                            <div style={s.avatarInner}>{m.image ? <img src={m.image} style={s.imgFull} /> : "☕"}</div>
                            <div style={{...s.statusDot, background: getStatusColor(m.id)}} />
                        </div>
                        <h3 style={s.cardTitle}>{m.name}</h3>
                        <div style={s.badge}>{m.role}</div>
                        <button style={s.cardBtn}>Read Bio</button>
                    </motion.div>
                ))}
            </div>
            <div style={{ marginTop: "60px", padding: "40px", background: "rgba(168,85,247,0.1)", borderRadius: "30px", border: "1px solid rgba(168,85,247,0.3)", textAlign: "center", maxWidth: "800px", width: "100%" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "28px", color: theme.text, fontFamily: "'Playfair Display', serif" }}>Join Our Family</h3>
                <p style={{ opacity: 0.8, marginBottom: "25px" }}>We are always looking for passionate baristas and management. Start your journey today!</p>
                <a href="https://forms.gle/eiWDDY42wUKAKCgv6" target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "15px 35px", background: theme.purple, color: "#FFF", textDecoration: "none", borderRadius: "15px", fontWeight: "bold" }}>Apply Now</a>
            </div>
        </motion.div>
    )
}