"use client";

import { useState } from "react";

import { CardHeader } from "@/components/ui/card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddresses } from "@/hooks/queries/use-addresses";

import AddressForm from "./address-form";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data: addresses, isLoading } = useAddresses();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          {isLoading ? (
            <div className="text-center py-4">Carregando endereços...</div>
          ) : (
            addresses?.map((address) => (
              <Card key={address.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                      <div className="text-sm">
                        <div className="font-medium">{address.recipientName}</div>
                        <div className="text-muted-foreground">
                          {address.street}, {address.number}
                          {address.complement && `, ${address.complement}`}
                        </div>
                        <div className="text-muted-foreground">
                          {address.neighborhood}, {address.city} - {address.state}
                        </div>
                        <div className="text-muted-foreground">
                          CEP: {address.zipCode}
                        </div>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        {selectedAddress === "add_new" && (
          <div className="mt-4">
            <AddressForm />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
