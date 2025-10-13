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

          <Route path="/admin/localrealestate/propertyK28fR7tL8vM4yQ0aH1zN6wS3xP5eJ9cD2uB7gT1A5nV3pL6rC8mF9qZ2sY4jX0dK7bW1hE5tG9lR3oM8vN2uP6yQ4zT1aR9cF7" element={<Admin />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
