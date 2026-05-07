import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Импортируем всё, что мы вынесли в отдельные файлы
import { 
    theme, logo, navItems, menuData, 
    staffList, eventsData, alliancesData, faqData 
} from "./data"
import { s } from "./styles"

export default function App() {
    // --- СОСТОЯНИЕ (STATE) ---
    const [page, setPage] = useState("home")
    const [selected, setSelected] = useState<any>(null)
    const [menuTab, setMenuTab] = useState("all")
    const [staffTab, setStaffTab] = useState("all")
    const [eventTab, setEventTab] = useState("upcoming")
    const [openFaq, setOpenFaq] = useState<string | null>(null)
    const [timeLeft, setTimeLeft] = useState("CALCULATING...")
    const [isMounted, setIsMounted] = useState(false)
    
    const [liveStatuses, setLiveStatuses] = useState<Record<string, string>>({})
    const [localTimes, setLocalTimes] = useState<Record<string, {date: string, time: string}>>({})

    // --- ЛОГИКА (EFFECTS) ---
    useEffect(() => {
        setIsMounted(true)
        
        // Расчет локального времени для ивентов
        const times: Record<string, {date: string, time: string}> = {}
        eventsData.forEach(e => {
            const d = new Date(e.iso)
            times[e.id] = {
                date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
                time: d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
            }
        })
        setLocalTimes(times)

        // Таймер обратного отсчета
        const timer = setInterval(() => {
            const d = new Date("2026-04-15T18:00:00Z").getTime() - new Date().getTime()
            if (d < 0) setTimeLeft("WE ARE OPEN!")
            else {
                const days = Math.floor(d / 86400000)
                const hours = Math.floor((d % 86400000) / 3600000)
                const mins = Math.floor((d % 3600000) / 60000)
                const secs = Math.floor((d % 60000) / 1000)
                setTimeLeft(`${days}d ${hours}h ${mins}m ${secs}s`)
            }
        }, 1000)

        // Получение статусов Discord (Lanyard API)
        const fetchStatus = async () => {
            try {
                const newStats = { ...liveStatuses }
                for (const m of staffList) {
                    if (m.id.length > 10) {
                        const r = await fetch(`https://api.lanyard.rest/v1/users/${m.id}`)
                        const data = await r.json()
                        if (data.success) newStats[m.id] = data.data.discord_status
                    }
                }
                setLiveStatuses(newStats)
            } catch (e) {}
        }
        fetchStatus()
        const sInt = setInterval(fetchStatus, 30000)
        
        return () => { clearInterval(timer); clearInterval(sInt); }
    }, [])

    const getStatusColor = (id: string) => {
        const status = liveStatuses[id]
        if (status === "online") return "#43b581"
        if (status === "idle") return "#faa61a"
        if (status === "dnd") return "#f04747"
        return "#747f8d"
    }

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

            <header style={s.header}>
                <div style={s.timerBar}>☕ MOCHACCINO OPENING: {isMounted ? timeLeft : "..."} ☕</div>
                <nav style={s.navBar}>
                    <div style={s.logoWrap} onClick={() => setPage("home")}>
                        <motion.img whileHover={{ rotate: 180 }} src={logo} style={s.miniLogo} />
                        <span style={s.brandText}>MOCHACCINO</span>
                    </div>
                    <div style={s.navLinks}>
                        {navItems.map(p => (
                            <div key={p} style={s.navItem} onClick={() => setPage(p)}>
                                <span style={s.navText(page === p)}>{p.toUpperCase()}</span>
                                {page === p && <motion.div layoutId="navActive" style={s.navActiveBox} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                            </div>
                        ))}
                    </div>
                    <div style={s.navBtns}>
                        <a href="https://github.com/DarkstepCED/Mochaccino" target="_blank" rel="noreferrer" style={s.btnLight}>GITHUB</a>
                        <a href="#" style={s.btnLight}>DISCORD</a>
                        <a href="#" style={s.btnDark}>ROBLOX</a>
                    </div>
                </nav>
            </header>

            <main style={s.mainContent}>
                <AnimatePresence mode="wait">
                    {page === "home" && (
                        <motion.div key="home" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={s.page}>
                            <div style={s.heroCard}>
                                <img src={logo} style={s.heroLogo} />
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
                    )}

                    {page === "about" && (
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
                    )}

                    {page === "staff" && (
                        <motion.div key="staff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
                            <h2 style={s.pageTitle}>Elite Team</h2>
                            <div style={s.menuFilterWrap}>
                                {["All", "Presidential Team", "Development Team", "Chief Executive Director", "Chief of Public Relations"].map(tab => (
                                    <div key={tab} style={s.filterBtn(staffTab === tab)} onClick={() => setStaffTab(tab)}>{tab.toUpperCase()}</div>
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
                                <p style={{ opacity: 0.8, marginBottom: "25px" }}>We are looking for passionate baristas and management. Start your journey today!</p>
                                <a href="https://forms.gle/eiWDDY42wUKAKCgv6" target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "15px 35px", background: theme.purple, color: "#FFF", textDecoration: "none", borderRadius: "15px", fontWeight: "bold" }}>Apply Now</a>
                            </div>
                        </motion.div>
                    )}

                    {page === "menu" && (
                        <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
                            <h2 style={s.pageTitle}>Our Menu</h2>
                            <div style={s.menuFilterWrap}>
                                {["all", "main", "desserts", "secret"].map(tab => (
                                    <div key={tab} style={s.filterBtn(menuTab === tab)} onClick={() => setMenuTab(tab)}>{tab.toUpperCase()}</div>
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
                    )}

                    {page === "events" && (
                        <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
                            <h2 style={s.pageTitle}>Calendar</h2>
                            <div style={s.menuFilterWrap}>
                                {["upcoming", "past"].map(tab => (
                                    <div key={tab} style={s.filterBtn(eventTab === tab)} onClick={() => setEventTab(tab)}>{tab.toUpperCase()}</div>
                                ))}
                            </div>
                            <div style={s.grid}>
                                {eventsData.filter(ev => {
                                    const isPast = new Date(ev.iso).getTime() < new Date().getTime();
                                    return eventTab === "past" ? isPast : !isPast;
                                }).map(ev => (
                                    <motion.div layout key={ev.id} style={s.card} onClick={() => setSelected(ev)}>
                                        <span style={s.dateText}>{isMounted && localTimes[ev.id] ? `${localTimes[ev.id].date} • ${localTimes[ev.id].time}` : "..."}</span>
                                        <h3 style={s.cardTitle}>{ev.title}</h3>
                                        <div style={s.badge}>{ev.loc}</div>
                                        <button style={s.cardBtn}>More Info</button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {page === "alliances" && (
                        <motion.div key="alliances" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
                            <h2 style={s.pageTitle}>Partnerships</h2>
                            <div style={s.grid}>
                                {alliancesData.map(al => (
                                    <div key={al.id} style={s.card} onClick={() => setSelected(al)}>
                                        <div style={s.avatarWrap}><div style={{...s.avatarInner, background: "white", color: "black", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center"}}>LOGO</div></div>
                                        <h3 style={s.cardTitle}>{al.name}</h3>
                                        <div style={s.badge}>{al.role}</div>
                                        <button style={s.cardBtn}>Read Info</button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {page === "faq" && (
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
                    )}
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
                {selected && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.overlay} onClick={() => setSelected(null)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()} style={s.modal}>
                            <button onClick={() => setSelected(null)} style={s.closeBtn}>×</button>
                            <div style={s.modalHeader}>
                                <div style={s.mAvatarWrap}>
                                    <div style={s.mAvatarInner}>{selected.image ? <img src={selected.image} style={s.imgFull} /> : "☕"}</div>
                                    {selected.type === "staff" && <div style={{...s.mStatusDot, background: getStatusColor(selected.id)}} />}
                                </div>
                                <div style={{textAlign: 'left'}}>
                                    <h2 style={s.mTitle}>{selected.name || selected.title}</h2>
                                    {selected.type === "staff" && <div style={{color: getStatusColor(selected.id), fontSize: '12px', fontWeight: 'bold'}}>{liveStatuses[selected.id] || "OFFLINE"}</div>}
                                </div>
                            </div>
                            <p style={s.mBio}>{selected.bio || selected.desc}</p>
                            <div style={s.socialRow}>
                                {selected.type === "staff" && <><span style={s.socialTag}>🎮 {selected.roblox}</span><span style={s.socialTag}>💬 {selected.discord}</span></>}
                                {selected.type === "event" && <span style={s.socialTag}>📍 {selected.loc}</span>}
                                {selected.type === "alliance" && <a href={selected.link} target="_blank" rel="noreferrer" style={{...s.socialTag, textDecoration: "none", background: theme.purple, color: "#FFF"}}>🔗 Visit Roblox Group</a>}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
