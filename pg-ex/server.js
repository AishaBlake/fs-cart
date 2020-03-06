const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "../public"));
app.use("/cart-items", routes);

let port = 3000;
app.listen(port, _ => console.log(`Server running on port: ${port}`));