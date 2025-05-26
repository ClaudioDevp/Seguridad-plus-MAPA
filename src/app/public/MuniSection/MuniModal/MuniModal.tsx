import { AppRoutes } from "@/lib/models/AppRoutes"
import { useNavigate } from "react-router-dom"
import styles from "./MuniModal.module.css"
import { Modal } from "@/components/Modal/Modal"
import { useModalStore } from "@/lib/stores/modalStore"

export default function MuniModal() {
  const closeModal = useModalStore(s => s.closeModal)
  const navigate = useNavigate()

  return (
    <Modal id={"MuniSectionModal"}>
      <div className={styles.card}>
        <h1>Acceso municipalidad</h1>
        <button onClick={() => {
          closeModal();
          navigate(AppRoutes.muni.login.abs)
        }}>Login</button>
        <button onClick={() => {
          closeModal();
          navigate(AppRoutes.muni.register.abs)
        }}>Register</button>
      </div>
    </Modal>
  )
}
