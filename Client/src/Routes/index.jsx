import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator, { useLoading } from "../Components/Common/LoadingIndicator";
import PrivateRoute from "./PrivateRoutes";
import AdminRoute from "./AdminRoutes";
import GeneralLayout from "../Layouts/GeneralLayout";
import AdminLayout from "../Pages/Admin/AdminLayout";
import ProfileView from "../Components/Common/ProfileView";
import CategoryProductsPage from "../Pages/Home/CategoryProductsPage";
import CategoriesPage from "../Pages/Home/CategoriesPage";
import AddressModal from "../Pages/Address";
import ThankYouPage from "../Pages/ThankYouPage";
import MyAccount from "../Pages/Account";
import PageLoader from "../Components/Common/PageLoader";
import { getMe } from "../store/redux/thunks";

// Lazy-loaded Pages
const Home = lazy(() => import("../Pages/Home"));
const ProductDetail = lazy(() => import("../Pages/ProductDetail"));
const About = lazy(() => import("../Pages/About"));
const PrivacyPolicy = lazy(() => import("../Pages/Public/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../Pages/Public/TermsOfService"));
const BlogFeed = lazy(() => import("../Pages/Public/BlogFeed"));
const FAQ = lazy(() => import("../Pages/Public/FAQ"));
const Contact = lazy(() => import("../Pages/Contact"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const Login = lazy(() => import("../Pages/Admin/Login"));
const Logout = lazy(() => import("../Pages/Admin/Logout/Logout"));
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard"));
const CategoryManager = lazy(() => import("../Pages/Admin/Products"));
const ProductDetails = lazy(() => import("../Pages/Admin/Products/ProductDetails"));
const Users = lazy(() => import("../Pages/Admin/Users"));

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  const userState = useSelector((state) => state.user);
  const { showLoading } = useLoading();
  const dispatch = useDispatch();

  if (userState.isFetching) {
  // return (
  //   <div style={{ padding: 30 }}>
  //     <LoadingIndicator />
  //   </div>
  // );
  }

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <Suspense fallback={<PageLoader/>}>
      <Routes>

        <Route element={<GeneralLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path ="/privacy" element={<PrivacyPolicy/>} />
          <Route path ="/terms" element={<TermsOfService/>} />
          <Route path ="blog" element={<BlogFeed/>} />
          <Route path ="faqs" element={<FAQ/>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            user
              ? user.userRole === "admin"
                ? <Navigate to="/admin/dashboard" />
                : <Navigate to="/" />
              : <Login />
          }
        />

        <Route element={<PrivateRoute />}>
          <Route element={<GeneralLayout />}>
            <Route path="/addresses" element={<AddressModal />} />
            <Route path="/account" element={<MyAccount />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/admin/logout" element={<Logout />} />
            <Route path="/admin/categories" element={<CategoryManager />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
