import {useEffect} from "react";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {loadCategory} from "./categorySlice";

export const useLoadCategory = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(loadCategory())
            .unwrap()
            .then(() => {
                toast.success(' 👾  Загрузка категорий выполненна', {
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