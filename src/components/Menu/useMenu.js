import {useState} from "react";

const useMenu = () => {
    const [openMenu, setOpenMenu] = useState(false);
    return {openMenu, setOpenMenu}
}

export default useMenu;