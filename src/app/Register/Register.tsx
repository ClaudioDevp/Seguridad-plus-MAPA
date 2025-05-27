// src/components/Register.tsx
import styles from './Register.module.css';
import { z } from 'zod';
import { ZodForm } from '@/components/forms/ZodFrom/ZodForm';
import { ZodInputForm } from '@/components/forms/ZodInputForm/ZodInputForm';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useEffect, useRef, useState } from 'react';
import { getMunicipalities } from '@/lib/services/supabase';
import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '@/lib/services/firebase';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { Modal } from '@/components/Modal/Modal';
import { useModalStore } from '@/lib/stores/modalStore';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/lib/models/AppRoutes';

const schema = z.object({
  email: z.string().min(1, "Campo obligatorio").email(),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  phone: z.string()
    .min(9, "Debe tener 9 dígitos")
    .max(9, "Debe tener 9 dígitos")
    .regex(/^\d+$/, { message: "Debe contener solo números" })
    .refine((val) => {
      const phone = parsePhoneNumberFromString(`+56${val}`, 'CL');
      return phone?.isValid();
    }, {
      message: "Número telefónico chileno inválido",
    }),
});

export default function Register() {
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const municipalitySelect = useRef<HTMLSelectElement>(null);
  const openModal = useModalStore(s => s.openModal)
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      const res = await getMunicipalities();
      setMunicipalities(res);
    };
    fetch();
  }, []);


  const registerUser = async (data: z.infer<typeof schema>) => {
    console.log({ ...data, municipality_id: municipalitySelect.current?.value });

    try {
      const muniId = municipalitySelect.current?.value ?? ""
      const createUser = httpsCallable(functions, "createUser");
      await createUser({
        email: data.email,
        password: data.password,
        phoneNumber: `+56${data.phone}`,
        muniId,
      });
      const user = await signInWithEmailAndPassword(auth, data.email, data.password);
      await sendEmailVerification(user.user);
      openModal("RegisterSuccessedModal");
    } catch (err) {
      console.error("Error en el registro:", err);
    }
  };


  return (
    <>
      <Modal id='RegisterSuccessedModal' onClose={() => navigate(AppRoutes.app.download.abs, { replace: true })}>
        <h1>¡Registro completado!</h1>
        <h3>Cuando cierres este mensaje, serás redirigido a nuestra página para descargar la aplicación móvil.</h3>
      </Modal>

      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.header}>
              <h1>Seguridad PLUS</h1>
              <h3>Registro de usuario</h3>
            </div>
            <div className={styles.body}>
              <ZodForm
                schema={schema}
                onSubmit={registerUser}
                formOptions={{
                  defaultValues: {
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phone: "",
                  },
                  mode: "onTouched",
                }}
              >
                <ZodInputForm name="email" label="Correo electrónico" type="email" placeholder="correo@ejemplo.com" />
                <ZodInputForm name="password" label="Contraseña" type="password" placeholder="**********" />
                <ZodInputForm name="confirmPassword" label="Confirmar contraseña" type="password" placeholder="**********" />
                <ZodInputForm name="phone" prefix="+56 " label="Teléfono" type="text" placeholder="912345678" />

                <label className={styles.selectLabel}>Comuna: *</label>
                <select className={styles.select} ref={municipalitySelect}>
                  {municipalities.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <button type="submit" className={styles.submitButton}>Registrarse</button>
                <p className={styles.descriptor}>
                  * Si tu comuna no aparece, aún no contamos con soporte. Puedes sugerir a tu municipalidad que se una a Seguridad PLUS.
                </p>
              </ZodForm>
            </div>
          </div>
        </div>
      </div>

      <div id="recaptcha-container" />
    </>
  );
}