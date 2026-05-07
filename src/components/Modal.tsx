import { motion } from "framer-motion"
import { X, Gamepad2, MessageSquare, MapPin, ExternalLink, Coffee } from "lucide-react"
import { theme } from "../data"
import { s } from "../styles"

interface ModalProps {
    selected: any
    setSelected: (val: any) => void
    liveStatus: string
    statusColor: string
}

export const Modal = ({ selected, setSelected, liveStatus, statusColor }: ModalProps) => {
    if (!selected) return null

    return (
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
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()} 
                style={s.modal}
            >
                {/* Кнопка закрытия теперь с иконкой X */}
                <button onClick={() => setSelected(null)} style={s.closeBtn}>
                    <X size={32} />
                </button>

                <div style={s.modalHeader}>
                    <div style={s.mAvatarWrap}>
                        <div style={s.mAvatarInner}>
                            {selected.image ? (
                                <img src={selected.image} style={s.imgFull} alt={selected.name} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#2a1712' }}>
                                    <Coffee size={40} color={theme.accent} />
                                </div>
                            )}
                        </div>
                        {selected.type === "staff" && (
                            <div style={{...s.mStatusDot, background: statusColor}} />
                        )}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h2 style={s.mTitle}>{selected.name || selected.title}</h2>
                        {selected.type === "staff" && (
                            <div style={{ color: statusColor, fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
                                {liveStatus?.toUpperCase() || "OFFLINE"}
                            </div>
                        )}
                    </div>
                </div>

                <p style={s.mBio}>{selected.bio || selected.desc}</p>

                <div style={s.socialRow}>
                    {/* Секция для персонала */}
                    {selected.type === "staff" && (
                        <>
                            <div style={s.socialTag}>
                                <Gamepad2 size={16} /> <span>{selected.roblox}</span>
                            </div>
                            <div style={s.socialTag}>
                                <MessageSquare size={16} /> <span>{selected.discord}</span>
                            </div>
                        </>
                    )}

                    {/* Секция для ивентов */}
                    {selected.type === "event" && (
                        <div style={s.socialTag}>
                            <MapPin size={16} /> <span>{selected.loc}</span>
                        </div>
                    )}

                    {/* Секция для альянсов */}
                    {selected.type === "alliance" && (
                        <a 
                            href={selected.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ ...s.socialTag, textDecoration: "none", background: theme.purple, color: "#FFF" }}
                        >
                            <ExternalLink size={16} /> <span>Visit Roblox Group</span>
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}