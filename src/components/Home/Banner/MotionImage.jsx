import { motion } from 'framer-motion';

export default function MotionImage({ src, alt, className, delay = 0 }) {
    return (
        <motion.img
            animate={{ y: [10, -30, 10] }}
            transition={{
                ease: 'linear',
                duration: 8,
                repeat: Infinity,
                delay,
            }}
            src={src}
            alt={alt}
            className={className}
        />
    );
}
