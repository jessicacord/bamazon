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
            choices: ["View all products", "View low inventory", "Add to inventory", "Add a new product", "Log out"]
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
            case "Log out":
                connection.end();
                break;
            default: 
                bamazonManager();
                break;
        }
        
    })
}

function viewProducts() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        console.log("View All Products".green);
        results.forEach(function(result) {
            
            console.log(result.item_id + " | " + result.product_name + " | " + result.department_name + " | $" + result.price + " | Qty: " + result.stock_quantity);
                       
        })

        bamazonManager();
        
    })
}

function lowInventory() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        console.log("Low Inventory".green);
        results.forEach(function(result) {

            if(result.stock_quantity <= 5 ) {
                console.log(result.item_id + " | " + result.product_name + " | $" + result.price + " | Qty: " + result.stock_quantity);
            }
            
        })

        bamazonManager();
        
    })
}

function addInventory() {
    
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        console.log("Add to Inventory".green);
        results.forEach(function(result) {
            
            console.log(result.item_id + " | " + result.product_name + " | $" + result.price + " | Qty: " + result.stock_quantity);
             
            
        })

        inquirer.prompt([
            {
                name: "item_id",
                message: "Which item would you like restock?",
                type: "input"           
            }
        ]).then(function(answer) {
            
            connection.query("SELECT * FROM products WHERE item_id=?", [answer.item_id], function(err, res) {
                
                if (err) throw err;

                var selectedItem = res[0];

                if (!selectedItem) {
                    console.log("Please enter a valid item ID".green);
                    addInventory();
                } else {

                    function addStock() {
                        inquirer.prompt([
                            {
                                name: "stock",
                                message: "How many would you like to add?",
                                type: "input"
                            }
                        ]).then(function(answer) {
                            if (err) throw err;

                            console.log("Updating your stock...".red);

                            var stock = parseInt(answer.stock);

                            connection.query("UPDATE products SET ? WHERE ?", [
                                {
                                    stock_quantity: selectedItem.stock_quantity + stock
                                },
                                {
                                    item_id: selectedItem.item_id
                                }
                            ], function(err, res) {

                                console.log("Your stock is updated!");
                                

                                bamazonManager();
                            })
                        })
                    }

                    addStock();
                }
            })
            
        })

        
        
    })
    

}

function newProduct() {
    console.log("Add a new product".green);

    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the product?",
            type: "input"
        },{
            name: "department",
            message: "What department is it in?",
            type: "list",
            choices: ["Accessories", "Apparel", "Electronics", "Home Goods", "Kitchen", "Outdoor & Sporting Goods"]
        },{
            name: "price",
            message: "How much does it cost?",
            type: "input"
        },{
            name: "quantity",
            message: "How many are available?",
            type: "input"
        }
    ]).then(function(answer){

        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", [answer.name, answer.department, answer.price, answer.quantity], function(err, res) {

            if (err) throw err;

            console.log("Your product has been added!");

            bamazonManager();
        })
    })
}