const express = require("express");
const path = require("path");
const app = express();

const dotenv = require("dotenv");
dotenv.config({path: ".env"});

let mysql = require("mysql2");
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

con.connect(function(err)
{
    if(err)
        throw err;
    else
        console.log("Connected to MySQL.");
});

app.get("/skills", (req, res) => {
    con.query("SELECT id, skill FROM Competency ORDER BY skill ASC;",
        function(err, result)
        {
            if(err)
                throw err;
            else
                res.json(result);
        }
    );
});

app.use((req, res, next) => {
    if(/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path))
        next();
    else
    {
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    }
});

app.use(express.static(path.join(__dirname, "../client/build")));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});