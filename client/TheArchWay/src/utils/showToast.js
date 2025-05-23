import { toast, Slide } from "react-toastify";

const TOAST_CONFIG = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  transition: Slide,
};

export const showToast = {
  success: (message) => toast.success(message, TOAST_CONFIG),
  error: (message) => toast.error(message, TOAST_CONFIG),
  info: (message) => toast.info(message, TOAST_CONFIG),
};
