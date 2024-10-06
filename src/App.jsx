import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {v4 as uuidv4 } from 'uuid'
import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const [showFinished, setshowFinished] = useState(true)

  const toggleFinished=(e) => {
    setshowFinished(!showFinished)
  }
  

  

  // useEffect(() => {
  //   let todoString=localStorage.getItem("todos")
  //   if(todoString){
  //   let todos=JSON.parse(localStorage.getItem("todos"))
  //   setTodos(todos)
  //   }
  
  // }, [])

   // Load todos from localStorage on component mount
   useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const todosFromStorage = JSON.parse(todoString);
      setTodos(todosFromStorage);
    }
  }, []);

  // Save todos to localStorage whenever 'todos' changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
      // Scroll to the bottom of the todos container ------------------this line in for SCROLL TO VIEW
      const todosContainer = document.querySelector('.todos-container');
      if (todosContainer) {
        todosContainer.scrollTop = todosContainer.scrollHeight;
      }
    }
  }, [todos]);

  const saveToLS=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    // saveToLS()
   

  }

  const handleDelete=(e,id)=>{
    console.log(e,id)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    // saveToLS()

    
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}]);
    setTodo("");
    // saveToLS()

  }
  

  const handleChange=(e)=>{
    setTodo(e.target.value)
    
  }

  const handleCheckbox=(e) => {
    console.log(e,e.target)
    let id = e.target.name;
    let index= todos.findIndex(item=>{
      return item.id ===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    // saveToLS()

  }
  

  return (
    <>
    <Navbar/>
    <div className="mx-3 sm:container sm:mx-auto my-5 rounded-xl p-6  bg-violet-100 min-h-[80vh] sm:w-4/6 overflow-hidden scroll-m-1">
        <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} type="text" value={todo}  className='w-full rounded-lg px-5 py-2 '/>
          <button onClick={handleAdd} disabled={todo.length<=1} value={todo} className='bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md cursor-pointer'>Save</button>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} name=""  />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <h1 className='h-[1px] bg-black opacity-10 w-11/12 mx-auto my-2'></h1>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos todos-container">
          {todos.length===0 && <div className='m-5 '>No Todos To Display</div>}
          {todos.map(item=>{

          
           return (showFinished || !item.isCompleted) &&<div key={item.id} className="todo flex w-full justify-between my-3">
            <div className='flex gap-5'>
            <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through todo-text ":" todo-text " }>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
            </div>
          </div>
          })}
        </div>
        
    </div>
    
    </>
  )
}

export default App
