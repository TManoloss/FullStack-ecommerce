"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { CreateShippingAddressSchema, createShippingAddressSchema } from "./schema";

export const createShippingAddress = async (data: CreateShippingAddressSchema) => {
  createShippingAddressSchema.parse(data);
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not found");
  }

  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.recipientName,
      street: data.street,
      number: data.number,
      complement: data.complement || null,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      country: "Brasil",
      zipCode: data.zipCode,
      phoneNumber: data.phoneNumber,
      email: data.email,
      cpfOrCnpj: data.cpfOrCnpj,
    })
    .returning();

  return shippingAddress;
};
