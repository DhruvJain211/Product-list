import React, { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const addProduct = () => {
    if (productName && productPrice) {
      const newProduct = {
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1,
      };
      setProducts([...products, newProduct]);
      setTotalPrice(totalPrice + newProduct.price);
      setProductName("");
      setProductPrice("");
    }
  };

  const removeProduct = (index) => {
    const removedProduct = products[index];
    setProducts(products.filter((_, i) => i !== index));
    setTotalPrice(totalPrice - removedProduct.price * removedProduct.quantity);
  };

  const incrementQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
    setTotalPrice(totalPrice + updatedProducts[index].price);
  };

  const decrementQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);
      setTotalPrice(totalPrice - updatedProducts[index].price);
    }
  };

  return (
    <div className="App">
      <h1>Product List React App</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="delete-button" onClick={() => removeProduct(index)}>×</button>
              </td>
              <td>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(index)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => incrementQuantity(index)}>+</button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Enter Product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Enter Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </td>
            <td colSpan="2">
              <button className="add-button" onClick={addProduct}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Total Price: {totalPrice}</h2>
    </div>
  );
}

export default App;
