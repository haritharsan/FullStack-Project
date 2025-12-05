import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import UserDashboard from "./pages/User/UserDashboard";
import ApplyPage from "./pages/ApplyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import EsevaiPage from "./pages/EsevaiPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CertificatesPage from "./pages/User/CertificatesPage.jsx";
import SchemesPage from "./pages/User/SchemesPage.jsx";
import ChatBot from "./pages/ChatBot.jsx";  // 👈 chatbot import
import ProjectsPage from "./pages/main/ProjectsPage.jsx";
import NewsletterPage from "./pages/main/NewsletterPage.jsx";
import DownloadsPage from "./pages/main/DownloadsPage.jsx";
import TendersPage from "./pages/main/TendersPage.jsx";
import AwardsPage from "./pages/main/AwardsPage.jsx";
import GalleryPage from "./pages/main/GalleryPage.jsx";
import RtiPage from "./pages/main/RtiPage.jsx";
import CareersPage from "./pages/main/CareersPage.jsx";
import TnGisPage from "./pages/main/TnGisPage.jsx";
import AboutPages from "./pages/main/MainAboutPage.jsx";
import ContactPages from "./pages/main/ContactPage.jsx";
import CscPage from "./pages/main/Cse.jsx";
import AdminAddData from "./pages/AdminAddData.jsx";
import TenderAdminPage from "./pages/TenderAdminPage.jsx";
import ProjectAdminPage from "./pages/ProjectAdminPage.jsx";
import NewsAdminPage from "./pages/NewsAdminPage.jsx";
import GalleryUploadPage from "./pages/GalleryUploadPage.jsx";
import CareerAdminPage from "./pages/CareerAdminPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* ⭐ Default Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Public Pages */}
          <Route path="/portal" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/esevai" element={<EsevaiPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Protected Route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/dashboard/data" element={<AdminAddData/>}/>
          <Route path="admin/dashboard/tenders" element={<TenderAdminPage/>}/>
          <Route path="admin/dashboard/project" element={<ProjectAdminPage/>}/>
          <Route path="admin/dashboard/news" element={<NewsAdminPage/>}/>
          <Route path="admin/dashboard/gallery" element={<GalleryUploadPage/>}/>
          <Route path="admin/dashboard/career" element={<CareerAdminPage/>}/>

          {/* User Protected Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Apply Page Protected */}
          <Route
            path="/apply/:certId"
            element={
              <ProtectedRoute role="user">
                <ApplyPage />
              </ProtectedRoute>
            }
          />

          <Route path="/apply/scheme/:schemeName" element={<ApplyPage />} />

          {/* Certificates */}
          <Route
            path="/certificates"
            element={
              <ProtectedRoute role="user">
                <CertificatesPage />
              </ProtectedRoute>
            }
          />

          {/* Schemes */}
          <Route
            path="/schemes"
            element={
              <ProtectedRoute role="user">
                <SchemesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/mainAbout" element={<AboutPages />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/tenders" element={<TendersPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/rti" element={<RtiPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/tngis" element={<TnGisPage />} />
          <Route path="/mainContact" element={<ContactPages />} />
          <Route path="/csc" element={<CscPage />} />



        </Routes>
      </BrowserRouter>

      {/* 👇 Chatbot always visible on all pages */}
      <ChatBot />
    </>
  );
}

export default App;
