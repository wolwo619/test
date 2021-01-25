import React, { Component } from 'react';
import service from './service'
import moment from 'moment'

class Monitoring extends Component{

    constructor(props)
    {
        super();
        this.state={
            
            logs:[]
            
        }
    }


    componentDidMount()
    {
        service.retrieveLogs()
        .then(
        response=>
        {
             //console.log(response);
            this.setState({logs:response.data.data})
        }
    )
    }



   render()
   {
       return(
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <p className="mb-0"></p>
        <div className="card User-Activity">
            <div className="card-header">
                <h5>Monitor</h5>
            </div>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {
                        this.state.logs.map(
                            log=>
                                
                                <li className="list-group-item">
                                <h5 className="card-title">{log.sourceType}<span className="float-right small">{moment(log.ts).format('HH:mm:ss & DD-MM-YYYY')}</span></h5>
                                 <h6 className="text-muted mb-0">{log.message}</h6>
                                </li> 
                        )
                    }
                </ul>
              </div>
        </div>
    </div> 
       )
   }

}

export default Monitoring