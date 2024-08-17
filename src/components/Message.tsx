import React, { useEffect } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

// Defining the notification type
interface Notification {
  id: number;
  message: string;
}

// Defining the props for the SlideInNotifications component
interface SlideInNotificationsProps {
  notifications: Notification[];
  removeNotif: (id: number) => void;
}

// The SlideInNotifications component handles multiple notifications
const SlideInNotifications: React.FC<SlideInNotificationsProps> = ({ notifications, removeNotif }) => {
  return (
    <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} removeNotif={removeNotif} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Time-to-live for each notification before auto-removal
const NOTIFICATION_TTL = 3000;

// The Notification component represents each individual notification
const Notification: React.FC<{ notification: Notification; removeNotif: (id: number) => void }> = ({ notification, removeNotif }) => {
  const { id, message } = notification;

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id); // Remove the notification after the TTL expires
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef); // Cleanup timeout when the component is unmounted
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-blue-700 pointer-events-auto"
    >
      <FiCheckSquare className="mt-0.5" />
      <span>{message}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default SlideInNotifications;
