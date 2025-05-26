// src/components/Register.tsx
import styles from './Register.module.css';
import { z } from 'zod';
import { ZodForm } from '@/components/forms/ZodFrom/ZodForm';
import { ZodInputForm } from '@/components/forms/ZodInputForm/ZodInputForm';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useEffect, useRef, useState } from 'react';
import { getMunicipalities } from '@/lib/services/supabase';
import { useAuthStore } from '@/lib/stores/authStore';
import { Modal } from '@/components/Modal/Modal';
import { useModalStore } from '@/lib/stores/modalStore';
import {
  RecaptchaVerifier,
  type ConfirmationResult,
  linkWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '@/lib/services/firebase';

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
  const phoneNumber = useRef("");
  const confirmationResult = useRef<ConfirmationResult | null>(null);
  const registrarConEmail = useAuthStore((s) => s.registerWithEmailAndPassword);
  const municipalitySelect = useRef<HTMLSelectElement>(null);
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMunicipalities();
      setMunicipalities(res);
    };
    fetch();
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log("reCAPTCHA verificado");
        },
        'expired-callback': () => {
          console.warn("reCAPTCHA expirado");
        }
      });
    }
  };

  const registerUser = async (data: z.infer<typeof schema>) => {
    console.log({ ...data, municipality_id: municipalitySelect.current?.value });
    phoneNumber.current = "+56" + data.phone;

    try {
      const userCredential = await registrarConEmail(data.email, data.password);
      console.log("Usuario registrado y correo enviado");

      setupRecaptcha();

      confirmationResult.current = await linkWithPhoneNumber(
        userCredential.user,
        phoneNumber.current,
        window.recaptchaVerifier
      );
      console.log("SMS enviado");
      openModal("VerifyPhoneNumberModal");
    } catch (err) {
      console.error("Error en el registro/verificación:", err);
    }
  };

  const handleConfirmNumber = async (data: { code: string }) => {
    if (confirmationResult.current) {
      try {
        await confirmationResult.current.confirm(data.code);
        console.log("Número verificado exitosamente");
        closeModal();
      } catch (err) {
        console.error("Código inválido:", err);
      }
    }
  };

  return (
    <>
      <Modal id="VerifyPhoneNumberModal">
        <ZodForm
          schema={z.object({ code: z.string().min(1, "Debes ingresar el código") })}
          onSubmit={handleConfirmNumber}
        >
          <ZodInputForm
            name="code"
            label={`Ingresa el código enviado al número ${phoneNumber.current}`}
            type="text"
          />
        </ZodForm>
      </Modal>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>Seguridad plus</h1>
            <h3>Registrarse</h3>
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
              <ZodInputForm name="email" label="Correo" type="email" placeholder="correo@gmail.com" />
              <ZodInputForm name="password" label="Contraseña" type="password" placeholder="**************" />
              <ZodInputForm name="confirmPassword" label="Confirmar contraseña" type="password" placeholder="**************" />
              <ZodInputForm name="phone" prefix="+56 " label="Teléfono" type="text" placeholder="* * * * * * * * *" />

              <label className={styles.selectLabel}>Comuna: *</label>
              <select className={styles.select} ref={municipalitySelect}>
                {municipalities.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <button type="submit" className={styles.submitButton}>Registrarse</button>
              <label className={styles.descriptor}>
                * Si tu comuna no aparece en la lista, es porque aún no
                contamos con soporte para ella. Te invitamos a sugerir a tu
                municipalidad que se ponga en contacto con nosotros para
                evaluar su incorporación al sistema.
              </label>
            </ZodForm>
          </div>
        </div>
      </div>
      <div id="recaptcha-container" />
    </>
  );
}
