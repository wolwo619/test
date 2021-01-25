import React, { Component } from 'react';
import service from './service'
import Alerts from './Alerts'


class Pricing_Catalogue extends Component{
    constructor(props)
    {
        super();
        this.state={
            region:'',
            prices:[],
            AzurePrices:[],
            cartItemCount:0,
            items:[],
            itemsToBeAddedToCart:[]
        }
        this.updateRegion = this.updateRegion.bind(this);

    }
    

componentDidMount(){
   
    // service.retrievePrices()
    // .then(
    //     response=>
    //     {
    //         // console.log(response);
    //         this.setState({prices:response.data.prices})
    //     }
    // )
    service.retrieveAWsPrices()
    .then(
        response =>
        {
            //console.log(JSON.stringify(response.config));
            
        }
    )

    // service.retrieveAzurePrices()
    // .then(
    //     response =>
    //     {
    //         console.log(response.data.Items);
    //         //console.log(response.data.Items.location);
    //         //this.setState({AzurePrices:response.data.Items})
    //     }
    // )

    this.retrievCartItems();
    
    
}


async retrievCartItems()
{
    await service.retrievCartItems()
    .then(
        response=>
        {
            this.setState({items:response.data});
            this.setState({cartItemCount:response.data.length});
            console.log("cart Items are"+this.state.cartItemCount);
            
        }
    )   
}

handleCartItem = () => {
    this.props.onItemAddToCart(this.state.cartItemCount);            
}

async updateRegion(reg)
{
    this.setState({region:reg});
    //console.log("Region"+this.state.region);
    await service.retrieveAzurePrices(reg)
    .then(
        response=>
        {
            
            console.log(response.data.Items);
            this.setState({AzurePrices:response.data.Items})
        }
    )
}

//this methods adds items of cart in array
updateCartItem(item,value,productName,price)
{

    if(document.getElementById(item.concat(price)).value > 0 || value === 1)
    {

        if(value === 1)
        {
            document.getElementById(item.concat(price)).value= parseInt( document.getElementById(item.concat(price)).value) + value;

            if(this.state.itemsToBeAddedToCart.length>0)
            {
                var i;
                for ( i=0;i<this.state.itemsToBeAddedToCart.length;i++)
                {
                    console.log(this.state.itemsToBeAddedToCart[i][0]);
                    if(this.state.itemsToBeAddedToCart[i][0]===item && this.state.itemsToBeAddedToCart[i][2]=== price)
                    {
                        //qunatity increased
                        this.state.itemsToBeAddedToCart[i][3] += 1;
                        //console.log(this.state.itemsToBeAddedToCart[i][3]);
                        break;
                    }
                    else if(i === this.state.itemsToBeAddedToCart.length-1 || this.state.itemsToBeAddedToCart.length===0 ) 
                    {
                        //new item added
                        this.state.itemsToBeAddedToCart.push([item,productName,price,1]);
                       // console.log(this.state.itemsToBeAddedToCart);
                        break;
                    }
                }

            }

            else
            {
                this.state.itemsToBeAddedToCart.push([item,productName,price,1]);
                console.log(this.state.itemsToBeAddedToCart);
            }
            
        }
        else
        {
            document.getElementById(item.concat(price)).value= parseInt( document.getElementById(item.concat(price)).value) + value;
            var i;
                for ( i=0;i<this.state.itemsToBeAddedToCart.length;i++)
                {
                    if(this.state.itemsToBeAddedToCart[i][0]===item)
                    {
                        //qunatity decreased
                        this.state.itemsToBeAddedToCart[i][3] -= 1;
                        console.log(this.state.itemsToBeAddedToCart);
                    }
                    else
                    {
                        
                        //this.state.items.push([item,productName,price,1]);
                       
                        console.log(this.state.itemsToBeAddedToCart);
                    }
                }
        }

    }
    else
    {
        window.alert("Cart value can't be less than 0");
    }
}

//Adds cart items to jsonbox
async addcartItemsToDB()
{
    if(this.state.itemsToBeAddedToCart.length===0)
    {
        Alerts.notifyWarning();
    }
    else
    {
        var latestCartItemCount= await service.addItemToCart(this.state.itemsToBeAddedToCart)
        .then(
            Alerts.notifySuccess()
        );
        // console.log("whoa"+latestCartItemCount);
        this.setState({itemsToBeAddedToCart:[]});
        this.setState({cartItemCount:latestCartItemCount});
        this.handleCartItem();
    }
    
}


    render()
    {
        return(

                           
            <div className="tab-pane fade show active" id="pills-billing" role="tabpanel" aria-labelledby="pills-billing-tab">
            <div className="card User-Activity">
                <div className="card-header">
                    <h5>Pricing Catalogue</h5>
                </div>
                
                <div class="row pad-30-35 mb-30-none justify-content-center">
                    <div class="col-sm-10 col-md-6 col-lg-3">
                        <div class="dataToggle" data-img="one">
                        <div class="how-item-3 no-border shadow">
                            <div class="thumb">
                                <img class="aws-logo" src="assets/images/logo-aws.svg" alt="Aws logo"/>
                            </div>
                            <div class="content">
                                <h4 class="title">Aws Services</h4>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-10 col-md-6 col-lg-3">
                        <div class="dataToggle" data-img="two">
                            <div class="how-item-3 no-border shadow">
                                <div class="thumb">
                                    <img src="assets/images/Microsoft_Azure-Logo.png" alt="Azure logo"/>
                                </div>
                                <div class="content">
                                    <h4 class="title">Microsoft Azure</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-10 col-md-6 col-lg-3">
                        <div class="dataToggle" data-img="three">
                            <div class="how-item-3 no-border shadow">
                                <div class="thumb">
                                    <img src="assets/images/Google-Cloud.png" alt="Google cloud platform logo"/>
                                </div>
                                <div class="content">
                                    <h4 class="title">Google Cloud Platform</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-10 col-md-6 col-lg-3">
                        <div class="dataToggle" data-img="four">
                            <div class="how-item-3 no-border shadow">
                                <div class="thumb">
                                    <img src="assets/images/VMware-Logo.png" alt="VM Ware logo"/>
                                </div>
                                <div class="content">
                                    <h4 class="title">VM Ware</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="one" class="imgContent" style={{display:'none'}}>   
                    <div class="card-block pb-0">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>Select Region</option>
                                    <option>US East (N. Virginia) us-east-1</option>
                                    <option>US West (N. California) us-west-1</option>
                                    <option>US West (Oregon) us-west-2</option>
                                    <option>Asia Pacific (Mumbai) ap-south-1</option>
                                    <option>Asia Pacific (Hong Kong) ap-east-1</option>
                                    <option>Asia Pacific (Singapore) ap-southeast-1</option>
                                    <option>Europe (London) eu-west-2</option>
                                    <option>Middle East (Bahrain) me-south-1</option>
                                    <option>South America (São Paulo)sa-east-1</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 text-right">
                            <div class="main-search">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search . . ." />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 offset-md-2">
                            <button type="button" class="btn btn-morpheus md-trigger" data-modal="modal-create-pricing-plan" name="create-plan"><i class="icons feather icon-plus-circle f-14"></i>CREATE PRICING PLAN</button>
                        </div>


                    </div> 
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price/hr</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                    {
                                        this.state.prices.map(
                                            price=>
                                            <tbody>
                                            <tr key={price.currencyCode}>
                                                <td><h6 class="m-0">{price.retailPrice}</h6></td>
                                                <td><h6 class="m-0">{price.effectiveStartDate}</h6></td>
                                                <td>
                                                    {/* <input type="number" min="0" max="20" value="1" name="qtty"/> */}
                                                <div class="number">
                                                    <span class="minus">-</span>
                                                    <input type="text" class="counter-value" value="1"/>
                                                    <span class="plus">+</span>
                                                </div>
                                                </td>    
                                                <td><button type="button" class="btn btn-xs btn-dark m-t-10 notify-success">Add to cart</button></td>                                                
                                            </tr>
                                            </tbody>   
                    
                                        )
                                    }
                            </table>
                        </div>
                    </div>
                </div>
<div id="two" className="imgContent" style={{display:'none'}}>
<div class="pcoded-content">
<div class="pcoded-inner-content">
<div class="main-body">
<div class="page-wrapper">
<div class="card-block pb-0">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        {/* <select class="form-control" id="exampleFormControlSelect1">
                            <option value="">{price.location}</option>
                        </select> */}
                        <select class="form-control" onChange={(val)=>this.updateRegion(val.target.value)}>
                            <option>Select Region</option>
                            <option>UK South</option>
                            <option>US West</option>
                            <option>US North Central</option>
                            <option>BR South</option>
                            <option>US Central</option>
                            <option>CA Central</option>
                            <option>AU Southeast</option>
                            <option>US South Central</option>
                            <option>IN East</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3 text-right">
                    <div class="main-search">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search . . ." />
                        </div>
                    </div>
                </div>
                <tr class="offset-md-2">
                   <td style={{marginRight: 15 }}><button type="button" class="btn btn-morpheus md-trigger" data-modal="modal-create-pricing-plan" name="create-plan"><i class="icons feather icon-plus-circle f-14"></i>CREATE PRICING PLAN</button></td> 
                    <td><button type="button" class="btn btn-morpheus"  name="add-to-cart" onClick={()=>this.addcartItemsToDB()}><i class="icons feather icon-plus-circle f-14" ></i>Add to Cart</button></td>
                </tr>
               


            </div> <br/>
            <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price/hr</th>
                                        <th>Quantity</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                    {
                                        this.state.AzurePrices.map(
                                            price=>
                                            <tbody>
                                            <tr key={price.id} {...price} >
                                                <td><h6 class="m-0">{price.productName}</h6></td>
                                                <td><h6 class="m-0">{price.unitPrice}</h6></td>
                                                <td>
                                                    {/* <input type="number" min="0" max="20" value="1" name="qtty"/> */}
                                                <div class="number">
                                                    <span class="minus" onClick={()=>this.updateCartItem(price.skuId,-1,price.productName,price.unitPrice)}>-</span>
                                                    <input id={price.skuId+price.unitPrice} type="text" class="counter-value" value="0"/>
                                                    <span class="plus" onClick={()=>this.updateCartItem(price.skuId,1,price.productName,price.unitPrice)}>+</span>
                                                </div>
                                                </td>    
                                                {/* <td><button type="button" class="btn btn-xs btn-dark m-t-10 notify-success" onClick={() => this.updateCart(price.productName,)}>Add to cart</button></td>                                                 */}
                                            </tr>
                                            </tbody>   
                    
                                        )
                                    }
                            </table>
                        </div>
            {/* <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="pad-15-10 no-border box-shadow">
                        <div class="content">
                            <h6 class="title">Amazon - c4.2xlarge - EU (London) - Linux</h6>
                            <p>0.476 USD <small>per hour</small></p>
                            <button type="button" class="btn btn-morpheus">Add to cart</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="pad-15-10 no-border box-shadow">
                        <div class="content">
                            <h6 class="title">Amazon - c4.2xlarge - EU (London) - Linux</h6>
                            <p>0.476 USD <small>per hour</small></p>
                            <button type="button" class="btn btn-morpheus">Add to cart</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="pad-15-10 no-border box-shadow">
                        <div class="content">
                            <h6 class="title">Amazon - c4.2xlarge - EU (London) - Linux</h6>
                            <p>0.476 USD <small>per hour</small></p>
                            <button type="button" class="btn btn-morpheus">Add to cart</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="pad-15-10 no-border box-shadow">
                        <div class="content">
                            <h6 class="title">Amazon - c4.2xlarge - EU (London) - Linux</h6>
                            <p>0.476 USD <small>per hour</small></p>
                            <button type="button" class="btn btn-morpheus">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div> */}
            </div>
</div>
</div>
</div>

</div>
</div>
                <div id="three" className="imgContent" style={{display:'none'}}>Google Cloud Platform</div>
                <div id="four" className="imgContent" style={{display:'none'}}>VM Ware</div>
            </div>
        </div>
        )
    }
}
export default Pricing_Catalogue