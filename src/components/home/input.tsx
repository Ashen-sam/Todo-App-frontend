import { MdOutlineAddCircle } from "react-icons/md";

const Input = ({ addTodo, title, description, setPostInputs, handleChange }:
    { addTodo: (e: any) => void; title: string; description: string; setPostInputs: (e: any) => void; handleChange: (e:any) => void }) => {
    return (
        <>
            <form
                onSubmit={addTodo}
                className=" max-w-[1000px] w-full flex justify-center gap-4 max-sm:flex-col">
                <input
                    type="text"
                    className="border rounded-lg p-2 outline-none w-full px-3 "
                    placeholder="Add New Task..."
                    value={title}
                    name="title"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="border rounded-lg p-2 outline-none w-full px-3 "
                    placeholder="Add Description..."
                    value={description}
                    name="description"
                    onChange={handleChange}
                />
                <button
                    className="bg-blue-900 text-xl hover:bg-blue-600 rounded-lg flex justify-center max-sm:p-3  text-[whitesmoke] p-4"><MdOutlineAddCircle /></button>
            </form>
        </>
    )
}
export default Input;