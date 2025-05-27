import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useModalStore } from "@/lib/stores/modalStore";
import { MdCancel } from "react-icons/md"

interface ModalProps {
  id: string;
  children: ReactNode;
  onClose?: () => void
}

export const Modal = ({ children, id, onClose }: ModalProps) => {
  const closeModal = useModalStore(s => s.closeModal)
  const modalID = useModalStore(s => s.id)
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const modalRoot = document.getElementById("modal")!;
  const wasVisible = useRef(false)


useEffect(() => {
  if (modalID === id) {
    wasVisible.current = true
    setShouldRender(true)
    const timeout = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timeout)
  } else {
    setIsVisible(false)
    const timeout = setTimeout(() => {
      setShouldRender(false)
      if (wasVisible.current && onClose) {
        wasVisible.current = false
        onClose()
      }
    }, 300)
    return () => clearTimeout(timeout)
  }
}, [id, modalID, onClose])

  if (!shouldRender) return null;


  return createPortal(
    <div className={`${css.overlay} ${isVisible ? css.show : ""}`} onClick={closeModal}>
      <div className={`${css.modal} ${isVisible ? css.show : ""}`} onClick={(e) => e.stopPropagation()}>
        <label style={{ position: "absolute", top: 10, right: 10, alignSelf: "flex-end", cursor: "pointer", width: "auto" }} onClick={closeModal}>
          <MdCancel color="#c3962d" size={30} />
        </label>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
