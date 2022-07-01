import {useEffect} from "react";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {loadReport} from "./reportSlice";



export const useLoadReport = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(loadReport())
            .unwrap()
            .then(() => {
                toast.success(' 📈  Загрузка отчётов выполненна', {
                    position: "top-center",
                    autoClose: 2000,
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