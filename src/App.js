import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from './Components/pages/AboutPage/AboutPage'
import HomePage from './Components/pages/HomePage/HomePage';
import "./App.css";
import LoginPage from './Components/pages/LoginPage/LoginPage';
import SignupPage from './Components/pages/SignupPage/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />

      </Routes>
    </Router>
  );
}

export default App;