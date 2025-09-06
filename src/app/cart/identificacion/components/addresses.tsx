"use client";

import { useRouter } from "next/navigation";
import {  useState } from "react";

import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";

import AddressForm from "./address-form";

interface AddressesProps {
  shippingAddresses: {
    id: string;
    number: string;
    email: string;
    recipientName: string;
    cpfOrCnpj: string;
    phoneNumber: string;
    zipCode: string;
    street: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  }[];
  defaultShippingAddressId: string | null;
}

const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId,
  );
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();

  const handleGoToPayment = () => {
    if (selectedAddress && selectedAddress !== "add_new") {
      updateCartShippingAddressMutation.mutate({
        shippingAddressId: selectedAddress,
      });
    }
    if (selectedAddress !== "add_new") {
      router.push("/cart/confirmation");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          {shippingAddresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                    <div className="text-sm">
                      <div className="font-medium">{address.recipientName}</div>
                      <div className="text-muted-foreground">
                        {[
                          address.street,
                          address.neighborhood,
                          address.city,
                          address.state,
                        ]
                          .filter((item) => item)
                          .slice(0, 2)
                          .join(", ")}
                      </div>
                    </div>
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        {selectedAddress === "add_new" && (
          <div className="mt-4">
            <AddressForm
              onAddressCreated={(addressId: string) => {
                updateCartShippingAddressMutation.mutate({
                  shippingAddressId: addressId,
                });
              }}
            />
          </div>
        )}
        {selectedAddress && selectedAddress !== "add_new" && (
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleGoToPayment}
              disabled={updateCartShippingAddressMutation.isPending}
              className="w-full md:w-auto"
            >
              {updateCartShippingAddressMutation.isPending
                ? "Processando..."
                : "Ir para Pagamento"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
