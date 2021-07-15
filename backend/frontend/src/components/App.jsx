import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  
  useEffect(()=>{
    axios.get("/notesget").then(res => setNotes(res.data));
  })
  

  function addNote(newNote) {
    axios.post("/notespost", newNote).then(res => console.log(res.data));
  }

  function deleteNote(id) {
    axios.delete("/notesdelete/"+id).then(res => console.log(res.data));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
