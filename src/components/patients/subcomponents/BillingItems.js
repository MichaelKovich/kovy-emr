import React from 'react';

const billingItems = props => (
  <tr>
    <td>{props.billid}</td>
    <td>{props.paid ? 'Yes' : 'No'}</td>
    <td>{props.amount}</td>
    <td>{props.description}</td>
  </tr>
);

export default billingItems;
