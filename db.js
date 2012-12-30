var connection;
exports.setupDBAndTable = function (conn) {
    //save connection
    connection = conn;

    initProjectsTable();
};

//check if table w/ name 'projects' exists, if not, create it.
function initProjectsTable() {
    connection.query(" SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", function (err, result) {
        var rows = result.rows;
        for (var i = 0; i < rows.length; i++) {
            if (rows[0].table_name == 'projects') {
                return;
            }
        }
        createProjectsTable();
    });
}
//Create 'projects' table schema.
function createProjectsTable() {
    var sql = "" +
        "CREATE TABLE projects(" +
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

exports.addProject = function (project, callback) {
    //first create a next id (coz PG doesn't return it after creating a row in callback)
    connection.query("SELECT nextval('projects_id_seq')", function (err, result) {
        if(err) return callback(err);

        var nextId = result.rows[0].nextval;

        //then insert project w/ nextId
        connection.query("INSERT INTO projects (id, name, site, description) VALUES ($1, $2, $3, $4)",
            [nextId, project.name, project.site, project.description], function (err) {
                callback(err, nextId); //send back nextId
            });
    });
};

exports.updateProject = function (id, project, callback) {
    var sql = "UPDATE projects SET name='" + project.name
        + "', site='" + project.site
        + "', description='" + project.description
        + "' WHERE id=" + id;

    connection.query(sql, callback);
};

exports.getProjects = function (callback) {
    connection.query("SELECT * FROM projects", callback);
};

exports.getProject = function (id, callback) {
    connection.query("SELECT * FROM projects WHERE id=" + id, callback);
};

exports.deleteProject = function (id, callback) {
    connection.query("DELETE FROM projects WHERE id=" + id, callback);
};