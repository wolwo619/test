import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Invoicing extends Component
{


    render()
    {
        return(
            <div className="tab-pane fade" id="pills-invoice" role="tabpanel" aria-labelledby="pills-invoice-tab">
            <p className="mb-0"></p>
                <div className="card User-Activity">
                    <div className="card-header">
                        <h5>Invoice</h5>
                    </div>
                    <div className="card-block pb-0">
                        <div className="table-responsive">
                        <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Invoice Id</th>
                                        <th>Invoice Date</th>
                                        <th>Total Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><h6 class="m-0">INV12345</h6></td>   
                                        <td>18-Nov-2020 05:30:18 PM</td>
                                        <td>$ 190</td>                                                        
                                        <td><Link to='/invoice'><a className="text-white label label-info f-12" >View</a></Link></td>
                                    </tr>
                                    <tr>
                                        <td><h6 class="m-0">INV6578</h6></td> 
                                        <td>19-Nov-2020 11:24:18 AM</td>     
                                        <td>$ 340</td>                                                               
                                        <td><Link to='/invoice'><a className="text-white label label-info f-12">View</a></Link></td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default Invoicing