import { motion } from "framer-motion"
import { s } from "../styles"

interface CardProps {
    item: any
    onClick: () => void
    children?: React.ReactNode
}

export const Card = ({ item, onClick, children }: CardProps) => {
    return (
        <motion.div 
            layout 
            key={item.id} 
            style={item.category === "secret" ? s.secretCard : s.card} 
            onClick={onClick}
            whileHover={{ y: -5 }}
        >
            {children}
            <button style={s.cardBtn}>
                {item.type === "staff" ? "Read Bio" : "More Info"}
            </button>
        </motion.div>
    )
}