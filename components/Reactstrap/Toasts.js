import React, { useState } from "react";
import { Button, Toast, ToastBody, ToastHeader } from "reactstrap";

const ToastSmall = props => {
  const activate = props;
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <Toast
      isOpen={show}
      transition={150}
      style={{
        border: "1px solid black",
        position: "absolute",
        background: "white",
        padding: "1rem",
        margin: "1rem",
        zIndex: "100",
        width: "16rem",
        bottom: "10%",
        color: "black"
      }}
    >
      <ToastHeader toggle={toggle}>Toast title</ToastHeader>
      <ToastBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      </ToastBody>
    </Toast>
  );
};

export default ToastSmall;
