import React, { Component } from 'react';

class Reports extends Component{

    render()
    {
        return(  
        <div className="tab-pane fade" id="pills-reports" role="tabpanel" aria-labelledby="pills-reports-tab">
        <p className="mb-0"></p>
        <div className="card User-Activity">
            <div className="card-header">
                <h5>Reports</h5>
            </div>
            <div className="card-block pb-0">
                <div className="table-responsive">
                <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Operation Name</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><h6 class="m-0">T3.micro - building web app using s3 consumption report</h6></td>
                                <td><h6 class="m-0">Wed Nov 19 2020, 20:41:37 GMT +05:30 (India Standard Time)</h6></td>                                                                  
                                <td><a className="text-white label label-success f-12" href="#!">Active</a></td>
                            </tr>
                            <tr>
                                <td><h6 class="m-0">T3.micro - 2 Incidents occured 1 Resolved, 1 Pending</h6></td>
                                <td><h6 class="m-0">Wed Nov 19 2020, 18:32:17 GMT +05:30 (India Standard Time)</h6></td>                                                                  
                                <td><a className="text-white label label-danger f-12" href="#!">Failed</a></td>
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
export default Reports