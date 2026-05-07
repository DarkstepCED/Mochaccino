import { useState, useEffect } from "react"
// Импортируем данные, которые нужны для расчетов
import { staffList, eventsData } from "../data"

export const useMochaccino = () => {
    const [timeLeft, setTimeLeft] = useState("CALCULATING...")
    const [isMounted, setIsMounted] = useState(false)
    const [liveStatuses, setLiveStatuses] = useState<Record<string, string>>({})
    const [localTimes, setLocalTimes] = useState<Record<string, {date: string, time: string}>>({})

    useEffect(() => {
        setIsMounted(true)
        
        // 1. Расчет времени для ивентов
        const times: Record<string, {date: string, time: string}> = {}
        eventsData.forEach(e => {
            const d = new Date(e.iso)
            times[e.id] = {
                date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
                time: d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
            }
        })
        setLocalTimes(times)

        // 2. Таймер открытия
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

        // 3. API статусов Discord
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

    // Функция определения цвета статуса
    const getStatusColor = (id: string) => {
        const s = liveStatuses[id]
        if (s === "online") return "#43b581"
        if (s === "idle") return "#faa61a"
        if (s === "dnd") return "#f04747"
        return "#747f8d"
    }

    // Возвращаем всё наружу, чтобы App.tsx мог этим пользоваться
    return { 
        timeLeft, 
        isMounted, 
        liveStatuses, 
        localTimes, 
        getStatusColor 
    }
}