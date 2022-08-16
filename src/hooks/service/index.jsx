import React, { createContext, useContext, useState } from 'react';

const ServiceContext = createContext({});

const ServiceProvider = ({ children }) => {

  const [myNegotiations, setMyNegotiations] = useState();
  const [myTasks, setMyTasks] = useState();
  const [myCurrentCustomer, setMyCurrentCustomer] = useState();
  const [myCurrentCustomerNegs, setMyCurrentCustomerNegs] = useState();

  const loadMyNegotiations = async () => {
    fetch(`https://${process.env.REACT_APP_API_ID}.execute-api.us-east-2.amazonaws.com/dev/negotiations`)
      .then(response => response.json())
      .then(data => setMyNegotiations(data));
  };

  const loadMyTasks = async () => {
    fetch(`https://${process.env.REACT_APP_API_ID}.execute-api.us-east-2.amazonaws.com/dev/tasks`)
      .then(response => response.json())
      .then(data => setMyTasks(data));
  };

  const loadMyCurrentCustomer = async (customer_id) => {
    fetch(`https://${process.env.REACT_APP_API_ID}.execute-api.us-east-2.amazonaws.com/dev/customers/${customer_id}`)
      .then(response => response.json())
      .then(data => setMyCurrentCustomer(data.customer));
  };

  const loadMyCurrentCustomerNegs = async (customer_id) => {
    try {
      fetch(`https://${process.env.REACT_APP_API_ID}.execute-api.us-east-2.amazonaws.com/dev/negotiations?customer_id=${customer_id}`)
      .then(response => response.json())
      .then(data => setMyCurrentCustomerNegs(data));
    } catch (error) {
      console.log(`erro`);
    }
  };

  const createNewGiroProposal = async (requestData) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    };
    const response = await fetch(
      `https://${process.env.REACT_APP_API_ID}.execute-api.us-east-2.amazonaws.com/dev/products/giro/proposals`,
      requestOptions
    );
    return response?.json();
  }

  return (
    <ServiceContext.Provider
      value={{
        myNegotiations,
        loadMyNegotiations,
        myCurrentCustomer,
        loadMyCurrentCustomer,
        createNewGiroProposal,
        myCurrentCustomerNegs,
        loadMyCurrentCustomerNegs,
        myTasks,
        loadMyTasks
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useAuth must be used within an ServiceProvider');
  }
  return context;
}

export { ServiceProvider, useService };