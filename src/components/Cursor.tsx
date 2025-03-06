import { motion } from "framer-motion";

interface Position {
    top: number;
    height: number;
    opacity: number;
}

export const Cursor = ({ position }: { position: Position }) => {
    return (
        <motion.div
            animate={{
                ...position,
            }}
            className="absolute left-0 right-0 m-auto w-[58px] h-[58px] rounded-full bg-black"
        />
    );
}