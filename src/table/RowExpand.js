import React from "react";

// CSS
import "../css/rowExpand.css";

function RowExpand({ row }) {
  const { col5 } = row.original;
  return (
    <table className="rowExpand__table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {col5.map((product, index) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RowExpand;
