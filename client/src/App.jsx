import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ComparisonToolPage from './pages/ComparisonToolPage';
import CareerTestPage from './pages/CareerTestPage';
import AllPathways from './pages/AllPathways';
import { Toaster } from 'sonner';
import PathwayDetails from './pages/PathwayDetails';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import AllResources from './pages/AllResources';
import ResourceDetails from './pages/ResourceDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';
import AdminHome from './pages/admin/AdminHome';
import AdminDashboard from './pages/admin/AdminDashboard'
import Roadmap from './pages/roadmap/RoadMap';


const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/my-dashboard");
  const isAboutPage = location.pathname.startsWith("/about");
  const isComparisonTool = location.pathname.startsWith("/comparison-tool-page");
  
  const isCartPaymentPage = location.pathname === "/cart/payment";
  const isAdminPage = location.pathname.startsWith("/admin");

  const isRoadMapPage = location.pathname === "/career";
  

  return (
    <>
      {!isDashboard && !isAboutPage && !isComparisonTool && !isCartPaymentPage && !isAdminPage && !isRoadMapPage && <Navbar />}
      <Toaster richColors position="top-center" />
      <ScrollToTopButton />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/comparison-tool-page' element={<ComparisonToolPage />} />
        <Route path='/career-test' element={<CareerTestPage />} />
        <Route path='/pathways' element={<AllPathways />} />
        <Route path='/resources' element={<AllResources />} />
        <Route path='/resources/:resourceId' element={<ResourceDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart/:payment' element={<Payment />} />
        <Route path='/my-dashboard' element={<Dashboard />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='admin/:dashboard' element={<AdminDashboard />} />
        <Route path='career' element={<Roadmap />} />
        <Route 
          path='/pathways/:pathwayId' 
          element={
            <ErrorBoundary fallback={<div className="text-white p-4">Error loading pathway details</div>}>
              <PathwayDetails />
            </ErrorBoundary>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPage && !isDashboard && !isCartPaymentPage && !isRoadMapPage && <Footer />}
    </>
  );
};

export default App;
