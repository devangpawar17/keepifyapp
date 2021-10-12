import { useState } from "react";
import NoteContext from "./NotesContext";

const NoteState = (props) => {
  const host = process.env.HOST
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const[username,setUserName] = useState("")

  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
   
    setNotes(json);
  };

  const getUser = async() =>{
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setUserName(json.name)
    
  }

  //add a note

  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()
    setNotes(notes.concat(note));

  };

  //delete a note

  const deleteNote = async(id) => {
//api call


const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem('token')
  },
 
});
 await response.json();


    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note

  const editNote = async (id, title, description, tag) => {
    //api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json();
   

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      }
    
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes,username, addNote, deleteNote, editNote, getNotes,getUser }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
