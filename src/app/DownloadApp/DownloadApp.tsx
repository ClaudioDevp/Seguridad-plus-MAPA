import { FaApple, FaGooglePlay } from "react-icons/fa";
import styles from './DownloadApp.module.css';

const downloadLink = {
  ios: "https://apps.apple.com/app",
  android: "https://play.google.com/store/apps"
}


export default function DownloadApp() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Descarga Seguridad PLUS</h1>
        <p className={styles.subtitle}>
          Instala la aplicación móvil para usar el botón de pánico desde tu teléfono.
        </p>

        <div className={styles.buttons}>
          <a
            href={downloadLink.ios} // reemplaza con el link real
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadBtn}
          >
            <FaApple className={styles.icon} />
            App Store
          </a>
          <a
            href={downloadLink.android} // reemplaza con el link real
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadBtn}
          >
            <FaGooglePlay className={styles.icon} />
            Google Play
          </a>
        </div>

        <p className={styles.note}>
          Si ya estás registrado, puedes iniciar sesión en la app directamente.
        </p>
      </div>
    </div>
  );
}
