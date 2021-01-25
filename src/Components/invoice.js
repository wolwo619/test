import React, { Component } from 'react';
import service from './service'
import HeaderComponent from './HeaderComponent';
class invoice extends Component{

    constructor(props)
    {
        super();
        this.state={
            prices:[]
        }
    }
    componentDidMount()
    {
        service.retrievePrices()
        .then(
            response=>
            {
                 console.log(response);
                this.setState({prices:response.data.prices})
            }
        )
    }
    render()
    {
        return(
            <div>
                <HeaderComponent/>
    <div class="pcoded-main-container">
        <div class="pcoded-wrapper">
            <div class="pcoded-content">
                <div class="pcoded-inner-content">
                    <div class="main-body">
                        <div class="page-wrapper">
                            <div class="row">
                                <div class="container" id="printTable">
                                    <div>
                                        <div class="card">
                                            <div class="card-block">
                                                <div class="row invoive-info">
                                                    <div class="col-md-4 col-xs-12 invoice-client-info">
                                                        <h6 class="m-0">Test Customer</h6>
                                                        <p class="m-0 m-t-10">1065 Mandan Road, Columbia MO, Missouri. (123)-65202</p>
                                                        <p class="m-0">(1234) - 567891</p>
                                                        <p><a class="text-secondary" href="mailto:demo@gmail.com" target="_top">demo@gmail.com</a></p>
                                                    </div>
                                                    <div class="col-md-8 col-sm-12 text-right">
                                                        <img src="assets/images/tcs_blue.png" class="img-responsive m-b-20" alt=""/>
                                                        <h6 class="f-w-700 m-b-10 text-semi-dark">Invoice Number : <span>#146859</span></h6>
                                                        <h6 class="f-w-700 m-b-10 text-semi-dark">Date : <span>November 14, 2020</span></h6>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="table-responsive">
                                                            <table class="table invoice-detail-table">
                                                                <thead>
                                                                    <tr class="thead-default">
                                                                        <th>Name</th>
                                                                        <th>Quantity</th>
                                                                        <th>Price <small>per unit</small></th>
                                                                        <th>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <h6>Amazon - c4.2xlarge - EU (London) - Linux</h6>
                                                                        </td>
                                                                        <td>6</td>
                                                                        <td>$200.00</td>
                                                                        <td>$1200.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h6>Amazon - c4.2xlarge - Uk (London) - Linux</h6>
                                                                        </td>
                                                                        <td>7</td>
                                                                        <td>$100.00</td>
                                                                        <td>$700.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h6>Amazon - c4.2xlarge - EU (London) - Windows</h6>
                                                                        </td>
                                                                        <td>5</td>
                                                                        <td>$150.00</td>
                                                                        <td>$750.00</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <table class="table table-responsive invoice-table invoice-total">
                                                            <tbody>
                                                                <tr>
                                                                    <th>Sub Total :</th>
                                                                    <td>$4725.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Taxes (10%) :</th>
                                                                    <td>$57.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Discount (5%) :</th>
                                                                    <td>$45.00</td>
                                                                </tr>
                                                                <tr class="text-info">
                                                                    <td>
                                                                        <hr />
                                                                        <h5 class="text-primary m-r-10">Total :</h5>
                                                                    </td>
                                                                    <td>
                                                                        <hr />
                                                                        <h5 class="text-primary">$4827.00</h5>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
            </div>
        </div>

    </div>


        )
    }



}
export default invoice