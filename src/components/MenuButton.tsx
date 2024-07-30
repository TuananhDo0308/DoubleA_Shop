"use client";
import { useState } from "react";
import { MotionConfig, motion } from "framer-motion";

export const AnimatedHamburgerButton = () => {
  const [active, setActive] = useState(false);
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className="relative h-5 w-5 rounded-full bg-white/0 transition-colors hover:bg-white/20"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-0.5 w-4 bg-black"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "25%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-0.5 w-4 bg-black"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-0.5 w-4 bg-black"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "25%",
            left: "50%",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["25%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "25%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["25%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "25%"],
      left: "50%",
    },
  },
};
