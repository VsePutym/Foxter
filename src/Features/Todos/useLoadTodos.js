import {useEffect} from "react";
import {loadTodos} from "./todosSlice";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";

export const useLoadTodos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(loadTodos())
            .unwrap()
            .then(() => {
                toast.success('🦄 Upload was successful', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((err) => {
                toast.error(() => {
                    console.log(err)
                })
            })

    },[dispatch])
}