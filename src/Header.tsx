import CreateTodo from "./CreateTodo"
import { TodoTitle } from "./components/Todos/types"

interface Props{
    onAddTodo:({title}:TodoTitle)=>void
}

const Header: React.FC<Props> = ({onAddTodo}) => {
  return (
    <header className="header">
        <h1>To do App</h1>
        <CreateTodo saveTodo={onAddTodo}/>
    </header>
  )
}

export default Header