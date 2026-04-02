import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * MOCHACCINO ULTIMATE - ALL-IN-ONE EDITION
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function MochaccinoApp() {
    const [page, setPage] = useState("home")
    const [selected, setSelected] = useState(null)
    const [menuTab, setMenuTab] = useState("all")
    const [timeLeft, setTimeLeft] = useState("CALCULATING...")
    const [liveStatuses, setLiveStatuses] = useState({})
    const [localTimes, setLocalTimes] = useState({})
    const [isMounted, setIsMounted] = useState(false)

    const theme = {
        accent: "#6F4E37",
        text: "#FFFDD0",
        dark: "#1a0f0d",
        purple: "#A855F7",
    }

    const logo =
        "https://media.discordapp.net/attachments/1486791344721625322/1487442152157090003/nanaserver.png?ex=69cf16b4&is=69cdc534&hm=9afb6c107eec290f035646de526f26905f2a77986483cc8eadbc81ea57132850&=&format=webp&quality=lossless&width=1450&height=1450"

    const navItems = ["home", "staff", "menu", "events", "alliances"]

    // --- ДАННЫЕ МЕНЮ ---
    const menuData = [
        {
            id: "m1",
            category: "desserts",
            name: "Classic Tiramisu",
            desc: "Layers of espresso-soaked ladyfingers and mascarpone cream.",
            price: "55 R$",
        },
        {
            id: "m2",
            category: "main",
            name: "Mochaccino Signature",
            desc: "Our secret blend of dark chocolate, double espresso, and steamed milk.",
            price: "40 R$",
        },
        {
            id: "m3",
            category: "desserts",
            name: "Velvet Macarons",
            desc: "Assorted flavors including Lavender and Salted Caramel.",
            price: "30 R$",
        },
        {
            id: "m4",
            category: "secret",
            name: "The Golden Bean",
            desc: "Exclusive brew with honey cream and edible gold flakes.",
            price: "99 R$",
        },
        {
            id: "m5",
            category: "main",
            name: "Espresso Romano",
            desc: "Strong espresso served with a slice of fresh lemon.",
            price: "25 R$",
        },
        {
            id: "m6",
            category: "secret",
            name: "Midnight Nebula",
            desc: "Cold brew with charcoal-blackberry syrup and star glitter.",
            price: "75 R$",
        },
    ]

    // --- ДАННЫЕ КОМАНДЫ ---
    const staffList = [
        {
            id: "671746748703571990",
            type: "staff",
            name: "Nana",
            role: "President",
            roblox: "@Nana_President",
            discord: "nana#1234",
            bio: "The soul of Mochaccino. Overseeing all operations with love.",
            image: logo,
        },
        {
            id: "305367354321305600",
            type: "staff",
            name: "Starlit",
            role: "Director",
            roblox: "@Starlit_Night",
            discord: "starlit#0000",
            bio: "Guardian of community safety and aesthetics.",
            image: "",
        },
    ]

    // --- МЕРОПРИЯТИЯ (С ISO ВРЕМЕНЕМ) ---
    const eventsData = [
        {
            id: "ev1",
            type: "event",
            title: "Grand Opening",
            iso: "2026-04-15T18:00:00Z",
            loc: "Main Cafe",
            desc: "Our massive official launch party with fireworks and free items!",
        },
        {
            id: "ev2",
            type: "event",
            title: "Barista Battle",
            iso: "2026-05-01T15:00:00Z",
            loc: "Training Center",
            desc: "Watch the best of the best compete for the Golden Bean award.",
        },
        {
            id: "ev3",
            type: "event",
            title: "Summer Vibes Night",
            iso: "2026-06-10T20:00:00Z",
            loc: "Beach Annex",
            desc: "Tropical drinks and sunset music session.",
        },
    ]

    // --- АЛЬЯНСЫ ---
    const alliancesData = [
        {
            id: "al1",
            type: "alliance",
            name: "Bloxy Community",
            role: "Main Partner",
            desc: "The biggest event hosting community on Roblox.",
            link: "https://www.roblox.com/groups/",
        },
        {
            id: "al2",
            type: "alliance",
            name: "Star Studio",
            role: "Developer Ally",
            desc: "Official developers of the Mochaccino Hub.",
            link: "https://www.roblox.com/groups/",
        },
        {
            id: "al3",
            type: "alliance",
            name: "Cafe Network",
            role: "Industry Partner",
            desc: "An international alliance of virtual coffee shops.",
            link: "https://www.roblox.com/groups/",
        },
    ]

    // --- ЛОГИКА ---
    useEffect(() => {
        setIsMounted(true)
        const times = {}
        eventsData.forEach((e) => {
            const d = new Date(e.iso)
            times[e.id] = {
                date: d.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
                time: d.toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            }
        })
        setLocalTimes(times)

        const timer = setInterval(() => {
            const d =
                new Date("April 15, 2026 18:00:00").getTime() -
                new Date().getTime()
            if (d < 0) setTimeLeft("WE ARE OPEN!")
            else {
                const days = Math.floor(d / 86400000)
                const hours = Math.floor((d % 86400000) / 3600000)
                const mins = Math.floor((d % 3600000) / 60000)
                const secs = Math.floor((d % 60000) / 1000)
                setTimeLeft(`${days}d ${hours}h ${mins}m ${secs}s`)
            }
        }, 1000)

        const fetchStatus = async () => {
            try {
                const newStats = { ...liveStatuses }
                for (const m of staffList) {
                    if (m.id.length > 10) {
                        const r = await fetch(
                            `https://api.lanyard.rest/v1/users/${m.id}`
                        )
                        const data = await r.json()
                        if (data.success)
                            newStats[m.id] = data.data.discord_status
                    }
                }
                setLiveStatuses(newStats)
            } catch (e) {}
        }
        fetchStatus()
        const sInt = setInterval(fetchStatus, 30000)
        return () => {
            clearInterval(timer)
            clearInterval(sInt)
        }
    }, [])

    const getStatusColor = (id) => {
        const s = liveStatuses[id]
        if (s === "online") return "#43b581"
        if (s === "idle") return "#faa61a"
        if (s === "dnd") return "#f04747"
        return "#747f8d"
    }

    return (
        <div style={s.root}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Inter:wght@400;600;800&display=swap');
                body { margin: 0; background: #1a0f0d; overflow-y: scroll; overflow-x: hidden; }
                * { box-sizing: border-box; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-thumb { background: #6F4E37; border-radius: 10px; }
            `}</style>

            {/* ФОН */}
            <div style={s.bgContainer}>
                <div style={s.bgImage} />
                <div style={s.bgGlass} />
                <motion.div
                    animate={{ x: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    style={s.blob}
                />
            </div>

            {/* ШАПКА */}
            <header style={s.header}>
                <div style={s.timerBar}>
                    ☕ MOCHACCINO OPENING: {isMounted ? timeLeft : "..."} ☕
                </div>
                <nav style={s.navBar}>
                    <div style={s.logoWrap} onClick={() => setPage("home")}>
                        <motion.img
                            whileHover={{ rotate: 180 }}
                            src={logo}
                            style={s.miniLogo}
                        />
                        <span style={s.brandText}>MOCHACCINO</span>
                    </div>

                    <div style={s.navLinks}>
                        {navItems.map((p) => (
                            <div
                                key={p}
                                style={s.navItem}
                                onClick={() => setPage(p)}
                            >
                                <span style={s.navText(page === p)}>
                                    {p.toUpperCase()}
                                </span>
                                {page === p && (
                                    <motion.div
                                        layoutId="navActive"
                                        style={s.navActiveBox}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={s.navBtns}>
                        <a href="#" style={s.btnLight}>
                            DISCORD
                        </a>
                        <a href="#" style={s.btnDark}>
                            ROBLOX
                        </a>
                    </div>
                </nav>
            </header>

            {/* КОНТЕНТ */}
            <main style={s.scrollArea}>
                <AnimatePresence mode="wait">
                    {page === "home" && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={s.page}
                        >
                            <div style={s.heroCard}>
                                <img src={logo} style={s.heroLogo} />
                                <h1 style={s.h1}>
                                    Aesthetically <br /> Brewed.
                                </h1>
                                <p style={s.p}>
                                    Where every cup is a masterpiece and every
                                    guest is family. Join the most premium
                                    community in Roblox.
                                </p>
                                <button
                                    onClick={() => setPage("staff")}
                                    style={s.ctaButton}
                                >
                                    Meet the Family
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {page === "menu" && (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={s.page}
                        >
                            <h2 style={s.pageTitle}>Our Menu</h2>
                            <div style={s.menuFilterWrap}>
                                {["all", "main", "desserts", "secret"].map(
                                    (tab) => (
                                        <div
                                            key={tab}
                                            style={s.filterBtn(menuTab === tab)}
                                            onClick={() => setMenuTab(tab)}
                                        >
                                            {tab.toUpperCase()}
                                        </div>
                                    )
                                )}
                            </div>
                            <div style={s.grid}>
                                {menuData
                                    .filter(
                                        (i) =>
                                            menuTab === "all" ||
                                            i.category === menuTab
                                    )
                                    .map((item) => (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            style={
                                                item.category === "secret"
                                                    ? s.secretCard
                                                    : s.card
                                            }
                                        >
                                            <div style={s.menuIcon}>
                                                {item.category === "secret"
                                                    ? "✨"
                                                    : "☕"}
                                            </div>
                                            <h3 style={s.cardTitle}>
                                                {item.name}
                                            </h3>
                                            <p style={s.cardDesc}>
                                                {item.desc}
                                            </p>
                                            <div style={s.priceTag}>
                                                {item.price}
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    )}

                    {page === "staff" && (
                        <motion.div
                            key="staff"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={s.page}
                        >
                            <h2 style={s.pageTitle}>Elite Team</h2>
                            <div style={s.grid}>
                                {staffList.map((m) => (
                                    <div
                                        key={m.id}
                                        style={s.card}
                                        onClick={() => setSelected(m)}
                                    >
                                        <div style={s.avatarWrap}>
                                            <div style={s.avatarInner}>
                                                {m.image ? (
                                                    <img
                                                        src={m.image}
                                                        style={s.imgFull}
                                                    />
                                                ) : (
                                                    "☕"
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    ...s.statusDot,
                                                    background: getStatusColor(
                                                        m.id
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <h3 style={s.cardTitle}>{m.name}</h3>
                                        <div style={s.badge}>{m.role}</div>
                                        <button style={s.cardBtn}>
                                            Read Bio
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {page === "events" && (
                        <motion.div
                            key="events"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={s.page}
                        >
                            <h2 style={s.pageTitle}>Calendar</h2>
                            <div style={s.grid}>
                                {eventsData.map((ev) => (
                                    <div
                                        key={ev.id}
                                        style={s.card}
                                        onClick={() => setSelected(ev)}
                                    >
                                        <span style={s.dateText}>
                                            {isMounted && localTimes[ev.id]
                                                ? `${localTimes[ev.id].date} • ${localTimes[ev.id].time}`
                                                : "..."}
                                        </span>
                                        <h3 style={s.cardTitle}>{ev.title}</h3>
                                        <div style={s.badge}>{ev.loc}</div>
                                        <p style={s.cardDesc}>{ev.desc}</p>
                                        <button style={s.cardBtn}>
                                            Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {page === "alliances" && (
                        <motion.div
                            key="alliances"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={s.page}
                        >
                            <h2 style={s.pageTitle}>Partnerships</h2>
                            <div style={s.grid}>
                                {alliancesData.map((al) => (
                                    <a
                                        key={al.id}
                                        href={al.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            ...s.card,
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div style={s.avatarWrap}>
                                            <div
                                                style={{
                                                    ...s.avatarInner,
                                                    background: "white",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                LOGO
                                            </div>
                                        </div>
                                        <h3 style={s.cardTitle}>{al.name}</h3>
                                        <p style={s.cardDesc}>{al.desc}</p>
                                        <button
                                            style={{
                                                ...s.cardBtn,
                                                background: theme.accent,
                                                border: "none",
                                            }}
                                        >
                                            Visit Group
                                        </button>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <footer style={s.footer}>
                    © 2026 MOCHACCINO CAFE. ALL RIGHTS RESERVED. <br />
                    <span
                        style={{
                            fontSize: "10px",
                            letterSpacing: "4px",
                            color: theme.accent,
                        }}
                    >
                        EST. 2026
                    </span>
                </footer>
            </main>

            {/* МОДАЛКА */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={s.overlay}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={s.modal}
                        >
                            <button
                                onClick={() => setSelected(null)}
                                style={s.closeBtn}
                            >
                                ×
                            </button>
                            <div style={s.modalHeader}>
                                <div style={s.mAvatarWrap}>
                                    <div style={s.mAvatarInner}>
                                        {selected.image ? (
                                            <img
                                                src={selected.image}
                                                style={s.imgFull}
                                            />
                                        ) : (
                                            "☕"
                                        )}
                                    </div>
                                    {selected.type === "staff" && (
                                        <div
                                            style={{
                                                ...s.mStatusDot,
                                                background: getStatusColor(
                                                    selected.id
                                                ),
                                            }}
                                        />
                                    )}
                                </div>
                                <div style={{ textAlign: "left" }}>
                                    <h2 style={s.mTitle}>
                                        {selected.name || selected.title}
                                    </h2>
                                    {selected.type === "staff" && (
                                        <div
                                            style={{
                                                color: getStatusColor(
                                                    selected.id
                                                ),
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {liveStatuses[selected.id] ||
                                                "OFFLINE"}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p style={s.mBio}>
                                {selected.bio || selected.desc}
                            </p>
                            <div style={s.socialRow}>
                                {selected.type === "staff" ? (
                                    <>
                                        <span style={s.socialTag}>
                                            🎮 {selected.roblox}
                                        </span>
                                        <span style={s.socialTag}>
                                            💬 {selected.discord}
                                        </span>
                                    </>
                                ) : (
                                    <span style={s.socialTag}>
                                        📍 {selected.loc}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// --- СТИЛИ ---
const s = {
    root: {
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "#1a0f0d",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
    } as React.CSSProperties,
    bgContainer: {
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
    } as React.CSSProperties,
    bgImage: {
        position: "absolute",
        inset: 0,
        backgroundImage:
            "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.35) blur(30px)",
    } as React.CSSProperties,
    bgGlass: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(135deg, rgba(42,23,18,0.94) 0%, rgba(111,78,55,0.4) 100%)",
        backdropFilter: "blur(40px)",
    } as React.CSSProperties,
    blob: {
        position: "absolute",
        top: "10%",
        left: "20%",
        width: "600px",
        height: "600px",
        background:
            "radial-gradient(circle, rgba(111,78,55,0.4) 0%, transparent 70%)",
        filter: "blur(100px)",
    } as React.CSSProperties,

    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 50,
    } as React.CSSProperties,
    timerBar: {
        width: "100%",
        background: "#6F4E37",
        color: "#FFFDD0",
        textAlign: "center",
        padding: "10px",
        fontSize: "11px",
        fontWeight: "bold",
        letterSpacing: "2px",
    } as React.CSSProperties,
    navBar: {
        margin: "15px 30px",
        height: "80px",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        borderRadius: "25px",
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
    } as React.CSSProperties,

    logoWrap: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        cursor: "pointer",
    } as React.CSSProperties,
    miniLogo: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "2px solid #6F4E37",
        backgroundColor: "#fff",
    } as React.CSSProperties,
    brandText: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#FFFDD0",
    } as React.CSSProperties,

    navLinks: { display: "flex", gap: "5px" } as React.CSSProperties,
    navItem: {
        position: "relative",
        padding: "12px 20px",
        cursor: "pointer",
    } as React.CSSProperties,
    navText: (active): React.CSSProperties => ({
        color: active ? "#FFFDD0" : "rgba(255,253,208,0.5)",
        fontSize: "12px",
        fontWeight: "bold",
        position: "relative",
        zIndex: 2,
    }),
    navActiveBox: {
        position: "absolute",
        inset: "5px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "15px",
        zIndex: 1,
    } as React.CSSProperties,

    navBtns: { display: "flex", gap: "10px" } as React.CSSProperties,
    btnLight: {
        padding: "10px 20px",
        background: "rgba(255,255,255,0.15)",
        color: "#FFFDD0",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.2)",
        fontSize: "11px",
        fontWeight: "bold",
        textDecoration: "none",
    } as React.CSSProperties,
    btnDark: {
        padding: "10px 20px",
        background: "#6F4E37",
        color: "#FFFDD0",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: "bold",
        textDecoration: "none",
    } as React.CSSProperties,

    scrollArea: {
        flex: 1,
        overflowY: "auto",
        paddingTop: "180px",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
    } as React.CSSProperties,
    page: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "100px",
        paddingLeft: "20px",
        paddingRight: "20px",
    } as React.CSSProperties,

    heroCard: {
        padding: "80px 60px",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(40px)",
        borderRadius: "50px",
        border: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center",
        maxWidth: "800px",
    } as React.CSSProperties,
    heroLogo: {
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        border: "4px solid #6F4E37",
        marginBottom: "30px",
        backgroundColor: "#fff",
    } as React.CSSProperties,
    h1: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "70px",
        color: "#FFFDD0",
        margin: "0 0 20px",
        lineHeight: 1.1,
    } as React.CSSProperties,
    p: {
        fontSize: "18px",
        color: "#FFFDD0",
        opacity: 0.8,
        marginBottom: "40px",
    } as React.CSSProperties,
    ctaButton: {
        padding: "18px 40px",
        background: "#6F4E37",
        color: "#FFFDD0",
        borderRadius: "20px",
        border: "none",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
    } as React.CSSProperties,

    menuFilterWrap: {
        display: "flex",
        gap: "10px",
        marginBottom: "50px",
        background: "rgba(255,255,255,0.05)",
        padding: "8px",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
    } as React.CSSProperties,
    filterBtn: (active): React.CSSProperties => ({
        padding: "10px 25px",
        borderRadius: "14px",
        background: active ? "#6F4E37" : "transparent",
        color: active ? "#FFFDD0" : "rgba(255,253,208,0.4)",
        fontWeight: "800",
        fontSize: "12px",
        cursor: "pointer",
    }),

    pageTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "50px",
        color: "#FFFDD0",
        marginBottom: "50px",
    } as React.CSSProperties,
    grid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px",
        maxWidth: "1200px",
    } as React.CSSProperties,

    card: {
        width: "280px",
        padding: "40px 25px 30px",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        borderRadius: "35px",
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
    } as React.CSSProperties,
    secretCard: {
        width: "280px",
        padding: "40px 25px 30px",
        background: "rgba(168,85,247,0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: "35px",
        border: "1px solid rgba(168,85,247,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 0 30px rgba(168,85,247,0.1)",
        cursor: "pointer",
    } as React.CSSProperties,

    menuIcon: { fontSize: "40px", marginBottom: "20px" } as React.CSSProperties,
    priceTag: {
        marginTop: "20px",
        padding: "8px 20px",
        background: "rgba(255,253,208,0.1)",
        borderRadius: "12px",
        color: "#FFFDD0",
        fontWeight: "900",
        fontSize: "14px",
    } as React.CSSProperties,

    avatarWrap: {
        position: "relative",
        width: "90px",
        height: "90px",
        marginBottom: "15px",
    } as React.CSSProperties,
    avatarInner: {
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "3px solid #6F4E37",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    } as React.CSSProperties,
    imgFull: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    } as React.CSSProperties,
    statusDot: {
        position: "absolute",
        bottom: "0px",
        right: "0px",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        border: "4px solid #1a0f0d",
        zIndex: 10,
    } as React.CSSProperties,

    cardTitle: {
        color: "#FFFDD0",
        fontSize: "22px",
        margin: "10px 0",
        textAlign: "center",
        fontWeight: "bold",
    } as React.CSSProperties,
    cardDesc: {
        color: "#FFFDD0",
        opacity: 0.6,
        fontSize: "13px",
        textAlign: "center",
        lineHeight: 1.5,
    } as React.CSSProperties,
    badge: {
        padding: "5px 12px",
        background: "#6F4E37",
        color: "#FFFDD0",
        borderRadius: "8px",
        fontSize: "10px",
        fontWeight: "bold",
        textTransform: "uppercase",
    } as React.CSSProperties,
    cardBtn: {
        marginTop: "20px",
        padding: "8px 16px",
        background: "rgba(255,255,255,0.1)",
        color: "#FFFDD0",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "10px",
        fontSize: "11px",
        fontWeight: "bold",
        cursor: "pointer",
    } as React.CSSProperties,
    dateText: {
        color: "#A855F7",
        fontSize: "13px",
        fontWeight: "900",
        marginBottom: "10px",
    } as React.CSSProperties,

    footer: {
        textAlign: "center",
        padding: "60px 40px",
        color: "#FFFDD0",
        opacity: 0.4,
        fontSize: "11px",
        marginTop: "auto",
    } as React.CSSProperties,

    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(30px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    } as React.CSSProperties,
    modal: {
        background: "rgba(42,23,18,0.98)",
        padding: "50px",
        borderRadius: "45px",
        border: "1px solid rgba(255,255,255,0.1)",
        maxWidth: "500px",
        width: "90%",
        position: "relative",
    } as React.CSSProperties,
    closeBtn: {
        position: "absolute",
        top: "25px",
        right: "30px",
        fontSize: "36px",
        color: "#FFFDD0",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        opacity: 0.5,
    } as React.CSSProperties,
    modalHeader: {
        display: "flex",
        gap: "25px",
        alignItems: "center",
        marginBottom: "25px",
    } as React.CSSProperties,
    mAvatarWrap: {
        position: "relative",
        width: "90px",
        height: "90px",
    } as React.CSSProperties,
    mAvatarInner: {
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        border: "3px solid #6F4E37",
        overflow: "hidden",
    } as React.CSSProperties,
    mStatusDot: {
        position: "absolute",
        bottom: "-5px",
        right: "-5px",
        width: "26px",
        height: "26px",
        borderRadius: "50%",
        border: "4px solid #1a0f0d",
        zIndex: 10,
    } as React.CSSProperties,
    mTitle: {
        fontFamily: "'Playfair Display', serif",
        color: "#FFFDD0",
        fontSize: "36px",
        margin: "0",
    } as React.CSSProperties,
    mBio: {
        color: "#FFFDD0",
        fontSize: "16px",
        opacity: 0.8,
        lineHeight: 1.6,
        marginBottom: "30px",
        textAlign: "left",
    } as React.CSSProperties,
    socialRow: { display: "flex", gap: "10px" } as React.CSSProperties,
    socialTag: {
        padding: "10px 25px",
        background: "#6F4E37",
        color: "#FFFDD0",
        borderRadius: "15px",
        fontWeight: "900",
        fontSize: "13px",
    } as React.CSSProperties,
}
