
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.css';
import AboutUs from './Component/aboutUs/AboutUs';
import AdminDashboard from './Component/admin/AdminDashboard';
import CreateCategory from './Component/admin/category/CreateCategory';
import DeleteCategory from './Component/admin/category/DeleteCategory';
import ManageCategory from './Component/admin/category/ManageCategory';
import UpdateCategory from './Component/admin/category/UpdateCategory';
import CreateProduct from './Component/admin/product/CreateProduct';
import DeleteProduct from './Component/admin/product/DeleteProduct';
import ManageProduct from './Component/admin/product/ManageProduct';
import UpdateProduct from './Component/admin/product/UpdateProduct';
import Login from './Component/auth/Login';
import Signup from './Component/auth/Signup';
import Category from './Component/category/Category';
import Header from './Component/Header';
import Home from './Component/home/Home';
import Product from './Component/product/Product';
import TechNova from './Component/TechNova';
import Userdashboard from './Component/user/Userdashboard';
import Footer from './Component/Footer';
import { CartContext, AuthContext } from './Component/context/CartContext';
import Cart from './Component/cart/Cart';
import CartNew from './Component/cart/CartNew';
import Index from './Component/admin/Index';
import PrivateRoute from './Component/hoc/PrivateRoute';
import TrackOrder from './Component/user/TrackOrder';

function App() {
  const [cartItems, setCartItems] = React.useState([]);
  const [user, setUser] = React.useState("");

  const storageChange = (storageEvent) => {
    console.log(storageEvent.key)
    // if (storageEvent.key === "user") {
    //   const user = JSON.parse(storageEvent.newValue);
    //   setUser(user);
    //   setIsUser(true);
    // }
  }



  useEffect(() => {
    window.addEventListener("storage", e => storageChange(e));
    return () => {
      window.removeEventListener('storage', e => storageChange(e));
    };
  })






  // setCartItems(prevValue => [...prevValue, item]);





  return (

    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <CartContext.Provider value={{ cartItems, setCartItems }}>
              <div className="app-route">


                <Route exact path="/" component={Home}></Route>

                <PrivateRoute path="/product" exact component={Product}></PrivateRoute>
                <Route exact path="/aboutus" component={AboutUs}></Route>
                {/* <Route exact path="/cart" ><Cart /></Route> */}
                <Route exact path="/order/:progress" component={TrackOrder}></Route>
                <Route exact path="/cart" component={CartNew}></Route>
                <Route exact path="/category" component={Category}></Route>
                <Route exact path="/user/order" component={Userdashboard}></Route>
                <Route exact path="/admin/dashboard" component={Index}></Route>
                <Route exact path="/createCategory" component={CreateCategory}></Route>
                <Route exact path="/manageCategory" component={ManageCategory}></Route>
                <Route exact path="/cateUpdate/:catId" component={UpdateCategory}></Route>
                <Route exact path="/cateDelete/:catId" component={DeleteCategory}></Route>
                <Route exact path="/createProduct" component={CreateProduct}></Route>
                <Route exact path="/manageProduct" component={ManageProduct}></Route>
                <Route exact path="/productUpdate/:proId" component={UpdateProduct}></Route>
                <Route exact path="/productDelete/:proId" component={DeleteProduct}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/login" component={Login}></Route>
              </div>
            </CartContext.Provider>
          </Switch>
          <Footer />
        </BrowserRouter>

      </AuthContext.Provider>

      {/* <input type='text' onChange={(e) => setUser(e.target.value)} />
      <TechNova value={user}></TechNova> */}

    </div >
  );
}

export default App;
