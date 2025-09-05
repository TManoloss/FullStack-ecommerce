import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 space-y-4 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Confirmação do Pedido</CardTitle>
            <CardDescription>
              Revise os detalhes do seu pedido antes de finalizar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Endereço de Entrega</h3>
              <p className="text-muted-foreground text-sm">
                {cart.shippingAddress.recipientName}
              </p>
              <p className="text-muted-foreground text-sm">
                {cart.shippingAddress.street}, {cart.shippingAddress.number}
                {cart.shippingAddress.complement &&
                  `, ${cart.shippingAddress.complement}`}
              </p>
              <p className="text-muted-foreground text-sm">
                {cart.shippingAddress.neighborhood}, {cart.shippingAddress.city}{" "}
                - {cart.shippingAddress.state}
              </p>
              <p className="text-muted-foreground text-sm">
                CEP: {cart.shippingAddress.zipCode}
              </p>
            </div>
            <div className="flex justify-end">
              <FinishOrderButton />
            </div>
          </CardContent>
        </Card>
        <CartSummary
          subtotalInCents={cartTotalInCents}
          totalInCents={cartTotalInCents}
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.product.name,
            variantName: item.productVariant.name,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl,
          }))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
