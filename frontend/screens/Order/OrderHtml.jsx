import React from 'react';

const OrderHtml = ({ orders, formatDate }) => {
    return (
        <html>
            <head>
                <title>Pending Orders</title>
                <style>
                    {`
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    
                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                    
                    th {
                        background-color: #007bff;
                        color: white;
                    }
                    `}
                </style>
            </head>
            <body>
                <center>
                    <h1>Visibuy - Orders</h1>
                </center>
                <table>
                    <thead>
                        <tr>
                            <th>Order Date</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders
                            .filter((order) => !order.delivered)
                            .map((order) => (
                                <>
                                    <tr>
                                        <td>{formatDate(order.createdAt)}</td>
                                        <td>Rs {order.totalPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <ul>
                                                {order.orderItems.map((orderItem) => (
                                                    <li key={orderItem.product}>
                                                        <strong>Product:</strong> {orderItem.name}
                                                        <br />
                                                        <strong>Quantity:</strong> {orderItem.quantity}
                                                        <br />
                                                        <strong>Price:</strong> Rs {orderItem.price.toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                </>
                            ))}
                    </tbody>
                </table>
            </body>
        </html>
    );
};

export default OrderHtml;
