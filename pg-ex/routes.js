const express = require("express");
const routes = express.Router();
const pool = require("./connection");

function getTable(req, res) {
    pool.query("select * from shopping_cart order by id").then(result => {
        res.json(result.rows);
    });
}
  
routes.get("/", function(req, res) {
    getTable(req, res);
}); 

routes.post("/", function(req, res) {
    pool.query("insert into shopping_cart (product, price, quantity) values ($1::text, $2::float, $3::int)",
    [req.body.product, req.body.price, req.body.quantity]).then(() => {
        getTable(req, res);
    });
});

routes.put("/:id", function(req, res) {
    pool.query("update shopping_cart set quantity=$1::int where id=$2::int", 
    [req.body.quantity, req.params.id]).then(() => {
        getTable(req, res);
    });
});

routes.delete("/:id", function(req, res) {
    pool.query("delete from shopping_cart where id=$1::int", [req.params.id]).then(() => {
        getTable(req, res);
    });
});

module.exports = routes;