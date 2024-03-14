import { type TodoId, type Todo as TodoType} from "./types"

interface Props extends TodoType{
    onToggleCompleted: ({id, completed} : Pick<TodoType, 'id'| 'completed'>) => void
    onRemoveTodo: ({id}:TodoId)=> void 
}


const Todo:React.FC<Props> = ({id, title, completed, onRemoveTodo, onToggleCompleted}) => {
  return (
    <div>
        <input 
        className="toggle"
        checked={completed}
        type="checkbox" 
        onChange={(e)=>{
            onToggleCompleted({id, completed: e.target.checked})
        }}/>
        <label htmlFor="">{title}</label>
        <button className="destroy"
        onClick={()=>{onRemoveTodo({id})}}></button>
    </div>
  )
}

export default Todo