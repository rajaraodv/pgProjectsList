var connection;
exports.setupDBAndTable = function (conn) {
    //save connection
    connection = conn;

    initTodosTable();
};

//check if table w/ name 'todos' exists, if not, create it.
function initTodosTable() {
    connection.query(" SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", function (err, result) {
        var rows = result.rows;
        for (var i = 0; i < rows.length; i++) {
            if (rows[0].table_name == 'todos') {
                return;
            }
        }
        createTodosTable();
    });
}
//Create 'todos' table schema.
function createTodosTable() {
    var sql = "" +
        "CREATE TABLE todos(" +
        " id SERIAL," +
        " name VARCHAR(50) NOT NULL default ''," +
        " site VARCHAR(50) NOT NULL default ''," +
        " description VARCHAR(200) default ''," +
        " PRIMARY KEY (id)" +
        ");";

    connection.query(sql, function (err) {
        if (err) return console.log(err);
    });
}

exports.addTask = function (task, callback) {
    //first create a next id (coz PG doesn't return it after creating a row in callback)
    connection.query("SELECT nextval('todos_id_seq')", function (err, result) {
        if(err) return callback(err);

        var nextId = result.rows[0].nextval;

        //then insert task w/ nextId
        connection.query("INSERT INTO todos (id, name, site, description) VALUES ($1, $2, $3, $4)",
            [nextId, task.name, task.site, task.description], function (err) {
                callback(err, nextId); //send back nextId
            });
    });
};

exports.updateTask = function (id, task, callback) {
    var sql = "UPDATE todos SET name='" + task.name
        + "', site='" + task.site
        + "', description='" + task.description
        + "' WHERE id=" + id;

    connection.query(sql, callback);
};

exports.getTasks = function (callback) {
    connection.query("SELECT * FROM todos", callback);
};

exports.getTask = function (id, callback) {
    connection.query("SELECT * FROM todos WHERE id=" + id, callback);
};

exports.deleteTask = function (id, callback) {
    connection.query("DELETE FROM todos WHERE id=" + id, callback);
};