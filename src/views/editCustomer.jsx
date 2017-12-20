import React from 'react';
import {Redirect} from 'react-router-dom';

class EditCustomer extends React.Component{
  constructor(props) {
    super(props);
    console.log('edit customer = ',this.props);
    this.getCustomer = this.getCustomer.bind(this);
    this.handleCustomerName = this.handleCustomerName.bind(this);
    this.handleCustomerPhoneNumber = this.handleCustomerPhoneNumber.bind(this);
    this.handleCustomerCity = this.handleCustomerCity.bind(this);
    
    this.getCustomer(this.props.match.params.id);

    this.state={
      customer:{},
      name:'',
      phone:0,
      city:'',
      fireRedirect:false
    }
  }
  getCustomer(id){
    fetch("http://localhost:3000/customers/"+id)
    .then((response)=>{
      if(response.ok){
        response.json()
        .then((data)=>{
          this.setState({customer:data});
          console.log('customer = ',this.state.customer);
        })
      }
    })
  }
  editCustomer(id){
    let customer = {
      name:this.state.name,
      phone:this.state.phone,
      city:this.state.city
    }
    fetch("http://localhost:3000/customers/"+id,{
      method:"put",
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
    console.log('name = ',e.target.value);
    this.setState({
      name:e.target.value
    })

  }
  handleCustomerPhoneNumber(e){
    console.log('phone = ',e.target.value);
    this.setState({
      phone:e.target.value
    })

  }
  handleCustomerCity(e){
    console.log('city = ',e.target.value);
    this.setState({
      city:e.target.value
    })

  }

  render(){
    const redirect = this.state.fireRedirect;
    return(
      <div>
        <h4>Edit Customer</h4>
        <div>
          <label>Name</label> : <input type="text" placeholder={this.state.customer.name} onChange={this.handleCustomerName} />
        </div>
        <div>
          <label>Phone Number</label> : <input type="text" placeholder={this.state.customer.phone} onChange={this.handleCustomerPhoneNumber} />
        </div>
        <div>
          <label>City</label> : <input type="text" placeholder={this.state.customer.city} onChange={this.handleCustomerCity} />
        </div>
        <button type="button" onClick={()=>this.editCustomer(this.state.customer.id)}>Update</button>
        {redirect && (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default EditCustomer;
