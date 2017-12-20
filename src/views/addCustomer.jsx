import React from 'react';
import {Redirect} from 'react-router';

class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      phone:0,
      city:'',
      fireRedirect:false
    }
    this.handleCustomerName = this.handleCustomerName.bind(this);
    this.handleCustomerPhoneNumber = this.handleCustomerPhoneNumber.bind(this);
    this.handleCustomerCity = this.handleCustomerCity.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
  }
  addCustomer(){
    let customer = {
      name:this.state.name,
      phone:this.state.phone,
      city:this.state.city
    }
    fetch("http://localhost:3000/customers",{
      method:"post",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(customer)
    })
    .then((response)=>{
      if(response.ok){
        return response.json();
      }
    })
    .then(()=>{
      console.log('customer list updated');
      this.setState({
        fireRedirect:true
      })
    })
  }
  handleCustomerName(e){
    this.setState({
      name:e.target.value
    })
  }
  handleCustomerPhoneNumber(e){
    this.setState({
      phone:e.target.value
    })
  }
  handleCustomerCity(e){
    this.setState({
      city:e.target.value
    })
  }
  render(){
    const redirect = this.state.fireRedirect;
    return(
      <section>
        <div>
          <label>Customer Name</label> : <input type="text" onChange={this.handleCustomerName} placeholder="Customer Name"/>
        </div>
        <div>
          <label>Phone Number</label> : <input type="text" onChange={this.handleCustomerPhoneNumber} placeholder="Phone Number"/>
        </div>
        <div>
          <label>City</label> : <input type="text" onChange={this.handleCustomerCity} placeholder="City"/>
        </div>
        <button type="submit" onClick={this.addCustomer}>Save</button>
        {redirect && (
          <Redirect to="/" />
        )}
        </section>
    );
  }
}

export default AddCustomer;
