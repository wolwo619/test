import './App.css'
import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import billing from './Components/billing'
import HomeComponent from './Components/home'
import billingCards from './Components/billing_cards'
import cart from './Components/cart'
import invoice from './Components/invoice'
import { ToastContainer, toast } from 'react-toastify';

// import HeaderComponent from './Components/HeaderComponent'
// import './bootstrap.css'
class App extends Component {
    
  render() {
      
    return (
    <div>
      <Router>
        <Switch>  
            <Route path="/" exact component={HomeComponent}/>
            <Route path="/billing" component={billing}/>        
            <Route path="/billingcards" component={billingCards}/>        
            <Route path="/cart" component={cart}/>        
            <Route path="/invoice" component={invoice}/>
          </Switch>
          
      </Router> 
        <ToastContainer/>
        
    </div> 
    );
  }
  
}

export default App;
