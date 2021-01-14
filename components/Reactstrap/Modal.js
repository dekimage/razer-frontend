import React, { useState, Children } from "react";
import {
  Button,
  Modal as ModalStrap,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import "../../styles/reactstrap.scss";

const Modal = props => {
  const { title, children, className, trigger } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div onClick={toggle}>{trigger}</div>
      <ModalStrap
        fade={false}
        centered={true}
        isOpen={modal}
        toggle={toggle}
        className={className}
        style={{ zIndex: "10000" }}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        {children}
      </ModalStrap>
    </div>
  );
};

export default Modal;
