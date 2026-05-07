import { useState } from "react"
import { motion } from "framer-motion"
import { eventsData } from "../data"
import { s } from "../styles"

export const Events = ({ setSelected, localTimes, isMounted }: any) => {
    const [eventTab, setEventTab] = useState("upcoming")

    return (
        <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
            <h2 style={s.pageTitle}>Calendar</h2>
            
            <div style={s.menuFilterWrap}>
                {["upcoming", "past"].map(tab => (
                    <div key={tab} style={s.filterBtn(eventTab === tab)} onClick={() => setEventTab(tab)}>
                        {tab.toUpperCase()}
                    </div>
                ))}
            </div>

            <div style={s.grid}>
                {eventsData.filter(ev => {
                    const isPast = new Date(ev.iso).getTime() < new Date().getTime()
                    return eventTab === "past" ? isPast : !isPast
                }).map(ev => (
                    <motion.div layout key={ev.id} style={s.card} onClick={() => setSelected(ev)}>
                        <span style={s.dateText}>
                            {isMounted && localTimes[ev.id] ? `${localTimes[ev.id].date} • ${localTimes[ev.id].time}` : "..."}
                        </span>
                        <h3 style={s.cardTitle}>{ev.title}</h3>
                        <div style={s.badge}>{ev.loc}</div>
                        <button style={s.cardBtn}>More Info</button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}