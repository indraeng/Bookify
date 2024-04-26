import { Routes, Route } from 'react-router-dom';

//pages
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';

//css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/Login';

//components
import MyNavBar from './components/Navbar';
import ListingPage from './pages/List';
import BookDetailPage from './pages/Detail';
import OrdersPage from './pages/ViewOrder';
import ViewOrderDetails from './pages/ViewOrderDetails';


function App() {
  return (
    <div className="App">
      <MyNavBar />
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/book/list' element={<ListingPage />} />
          <Route path='/book/view/:bookId' element={<BookDetailPage />} />
          <Route path='/book/orders' element={<OrdersPage />} />
          <Route path='/book/orders/:bookId' element={<ViewOrderDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
