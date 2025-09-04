import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/action/decrease-cart-product-quantity";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

export const getUseDecreaseCartProductMutationKey = (cartItemId: string) =>
  ["decrease-cart-product", cartItemId] as const;

export const useDecreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseDecreaseCartProductMutationKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
