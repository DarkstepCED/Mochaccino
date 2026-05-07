import { useState } from "react"
import { motion } from "framer-motion"
import { menuData } from "../data"
import { s } from "../styles"

export const Menu = () => {
    const [menuTab, setMenuTab] = useState("all")

    return (
        <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
            <h2 style={s.pageTitle}>Our Menu</h2>
            <div style={s.menuFilterWrap}>
                {["all", "main", "desserts", "secret"].map(tab => (
                    <div key={tab} style={s.filterBtn(menuTab === tab)} onClick={() => setMenuTab(tab)}>
                        {tab.toUpperCase()}
                    </div>
                ))}
            </div>
            <div style={s.grid}>
                {menuData.filter(i => menuTab === "all" || i.category === menuTab).map(item => (
                    <motion.div layout key={item.id} style={item.category === "secret" ? s.secretCard : s.card}>
                        <div style={s.menuIcon}>{item.category === "secret" ? "✨" : "☕"}</div>
                        <h3 style={s.cardTitle}>{item.name}</h3>
                        <p style={s.cardDesc}>{item.desc}</p>
                        <div style={s.priceTag}>{item.price}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}