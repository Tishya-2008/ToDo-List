import React, { useState, useEffect } from 'react'

const ToDo = () => {
    const [ToDos, setToDos] = useState(() => {
        const storeToDos = localStorage.getItem('ToDos');
        return storeToDos ? JSON.parse(storeToDos) : [];
    })

    const [newToDo, setNewToDo] = useState("");

    //input change
    const handleChange = (event) => {
        setNewToDo(event.target.value);    
    }

    //form submission
    const handleSubmission = (event) =>{
        event.preventDefault();
        if (newToDo.trim() === "") return;   
        setToDos([...ToDos, newToDo]);
        setNewToDo("");
    }

    const handleDelete = (index) => {
        const updateToDos = ToDos.filter((ToDo, i) => i !== index);
        setToDos(updateToDos);
    }

    const handleCompletion = (index) => {
        const updateToDos = ToDos.map((ToDo, i) =>
        i === index? {...ToDo, completed: !ToDo.completed}: ToDo);
        setToDos(updateToDos);
    } 

    useEffect(() => {
        localStorage.setItem("ToDos", JSON.stringify(ToDos));
    }, [ToDos]);

return(
    <div>
        <h1>To-Do List</h1>
        <form onSubmit = {handleSubmission}>
            <input type="text" placeholder="Add new task" value = {newToDo} onChange = {handleChange}/>
            <button type="submit">Add task</button>
        </form>
        <ul>
            {ToDos.map((ToDo, index) => (

            <p key={index}>{ToDo}
            <button onClick = {() => handleDelete(index)}>Delete</button>
            </p>
            ))}
            
        </ul>
    </div>
)}


export default ToDo;