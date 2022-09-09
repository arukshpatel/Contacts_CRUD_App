const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");


const ContactModel = require("./models/ContactModel")
const path = require("path");

app.use(express.json())

app.use(cors({
    origin: '*'
             }));

mongoose.connect(
    'mongodb+srv://AllTechProj:kd8f3GUpkF99AnuZ@cluster0.ekp3t93.mongodb.net/contacts?retryWrites=true&w=majority',
    {
    useNewUrlParser: true,
}
)

/**
 * Server Intro Page
 */
app.get('/', (req, res) =>{

    res.sendFile(path.join(__dirname,'/index.html'));
})


/**
 * Phonebook App
 */
app.get('/app',(req, res) => {
    res.sendFile(path.join(__dirname,'/reactBuild','/build','/index.html'));
})

/**
 * Manifest file for Phonebook App
 */
app.get('/manifest.json', (req, res)=> {
    res.sendFile(path.join(__dirname,'/reactBuild','/build','/manifest.json'));
})

/**
 * JS File for Phonebook App
 */
app.get('/static/js/main.908fd0fa.js', (req, res) => {
    res.sendFile(path.join(__dirname,'/reactBuild','/build','/static','/js','/main.908fd0fa.js'));
})

/**
 * CSS File for Phonebook App
 */
app.get('/static/css/main.134f897b.css',(req, res) => {
    res.sendFile(path.join(__dirname,'/reactBuild','/build','/static','/css','/main.134f897b.css'));
})


/**
 * API - Add contact
 */
app.post('/api/addContact', async (req, res) =>
{

    const fName = req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1);
    const lName = req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1).toLowerCase();
    const phoneNum = req.body.phoneNumber;

    const contactItem = new ContactModel({firstName: fName, lastName: lName, phoneNumber: phoneNum});

    try{
        await contactItem.save().then(()=>{
            console.log("ADDED CONTACT:\n" + contactItem);
            res.status(200);
            res.json(contactItem);
        }).catch(() => {
            res.status(500);
            res.send("failed");
        });
    } catch (err)
    {
        res.status(406);
        res.send("FAILED");
    }

})

/**
 * API - Get all contacts
 */
app.get('/api/allContacts',(req, res) =>
{
    ContactModel.find({}, (err, result) => {

        if(err)
        {
            res.send(err);
        }

        res.send({"contacts": result});
    })

})

/**
 * API - Update a contact given an id
 */
app.put('/api/updateContact', (req, res) =>{

    const fName = req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1);
    const lName = req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1);
    const phoneNum = req.body.phoneNumber;

    ContactModel.findByIdAndUpdate(req.body._id, {firstName: fName, lastName: lName, phoneNumber: phoneNum} , (err, obj) =>
    {
        if (err)
        {
            res.status(500);
            res.send("FAILED TO UPDATE");
        }else if (err === null && obj === null)
        {
            res.status(400)
            res.send("Please check input id");
        }else {

            res.sendStatus(200);
        }

    });

})

/**
 * API - Delete a contact given an id
 */
app.delete('/api/delete/contact',(req, res) => {



    ContactModel.findByIdAndDelete(req.body._id, (err,obj) => {
        if(err)
        {
            res.status(500);
            res.send("Not possible to delete");
        }else if(err === null && obj === null)
        {
            res.status(400);
            res.send("Contact not found");
        }else {
            res.sendStatus(200);
        }
    });
})

app.listen(8000, () => {console.log("Server started on port 8000. Visit http://localhost:8000 for more info.")})