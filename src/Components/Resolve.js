import React, { Component } from 'react';
import service from './service'

class Resolve extends Component{


    constructor(props)
    {
        super();
        this.state={
            incidents:[]
         
        }
    }

componentDidMount(){
  
    service.retrieveIncidents()
    .then(
        response =>
        {
            //console.log(response);
            this.setState({incidents:response.data.incidents})
        }
    )
}

    render()
    {
        return(
            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            <div className="card User-Activity">
                <div className="card-header">
                    <h5>Resolve</h5>
                </div>
                <div className="card-block pb-0">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Severity</th>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>

                    {
                        this.state.incidents.map(
                            inci=>
                            <tbody>
                                <tr>
                                <td>{inci.id}</td>
                                <td>
                                        {inci.severity==="critical" && <button type="button" className="btn btn-icon btn-rounded btn-danger">
                                            <i className="feather icon-slash"></i>
                                        </button>}
                                        {inci.severity==="warning" && <button type="button" className="btn btn-icon btn-rounded btn-warning">
                                            <i className="feather icon-slash"></i>
                                        </button>}
                                        {inci.severity==="info" && <button type="button" className="btn btn-icon btn-rounded btn-success">
                                            <i className="feather icon-slash"></i>
                                        </button>}
                                        {inci.severity==="low" && <button type="button" className="btn btn-icon btn-rounded btn-danger">
                                            <i className="feather icon-slash"></i>
                                        </button>}
                                </td>
                                <td>
                                    <h6 className="m-0">{inci.name}</h6>
                                </td>
                                <td>
                                    <h6 className="m-0">5 hours ago</h6>
                                </td>
                                <td>
                                    {inci.status==="closed" &&<a className="text-white label label-success f-12" href="#!">{inci.status}</a>}
                                    {inci.status==="open" &&<a className="text-white label label-warning f-12" href="#!">{inci.status}</a>}
                                </td>
                                <td>
                                    <h6 className="m-0">3 minutes</h6>
                                </td>
                            </tr>
                        </tbody>
                            )
                                
                    }
                        </table>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default Resolve