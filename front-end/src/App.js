import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PrivateComp from './components/PrivateComp';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import  {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComp/>}>
          <Route path="/" element ={<ProductList/>}/>
          <Route path="/add" element ={<AddProduct/>}/>
          <Route path="/update/:id" element ={<UpdateProduct/>}/>
          <Route path="/logout" element ={<h1>ke</h1>}/>
          <Route path="/profile" element ={<h1>ke</h1>}/>
        </Route>
        <Route path="/signup" element ={<SignUp/>}/>
        <Route path="/login" element ={<Login/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
