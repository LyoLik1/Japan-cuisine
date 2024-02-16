import { FC, Fragment, MouseEventHandler, ReactNode } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

interface BackdropProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Backdrop: FC<BackdropProps> = ({ onClick }) => {
  return <div onClick={onClick} className={styles.backdrop}></div>;
};

interface ModalWindowProps {
  children: ReactNode;
}

const ModalWindow: FC<ModalWindowProps> = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

if (!portalElement) {
  throw new Error('Element with id "overlays" not found');
}

interface ModalProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export const Modal: FC<ModalProps> = ({ children, onClick }) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClick={onClick} />, portalElement)}
      {createPortal(<ModalWindow>{children}</ModalWindow>, portalElement)}
    </Fragment>
  );
};
