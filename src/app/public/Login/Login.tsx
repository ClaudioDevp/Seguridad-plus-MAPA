// src/components/Login.jsx
import LogoMaullin from '@/assets/img/lo_maullin.png';
import { z } from 'zod';
import { ZodForm } from '@/components/forms/ZodFrom/ZodForm';
import { ZodInputForm } from '@/components/forms/ZodInputForm/ZodInputForm';

import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/models/AppRoutes';
import { useAuthStore } from '@/stores/authStore';


const schema = z.object({
  email: z.string().min(1, "Campo obligatorio").email(),
  password: z.string().min(6, "Minimo 6 careacteres"),
})
type schemaType = z.infer<typeof schema>
export default function Login() {
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()


  const loginUser = async (data: schemaType) => {
    try {
      const {email, password} = data
      await login(email, password )
      navigate(AppRoutes.private.dashboard.abs)
      console.log('✅ Usuario autenticado');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={LogoMaullin} alt="Logo" className={styles.logo} />
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
