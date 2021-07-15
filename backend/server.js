const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin-akash:Test123@cluster0.znf1v.mongodb.net/keeperDB", {useNewUrlParser: true, useUnifiedTopology: true});

const noteSchema = mongoose.Schema({
    title: String,
    content: String
})

const Note = mongoose.model("Note", noteSchema);

app.get("/notesget", (req, res)=> {
    Note.find().then(notes => res.json(notes));
})

app.post("/notespost", (req, res)=> {
    const newNote = Note(req.body);
    newNote.save();
    res.send("Added")
})

app.delete("/notesdelete/:id", (req, res)=> {
    const id = req.params.id;
    Note.findOneAndDelete({_id: id}, (err, docs) => {
        res.send("Deleted");
    });
})

if(process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("*", (req,res)=> {
        res.sendFile(path.resolve(__dirname, "fontend", "build", "index.html"));
    } )
}

app.listen(process.env.PORT || 4000, ()=> {
    console.log("Server started at 4000");
})