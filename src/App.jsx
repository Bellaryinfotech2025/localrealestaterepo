import React from "react"
import Lrecustomerselection from "./maincomponent/lrecustomerselection"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landingpagecomponent/landingpage";
import RegistrationForm from "./credentialscomponent/register";
import LoginForm from "./credentialscomponent/login";
import Footer from "./footercomponent/Footer";
import FeatureSection from "./feauturescomponent/Feature";
function App() {


  return (
    <>
      <Router>
        <Routes>


          {/* <Route path="/" element={
                  <>
                  <LandingPage/>

                          </>
                        }
                    /> */}

          <Route path="/register" element={
            <>
              <RegistrationForm />

            </>
          }
          />

          <Route path="/login"
            element={
              <>
                <LoginForm />

              </>
            }
          />





          <Route
            path="/"
            element={
              <>
                <LandingPage />





                <Lrecustomerselection />


                < FeatureSection />


                < Footer />

              </>
            }
          />


        </Routes>
      </Router>
    </>
  )
}

export default App
