import AuthProvider from "./AuthProvider";
import ProductProvider from "./ProductProvider";
import CartProvider from "./CartProvider";
import OrderProvider from "./OrderProvider";


export default function Providers({ children }: {children: React.ReactNode}) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>{children}</OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

