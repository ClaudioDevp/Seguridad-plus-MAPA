import { useAuthStore } from "@/lib/stores/authStore"
import styles from "./Landing.module.css"
import MuniModal from "../MuniPage/MuniModal"
import { useModalStore } from "@/lib/stores/modalStore"
import AppModal from "../AppPage/AppPage"

export default function Landing() {
  const openModal = useModalStore(s => s.openModal)
  const user = useAuthStore(s => s.user)
  const cerrarSesion = useAuthStore(s => s.logout)
  return (
    <>
      <MuniModal />
      <AppModal />
      <header className={styles.header}>
        <h1>Seguridad PLUS</h1>
        <div>
          {user ? (
            <button onClick={async () => await cerrarSesion()}>Cerrar sesion</button>
          ) : (
            <>
              <button className={styles.button} onClick={() => openModal("MuniSectionModal")}>Acceso municipalidad</button>
              <button className={styles.button} onClick={() => openModal("AppSectionModal")}>Nuestra app</button>
            </>
          )
          }
        </div>
      </header>
    </>
  )
}
