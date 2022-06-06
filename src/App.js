import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import useStyles from './components/Store/Cart/styles';
import React, { useState, useEffect } from 'react';
import { commerce } from './components/lib/commerce';
import { Products, Cart, Checkout, Favorites, ProductById, ModifyProduct } from './components';
import { About, Contact, Footer, Nav, Forgot, Login, Register, Reset, CreateEmployee, ModifyEmployee, EmployeeRegister, Profile, FAQ, Orders, AdminProducts, AdminOrders, AdminLanding } from './components';
import { userInfo, updateFavorites, changeProductPrice, getOrders, getOrdersWithParams, updateUser } from './components/utilites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage/Homepage'
import './components/App.css';



const App = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [favorites, setFavorites] = useState([]);

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
    }

    const fetchUser = async () => {
      if(!products || products.length === 0) return;
      let initialFavorites = [];
      // console.log('products are\n' + products);
      await userInfo()
      .then(async (user)=>{
        // console.log(user)
        setUser(user);
        user.favorites.forEach(favorite => {
          const matchingProduct = (products.filter(product => product['id'] === favorite.item_id))
          if(matchingProduct.length > 0) 
            initialFavorites.push(matchingProduct[0]);
        });
      // console.log('initialFavorites are\n' + initialFavorites);

      })

      setFavorites(initialFavorites);
    }

    const handleAddToFavorites = async (productId) => { 
      const matchingItems = favorites.filter( favorite => favorite['id'] === productId );
      let updatedFavorites = favorites
      if(matchingItems.length > 0){
        updatedFavorites = updatedFavorites.filter( favorite => favorite['id'] !== productId );
      }
      else{
          const matchingProduct = products.filter(product => product.id === productId) 
          // console.log(matchingProduct)
          updatedFavorites.push(matchingProduct[0]);
      }
      setFavorites(updatedFavorites);
      updateFavorites(productId);
      return updatedFavorites;
    }

    const handleAddToCart = async (productId, quantity) => {
      const item = await commerce.cart.add(productId, quantity);

      setCart(item.cart);
    };

    const handleUpdateCartQty = async (lineItemId, quantity) => {
      const response = await commerce.cart.update(lineItemId, { quantity });

      setCart(response.cart);
    };

    const handleRemoveFromCart = async (lineItemId) => {
      const response = await commerce.cart.remove(lineItemId);

      setCart(response.cart);
    };

    const handleEmptyCart = async () => {
      const response = await commerce.cart.empty();

      setCart(response.cart);
    };

    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();

      setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

        setOrder(incomingOrder);

        refreshCart();

      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    useEffect(()=>{
      fetchUser();
    }, [products])

    const classes = useStyles();

    return (
      <Router>
        <div className="App">
          <div className="main-container">
          <Nav totalItems= {cart.total_items}
          user={user} products={products}/>
          <Routes>
            <Route exact path="/" element= {<Homepage/>}/>
            <Route path="/cart" element=
            {<Cart cart={cart}
            products={products} 
            user={user}
            favorites={favorites}
            handleUpdateCartQty={handleUpdateCartQty} 
            handleRemoveFromCart={handleRemoveFromCart} 
            handleEmptyCart={handleEmptyCart}
            handleAddToFavorites={handleAddToFavorites}/>} 
            />
            <Route exact path="/checkout" element={<Checkout 
            cart={cart} 
            order={order} 
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
            user={user}/>}
            
            />
            <Route exact path="/store" element=
            {
            <>
            <h1 className={classes.title}>Store</h1>
            <Products products={products}
            user={user}
            favorites={favorites}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}/>
            </>
            }
            />
            <Route exact path="/product" element=
            {
            <>
            <ProductById commerce={commerce}
            products={products}
            user={user}
            favorites={favorites}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}/>
            </>
            }
            />
            <Route exact path="/modify-product" 
            element={<> <ModifyProduct commerce={commerce} products={products} user={user} refreshProducts={fetchProducts} changePrice={changeProductPrice}/> </>}/>
            <Route exact path="/favorites" element=
            {<Favorites favorites={favorites}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}/>}
            />
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot" element={<Forgot/>}/>
            <Route path="/reset" element={<Reset/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/profile" element={<Profile user={user} getOrdersWithParams={getOrdersWithParams} isOrderById={false} updateUser={updateUser} setUser={setUser}/>}/>
            <Route path="/orders" element={<Orders user={user} getOrdersWithParams={getOrdersWithParams} isOrderById={false}/>}/>
            <Route path="/order" element={<Orders user={user} getOrdersWithParams={getOrdersWithParams} isOrderById={true}/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            {/*vvv Admin pages vvv*/}
            <Route path="/admin" element={<AdminLanding/>}/>
            <Route path="/admin/create-employee" element={<CreateEmployee/>}/>
            <Route path="/admin/modify-employee" element={<ModifyEmployee/>}/>
            <Route path="/admin/orders" element={<AdminOrders user={user} getOrders={getOrders}/>}/>
            <Route exact path="/admin/store" element= {<><h1 className={classes.title}>Store</h1> <AdminProducts products={products} user={user}
            favorites={favorites} onAddToCart={handleAddToCart} onAddToFavorites={handleAddToFavorites}/> </>} />
            <Route path="/validate/employee" element={<EmployeeRegister/>}/>
          </Routes>
          </div>
          <Footer/>
        </div>
      </Router>
    );

}

export default App;
