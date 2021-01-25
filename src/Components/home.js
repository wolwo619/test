import service from './service'
import React, { Component } from 'react';
import '../App.css'
import $ from 'jquery';
import HeaderComponent from './HeaderComponent'
import Provisioning from './Provisioning'
import Monitoring from './Monitoring';
import Scheduling from './Scheduling';
import Operations from './Operations';
import Resolve from './Resolve'
import Invoicing from './Invoicing';
import Reports from './Reports';
import Pricing_Catalogue from './Pricing_Catalogue';
import Thoughts from './Thoughts';
import Chat from './Chat';
class home extends Component {
    constructor(props)
    {
        super();
        this.state={
            regions:[],
            cartItemCount:0,
            prices:[]
        }
    }

componentDidMount(){
   $('.imgContent').hide();
        $('.dataToggle').click(function() {
            $('.imgContent').hide();
            $("#" + $(this).data("img")).show();
        });

        service.retrievCartItems()
        .then(
            response=>
            {
                this.setState({cartItemCount:response.data.length})
            }
        )
    
}

handleCartItem = (itemCount) => {
    this.setState({cartItemCount: itemCount});
}




render() {
    
return (
  <div>
     {/* <nav className="pcoded-navbar theme-horizontal">
        <div className="navbar-wrapper">
            <div className="navbar-brand header-logo">
                <Link to='/'> <a className="b-brand">
                   <img className="img-responsive" alt="logo" src="assets/images/tcs_white.png"/>
                </a> </Link>
            </div>
            <ul class="navbar-nav mr-auto add-to-cart">
                <li><Link to='/cart'><a class="displayChatbox"><i class="icon feather icon-shopping-cart"></i><div class="live-status">2</div></a></Link></li>
            </ul>
        </div>
    </nav> */}

    <HeaderComponent cartItemCount={this.state.cartItemCount}/>

    {/*<!-- Widgets start --> */}
    <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="pills-billing-tab" data-toggle="pill" href="#pills-billing" role="tab" aria-controls="pills-billing" aria-selected="true">Pricing Catalogue</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">Provisioning</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-shcedule-tab" data-toggle="pill" href="#pills-schedule" role="tab" aria-controls="pills-schedule" aria-selected="false">Scheduling</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-ticket-tab" data-toggle="pill" href="#pills-ticket" role="tab" aria-controls="pills-ticket" aria-selected="false">Operations</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Monitor</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Resolve</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-invoice-tab" data-toggle="pill" href="#pills-invoice" role="tab" aria-controls="pills-invoice" aria-selected="false">Invoicing</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-reports-tab" data-toggle="pill" href="#pills-reports" role="tab" aria-controls="pills-reports" aria-selected="false">Reports</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-thoughts-tab" data-toggle="pill" href="#pills-thoughts" role="tab" aria-controls="pills-thoughts" aria-selected="false">Chat</a>
                                        </li>
                                    </ul>
                                     <div className="tab-content" id="pills-tabContent">

                                        <Pricing_Catalogue onItemAddToCart={this.handleCartItem}/>
                                        <Provisioning/>
                                        <Scheduling/>
                                        <Monitoring/>
                                        <Operations/>
                                        <Resolve/>
                                        <Invoicing/>
                                        <Reports/>
                                        <Chat/>
                                        
                                  


                                   

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
  
);
  }
  
}

export default home;
