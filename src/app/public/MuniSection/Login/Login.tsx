// src/components/Login.jsx
import styles from './Login.module.css';
import { z } from 'zod';
import { ZodForm } from '@/components/forms/ZodFrom/ZodForm';
import { ZodInputForm } from '@/components/forms/ZodInputForm/ZodInputForm';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/lib/models/AppRoutes';
import { useAuthStore } from '@/lib/stores/authStore';


const schema = z.object({
  email: z.string().min(1, "Campo obligatorio").email(),
  password: z.string().min(6, "Minimo 6 careacteres"),
})

export default function Login() {
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()


  const loginUser = async (data: z.infer<typeof schema>) => {
    try {
      const { email, password } = data
      await login(email, password)
      navigate(AppRoutes.private.dashboard.abs)
      console.log('✅ Usuario autenticado');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Seguridad plus</h1>
          <h3>Iniciar sesion</h3>
        </div>
        <div className={styles.body}>
          <ZodForm schema={schema} onSubmit={loginUser} formOptions={{
            defaultValues: {
              email: "",
              password: "",
            },
            mode: "onTouched",
          }}>
            <ZodInputForm name={'email'} label={'Correo'} type={'email'} />
            <ZodInputForm name={'password'} label={'Contraseña'} type={'password'} />

            <button type="submit" className={styles.submitButton}>Ingresar</button>
          </ZodForm>
        </div>
      </div>
    </div>
  );

}
