var inquirer = require('inquirer');
var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected to database...\n")
    bamazonManager();
});

function bamazonManager() {
    console.log("Welome Bamazon Manager!".yellow)

    inquirer.prompt([
        {
            name: "action",
            message: "What would you like to do?",
            type: "list",
            choices: ["View all products", "View low inventory", "Add to inventory", "Add a new product"]
        }
    ]).then(function(answer){
        switch(answer.action) {
            case "View all products":
                viewProducts();
                break;
            case "View low inventory":
                lowInventory();
                break;
            case "Add to inventory":
                addInventory();
                break;
            case "Add a new product":
                newProduct();
                break;
            default: 
                bamazonManager();
                break;
        }
        
    })
}

function viewProducts() {
    console.log("View All Products".green);
}

function lowInventory() {
    console.log("Low Inventory".green);
}

function addInventory() {
    console.log("Add to Inventory".green);
}

function newProduct() {
    console.log("Add a new product".green);
}