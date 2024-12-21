import { motion } from 'framer-motion';

const FadeInAnimation = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default FadeInAnimation;