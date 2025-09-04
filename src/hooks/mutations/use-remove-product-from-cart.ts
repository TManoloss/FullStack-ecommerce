import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProductFromCart } from "@/action/remove-cart-product";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

export const useRemoveProductFromCartMutationKey = (cartItemId: string) =>
  ["remove-cart-product", cartItemId] as const;

export const useRemoveProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: useRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: () => removeProductFromCart({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
