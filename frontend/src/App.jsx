import { BrowserRouter, Routes,Route, Navigate, Outlet,} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Features from "./pages/Features";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

import "./index.css";
import Sidebar from "./pages/Sidebar";
import Checkout from "./pages/CheckOut";
import MyOrder from "./pages/MyOrder";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetOtp from "./pages/VerifyResetOtp";
import ResetPassword from "./pages/ResetPassword";

function MainLayout() {
  return (
    <div> <Navbar/><Outlet/><Footer /></div>
  )}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute> <Login /></PublicRoute>}/>
        <Route path="/signup" element={ <PublicRoute><Signup /></PublicRoute>}/>

        <Route element={<MainLayout />}>
          <Route path="/home" element={
             <ProtectedRoute>
             <Home/> 
             </ProtectedRoute>}/>

          <Route path="/products" element={ 
            <ProtectedRoute>
               <Products/>
             </ProtectedRoute> } />

          <Route path="/features" element={ 
            <ProtectedRoute> 
              <Features/>
             </ProtectedRoute>} />

          <Route path="/about" element={ 
            <ProtectedRoute> 
              <About/> 
            </ProtectedRoute>} />

          <Route path="/Sidebar" element={
            <ProtectedRoute>
               <Sidebar/> 
            </ProtectedRoute>} />

          <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>}/>

          <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>}/>

          <Route path="/myorder" element={
          <ProtectedRoute>
            <MyOrder/>
          </ProtectedRoute>}/>

          <Route path="/forgot-password" element={
          <PublicRoute>
          <ForgotPassword />
          </PublicRoute>}/>

           <Route path="/verify-reset-otp" element={
          <PublicRoute>
          <VerifyResetOtp />
          </PublicRoute>}/>

           <Route path="/reset-password" element={
          <PublicRoute>
          <ResetPassword/>
          </PublicRoute>}/>
 
          </Route>

        <Route path="/"element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;