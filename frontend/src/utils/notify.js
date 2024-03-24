import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useNotification = () => {
  const notify = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warn":
        toast.warn(message);
        break;
      default:
        toast(message);
    }
  };

  return notify;
};

export default useNotification;
