import React, { Component } from 'react';
import service from './service'

class Provisioning extends Component{

    constructor(props)
    {
        super();
        this.state={
            instances:[],
            provisionItems:[]
        }
    }
    componentDidMount()
    {
        service.retrieveInstances()
        .then(
            response =>
            {
                //console.log(response);
                this.setState({instances:response.data.instances})
            }
        )

        
        service.retrievProvisionItems()
        .then(
            response =>
            {
                //console.log(response);
                this.setState({provisionItems:response.data})
            }
        )
    }
    
    async handleProvisioning(id,skuID,name,price,quantity)
    {
        await service.updateProvisionItem(id,skuID,name,price,quantity);
        document.getElementById(id).innerHTML='In-Progress';
    }

    render()
    {
        return(
            <div className="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <div className="card User-Activity">
                                                <div className="card-header">
                                                    <h5>Provisioning</h5>
                                                </div>
                                                <div className="card-block pb-0">
                                                <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price/hr</th>
                                        <th>Quantity</th>
                                        <th>Request Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                    {
                                        this.state.provisionItems.map(
                                            provisionItem=>
                                            <tbody>
                                            <tr key={provisionItem._id}>
                                                <td><h6 class="m-0">{provisionItem.name}</h6></td>
                                                <td><h6 class="m-0">{provisionItem.price}</h6></td>
                                                <td>
                                                    {/* <input type="number" min="0" max="20" value="1" name="qtty"/> */}
                                                <div class="number">
                                                    <span >{provisionItem.quantity}</span>
                                                </div>
                                                </td>  
                                                <td><h6 class="m-0">{provisionItem._createdOn.substring(0, 10)}</h6></td>
                                                  
                                                <td><button id={provisionItem._id} type="button" class="btn btn-xs btn-dark m-t-10 notify-success" onClick={()=>this.handleProvisioning(provisionItem._id,provisionItem.skuID,provisionItem.name,provisionItem.price,provisionItem.quantity)}>{provisionItem.status}</button></td>                                                
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
export default Provisioning

