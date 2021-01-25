import axios from 'axios'
class service{

    constructor(props)
    {
        this.url="https://cors-anywhere.herokuapp.com/https://morpheusfxv718.az.cloudloka.com/api/";
        this.cartJsonBoxUrl = "https://cors-anywhere.herokuapp.com/https://jsonbox.io/box_78a0c9a8990b57692bc7";
        this.provisionJsonBoxUrl = "https://cors-anywhere.herokuapp.com/https://jsonbox.io/box_bd99d7605914d8490d68";


        this.auth={ 
            headers: {
                "Authorization" : "Bearer 43622656-f5f8-4f7c-96aa-1d3139cc5b69",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                "Content-Type":"application/json",
                "X-Requested-With": "XMLHttpRequest"
            } 
        }

        // this.freshdeskurl="https://tcs-desk688.freshdesk.com/api/v2/search/tickets?query=\"status:"
        this.freshdeskauth={ 
            headers: {
                "Authorization" : "Basic bk01SjlIQkZZT0R5OUNTVjBnYTo=",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                "Content-Type":"application/json"
                
            } 
        }

        // this.parkmycloudapiurl="https://console.parkmycloud.com/v2/";

        // this.parkmycloudgetauthtokenauth={ 
        //     headers: {
        //         "Content-Type":"application/json",
        //         "X-Requested-With": "XMLHttpRequest"
        //     } 
        // }

        // this.parkmycloudauth={ 
        //     headers: {
        //         "X-Auth-Token": "",
        //         "Content-Type":"application/json",
        //         "X-Requested-With": "XMLHttpRequest"
        //     } 
        // }

        this.parkmycloudapiurl="https://cors-anywhere.herokuapp.com/https://console.parkmycloud.com/v2/";

        this.parkmycloudgetauthtokenauth={ 
            headers: {
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                "X-Requested-With": "XMLHttpRequest"
            } 
        }

        this.parkmycloudauth={ 
            headers: {
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                "X-Requested-With": "XMLHttpRequest"
            } 
        }


    }
    retrieveInstances()
    {
        
        return axios.get(this.url+"instances",this.auth);
    }
    retrieveIncidents()
    {
        
        return axios.get(this.url+"monitoring/incidents",this.auth);
    }
    retrieveLogs()
    {
        
        return axios.get(this.url+"logs",this.auth);
    }
    retrievePrices()
    {
        return axios.get(this.url+"prices",this.auth);
    }
    retrieveTicketsOpen()
    {
        
        return axios.get("https://tcs-desk688.freshdesk.com/api/v2/search/tickets?query=\"status:2\"",this.freshdeskauth);
    }

    retrieveTicketsPending()
    {

        return axios.get("https://tcs-desk688.freshdesk.com/api/v2/search/tickets?query=\"status:3\"",this.freshdeskauth);
    }
   
    retrieveTicketsResolved()
    {
        
        return axios.get("https://tcs-desk688.freshdesk.com/api/v2/search/tickets?query=\"status:4\"",this.freshdeskauth);
    }
    retrieveTicketsClosed()
    {
        
        return axios.get("https://tcs-desk688.freshdesk.com/api/v2/search/tickets?query=\"status:5\"",this.freshdeskauth);
    }

    retrieveAWsPrices()
    {
        return axios.get("https://cors-anywhere.herokuapp.com/http://a0.awsstatic.com/pricing/1/ec2/mswin-od.min.js");
    }
    retrieveAzurePrices(reg)
    {
        return axios.get("https://cors-anywhere.herokuapp.com/https://prices.azure.com/api/retail/prices?$filter=serviceName eq 'Virtual Machines' and location eq '"+reg+"'");
    }

//-------------------------------jsonbox for cartItems------------------------------------------------------------------
    //get all the cart items from jsonbox
    async retrievCartItems()
    {
        const res = await axios.get(this.cartJsonBoxUrl);
        //console.log("cratItems"+res);
        return res;
    }

    //Remove cart items from jsonbox
    async removeItemFromCart(id)
    {
        const res =await axios.delete(this.cartJsonBoxUrl+"/"+id);
        console.log("ItemRemoved"+res);
    }

    //Add cart items to jsonbox
    async addItemToCart(newCartItems)
    { 
        var cartItems=(await this.retrievCartItems()).data;
        var cartitemQuantity=cartItems.length;
        var i,j;
        for(i=0;i<newCartItems.length;i++)
        {
            if(cartItems.length > 0)
            {
                for(j=0;j<cartItems.length;j++)
                {
                    if(cartItems[j].skuId === newCartItems[i][0] && cartItems[j].price === newCartItems[i][2])
                    {
                        this.updateCartItemQuantity(cartItems[j]._id, cartItems[j].skuId, cartItems[j].name, cartItems[j].price, cartItems[j].quantity+1);
                        break;
                    }
                    else if(j === cartItems.length-1 )
                    {
                        axios.post(this.cartJsonBoxUrl,{
                            "skuId" : newCartItems[i][0],
                            "name" : newCartItems[i][1],
                            "price" : newCartItems[i][2],
                            "quantity" : newCartItems[i][3]
                        });
                        cartitemQuantity += 1;
                        break;
                    }

                }
            }
            else if(newCartItems[i][3] !== 0)
            {
                 axios.post(this.cartJsonBoxUrl,{
                    "skuId" : newCartItems[i][0],
                    "name" : newCartItems[i][1],
                    "price" : newCartItems[i][2],
                    "quantity" : newCartItems[i][3]
                });
                cartitemQuantity += 1;
            }
               
            
            
        }
        
        return cartitemQuantity;
    }

    //This method updates the cartitemQuantity based on jsonbox _id parameter
    updateCartItemQuantity(itemId,skuId,name,price,quantity)
    { 
                axios.put(this.cartJsonBoxUrl+"/"+itemId,{
                    "skuId" : skuId,
                    "name" : name,
                    "price" : price,
                    "quantity" : quantity
                });  
                return 1;    
    }

//---------------------------ProvisionJsonBox-------------------------------------------------------------

async retrievProvisionItems()
    {
        const res = await axios.get(this.provisionJsonBoxUrl);
        return res;
    }

async addItemForProvisioning()
{
    var cartItems=(await this.retrievCartItems()).data;
    var i;
    for(i=0;i<cartItems.length;i++)
    {
        this.removeItemFromCart(cartItems[i]._id);
        axios.post(this.provisionJsonBoxUrl,{
            "skuId" : cartItems[i].skuId,
            "name" : cartItems[i].name,
            "price" : cartItems[i].price,
            "quantity" : cartItems[i].quantity,
            "status" : "Provision"
        });

    }
}

async updateProvisionItem(id,skuId,name,price,quantity)
{ 
      var status = "In-Progress";  
      var res = await axios.put(this.provisionJsonBoxUrl+"/"+id,{
                "skuId" : skuId,
                "name" : name,
                "price" : price,
                "quantity" : quantity,
                "status" : status
            });  
            return res;    
}

//---------------------------ParkMyCloud------------------------------------------------------------------
   //This method retrieves authentication token
    retrieveParkMyCloudToken = async () => {
    const result = await axios.post(this.parkmycloudapiurl+"auth/login",{
        "key": "48b9aa687ea7b216df80d77bce3f33d142cb21f319c36095d35096c2f3d7",
        "key_id": "a0d0b217-fe49-4e14-8d42-d7caca2874f2",
        "duration": 43200
    }).then();
    
    return result.data.token;
    }

    //This method retrieves all resource detail
    async retrieveParkMyCloudAllResources()
    {
        this.parkmycloudauth.headers["X-Auth-Token"] = await this.retrieveParkMyCloudToken();
        return axios.get("https://cors-anywhere.herokuapp.com/https://console.parkmycloud.com/resources/paged",this.parkmycloudauth);
        
    }   

    async toggleParkMyCloudAllResource(action,resourceId)
    {
        
        this.parkmycloudauth.headers["X-Auth-Token"] = await this.retrieveParkMyCloudToken();
        var res= axios.put("https://cors-anywhere.herokuapp.com/https://console.parkmycloud.com/resources/toggle",{
            "action" : action.toString(),//start or stop
		    "item_ids" : [resourceId]//there can be 
            },
            this.parkmycloudauth);
            return res;
    }   
    
    async retrieveParkMyCloudSchedules()
    {
        this.parkmycloudauth.headers["X-Auth-Token"] = await this.retrieveParkMyCloudToken();
        return axios.get("https://cors-anywhere.herokuapp.com/https://console.parkmycloud.com/eng/schedules/",this.parkmycloudauth);
        
    }
    
    async atachParkMyCloud(scheduleId,resourceId)
    {
        
        this.parkmycloudauth.headers["X-Auth-Token"] = await this.retrieveParkMyCloudToken();
        var res= axios.put("https://cors-anywhere.herokuapp.com/https://console.parkmycloud.com/v2/resource/attach-schedule",{
            "item_ids" : [resourceId],//there can be ,
            "schedule_id" : scheduleId
            },
            this.parkmycloudauth);
            return res;
    }  
    
    async detachParkMyCloud(resourceId)
    {
        
        this.parkmycloudauth.headers["X-Auth-Token"] = await this.retrieveParkMyCloudToken();
        var res= axios.put("https://cors-anywhere.herokuapp.com/https://console.parkmycloud.com/v2/resource/detach-schedule",{
            "item_ids" : [resourceId]
            },
            this.parkmycloudauth);
            return res;
    }  



}
export default new service();