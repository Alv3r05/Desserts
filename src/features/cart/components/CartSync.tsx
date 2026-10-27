import { useEffect } from "react";
import { useAllProducts } from "../../products/hooks/useProductsQueries";
import { useCartStore } from "../stores/cartStore";

function CartSync() {
  const { data: products } = useAllProducts();
  const syncProducts = useCartStore((state) => state.syncProducts);

  useEffect(() => {
    if (products) syncProducts(products);
  }, [products, syncProducts]);

  return null;
}

export default CartSync;
