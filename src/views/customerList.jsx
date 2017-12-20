import React from 'react';
import {Redirect,Link} from 'react-router-dom';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      fireRedirect:false,
      customerIndex:0
    };
  }

  componentDidMount(){
    this.customerList();
  }

  customerList(){
    fetch("http://localhost:3000/customers").then((response)=>response.json().then((data)=>{
      this.setState({customers:data})
    }));
  }

  editCustomer(id){
    this.setState({
      fireRedirect:true,
      customerIndex:id
    })
  }

  deleteCustomer(id){
    fetch("http://localhost:3000/customers/"+id,{
      method:"delete",
      headers:{
        "Content-type":"application/json"
      }
    })
    .then((response)=>{
      response.json()
      .then((data)=>{
        console.log('customer deleted');
        window.location.reload();
      })
    })
  }

  render(){
    const redirect = this.state.fireRedirect;
    const custIndex = this.state.customerIndex;
    const customers = this.state.customers.map((customer,index)=>(
      <li key={index}>
        <label>Name</label> : {customer.name}<br/>
        <label>Phone</label> : {customer.phone}<br/>
        <label>City</label> : {customer.city}<br/>
        <button type="button" onClick={()=>this.editCustomer(customer.id)}>Edit</button>
        <button type="button" onClick={()=>this.deleteCustomer(customer.id)}>Delete</button>
      </li>
    ));
    return(
      <div>
        <Link to="/add-customer"><button type="button">Add Customer</button></Link>
        <ul className="customer-list" id="customerList">
          {customers}
        </ul>
        {redirect && (
          <Redirect to={`/edit-customer/${custIndex}`} />
        )}
      </div>
    );
  }
}

export default CustomerList;
