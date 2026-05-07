export const s: any = {
    root: { display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" },
    bgContainer: { position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" },
    bgImage: { position: "absolute", inset: "-50px", backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35) blur(30px)" },
    bgGlass: { position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(42,23,18,0.94) 0%, rgba(111,78,55,0.4) 100%)", backdropFilter: "blur(40px)" },
    blob: { position: "absolute", top: "10%", left: "20%", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(111,78,55,0.4) 0%, transparent 70%)", filter: "blur(120px)" },
    header: { position: "fixed", top: 0, width: "100%", zIndex: 50 },
    timerBar: { width: "100%", background: "#6F4E37", color: "#FFFDD0", textAlign: "center", padding: "10px", fontSize: "11px", fontWeight: "bold", letterSpacing: "2px" },
    navBar: { margin: "15px 30px", height: "80px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: "25px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 30px" },
    logoWrap: { display: "flex", alignItems: "center", gap: "15px", cursor: "pointer" },
    miniLogo: { width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #6F4E37", backgroundColor: "#fff" },
    brandText: { fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "bold", color: "#FFFDD0" },
    navLinks: { display: "flex", gap: "5px" },
    navItem: { position: "relative", padding: "12px 20px", cursor: "pointer" },
    navText: (active: boolean) => ({ color: active ? "#FFFDD0" : "rgba(255,253,208,0.5)", fontSize: "12px", fontWeight: "bold", position: "relative", zIndex: 2 }),
    navActiveBox: { position: "absolute", inset: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "15px", zIndex: 1 },
    navBtns: { display: "flex", gap: "10px" },
    btnLight: { padding: "10px 20px", background: "rgba(255,255,255,0.15)", color: "#FFFDD0", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "11px", fontWeight: "bold", textDecoration: "none" },
    btnDark: { padding: "10px 20px", background: "#6F4E37", color: "#FFFDD0", borderRadius: "12px", fontSize: "11px", fontWeight: "bold", textDecoration: "none" },
    mainContent: { flex: 1, paddingTop: "180px", width: "100%", display: "flex", flexDirection: "column", zIndex: 10, minHeight: "800px" },
    menuFilterWrap: { display: "flex", gap: "10px", marginBottom: "40px", background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "20px", backdropFilter: "blur(10px)", flexWrap: "wrap", justifyContent: "center" },
    filterBtn: (active: boolean) => ({ padding: "10px 25px", borderRadius: "14px", background: active ? "#6F4E37" : "transparent", color: active ? "#FFFDD0" : "rgba(255,253,208,0.4)", fontWeight: "800", fontSize: "12px", cursor: "pointer" }),
    heroCard: { padding: "80px 60px", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(40px)", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center", maxWidth: "800px" },
    heroLogo: { width: "140px", height: "140px", borderRadius: "50%", border: "4px solid #6F4E37", marginBottom: "30px", backgroundColor: "#fff" },
    h1: { fontFamily: "'Playfair Display', serif", fontSize: "70px", color: "#FFFDD0", margin: "0 0 20px", lineHeight: 1.1 },
    p: { fontSize: "18px", color: "#FFFDD0", opacity: 0.8, marginBottom: "40px" },
    ctaButton: { padding: "18px 40px", background: "#6F4E37", color: "#FFFDD0", borderRadius: "20px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer" },
    pageTitle: { fontFamily: "'Playfair Display', serif", fontSize: "50px", color: "#FFFDD0", marginBottom: "50px" },
    page: { 
        width: "100%", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        paddingBottom: "100px", 
        paddingLeft: "5%",  // Заменили жесткие пиксели на проценты
        paddingRight: "5%", 
        boxSizing: "border-box" // Важно: чтобы паддинги не расширяли экран
    },
    grid: { 
        display: "flex", 
        flexWrap: "wrap", // ГЛАВНОЕ: Разрешает перенос на новую строку
        justifyContent: "center", // Центрирует карточки, если их мало
        gap: "30px", 
        maxWidth: "1200px",
        width: "100%"
    },
    card: { 
        width: "100%", // На телефонах будет 100%
        maxWidth: "280px", // Но не больше 280px на компьютерах
        padding: "40px 25px 30px", 
        background: "rgba(255,255,255,0.06)", 
        backdropFilter: "blur(20px)", 
        borderRadius: "35px", 
        border: "1px solid rgba(255,255,255,0.1)", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        cursor: "pointer",
        boxSizing: "border-box"
    },
    secretCard: { 
        // Сделай те же изменения: width: "100%", maxWidth: "280px" и boxSizing
        width: "100%", maxWidth: "280px", boxSizing: "border-box",
        padding: "40px 25px 30px", background: "rgba(168,85,247,0.05)", 
        backdropFilter: "blur(20px)", borderRadius: "35px", 
        border: "1px solid rgba(168,85,247,0.3)", display: "flex", 
        flexDirection: "column", alignItems: "center", 
        boxShadow: "0 0 30px rgba(168,85,247,0.1)", cursor: "pointer" 
    },

    toast: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "rgba(111,78,55,0.9)",
    backdropFilter: "blur(15px)",
    padding: "20px 25px",
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    zIndex: 1000
},
radioPlayer: {
    position: "fixed",
    bottom: "25px",
    left: "25px",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(20px)",
    padding: "15px 20px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    zIndex: 90,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
}
    ,
    menuIcon: { fontSize: "40px", marginBottom: "20px" },
    priceTag: { marginTop: "20px", padding: "8px 20px", background: "rgba(255,253,208,0.1)", borderRadius: "12px", color: "#FFFDD0", fontWeight: "900", fontSize: "14px" },
    avatarWrap: { position: "relative", width: "90px", height: "90px", marginBottom: "15px" },
    avatarInner: { width: "100%", height: "100%", borderRadius: "50%", border: "3px solid #6F4E37", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
    imgFull: { width: "100%", height: "100%", objectFit: "cover" },
    statusDot: { position: "absolute", bottom: "0px", right: "0px", width: "22px", height: "22px", borderRadius: "50%", border: "4px solid #1a0f0d", zIndex: 10 },
    cardTitle: { color: "#FFFDD0", fontSize: "22px", margin: "10px 0", textAlign: "center", fontWeight: "bold" },
    cardDesc: { color: "#FFFDD0", opacity: 0.6, fontSize: "13px", textAlign: "center", lineHeight: 1.5 },
    badge: { padding: "5px 12px", background: "#6F4E37", color: "#FFFDD0", borderRadius: "8px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" },
    cardBtn: { marginTop: "20px", padding: "8px 16px", background: "rgba(255,255,255,0.1)", color: "#FFFDD0", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "10px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" },
    dateText: { color: "#A855F7", fontSize: "13px", fontWeight: "900", marginBottom: "10px" },
    footer: { textAlign: "center", padding: "60px 40px", color: "#FFFDD0", opacity: 0.4, fontSize: "11px", zIndex: 10 },
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(30px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" },
    modal: { background: "rgba(42,23,18,0.98)", padding: "50px", borderRadius: "45px", border: "1px solid rgba(255,255,255,0.1)", maxWidth: "500px", width: "90%", position: "relative" },
    closeBtn: { position: "absolute", top: "25px", right: "30px", fontSize: "36px", color: "#FFFDD0", background: "transparent", border: "none", cursor: "pointer", opacity: 0.5 },
    modalHeader: { display: "flex", gap: "25px", alignItems: "center", marginBottom: "25px" },
    mAvatarWrap: { position: "relative", width: "90px", height: "90px" },
    mAvatarInner: { width: "100%", height: "100%", borderRadius: "20px", border: "3px solid #6F4E37", overflow: "hidden" },
    mStatusDot: { position: "absolute", bottom: "-5px", right: "-5px", width: "26px", height: "26px", borderRadius: "50%", border: "4px solid #1a0f0d", zIndex: 10 },
    mTitle: { fontFamily: "'Playfair Display', serif", color: "#FFFDD0", fontSize: "36px", margin: "0" },
    mBio: { color: "#FFFDD0", fontSize: "16px", opacity: 0.8, lineHeight: 1.6, marginBottom: "30px", textAlign: "left" },
    socialRow: { display: "flex", gap: "10px" },
    socialTag: { 
        padding: "10px 20px", 
        background: "rgba(67, 57, 50, 0.2)", // Чуть более прозрачный и стильный
        color: "#FFFDD0", 
        borderRadius: "15px", 
        fontWeight: "600", 
        fontSize: "13px",
        display: "flex",       // Добавили это
        alignItems: "center",  // Добавили это
        gap: "10px",           // Добавили расстояние между иконкой и текстом
        border: "1px solid rgba(255,255,255,0.05)" // Тонкая рамка для премиальности
    },}
