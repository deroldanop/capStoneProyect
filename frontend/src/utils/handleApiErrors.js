import useNotification from "./notify.js";

const useHandleApiErrors = () => {
  const notify = useNotification();
  return (error) => {
    if (error?.message && error.message === "Unauthorized access") {
      notify("warn", "You are not authorized to access this.");
    } else {
      notify("error", error.message);
    }
  };
};

export default useHandleApiErrors;
