
import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage.js';
import LoginForm from './components/LoginForm.jsx';

function App() {
  return (
    <div className='App'>
    <ToastContainer/>
    <BrowserRouter>   
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<LoginForm/>}/>
     

     </Routes>   
    </BrowserRouter>
    </div>
  );
}

export default App;
