import { AppRoutes } from "@/lib/models/AppRoutes";
import { useNavigate } from "react-router-dom";
import styles from "./AppModal.module.css";
import { Modal } from "@/components/Modal/Modal";
import { useModalStore } from "@/lib/stores/modalStore";

export default function AppModal() {
  const navigate = useNavigate();
  const closeModal = useModalStore(s => s.closeModal)

  return (
    <Modal id="AppSectionModal">
      <div className={styles.card}>
        <button className={styles.button}>
          Descargar la app
        </button>
        <button
          className={styles.button}
          onClick={() => {
            closeModal()
            navigate(AppRoutes.app.register.abs)
          }}
        >
          Registrarte
        </button>
      </div>
    </Modal>
  );
}
