import React, { Component } from 'react';
import service from './service'

class Operations extends Component{

    constructor(props)
    {
        super();
        this.state={
           
            ticketsOpen:0,
            ticketsPending:0,
            ticketsResolved:0,
            ticketsClosed:0,
     
        }
    }
    componentDidMount()
    {
        service.retrieveTicketsOpen()
    .then(
        response=>
        {
            // console.log(response);
            this.setState({ticketsOpen:response.data.total})
        }
    )

    service.retrieveTicketsPending()
    .then(
        response=>
        {
             //console.log(response);
            this.setState({ticketsPending:response.data.total})
        }
    )
    service.retrieveTicketsResolved()
    .then(
        response=>
        {
             //console.log(response);
            this.setState({ticketsResolved:response.data.total})
        }
    )
    service.retrieveTicketsClosed()
    .then(
        response=>
        {
            // console.log(response);
            this.setState({ticketsClosed:response.data.total})
        }
    )
    }

    render()
    {
        return(

            <div className="tab-pane fade" id="pills-ticket" role="tabpanel" aria-labelledby="pills-ticket-tab">
            <div className="row">
                <div className="col-md-12 col-xl-3">
                    <div className="card card-customer">
                        <div className="card-block">
                            <div className="row align-items-center justify-content-center">
                                <div className="col">
                                    <h2 className="mb-2 f-w-300">{this.state.ticketsOpen}</h2>
                                    <h5 className="text-muted mb-0">Open</h5>
                                </div>
                                <div className="col-auto">
                                    <i className="feather icon-eye f-30 text-white theme-bg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-3">
                    <div className="card card-customer">
                        <div className="card-block">
                            <div className="row align-items-center justify-content-center">
                                <div className="col">
                                    <h2 className="mb-2 f-w-300">{this.state.ticketsPending}</h2>
                                    <h5 className="text-muted mb-0">Pending</h5>
                                </div>
                                <div className="col-auto">
                                    <i className="feather icon-alert-circle f-30 text-white theme-bg"></i>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-3">
                    <div className="card card-customer">
                        <div className="card-block">
                            <div className="row align-items-center justify-content-center">
                                <div className="col">
                                    <h2 className="mb-2 f-w-300">{this.state.ticketsResolved}</h2>
                                    <h5 className="text-muted mb-0">Resolved</h5>
                                </div>
                                <div className="col-auto">
                                    <i className="feather icon-check f-30 text-white theme-bg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="col-md-6 col-xl-3">
                    <div className="card card-customer">
                        <div className="card-block">
                            <div className="row align-items-center justify-content-center">
                                <div className="col">
                                    <h2 className="mb-2 f-w-300">{this.state.ticketsResolved}</h2>
                                    <h5 className="text-muted mb-0">Closed</h5>
                                </div>
                                <div className="col-auto">
                                    <i className="feather icon-check f-30 text-white theme-bg"></i>
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
export default Operations