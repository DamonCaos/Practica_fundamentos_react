import { useNotification } from "../context/NotificationContext";
import styles from "../styles/Notification.module.css";

const Notification = () => {
  const { notifications } = useNotification();

  return (
    <div className={styles.notificationContainer}>
      {notifications.map(({ id, message, type }) => (
        <div key={id} className={`${styles.notification} ${styles[type]}`}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
