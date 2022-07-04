const express = require("express");
const cors = require("cors");
const { cartItems, products } = require("./dummyData");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/users/:userId/cart", (req, res) => {
  res.status(200).json(cartItems);
});

app.post("/api/users/:userId/cart", (req, res) => {
  const { productId } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json("Couldn't find the product!");
  else {
    cartItems.push(product);
    res.status(200).json(cartItems);
  }
});

app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;
  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json("Couldn't find the product!");
  else return res.status(200).json(product);
});

app.delete("/api/users/:userId/cart/:productId", (req, res) => {
  const { productId } = req.params;
  cartItems = cartItems.filter((cartItem) => cartItem.id !== productId);
  res.status(200).json(cartItems);
});

app.listen(3001, () => {
  console.log("Server is on fly at port 3001!");
});
