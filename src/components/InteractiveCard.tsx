import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ReactNode, MouseEvent } from 'react';

export function InteractiveCard({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map to border widths to give a dynamic 3D feel based on view/hover
  // Default width is 2px, but stretches up to 8px heavily depending on side
  const borderTop = useTransform(mouseYSpring, [-0.5, 0.5], [1, 8]);
  const borderBottom = useTransform(mouseYSpring, [-0.5, 0.5], [8, 1]);
  const borderLeft = useTransform(mouseXSpring, [-0.5, 0.5], [1, 8]);
  const borderRight = useTransform(mouseXSpring, [-0.5, 0.5], [8, 1]);

  // Rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Get mouse position relative to the element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to range -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Return to a slight base 3D state
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          borderTopWidth: borderTop,
          borderBottomWidth: borderBottom,
          borderLeftWidth: borderLeft,
          borderRightWidth: borderRight,
          rotateX,
          rotateY,
        }}
        className={`border-solid border-[#4a1c1c] bg-[#FCFAF5] will-change-transform ${className}`}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
