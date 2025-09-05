import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createShippingAddress } from "@/action/create-shipping-address";
import { getUseAddressesQueryKey } from "@/hooks/queries/use-addresses";

export const getUseCreateShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseCreateShippingAddressMutationKey(),
    mutationFn: createShippingAddress,
    onSuccess: () => {
      toast.success("Endereço criado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: getUseAddressesQueryKey(),
      });
    },
    onError: (error) => {
      toast.error("Erro ao criar endereço. Tente novamente.");
      console.error("Error creating shipping address:", error);
    },
  });
};
