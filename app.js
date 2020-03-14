const express = require("express");
const app = express();

app.use('/CSS/', express.static('./CSS/'));
app.use('/images/', express.static('./images/'));
app.use('/public/', express.static('./public/'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = process.env.PORT ? process.env.PORT : 3000;

let students = [
    {id: 1, name: "Emil", age: 23}, 
    {id: 2, name: "Martin", age: 40},
    {id: 3, name: "Yvonne", age: 31},
    {id: 4, name: "Michael", age: 12},
    {id: 5, name: "Line", age: 92}
];

let currentId = 5;

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/frontpage/frontpage.html");
});

app.get("/commands" , (req, res) => {
    return res.sendFile(__dirname + "/public/commands/commands.html");
});

app.get("/theory", (req, res) => {
    return res.sendFile(__dirname + "/public/theory/theory.html");
});

app.get("/javascript", (req, res) => {
    return res.sendFile(__dirname + "/public/javascript/javascript.html");
});

app.get("/restapi", (req, res) => {
    return res.sendFile(__dirname + "/public/restapi/restapi.html");
});

app.get("/restapi/student", (req, res) => {
    return res.send({students});
});

app.get("/restapi/student/:id", (req, res) => {

    const student = students.find(student => student.id === Number(req.params.id));

    return res.send({student});
});

app.post("/restapi/student", (req, res) => {

    let student = req.body;
    student.id = ++currentId;
    students.push(student);

    return res.send({students});
});

app.put("/restapi/student/:id", (req, res) => {

    const foundIndex = students.findIndex(student => student.id === Number(req.params.id));
    delete req.body.id;
    const newStudent = {...students[foundIndex], ...req.body};
    students[foundIndex] = newStudent;

    return res.send({students});
});

app.delete("/restapi/student/:id", (req, res) => {
    
    students = students.filter(student => student.id !== Number(req.params.id));

    return res.send({students});
});

const server = app.listen(port, (error) => {
    if (error) {
        console.log("Error running on this port", port);
    }
    console.log("Server is running on port", server.address().port);
});