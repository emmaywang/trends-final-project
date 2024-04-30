import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react'

import "./index.css";
import Homepage from "./components/Homepage.tsx"
import { Recipes } from "./data.ts";
/*import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";*/
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
//import "./styles.css";


// Components
import Navbar from "./components/Navbar";
import Create from "./components/Create.tsx";
import Update from "./components/Update.tsx";
import Login from "./components/Login.tsx";

import AuthUserProvider from './auth/AuthUserProvider';



ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        
        <ChakraProvider>
            <AuthUserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                        <Route index element={<Homepage />} />
                        <Route path="home" element={<Homepage />} />
                        <Route path="create" element={<Create />} />
                        <Route path="update" element={<Update />} />
                        <Route path="login" element={<Login />} />
                        </Route>
                    </Routes>
            </Router>
        </AuthUserProvider>
    </ChakraProvider>
    </React.StrictMode>
);

//<Homepage  data={Recipes}/>

/*<Router>
            <Navbar />
            <Route path="/home" element={<Homepage data={Recipes} />} />
            <Route path="/create" element={<Create />} />
        </Router>/*


/*import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
//import "./styles.css";
import { Recipes } from "./data.ts";

// Components
import Navbar from "./components/Navbar";

// import Footer from './components/Footer';
import Homepage from "./components/Homepage";
import Create from "./components/Create";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route path="/home" element={<Homepage  data={Recipes} />} />
        <Route path="/create" element={<Create />} />
        
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Router>
        <Navbar />
        <Route path="/home" element={<Homepage data={Recipes} />} />
        <Route path="/create" element={<Create />} />
      </Router>
    </React.StrictMode>
  );*/