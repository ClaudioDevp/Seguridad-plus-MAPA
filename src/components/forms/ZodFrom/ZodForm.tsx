import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type CustomFormProps<TSchema extends z.ZodTypeAny> = {
  children: ReactNode;
  schema: TSchema;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  formOptions?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">;
};

export const ZodForm = <TSchema extends z.ZodTypeAny>({
  children,
  schema,
  onSubmit,
  formOptions,
}: CustomFormProps<TSchema>) => {
  const methods = useForm<z.infer<TSchema>>({
    ...formOptions,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        {children}
      </form>
    </FormProvider>
  );
};
