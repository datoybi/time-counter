import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = (text: string) =>
  toast.success(text, {
    position: "bottom-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

export const errorToast = (text: string) =>
  toast.info(text, {
    position: "bottom-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
