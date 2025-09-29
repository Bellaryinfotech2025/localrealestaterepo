import React from "react" 
import Lrecustomerselection from "./maincomponent/lrecustomerselection"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import LandingPage from "./landingpagecomponent/landingpage";
 import RegistrationForm from "./credentialscomponent/register";
 import LoginForm from "./credentialscomponent/login";
function App() {
  

  return (
    <>
       <Router>
      <Routes>

        
                <Route path="/" element={
                  <>
                  <LandingPage/>

                          </>
                        }
                    />

<Route path="/register"  element={
<>
<RegistrationForm/>

</>
}
/>

<Route path="/login" 
element={
<>
<LoginForm/>

</>
}
/>



 

         <Route
          path="/localrealestate"
          element={
            <>

             <Lrecustomerselection/>
               
            </>
          }
        />


      </Routes>
    </Router>
    </>
  )
}

export default App
