import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Search } from "./pages/search/index.tsx";
import { Layout } from "./components/Layout.tsx";
import { SnackbarProvider } from "./context/SnackbarContext.tsx";
import { Product } from "./pages/product/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/search",
    element: (
      <Layout>
        <Search />
      </Layout>
    ),
  },
  {
    path: "/product/:productId",
    element: (
      <Layout>
        <Product />
      </Layout>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
