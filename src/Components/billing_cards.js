import React, { Component } from 'react';

class billingCards extends Component{
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
                                            </div> <br/>
                                            <div class="row">
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
export default billingCards