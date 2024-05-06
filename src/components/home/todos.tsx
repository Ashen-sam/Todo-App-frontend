import { MdDelete, MdEditSquare } from "react-icons/md";
import { TTodo } from '.';


const Todos = ({ todo, deleteTodo, handleOpen }:
    { todo: TTodo[], deleteTodo: (id: number) => void; handleOpen: (task: TTodo) => void }) => {
    
    return (
        <>
            <ul  className="max-w-[1000px] w-full flex justify-center flex-col">
                {todo.map((task) => {
                    return (

                        <li key={task.id} className="flex w-full border justify-between items-center bg-[#fafafa] rounded-lg my-2 p-3 max-[350px]:flex-col">
                            <div className="flex items-center gap-2 ">
                                {/* <input
                                    type="checkbox"
                                    className="h-3 w-3"
                                    checked={task.completed}
                                /> */}
                                <div>
                                    <p className={`${task.completed ? 'line-through' : ''}`}> {task.title}</p>
                                    <small className="text-zinc-900">{task.description}</small>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        handleOpen(task)
                                        console.log(task)
                                    }}
                                    className="bg-green-600 hover:bg-green-500 text-[whitesmoke] max-sm:p-2  p-3 rounded-md">
                                    <MdEditSquare />
                                </button>
                                <button
                                    onClick={() => deleteTodo(task.id)}
                                    className="bg-red-600 hover:bg-red-500 text-[whitesmoke]  max-sm:p-2  p-3 rounded-md">
                                    <MdDelete />
                                </button>

                            </div>
                        </li>
                    )
                })}
            </ul>

        </>
    )
}
export default Todos