//required packeges
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "127.0.0.1",

    port: 3306,

    user: "root",

    password: "ferhat5020",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    //running function if there is no error.
    continueShopping();
});

// with this function confirming if user wnat to continue or not.
function continueShopping() {
    inquirer.prompt([{
        type: "confirm",
        name: "continue",
        message: "Welcome to Bamazon! Would you like to purchase an item?",
        default: true
    }]).then(function (user) {
        //if user says yes then continue shopping.
        if (user.continue === true) {
            var query = "SELECT * FROM products";
            connection.query(query, function (err, res) {
                //Product table will pop up.

                console.table(res);
                start();

            })
        } else {
            console.log("============================================")
            console.log("Thank you! See you soon again!!");
            console.log("============================================")
            //connection will end if user says no.
            connection.end();
        }
    })
}

function startOver() {
    inquirer.prompt({
        name: "shopping",
        type: "confirm",
        message: "Would you like to keep shopping?",
        default: true
    }).then(function(userPick){
        if(userPick.shopping === true){
            
            start();
        } else {
            console.log("============================================")
            console.log("Thanks for shopping with us! See you soon!");
            console.log("============================================")
            connection.end();
        }
    })
}


//function which will ask question and based on their answer it will continue or stop.
function start() {
    inquirer.prompt([{
        name: "item_id",
        type: "input",
        message: "What would you like to buy? Please enter ID of items: "
    },
    {
        name: "quantity",
        type: "input",
        message: "How many units of the product would you like to buy?"

    }
    ]).then(function (answer) {
        //make a connection between users answer and database
        connection.query("SELECT * FROM products WHERE item_id=?", answer.item_id, function (err, res) {
            //looping through result
            for (var i = 0; i < res.length; i++) {
                //if users answer greater than actual stock then it will stop running
                if (answer.quantity > res[i].stock_quantity) {
                    console.log("============================================")
                    console.log("======>Insufficient quantity<======");
                    console.log("============================================")

                   
                    startOver();
                } 
                //else it will keep running and update stock quantity acoordung to user input
                else {
                    // this updates how many products left.
                    var newStock = (res[i].stock_quantity - answer.quantity);
                    
                    var itemId = (answer.item_id);
                    console.table(res);
                    updateTable(newStock, itemId);
                }
            }
        })

        //this function will update stocks.
        function updateTable(newStock, itemId) {
            inquirer.prompt([{
                type: "confirm",
                name: "confirmPurchase",
                message: "Are you sure you would like to purchase this item and quantity?",
                default: true
            }]).then(function (userConfirm) {
              
                //if user confirm shopping then it will update quantity in database
                if (userConfirm.confirmPurchase === true) {
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newStock
                    }, {
                        item_id: itemId
                    }])
                    console.log("============================================")
                    console.log("Thank you for your bussines!");
                    console.log("============================================")
                    startOver();
                   // connection.end();
                } else {
                    //console.log("Thank you!! Come back soon!");
                    startOver();
                    //connection.end();
                }
                
            })
        }
       
    });

}




