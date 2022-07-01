import {useEffect} from "react";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {createCategory} from "./categorySlice";

export const useLoadCategory = (dataCategory) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(createCategory(dataCategory))
            .unwrap()
            .then(() => {
                toast.success(' 🐼  Loading category successful', {
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