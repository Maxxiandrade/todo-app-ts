import { useState } from "react"
import Todos from "./components/Todos/Todos"
import { FilterValue, TodoId, TodoTitle, type Todo as TodoType } from "./components/Todos/types"
import { TODO_FILTERS } from "./components/Todos/consts"
import { Footer } from "./components/Todos/Footer"
import Header from "./Header"

const mockTodos = [
{ 
  id:'1',
  title:'Jugar cs',
  completed: true
},
{ 
  id:'2',
  title:'Jugar lol',
  completed: false
},
{ 
  id:'3',
  title:'Aprender TS',
  completed: false
},
{ 
  id:'4',
  title:'Hacer un proyecto con ts',
  completed: false
}
]

const App = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}:TodoId)=>{
    const newTodos = todos.filter(todo=>todo.id !== id)
    setTodos(newTodos)
  }
  
  const handleFilterChange = (filter: FilterValue):void=>{

    setFilterSelected(filter)
  }

  const filteredTodos = todos.filter(todo=>{
    if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })
  const handleCompleted = ({id, completed} : Pick<TodoType, 'id'| 'completed'>):void=>{
      const newTodos = todos.map(todo=>{
        if(todo.id === id){
          return{
            ...todo,
            completed
          }
        }
        return todo
      })
      setTodos(newTodos)
  }
  const handleRemoveCompleted = ()=>{
    const newTodos = todos.filter((todo)=>!todo.completed)
    setTodos(newTodos)
  }
  const activeCount = todos.filter(todo=>!todo.completed).length
  const completedCount = todos.length - activeCount
  const handleAddTodo = ({title}:TodoTitle):void=>{
    const newTodo ={
      title,
      id: crypto.randomUUID(),
      completed:false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }
  return (
    <>
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}/>
     <Todos 
     onRemoveTodo={handleRemove}
     onToggleCompleted={handleCompleted}
     todos={filteredTodos}/>
     <Footer
     activeCount={activeCount}
     completedCount={completedCount}
     filterSelected={filterSelected}
     onClearCompleted={handleRemoveCompleted}
     handleFilterChange={handleFilterChange}
     />
    </div>
    </>
  )
}

export default App
