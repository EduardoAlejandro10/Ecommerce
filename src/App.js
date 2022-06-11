import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Login, ProductDetail } from "./pages";
import { LoadingScreen } from "./components";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Purchases from "./pages/Purchases";
import ProtectedRoutes from "./components/ProtectedRoutes";



function App() {


  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      <Container>
        {isLoading && <LoadingScreen />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
        </Routes>
        <Footer />
      </Container>
    </HashRouter>
  );
}

export default App;
