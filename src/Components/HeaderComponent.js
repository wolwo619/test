import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

class HeaderComponent extends Component {
    constructor(props)
    {
        super();
        this.state={  
            cartItemsCount:0
        }
    }
    componentDidMount()
    {
        // service.retrievCartItems()
        // .then(
        //     response=>
        //     {
        //         console.log("cart Items"+response);
        //         this.setState({cartItemsCount:response.data.length})
                
                
        //     }
        // )
    }
    
    render() {
       // console.log("hey how are you"+this.props.cartItemCount);
        return (
 <nav className="pcoded-navbar theme-horizontal">
        <div className="navbar-wrapper">
            <div className="navbar-brand header-logo">
                <Link to='/'> <a className="b-brand">
                   <img className="img-responsive" alt="logo" src="assets/images/tcs_white.png"/>
                </a> </Link>
            </div>
            <ul class="navbar-nav mr-auto add-to-cart">
                <li><Link to='/cart'><a class="displayChatbox"><i class="icon feather icon-shopping-cart"></i><div class="live-status" id="cart-item-count">{this.props.cartItemCount}</div></a></Link></li>
            </ul>
        </div>
    </nav>
       
        )
    }
}
export default withRouter(HeaderComponent);