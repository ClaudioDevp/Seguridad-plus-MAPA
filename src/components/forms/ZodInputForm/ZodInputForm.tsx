import { Controller, FieldError, FieldValues, Path, useFormContext } from "react-hook-form";
import styles from "./ZodInputForm.module.css";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string;
}

export const ZodInputForm = <T extends FieldValues>({ name, label, type }: Props<T>) => {
  const { control, formState: { errors } } = useFormContext<T>();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}&nbsp;
        {error ? <label className={styles.error}>{error.message}</label> : <label>&nbsp;</label>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={`${styles.input} ${error ? styles.invalid : ""}`}
          />
        )}
      />

    </div>
  );
};
