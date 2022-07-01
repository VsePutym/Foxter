import Headers from "./components/Headers";
import Menu from "./components/Menu/Menu";
import useMenu from "./components/Menu/useMenu";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import {Container} from "@mui/material";
import Statistic from "./Features/Statistic/Statistic";
import CreateCategory from "./Pages/CreateCategory";




function App() {
    const MenuDrawer = useMenu();

    return (
        <>
            <Headers openMenu={() => MenuDrawer.setOpenMenu(true)}/>
            <Container>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/statistic' element={<Statistic/>}/>
                    <Route path='/createCategory' element={<CreateCategory/>}/>
                </Routes>
            </Container>
            <Menu closeMenu={() => MenuDrawer.setOpenMenu(false)} openMenu={MenuDrawer.openMenu}/>
        </>
    );
}

export default App;
