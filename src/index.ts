import express, { Request } from "express";
import bodyParser from "body-parser";
import { NewProduct } from "./types/product";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let products = [...Array(10)].map((_, index) => {
  return {
    id: index,
    productName: `Product${index}`,
    productDescription: `This is Product${index}`,
    productPrice: index * 100,
  };
});

app.get("/products", (_, res) => {
  res.send(products);
});

app.post("/products", (req: Request<{}, {}, NewProduct>, res) => {
  const newProduct = {
    id: products.length,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
  };
  products.push(newProduct);
  res.send(newProduct);
});

app.get("/products/:id", (req: Request, res) => {
  res.send(products.find((product) => product.id === parseInt(req.params.id)));
});

app.put("/products/:id", (req, res) => {
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (product === undefined) {
    res.send("Product not found");
    return;
  }

  product.productName = req.body.productName;
  product.productDescription = req.body.productDescription;
  product.productPrice = req.body.productPrice;
  res.send(product);
});

app.delete("/products/:id", (req, res) => {
  const newProducts = products.filter(
    (product) => product.id !== parseInt(req.params.id)
  );
  products = newProducts;
  res.send(newProducts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
