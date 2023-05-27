import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import Back from "./components/Back"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

export default function App() {
    const [order,setOrder] = useState();
    const [backPage,setBackPage] = useState("");

    function Path(p){
        setBackPage(p);
    }

    function Order(cineOrder){
        setOrder(cineOrder);
        console.log(`order: ${cineOrder}`);
    }

    return (
        <BrowserRouter>
           <NavContainer>
                <BackButton $path={backPage}><Back/></BackButton>
                <p>CINEFLEX</p>
                <BackButton></BackButton>
            </NavContainer>
            <Routes>
                <Route path='/' element={<HomePage changePath={Path}/>}/>
                <Route path='/sessoes/:idFilme' element={<SessionsPage changePath={Path}/>}/>
                <Route path='/assentos/:idSessao' element={<SeatsPage func={Order} changePath={Path}/>}/>
                <Route path='/sucesso' element={<SuccessPage order={order} changePath={Path}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
const BackButton = styled.div`
    width: 70px;
    margin: 0 20px;
    visibility: ${props=>props.$path==""?"hidden":"visible"};
`