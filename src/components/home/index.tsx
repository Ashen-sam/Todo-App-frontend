import { Box, Typography } from "@mui/material";
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiTodoLine } from "react-icons/ri";
import { toast } from "sonner";
import Input from "./input";
import Modals from "./modals";
import Todos from "./todos";

export type TTodo = {   //data types of the data
    id: number;
    title: string;
    completed: boolean;
    description: string;
}
const API_URL = 'https://localhost:44395/api/todo';

const Home = () => {         //home component
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    // const [currentTodo, setCurrentTodo] = useState<null | TTodo>(null)
    const [todo, setTodo] = useState<TTodo[]>([])
    const [completed, setCompleted] = useState(false)
    const [postInputs, setPostInputs] = useState({
        title: '',
        completed: completed,
        description: '',
    })
    const [values, setValues] = useState({
        id: 0,
        title: "",
        description: '',
    })
    const handleOpen = (task: TTodo) => {
        setOpen(true);
        setValues({
            id: task.id,
            title: task.title,
            description: task.description,

        })
    }
    const addTodo = async (e: any) => {        //addTodo function to post the data to endpoint
        e.preventDefault()
        try {
            if (!postInputs.title || !postInputs.description) return toast.error('Please Enter Title and Description')
            await axios.post(API_URL, postInputs)
            toast.success('Todo added successfully!')
            setPostInputs({
                title: "",
                completed: completed,
                description: ""
            })
            getTodo()

        } catch (error: any) {
            toast.error('Something went wrong')
            throw new Error(error)
        }
    }

    const getTodo = async () => {                      //getTodo funtion for get data from the endpoint
        try {
            const { data } = await axios.get(API_URL)
            setTodo(data)
            console.log(data)
        } catch (error: any) {
            throw new Error('invalid fethcing details' + error)
        }
    }

    useEffect(() => {
        getTodo()
    }, [])

    const deleteTodo = async (id: number) => {                 //deleteTodo function to delete data from the endpoint

        try {
            await axios.delete(`${API_URL}?id=${id}`)
            setTodo(todo.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e: any) => {                    //get the target values and set it to postInputs
        const { value, name } = e.target;
        setPostInputs((prev) => ({ ...prev, [name]: value }))
    }
    const editHandler = (e: any) => {
        const { value, name } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    const editTodo = async (e: SyntheticEvent) => {                //editTodo function to edit the data in the endpoint
        e.preventDefault()
        try {
            await axios.put(`${API_URL}`, { id: values.id, title: values.title, description: values.description })
            console.log(values.id)
            toast.success('Todo edited successfully!')
            getTodo()
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <div className="todo__wrapper flex min-h-screen justify-center mt-[10rem] items-start max-sm:p-3">
                <div className="todo__container container md:max-w-5xl border flex justify-center p-6 shadow-md rounded-lg bg-white ">
                    <div className="title w-full flex flex-col items-center">
                        <h1 className="text-4xl flex gap-5 items-center text-zinc-600 font-semibold mb-5"><RiTodoLine />Let's Work</h1>
                        <Input
                            addTodo={addTodo}
                            handleChange={handleChange}
                            title={postInputs.title}
                            description={postInputs.description}
                            setPostInputs={setPostInputs}
                        />
                        <Todos
                            todo={todo}
                            deleteTodo={deleteTodo}
                            handleOpen={handleOpen}
                        />
                    </div>
                </div>
            </div>
            <Modals
                handleClose={handleClose}
                open={open}
            >
                <Box className='rounded-md max-sm:max-w-[370px] max-sm:p-3   shadow-xl p-10 fixed max-w-[400px] right-1/2 top-1/3 translate-x-1/2  w-full bg-[whitesmoke]' >
                    <form onSubmit={editTodo} className="flex flex-col gap-2 justify-center    w-full" id="modal-modal-title" >
                        <h1 className="text-2xl flex items-center gap-2 my-3 font-semibold text-zinc-700"> <RiTodoLine />Edit Your Tasks</h1>
                        <input
                            value={values.title}
                            type="text"
                            name="title"
                            required
                            onChange={editHandler}
                            className="border w-full max-sm:p-1 border-zinc-300 rounded-md p-2 outline-none"
                            placeholder="Edit Title..." />
                        <textarea
                            value={values.description}
                            name="description"
                            required
                            onChange={editHandler}
                            className="border border-zinc-300 max-sm:p-1 rounded-md p-1 outline-none h-[200px]"
                            placeholder="Edit Description..." />
                        <button
                            className="bg-green-600 hover:bg-green-400  w-full p-2 text-white rounded-md">Save</button>
                    </form>
                    <Typography id="modal-modal-description" >
                        <p className="text-center text-sm">
                            {/* 👋 Hey let's work togather and lets finish your task */}
                        </p>
                    </Typography>
                </Box>
            </Modals >
            <p className=" text-zinc-500 absolute top-3 right-4">designed and developed by: Ashen Sam</p>
        </>
    )
}
export default Home;
