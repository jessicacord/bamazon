# Welcome to Bamazon!

To get Bamazon running:

- Download repository and run `npm install` to get all required modules
- Open `schema.sql` to set up your database and insert starting inventory



*Customer View*

To enter the customer view type `node bamazonCustomer.js`

Once you enter the store, you will see all items that are currently available.

You will then be prompted to select an item to buy. You can choose you item by entering its item_id. If you enter an ID of an item not listed you will receive an error message: `We could not find that item in our database`

Then you will enter the quantity that you would like to purchase. If the quantity is more than the stock you will be notified of the current stock and asked to enter a new quantity.

Once a valid quantity is received, you will receive your total and can choose to keep shopping or quit.



*Manager View*

To enter the customer view type `node bamazonManager.js`

Once in the Manger console you can choose from the following options:

- *View All Products* - This will list all stock, even those that are sold out, with their departments, price, and qunatity
- *View Low Stock* - This will only list stock where quantity is less than 5
- *Add to Inventory* - First you will see a list of your entire stock for refrence. Enter the item ID of the item you want to restock and then the quantity you want to add.
- *Add New Product* - Here you will enter the name, choose the department, enter the price, and set the quantity for a new item



Demo videos are included in the repo.