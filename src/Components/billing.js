import React, { Component } from 'react';
import service from './service'
class billing extends Component{

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
    <div class="pcoded-main-container">
        <div class="pcoded-wrapper">
            <div class="pcoded-content">
                <div class="pcoded-inner-content">
                    <div class="main-body">
                        <div class="page-wrapper">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-header">
                                             <h5>AWS Services</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label for="exampleFormControlSelect1">Select Region</label>
                                                        <select class="form-control" id="exampleFormControlSelect1">
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
                                            </div>
                                           

                                            <div className="card-block pb-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Price/hr</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                                {
                                                                    this.state.prices.map(
                                                                        price=>
                                                                        <tbody>
                                                                        <tr key={price.id}>
                                                                            <td><h6 className="m-0">{price.name}</h6></td>
                                                                            <td><h6 className="m-0">{price.price} {price.currency}</h6></td>    
                                                                            <td><button type="button" class="btn btn-morpheus">Buy</button></td>                                                
                                                                        </tr>
                                                                        </tbody>   
                                                   
                                                                    )
                                                                }
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


        )
    }



}
export default billing