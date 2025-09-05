import { z } from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("Email inválido"),
  recipientName: z.string().trim().min(3, "Nome completo é obrigatório"),
  cpfOrCnpj: z.string().min(11, "CPF/CNPJ é obrigatório"),
  phoneNumber: z.string().min(10, "Celular é obrigatório"),
  zipCode: z.string().min(8, "CEP é obrigatório"),
  street: z.string().trim().min(3, "Endereço é obrigatório"),
  number: z.string().trim().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().trim().min(2, "Bairro é obrigatório"),
  city: z.string().trim().min(2, "Cidade é obrigatória"),
  state: z.string().trim().min(2, "Estado é obrigatório"),
});

export type CreateShippingAddressSchema = z.infer<typeof createShippingAddressSchema>;
