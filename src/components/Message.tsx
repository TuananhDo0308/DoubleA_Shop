import React, { useEffect } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const SlideInNotifications = ({ notifications, removeNotif }) => {
  return (
    <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <Notification key={n.id} {...n} removeNotif={removeNotif} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NOTIFICATION_TTL = 2000;

const Notification = ({ message, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id); // Xóa thông báo sau khi hết thời gian
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef); // Dọn dẹp timeout khi component bị unmount
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-blue-700 pointer-events-auto"
    >
      <FiCheckSquare className=" mt-0.5" />
      <span>{message}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default SlideInNotifications;
