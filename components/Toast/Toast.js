import React from "react";
import { ToastContainer as ToastBody, toast } from "react-toastify";
import "./style.scss";

const ToastContainer = () => {
  return (
    <ToastBody
      position={toast.POSITION.BOTTOM_LEFT}
      hideProgressBar={true}
      autoClose={5000}
      className="toast-container"
    />
  );
};

export default ToastContainer;
