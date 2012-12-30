var express = require('express'),
    http = require('http'),
    path = require('path'),
    pg = require('pg'),
    lib = require('./db.js');

//This config will be auto-swapped by CF w/ proper conf. (PS: auto-reconfiguration)
var conString = "pg://postgres:test@localhost/projectsDB";

//Caution: Don't use "pg.connect" if we plan to use a single-Postgres client (instead use new pg.Client())
//pg.connect(conString, function (err, conn) {
//    if (err)  return console.log(err);
//
//    connection = conn;
//    lib.setupDBAndTable(connection);
//});

//You can use "pg.connect" to use connection pool. But in that case you should
// do pg.connect() and perform queries w/in its callback for EVERY query like:
// pg.connect("connStr", function(err, connection) {
//   connection.query(query1)
//}
// pg.connect("connStr", function(err, connection) {
//   connection.query(query2)
//}

//Use single connection for all queries
var connection = new pg.Client(conString);
connection.connect(function () {
    lib.setupDBAndTable(connection);
});

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//Create
app.post('/project', function (req, res) {
    var b = req.body;
    var project = {name:b.name, site:b.site, description:b.description};

    lib.addProject(project, function (err, id) {
        if (err) {
            return res.json({"error":"something went wrong" + err});
        }
        project.id = id;//send project id of newly created project
        res.json(project);
    });
});

//Read
app.get('/project', function (req, res) {
    //if id is passed, return that project
    if (req.query.id) {
        lib.getProject(req.query.id, function (err, data) {
            return err ? res.json(err) : res.json(data.rows && data.rows[0]);
        });
    } else { //return all projects
        lib.getProjects(function (err, data) {
            return err ? res.json(err) : res.json(data.rows);
        });
    }
});

//Update
app.put('/project', function (req, res) {
    var b = req.body;
    var project = {name:b.name, site:b.site, description:b.description};

    lib.updateProject(req.query.id, project, function (err, info) {
        if (err) {
            return res.json({"error":"something went wrong" + err});
        }

        res.json(project);
    });
});


//Delete
app.delete('/project', function (req, res) {
    lib.deleteProject(req.query.id, function (err, info) {
        res.json({"Error":err});
    });
});


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});