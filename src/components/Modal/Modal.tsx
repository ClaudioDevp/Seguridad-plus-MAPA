import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect, useState, type ReactNode } from "react";
import { useModalStore } from "@/lib/stores/modalStore";
import {MdCancel} from "react-icons/md"

interface ModalProps {
  id: string;
  children: ReactNode;
}

export const Modal = ({ children, id }: ModalProps) => {
  const closeModal = useModalStore(s => s.closeModal)
  const modalID = useModalStore(s => s.id)
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const modalRoot = document.getElementById("modal")!;

  useEffect(() => {
    if (modalID === id) {
      setShouldRender(true)
      const timeout = setTimeout(() => setIsVisible(true), 50); // Pequeño delay para que se aplique la transición de entrada
      return () => clearTimeout(timeout)
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 300); // Espera la salida
      return () => clearTimeout(timeout);
    }
  }, [id, modalID]);

  if (!shouldRender) return null;


  return createPortal(
    <div className={`${css.overlay} ${isVisible ? css.show : ""}`} onClick={closeModal}>
      <div className={`${css.modal} ${isVisible ? css.show : ""}`} onClick={(e) => e.stopPropagation()}>
        <label style={{ position: "absolute", top: 10, right: 10, alignSelf: "flex-end", cursor: "pointer", width: "auto" }} onClick={closeModal}>
          <MdCancel color="#c3962d" size={30}/>
        </label>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
