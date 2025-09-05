"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { UpdateCartShippingAddressSchema, updateCartShippingAddressSchema } from "./schema";

export const updateCartShippingAddress = async (data: UpdateCartShippingAddressSchema) => {
  updateCartShippingAddressSchema.parse(data);
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not found");
  }

  const [updatedCart] = await db
    .update(cartTable)
    .set({
      shippingAddressId: data.shippingAddressId,
    })
    .where(eq(cartTable.userId, session.user.id))
    .returning();

  if (!updatedCart) {
    throw new Error("Cart not found");
  }

  return updatedCart;
};
