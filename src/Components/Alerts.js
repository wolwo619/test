import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

class Alerts extends React.Component {
  
  notifySuccess = () => toast.success("Added to Cart Successfully",{autoClose: 2000});
  notifyFailed  = () => toast.error("Not able to add to cart",{autoClose: 2000});
  notifyRemove  = () => toast.success("Removed from Cart Successfully",{autoClose: 2000});
  notifyWarning  = () => toast.warning("No Items in Cart",{autoClose: 2000});
  
  

}
 
export default new Alerts();