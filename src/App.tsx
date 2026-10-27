import { Routes, Route, Navigate, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CreateProductPage from "./features/products/pages/CreateProductPage";
import ProductsAdminPage from './features/products/pages/ProductsAdminPage'
import EditProductPage from './features/products/pages/EditProductPage'
import { Toaster } from "react-hot-toast";
import TopLoadingBar from "./components/TopLoadingBar";

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
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products/:id" element={<ProductDetailPage />} />

        <Route path="admin/products/create" element={<CreateProductPage />} />

        <Route path="admin/products" element={<ProductsAdminPage />} />

        <Route path="admin/products/:id/edit" element={<EditProductPage />} />

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
