import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About  from "./pages/About";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Dashboard' element={<Dashboard />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/Gallery' element={<Gallery />}/>
          <Route path='/Blog' element={<Blog />}/>
          <Route path='/About' element={<About />}/>          
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
};

export default App;
