DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dr. Martens Boots", "Apparel", 100, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hanging Terrarium", "Home Goods", 20, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vitamex", "Kitchen", 400, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 7", "Electronics", 500, 60);

SELECT * FROM products;