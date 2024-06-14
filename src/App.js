
import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage.js';
import LoginForm from './components/LoginForm.jsx';
import UserProfile from './component/UserProfile.js';
import ManageNewsAdmin from './components/News2.js';

function App() {
  return (
    <div className='App'>
    <ToastContainer/>
    <BrowserRouter>   
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<LoginForm/>}/>
     <Route path='/user' element={<UserProfile/>}/>
     <Route path='/123' element={<ManageNewsAdmin/>}/>
     
     

     </Routes>   
    </BrowserRouter>
    </div>
  );
}

export default App;