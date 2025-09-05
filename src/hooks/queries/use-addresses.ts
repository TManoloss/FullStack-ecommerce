import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/action/get-user-addresses";

export const getUseAddressesQueryKey = () => ["shipping-addresses"] as const;

export const useAddresses = () => {
  return useQuery({
    queryKey: getUseAddressesQueryKey(),
    queryFn: () => getUserAddresses(),
  });
};
