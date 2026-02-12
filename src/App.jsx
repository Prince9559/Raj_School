import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./component/Navbar";
const Admin = lazy(() => import("./pages/Admin"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Home = lazy(() => import("./pages/Home"));
const MandatoryDis = lazy(() => import("./pages/MandatoryDis"));
// const AdForm = lazy(() => import("./pages/AdForm"));
const NewAdForm = lazy(() => import("./pages/admRegForm/testing"));
import Footer from "./component/Footer";
import { Toaster } from "react-hot-toast";
import NewAdmission from "./pages/admRegForm/testing";
const Qr = lazy(()=> import("./pages/Qr"))

const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Tc = lazy(() => import("./pages/Tc"));
const Preview = lazy(() => import("./pages/Preview"));
// const Testing = lazy(() => import("./pages/testing"));

// import Banner from  "./pages/Banner";

function App() {
  return (
  <BrowserRouter>
     <main className="min-h-[32rem] ex:w-full overflow-x-hidden">
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<>...Loading</>}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/mand-disclosure"
            element={
              <Suspense fallback={<>...Loading</>}>
                <MandatoryDis />
              </Suspense>
            }
          />
          <Route
            path="/gallery"
            element={
              <Suspense fallback={<>...Loading</>}>
                <Gallery />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<>...Loading</>}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/admission"
            element={
              <Suspense fallback={<>...Loading</>}>
                <NewAdmission />
              </Suspense>
            }
          />
          <Route
            path="/about-us"
            element={
              <Suspense fallback={<>...Loading</>}>
                <About />
              </Suspense>
            }
          />
          {/* <Route
            path="/banner"
            element={
            
                <Banner />
             
            }
          /> */}
          <Route
            path="/tc"
            element={
              <Suspense fallback={<>...Loading</>}>
                <Tc />
              </Suspense>
            }
          />

          <Route
            path="/admin"
            element={
              <Suspense fallback={<>...Loading</>}>
                <Admin />
              </Suspense>
            }
          />
          <Route
            path="/preview"
            element={
              <Suspense fallback={<>...Loading</>}>
                <Preview />
              </Suspense>
            }
          />
          <Route
            path="/qr"
            element={
              <Suspense fallback={<>...Loading</>}>
                <Qr />
              </Suspense>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
