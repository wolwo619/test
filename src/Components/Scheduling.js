import React, { Component } from 'react';
import service from './service';

class Scheduling extends Component{

    constructor(props)
    {
        ////
        super();
        this.state={
            checked: false,
            resources:[]
                }
        this.toggleChecked=this.toggleChecked.bind(this);
        this.refreshResources=this.refreshResources.bind(this);
        this.setToggle=this.setToggle.bind(this);
    }


    componentDidMount()
    {
     this.refreshResources();
    }
    refreshResources()
    {
        service.retrieveParkMyCloudAllResources()
        .then(
        response=>
        {
            this.setState({resources:response.data.data})
            this.setToggle();
            console.log(this.state.resources);
        }
    )  
    }
    setToggle()
    {
        for(var i=0;i<this.state.resources.length;i++)
        {
            if(this.state.resources[i].state==="running")
               {
                document.getElementById(this.state.resources[i].id).checked=true;
               } 
            else if(this.state.resources[i].state==="stopped")  
                {
                    document.getElementById(this.state.resources[i].id).checked=false;
                }
        }
    }

    async toggleChecked(id,state)
    {
        console.log(id);
        var i=0;
        for(i=0;i<this.state.resources.length;i++)
        {
            if(this.state.resources[i].id === id)
            {
                if (state === "parked" || state === "stopped")
                {
                    await service.toggleParkMyCloudAllResource("start",id)
                    .then(
                        response=>
                        {
                            console.log(response);
                            //this.state.resources[i].state="running";
                            //document.getElementById(id).checked = true;
                            
                            // this.refreshResources();
                            this.state.resources[i].state="starting";
                            this.setToggle();
                            this.forceUpdate();
                            

                        }
                    );
                    //this.state.resources[i].state="running";
                    //document.getElementById(id).checked = true;
                    break;
                }
                else
                {
                    await service.toggleParkMyCloudAllResource("stop",id)
                    .then(
                        response=>
                        {
                            console.log(response);
                            // this.refreshResources();
                            

                            this.state.resources[i].state="stopping";
                            this.setToggle();
                            this.forceUpdate();
                            //document.getElementById(id).checked = false;

                        }
                    );
                    //this.state.resources[i].state="parked";
                    break
                }

            }
        }
        
        
        
       
        // if(tog=== true)
        // {
        //     document.getElementById(id).checked = false;
        // }
        // else
        // {
        //     document.getElementById(id).checked = true;
        // }
        // var z = document.getElementById(id).checked;
    }






   render()
   {
       return(
        <div className="tab-pane fade" id="pills-schedule" role="tabpanel" aria-labelledby="pills-schedule-tab">
        <p className="mb-0"></p>
        <div className="card User-Activity">
            <div className="card-header">
                <h5>Scheduling</h5>
            </div>
            <div className="card-block pb-0">
                <div className="table-responsive">
                <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>CloudAccount</th>
                                <th>Info</th>
                                <th>State</th>
                                <th>CurrentSchedule</th>
                                
                            </tr>
                        </thead>
                        {
                                this.state.resources.map(
                                    resource=>
                                    <tbody>
                                    <tr>
                                        <td><h6 className="m-0">{resource.credential.name}</h6></td>
                                        <td><h6 className="m-0">{resource.info_text}</h6></td>
                                        <td><h6 className="m-0">{resource.state}</h6></td>
                                        <td><h6 className="m-0">{( resource.parking_calendar == null) ?  "None" : resource.parking_calendar.name }</h6></td>
                                        <td>
                                            
                                            {resource.state==="stopped" || resource.state==="running"?
                                            <div class="switch switch-primary d-inline m-r-10">
                                            <input type="checkbox" id={resource.id} onChange={()=>this.toggleChecked(resource.id,resource.state)}/>                                        
                                            <label for={resource.id} class="cr"></label>
                                            </div>
                                            :
                                            <div class="spinner-border" hidden={false}></div>}

                                        </td> 
                                        
                                        
                                         {/* <td><Switch id={resource.id} onChange={()=>this.toggleChecked(resource.id,resource.state)} /></td>                                                                  */}
                                   { console.log("checked")}
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

export default Scheduling