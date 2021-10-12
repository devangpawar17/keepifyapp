import React,{useState,useEffect} from 'react'
import NoteContext from "../context/notes/NotesContext";
import { useContext } from 'react';

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote,getUser,username} = context

    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert('Note Added successfully',"success")
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }


 
  useEffect(() => {
  getUser()
  }, [getUser]);



    return (
        <div>
         
               <div className="container my-3">
               <h4 className="username">Hello {username} <img id="hello" src="hello.gif" alt="hello" /> </h4>
      <h2>Add a note</h2>

      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}value={note.title}
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
           Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
           Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}value={note.tag}
          />
        </div>
        <button disabled={note.title<5 || note.description<5 } onClick={handleClick} type="submit" className="btn ">
          Add Note
        </button>
      </form>
      </div>
        </div>
    )
}

export default AddNote
