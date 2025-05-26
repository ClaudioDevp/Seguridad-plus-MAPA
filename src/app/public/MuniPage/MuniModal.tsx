import { AppRoutes } from "@/lib/models/AppRoutes"
import { useNavigate } from "react-router-dom"
import styles from "./MuniModal.module.css"
import { Modal } from "@/components/Modal/Modal"

export default function MuniModal() {
  const navigate = useNavigate()

  return (
    <Modal id={"MuniSectionModal"}>
      <div className={styles.card}>
        <h1>Acceso municipalidad</h1>
        <button onClick={() => navigate(AppRoutes.muni.login.abs)}>Login</button>
        <button onClick={() => navigate(AppRoutes.muni.register.abs)}>Register</button>
      </div>
    </Modal>
  )
}
