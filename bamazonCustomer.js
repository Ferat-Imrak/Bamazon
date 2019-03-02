var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "127.0.0.1",

    port: 3306,

    user: "root",

    password: "ferhat5020",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(connection.threadId);
    start();
});