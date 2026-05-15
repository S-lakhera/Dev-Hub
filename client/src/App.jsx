import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/local/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<h1>Home Feed (Work in Progress)</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;