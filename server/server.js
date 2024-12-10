const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: ".env"});

// Middleware to handles CORS
// CORS is Cross-Origin Resource Sharing and by default prevents different sources from accessing our server
// Adding the address of our React app in the Access-Control-Allow-Origin allows it to access the server
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 
        'http://localhost:3000'
    );
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

// Middleware to parse JSON requests
// Nodejs cannot parse JSON by default so needs this Express middleware to do so
app.use(express.json());

// mysql2 is generally more reliable than mysql for connecting to MySQL servers
var mysql = require("mysql2");

// Prepare a connection to a MySQL server using data from a .env file
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

// Attempt to connect to the MySQL server
con.connect(function(err) {
    if (err) throw err;
    else console.log("Connected to MySQL...");
});

// Run a query to get each skill and its id from the database sorted by skill name
// Return a JSON response with the data
app.get("/skills", (req, res) => {
    con.query("SELECT id, skill FROM Competency ORDER BY skill;",
        function(err, result) {
            if (err) throw err;
            res.json(result);
        }
    );
});

// Run a query that gets the skill name and description for a given id
// Return a JSON response with the skill name and description
// The id is sent as JSON through the request body
app.post("/skills", (req, res) => {
    const id = req.body.id;
    con.query('SELECT skill, description FROM Competency WHERE id = ? LIMIT 1', 
        [id],
        function (err, result) {
            if (err) {
                res.status(500).json({error: 'Database query error'});
                return;
            }
            res.json(result);
        }
    );
});

// Ignore certain file types when processing them on the server
// For file type in the else, don't cache them and forward them to the index.html file to use Express routes
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));

    }
});

// Entry point of the server, which is the build folder from our React app
// Need to run "npm start build" in the client folder to rebuild the React app
app.use(express.static(path.join(__dirname, "../client/build")));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});