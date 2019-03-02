DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;

--Create table called products which will store products--
CREATE TABLE products(
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY(item_id)
);

--Insert data into products table--
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Lay's Classic", "Grocery", 3.19, 125),
("Minimalist wallet", "Clothing", 9.99, 316),
("Women sunglasses", "Acsesuar", 13.95, 100),
("Guitar", "Music", 38.97, 150),
("Ibuprophen", "Pharmacy", 4.99, 250),
("Mug", "Product", 11.95, 100),
("Phone charger", "Product", 7.99, 175),
("Levis jean", "Clothing", 19.92, 75),
("Mozzarella cheese", "Food", 2.95, 345),
("Phone case", "Product", 15.99, 275);