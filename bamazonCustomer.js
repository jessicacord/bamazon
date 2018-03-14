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
    bamazon();
});

function bamazon() {

    console.log("--------------------\n"+
                "Welcome to Bamazon!".yellow);

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        console.log("Here are the available items:".blue)
        results.forEach(function(result) {

            if(result.stock_quantity > 0 ) {
                console.log(result.item_id + " | " + result.product_name + " | $" + result.price);
            }
            
        })

        buyItem();
        
    })
    
}

function buyItem() {
    inquirer.prompt([
        {
            name: "item_id",
            message: "Enter the ID of the item you wish to buy".green,
            type: "input"
        }
    ]).then(function(answer){

        connection.query("SELECT * FROM products WHERE item_id=?", [answer.item_id], function(err, res) {
            if (err) throw err;

            var selectedItem = res[0];

            if (!selectedItem) {
                console.log("We could not find that item in our database".green);
                buyItem();
            } else {
                function quantity() {
                    inquirer.prompt([
                        {
                            name: "quantity",
                            message: "How many would you like to buy?".green,
                            type: "input"
                        }
                    ]).then(function(answer){
                        if (err) throw err;

                        if (answer.quantity > selectedItem.stock_quantity) {
                            console.log("There are only " + selectedItem.stock_quantity + " in stock.");
                            quantity();
                        } else {
                            console.log("Your order is being placed...".green);

                            var updatedQuantity = selectedItem.stock_quantity - answer.quantity;
                            

                            connection.query("UPDATE products SET ? WHERE ?", [
                                {
                                    stock_quantity: updatedQuantity
                                },
                                {
                                    item_id: selectedItem.item_id
                                }
                            ], function(err, res) {
                                
                                console.log(("Your total is $" + selectedItem.price * answer.quantity).green);

                                continueShopping();
                            })
                        }

                    })
                }

                quantity();
            }

        })
    })
}

function continueShopping() {
    inquirer.prompt([
        {
            name: "continue",
            message: "Would you like to continue shopping?",
            type: "confirm"
        }
    ]).then(function(answer){
        if (answer.continue) {
            bamazon();
        } else {
            connection.end();
        }
    })
}