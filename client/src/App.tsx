import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddProduct from './components/AddProduct';
import Compare from './pages/Compare';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
}, []);

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/addproducts" element={<PrivateRoute element={<AddProduct />} isAuthenticated={isAuthenticated} />} />
        <Route path="/" element={<Compare />} />
      </Routes>
    </Router>
  );
}

export default App;
