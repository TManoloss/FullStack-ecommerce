import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCartShippingAddress } from "@/action/update-cart-shipping-address";

export const getUseUpdateCartShippingAddressMutationKey = () =>
  ["update-cart-shipping-address"] as const;

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseUpdateCartShippingAddressMutationKey(),
    mutationFn: updateCartShippingAddress,
    onSuccess: () => {
      toast.success("Endereço de entrega atualizado com sucesso!");
      // Invalidate cart queries if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar endereço de entrega. Tente novamente.");
      console.error("Error updating cart shipping address:", error);
    },
  });
};
