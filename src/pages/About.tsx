import { motion } from "framer-motion"
import { theme } from "../data"
import { s } from "../styles"

export const About = () => {
    return (
        <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
            <h2 style={s.pageTitle}>Our Story</h2>
            <div style={{ maxWidth: "800px", background: "rgba(255,255,255,0.04)", padding: "40px", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "left", lineHeight: "1.8" }}>
                <p style={{...s.p, textAlign: "left"}}>Welcome to Mochaccino! Founded in 2024, we started as a small dream to create the most aesthetically pleasing cafe community on Roblox.</p>
                <h3 style={{ color: theme.purple, marginTop: "30px" }}>Development Journey</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                    {[
                        { date: "March 2024", text: "Project V3 officially started.", color: theme.accent },
                        { date: "April 2024", text: "Web portal launch and applications open.", color: theme.purple },
                        { date: "Summer 2024", text: "Grand Opening of the new layout.", color: "#555" }
                    ].map((step, i) => (
                        <div key={i} style={{ padding: "15px 25px", background: "rgba(255,255,255,0.05)", borderLeft: `4px solid ${step.color}`, borderRadius: "0 15px 15px 0" }}>
                            <h4 style={{ margin: "0 0 5px 0", color: theme.text, fontSize: "18px" }}>{step.date}</h4>
                            <p style={{ margin: 0, opacity: 0.7, fontSize: "14px" }}>{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}