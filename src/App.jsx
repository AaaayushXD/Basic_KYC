import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Kyc } from "./components/Kyc";
import { AuthProvider } from "./firebase/Auth";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import Success from "./components/Success";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Kyc />} />
                <Route path="/success" element={<Success />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
