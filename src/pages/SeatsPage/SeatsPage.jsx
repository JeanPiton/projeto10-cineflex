import styled from "styled-components"
import axios from "axios"
import { useState,useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import Seat from "../../components/Seat";

export default function SeatsPage(props) {
    const params = useParams();
    const navigate = useNavigate();
    const [session,setSession] = useState(null);
    const [selected,setSelected] = useState([]);
    const [name,setName] = useState("");
    const [cpf,setCpf] = useState("");

    useEffect(()=>{
        props.changePath(`/sessoes/${props.page}`);
        const request = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`);
        request.then(r => {
            console.log(r.data);
            setSession(r.data);
        })
    },[]);

    const nameChange = event => {
        setName(event.target.value);
    }

    const cpfChange = event => {
        setCpf(event.target.value);
    }

    function Select(id){
        let list = [...selected];
        if(list.includes(id)){
            list = selected.filter(e=>e!=id);
        }else{
            list.push(id);
        }
        setSelected(list);
    }

    function Reserve(){
        const message = {ids:selected, name, cpf};
        const seatIds = selected.map(e=>session.seats.findIndex(s=>s.id==e));
        const seatName = seatIds.map(e=>session.seats[e].name);
        console.log(message);
        const promisse = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", message)
        promisse.then(response => {
            console.log(response);
            props.func({movie:session.movie.title, day:session.day.date, time:session.name, seats:seatName, name, cpf});
            navigate("/sucesso");
        })
    }

    if(session === null){
        return <p>loading</p>;
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session.seats.map(e=><Seat name={e.name} available={e.isAvailable} key={e.id} id={e.id} select={selected.includes(e.id)?true:false} func={Select}/>)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle $selected/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle $avaible/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." value={name} onChange={nameChange}  data-test="client-name"/>

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." onChange={cpfChange} value={cpf} data-test="client-cpf"/>

                <button onClick={Reserve} data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={session.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{session.movie.title}</p>
                    <p>{session.day.weekday} - {session.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid;
    border-color: ${props=>props.$selected?"#0E7D71":props.$avaible?"blue":"#F7C52B"};
    background-color: ${props=>props.$selected?"#1AAE9E":props.$avaible?"lightblue":"#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`