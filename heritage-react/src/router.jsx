import { createBrowserRouter } from "react-router-dom";
import HeritagePage from "./pages/HeritagePage";
import AboutUsPage from "./pages/AboutUsPage";
import ProductListingPage from "./pages/ProductList";
import ProductSinglePage from "./pages/ProductSinglePage";
import ContactUsPage from "./pages/ContactPage";
import BlogListingPage from "./pages/BlogListingPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import Layout from "./pages/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HeritagePage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/heritages",
        element: <ProductListingPage />,
      },
      {
        path: "/heritages/traditional-tilhari-necklace",
        element: <ProductSinglePage />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "/our-journal",
        element: <BlogListingPage />,
      },
      {
        path: "/our-journal/1",
        element: <BlogSinglePage />,
      },
    ],
  },
]);

export default router;
