import React from "react";
import { useContext } from 'react';
import NoteContext from "../context/notes/NotesContext";

const NoteItem = (props) => {
  const { note,updateNote } = props; 
  const context = useContext(NoteContext)
  const {deleteNote} = context
  var d=new Date(note.date)
  var time = d.toLocaleString()
  
  
  return (
    
    <div className="col-md-3 my-3">
      <div className="card note-item" >
        <div className="card-body">         
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fas fa-trash-alt " onClick={()=>{deleteNote(note._id);
             props.showAlert('Deleted successfully',"success")
          }}></i>
          <i className="far fa-edit mx-3" onClick={()=>{updateNote(note);
          }}></i>
           <p className="time">{time}</p>
        </div>
      </div>
    </div>
    
  );
};

export default NoteItem;
