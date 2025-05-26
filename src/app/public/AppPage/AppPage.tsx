import { AppRoutes } from "@/lib/models/AppRoutes";
import { useNavigate } from "react-router-dom";
import styles from "./AppPage.module.css";
import { Modal } from "@/components/Modal/Modal";

export default function AppModal() {
  const navigate = useNavigate();

  return (
    <Modal id="AppSectionModal">
      <div className={styles.card}>
        <button className={styles.button}>
          Descargar la app
        </button>
        <button
          className={styles.button}
          onClick={() => navigate(AppRoutes.app.register.abs)}
        >
          Registrarte
        </button>
      </div>
    </Modal>
  );
}
