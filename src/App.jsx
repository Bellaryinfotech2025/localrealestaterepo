import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbarcomponent/Navbar"
import LandingPage from "./landingpagecomponent/landingpage";
import Lrecustomerselection from "./maincomponent/Lrecustomerselection";
import Feature from "./feauturescomponent/Feature"
import Footer from "./footercomponent/Footer"
import Admin from "./admincomponent/Admin";
function App() {



  return (
    <>
      <Router>
        <Routes>

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <LandingPage />

                <Lrecustomerselection />
                <Feature />
                <Footer />



              </>
            }
          />


          <Route path="/admin" element={<Admin />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
