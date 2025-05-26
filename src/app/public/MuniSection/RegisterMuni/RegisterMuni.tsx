// src/components/Login.jsx
import styles from './RegisterMuni.module.css';
import { z } from 'zod';
import { ZodForm } from '@/components/forms/ZodFrom/ZodForm';
import { ZodInputForm } from '@/components/forms/ZodInputForm/ZodInputForm';
import { useRef } from 'react';


const schema = z.object({
  name: z.string().min(1, "Campo obligatorio"),
  email: z.string().min(1, "Campo obligatorio").email(),
  municipality: z.string().min(1, "Campo obligatorio"),
})

export default function RegisterMuni() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const loginUser = async (data: z.infer<typeof schema>) => {
    console.log({...data, details:textareaRef.current?.value})
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Seguridad plus</h1>
        </div>
        <div className={styles.body}>
          <h3>Solicitar registro de municipalidad</h3>
          <ZodForm schema={schema} onSubmit={loginUser} formOptions={{
            defaultValues: {
              name: "",
              email: "",
              municipality: "",
            },
            mode: "onTouched",
          }}>
            <ZodInputForm name={'name'} label={'Nombre'} type={'text'} />
            <ZodInputForm name={'email'} label={'Correo'} type={'email'} />
            <ZodInputForm name={'municipality'} label={'Municipalidad'} type={'text'} />
            <label className={styles.inputLabel}>Detalles (opcional)</label>
            <textarea ref={textareaRef} className={styles.textarea}/>
            <button type="submit" className={styles.submitButton}>Ingresar</button>
          </ZodForm>
        </div>
      </div>
    </div>
  );

}
