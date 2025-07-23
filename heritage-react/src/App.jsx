import "./App.css";
import { RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import router from "./router.js";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </>
  );
}

export default App;
