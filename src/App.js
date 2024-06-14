
import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage.js';

function App() {
  return (
    <div className='App'>
    <ToastContainer/>
    <BrowserRouter>   
     <Routes>
     <Route path='/' element={<Home/>}/>
     

     </Routes>   
    </BrowserRouter>
    </div>
  );
}

export default App;
