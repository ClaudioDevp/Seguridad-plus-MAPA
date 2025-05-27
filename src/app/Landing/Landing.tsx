import { useNavigate } from "react-router-dom"
import styles from "./Landing.module.css"
import { AppRoutes } from "@/lib/models/AppRoutes"
import { FiUserPlus } from "react-icons/fi"
import { MdWarning } from "react-icons/md"
import { IoMdHelpCircle } from "react-icons/io"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Tu seguridad, nuestra prioridad</h1>
        <p>Conéctate con tu municipio en caso de emergencia. Accesible, rápido y confiable.</p>
        <div className={styles.buttonGroup}>
          <button onClick={() => navigate(AppRoutes.app.register.abs)}>Regístrate</button>
          <button onClick={() => navigate(AppRoutes.app.download.abs)}>Descarga la app</button>
        </div>
      </section>

      {/* FUNCIONAMIENTO */}
      <section className={styles.steps}>
        <h2>¿Cómo funciona?</h2>
        <div className={styles.stepList}>
          <div className={styles.step}>
            <FiUserPlus className={styles.icon} />
            <h3>1. Regístrate</h3>
            <p>Ingresa tus datos para vincularte con tu municipio.</p>
          </div>
          <div className={styles.step}>
            <MdWarning className={styles.icon} />
            <h3>2. Envía una alerta</h3>
            <p>Presiona el botón de pánico si estás en peligro.</p>
          </div>
          <div className={styles.step}>
            <IoMdHelpCircle className={styles.icon} />
            <h3>3. Recibe ayuda</h3>
            <p>Habla por chat o videollamada con un agente municipal.</p>
          </div>
        </div>
      </section>

      {/* MUNICIPIOS */}
      <section className={styles.municipios}>
        <h2>¿Eres parte del municipio?</h2>
        <p>Ingresa a la plataforma para monitorear alertas y brindar asistencia en tiempo real.</p>
        <a href="https://priv-seguridadplus.web.app" target="_blank" rel="noopener noreferrer">
          <button>Ingresar a plataforma municipal</button>
        </a>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Seguridad PLUS. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}
