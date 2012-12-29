var pg = require('pg').native;
//or native libpq bindings
//var pg = require('pg').native

var conString = "pg://postgres:test@localhost/postgres";

//error handling omitted
pg.connect(conString, function (err, client) {
    if (err) {
        return console.log(err);
    }
    client.query("SELECT NOW() as when", function (err, result) {
        console.log("Row count: %d", result.rows.length);  // 1
        console.log("Current year: %d", result.rows[0].when.getFullYear());
        pg.end(); //terminate the client pool, disconnecting all clients
    });
});