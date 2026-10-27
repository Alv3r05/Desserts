import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { Toaster } from "react-hot-toast";
import TopLoadingBar from "./components/TopLoadingBar";
import CartSync from "./features/cart/components/CartSync";

const CreateProductPage = lazy(
  () => import("./features/products/pages/CreateProductPage"),
);
const ProductsAdminPage = lazy(
  () => import("./features/products/pages/ProductsAdminPage"),
);
const EditProductPage = lazy(
  () => import("./features/products/pages/EditProductPage"),
);

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fcf8f5] px-6 text-center">
      <h1 className="text-4xl font-bold text-[#260f08]">404</h1>

      <p className="mt-3 text-[#87635a]">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-full bg-[#c73a0f] px-5 py-3 font-semibold text-white hover:bg-[#a92f0c]"
      >
        Back to desserts
      </Link>
    </main>
  );
}

function App() {
  return (
    <>
      <TopLoadingBar />
      <CartSync />
      <Toaster position="top-right" />
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products/:id" element={<ProductDetailPage />} />

        <Route path="admin/products/create" element={<CreateProductPage />} />

        <Route path="admin/products" element={<ProductsAdminPage />} />

        <Route path="admin/products/:id/edit" element={<EditProductPage />} />

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
