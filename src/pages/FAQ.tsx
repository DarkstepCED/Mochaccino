import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { faqData, theme } from "../data"
import { s } from "../styles"

export const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<string | null>(null)

    return (
        <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
            <h2 style={s.pageTitle}>FAQ</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%", maxWidth: "800px" }}>
                {faqData.map((faq) => (
                    <motion.div key={faq.id} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} layout>
                        <div style={{ padding: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 style={{ margin: 0, color: theme.text, fontSize: "18px" }}>{faq.q}</h3>
                            <motion.span animate={{ rotate: openFaq === faq.id ? 45 : 0 }} style={{ color: theme.accent, fontSize: "28px", fontWeight: "bold" }}>+</motion.span>
                        </div>
                        <AnimatePresence>
                            {openFaq === faq.id && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ padding: "0 25px 25px 25px" }}>
                                    <p style={{ margin: 0, color: theme.text, opacity: 0.7, lineHeight: 1.6 }}>{faq.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}