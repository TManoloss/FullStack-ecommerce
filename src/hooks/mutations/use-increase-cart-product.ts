import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/action/add-cart-product";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

export const getUseIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["increase-cart-product-quantity", productVariantId] as const;

export const useIncreaseCartProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () =>
      addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
