"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";

const addressFormSchema = z.object({
  email: z.email("Email inválido"),
  nomeCompleto: z.string().trim().min(3, "Nome completo é obrigatório"),
  cpfCnpj: z.string().min(11, "CPF/CNPJ é obrigatório"),
  celular: z.string().min(10, "Celular é obrigatório"),
  cep: z.string().min(8, "CEP é obrigatório"),
  endereco: z.string().trim().min(3, "Endereço é obrigatório"),
  numero: z.string().trim().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().trim().min(2, "Bairro é obrigatório"),
  cidade: z.string().trim().min(2, "Cidade é obrigatória"),
  estado: z.string().trim().min(2, "Estado é obrigatório"),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

interface AddressFormProps {
  onAddressCreated?: (addressId: string) => void;
}

const AddressForm = ({ onAddressCreated }: AddressFormProps) => {
  const createShippingAddressMutation = useCreateShippingAddress();
  
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      email: "",
      nomeCompleto: "",
      cpfCnpj: "",
      celular: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  });

  const onSubmit = (values: AddressFormValues) => {
    createShippingAddressMutation.mutate({
      email: values.email,
      recipientName: values.nomeCompleto,
      cpfOrCnpj: values.cpfCnpj,
      phoneNumber: values.celular,
      zipCode: values.cep,
      street: values.endereco,
      number: values.numero,
      complement: values.complemento,
      neighborhood: values.bairro,
      city: values.cidade,
      state: values.estado,
    }, {
      onSuccess: (data) => {
        form.reset();
        if (onAddressCreated && data?.id) {
          onAddressCreated(data.id);
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomeCompleto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo *</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpfCnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF/CNPJ *</FormLabel>
                <FormControl>
                  <PatternFormat
                    customInput={Input}
                    format="###.###.###-##"
                    mask="_"
                    placeholder="000.000.000-00"
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="celular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular *</FormLabel>
                <FormControl>
                  <PatternFormat
                    customInput={Input}
                    format="(##) #####-####"
                    mask="_"
                    placeholder="(00) 00000-0000"
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP *</FormLabel>
                <FormControl>
                  <PatternFormat
                    customInput={Input}
                    format="#####-###"
                    mask="_"
                    placeholder="00000-000"
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço *</FormLabel>
                <FormControl>
                  <Input placeholder="Rua, Avenida, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número *</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complemento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input placeholder="Apartamento, casa, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro *</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade *</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado *</FormLabel>
                <FormControl>
                  <Input placeholder="SP, RJ, MG, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            className="w-full md:w-auto"
            disabled={createShippingAddressMutation.isPending}
          >
            {createShippingAddressMutation.isPending ? "Salvando..." : "Salvar Endereço"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
