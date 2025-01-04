import Navbar from "../components/navbar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editId, setEditId] = useState(null);
    
    const [submitButton,setSubmitButton] = useState(false);

    useEffect(() => {
        // Fetch notes from the Django API
        axios.get('http://localhost:8000/api/notes/')
            .then(response => {
                setNotes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the notes!', error);
            });
    }, []);

    const showSubmit = () =>{
      setSubmitButton(true);

    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setSubmitButton(false)
        const newNote = { title, content }; 
        
        axios
          .post("http://localhost:8000/api/notes/", newNote) // POST request
          .then((response) => {
            setNotes([...notes, response.data]); // Update notes list with new note
            setTitle(""); // Clear the title input
            setContent(""); // Clear the content input
          })
          .catch((error) => {
            console.error("There was an error creating the note!", error);
          });
    };

    const handleEdit = (note) => {
        setEditId(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleDelete = (note) => {
        axios
            .delete(`http://localhost:8000/api/notes/${note.id}/`)
            .then(() => {
                const updatedNotes = notes.filter((i) => i.id !== note.id);
                setNotes(updatedNotes);
            })
            .catch((error) => {
                console.error("There was an error deleting the note!", error);
            });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault(); 
        const tempNote = {title, content};
        
        axios.put(`http://localhost:8000/api/notes/${editId}/`, tempNote)
          .then((response) => {
            const updatedNotes = notes.map(note => {
              if(note.id === editId) {
                return response.data
              } else {
                return note;
              }
            });
            setNotes(updatedNotes);
            setTitle("");
            setContent("");
            setEditId(null);
          })
          .catch((error) => {  // Don't forget error handling
            console.error("Error updating note:", error);
          });
    };

    return (
        <>
            <Navbar />
            <h1 className="text-orange-300 text-center text-6xl mb-9 mt-9 font-custom"> Notes</h1>
            {notes.map(note => (
                <div key={note.id} className="max-w-[90%] mx-auto bg-green-100 shadow-md rounded-lg mb-4 p-4 transform transition-transform duration-300 ease-in-out hover:scale-[102%]">
                    <div className="space-y-3">
                        <h2 className="text-gray-400/100 text-3xl font-medium font-custom">{note.title}</h2>
                        <p className="text-gray-600 font-medium text-xl font-custom">{note.content}</p>
                        <p className="font-medium text-l font-custom">Created at: {note.date}</p>

                        <div className="flex justify-end space-x-2">
                            <button 
                                type="button" 
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleEdit(note)}
                            >
                                Edit
                            </button> 
                            <button 
                                type="button" 
                                className="bg-red-500 text-white py-2 px-4 rounded"
                                onClick={() => handleDelete(note)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                
            ))}
             <div class="flex items-center justify-center h-full">
                  <button class="text-center flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500" onClick={()=>showSubmit()}>
                       Add a new note
                   </button>
              </div>

              {submitButton && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96 space-y-4">
            <div>
              <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
              <input 
                type="text" 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
              <textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
    <button 
      type="submit" 
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      
    >
      Submit
    </button>
    <button 
      type="button"  // Change to type="button" to prevent form submission
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
      onClick={() => { setSubmitButton(false)}}
    >
      Cancel
    </button>
  </div>
          </form>
        </div>
      )}
           

  {editId && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 relative">
      {/* Close button in top-right corner */}
      <button
        onClick={() => {
          setEditId(null);
          setContent("");
          setTitle("");
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Note</h2>

      <form onSubmit={handleSubmitEdit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-32"
          ></textarea>
        </div>

        <div className="flex space-x-2 pt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => {
              setEditId(null);
              setContent("");
              setTitle("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
        </>
    );
};

export default Note;
