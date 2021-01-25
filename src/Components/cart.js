import React, { Component } from 'react';
import service from './service'
import HeaderComponent from './HeaderComponent';
import Alerts from './Alerts';
class cart extends Component{



    constructor(props)
    {
        super();
        this.state={
            prices:[],
            subtotal:0,
            tax:0,
            cartItemCount:0,
            cartItems:[]
        }
        this.removeItemFromCart=this.removeItemFromCart.bind(this);
    }
    componentDidMount()
    {
        // service.retrievePrices()
        // .then(
        //     response=>
        //     {
        //          console.log(response);
        //         this.setState({prices:response.data.prices})
        //     }
        // )

         service.retrievCartItems()
        .then(
            response=>
            {
                console.log("cart Items"+response);
                this.setState({cartItems:response.data});
                this.setState({cartItemCount:response.data.length})
                for(var i=0;i<response.data.length;i++)
                    {
                        this.setState({subtotal: this.state.subtotal +  response.data[i].price*response.data[i].quantity});
                    }
                
            }
        )

       
    }
    

    
    //Removes Cart Item from jsonbox
    async removeItemFromCart(id,price,quantity)
    {
        document.getElementById(id).hidden= true;
        Alerts.notifyRemove();
        this.setState({subtotal:this.state.subtotal-price*quantity});
        this.setState({cartItemCount:this.state.cartItemCount-1});
        await service.removeItemFromCart(id);
        
        
    }
    async handleCartQunatityChange(cartItem,number)
    {
        
     await service.updateCartItemQuantity(cartItem._id,cartItem.skuId,cartItem.name,cartItem.price,cartItem.quantity+number);
     document.getElementById(cartItem._id.concat(cartItem.name)).value= parseInt(document.getElementById(cartItem._id.concat(cartItem.name)).value)+number;
     
     var i;
     for(i=0;i<this.state.cartItems.length;i++)
     {
        if(cartItem._id === this.state.cartItems[i]._id)
        {
            this.state.cartItems[i].quantity += number;
            if(this.state.cartItems[i].quantity ===0)
            {
               this.removeItemFromCart(this.state.cartItems[i]._id,this.state.cartItems[i].price,this.state.cartItems[i].quantity);
            }
            document.getElementById(cartItem._id.concat(cartItem.price)).innerHTML= (this.state.cartItems[i].quantity*this.state.cartItems[i].price).toFixed(3);
           // this.setState({subtotal: this.state.subtotal + (cartItem.price*number)});//cart-subtotal
           document.getElementById("cart-subtotal").innerHTML = (parseFloat(document.getElementById("cart-subtotal").innerHTML) + (cartItem.price*number)).toFixed(3);
           document.getElementById("cart-tax").innerHTML = (parseFloat(document.getElementById("cart-subtotal").innerHTML) *0.05).toFixed(3) ;
           document.getElementById("cart-total").innerHTML = (parseFloat(document.getElementById("cart-subtotal").innerHTML) *1.05).toFixed(3);

            break; 
        }
     }
    
    }

    handleCheckout()
    {
        service.addItemForProvisioning();
        this.setState({cartItems :[]});
        this.setState({cartItemCount:0});
        document.getElementById("cart-subtotal").innerHTML = 0.000;
        document.getElementById("cart-tax").innerHTML = 0.000;
        document.getElementById("cart-total").innerHTML = 0.000;

    }
   
    render()
    {
        return(
            <div>
           
     <HeaderComponent cartItemCount={this.state.cartItemCount}/> 
     
        
           
    <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Cart</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="shopping-cart">

                                                <div className="column-labels">
                                                    <label className="product-image">Name</label>
                                                    <label className="product-price">Price/hr</label>
                                                    <label className="product-quantity">Quantity</label>
                                                    <label className="product-removal">Action</label>
                                                    <label className="product-line-price">Total</label>
                                                </div>

                                                {
                                                this.state.cartItems.map(
												cartItem=>
                                                <div className="product" id={cartItem._id}>
                                                    <div className="product-details">
                                                        <div className="product-title">{cartItem.name}</div>
                                                    </div>
                                                    <div className="product-price">{cartItem.price.toFixed(3)}</div>
                                                    <div className="product-quantity">
                                                        {/* <input type="number" value={cartItem.quantity} min="1"/> */}
                                                        <span class="minus" onClick={()=>this.handleCartQunatityChange(cartItem,-1)}>-</span>
                                                        <input id={cartItem._id+cartItem.name} type="text" class="counter-value" value={cartItem.quantity} min="1" />
                                                        <span class="plus" onClick={()=>this.handleCartQunatityChange(cartItem,+1)}>+</span>
                                                    </div>
                                                    <div className="product-removal">
                                                        <button className="remove-product" onClick={()=>this.removeItemFromCart(cartItem._id,cartItem.price,cartItem.quantity)}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <div className="product-line-price" id={cartItem._id+cartItem.price}>{(cartItem.price*cartItem.quantity).toFixed(3)}</div>
                                                </div>
                                                
                                                )
                                            }

                                                <div className="totals">
                                                    <div className="totals-item">
                                                        <label>Subtotal</label>
                                                        <div className="totals-value" id="cart-subtotal">{this.state.subtotal.toFixed(3)}</div>
                                                    </div>
                                                    <div className="totals-item">
                                                        <label>Tax (5%)</label>
                                                        <div className="totals-value" id="cart-tax">{(0.05 * this.state.subtotal).toFixed(3)}</div>
                                                    </div>
                                                    <div className="totals-item totals-item-total">
                                                        <b> <label>Grand Total</label>
                                                            <div className="totals-value" id="cart-total">{(this.state.subtotal * 1.05).toFixed(3)}</div> </b>
                                                        </div>
                                                    </div>

                                                    <button className="checkout" onClick={()=>this.handleCheckout()}>Checkout</button>
                                                    {/* <button type="button" className="btn btn-morpheus md-trigger" data-modal="modal-create-pricing-plan" name="create-plan"><i className="icons feather icon-plus-circle f-14"></i>CREATE PRICING PLAN</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Modals start --> */}
        {/* <div className="md-modal md-effect-11" id="modal-create-pricing-plan">
            <div className="md-content">
                <h5 className="theme-dark">New Pricing Plan <button type="button" className="close md-close"><span aria-hidden="true">×</span></button> </h5>
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="form-group row">
                                <label for="inputPlanName" className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9">
                                    <input type="name" className="form-control form-control-sm" id="inputPlanName" placeholder="Name"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="exampleFormControlSelect1" className="col-sm-3 col-form-label">Provision Type</label>
                                <div className="col-sm-9">
                                    <select className="form-control form-control-sm" id="exampleFormControlSelect1">
                                        <option>Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="inputPlanStorage" className="col-sm-3 col-form-label">Storage</label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control form-control-sm" id="inputPlanStorage" min="0" value="0"/>
                                    <select className="form-control form-control-sm" id="exampleFormControlSelect1">
                                        <option>Select</option>
                                        <option>MB</option>
                                        <option>GB</option>                                    
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="inputPlanMemory" className="col-sm-3 col-form-label">Memory</label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control form-control-sm" id="inputPlanMemory" min="0" value="0"/>
                                    <select className="form-control form-control-sm" id="exampleFormControlSelect1">
                                        <option>Select</option>
                                        <option>MB</option>
                                        <option>GB</option>                                    
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="inputPlanName" className="col-sm-3 col-form-label">Status</label>
                                <div className="col-sm-9">
                                    <div className="switch switch-primary d-inline m-r-10">
                                        <input type="checkbox" id="switch-1" checked/>
                                        <label for="switch-1" className="cr"></label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="md-overlay"></div>
    </div>
)
}
}
export default cart