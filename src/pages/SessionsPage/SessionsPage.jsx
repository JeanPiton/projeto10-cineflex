import styled from "styled-components"
import axios from "axios"
import { useState,useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import Sessions from "../../components/Sessions";

export default function SessionsPage(props) {
    const [sessions,setSessions] = useState(null);
    const params = useParams();

    useEffect(()=>{
        props.changePath("/");
        const request = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${params.idFilme}/showtimes`);
        request.then(r => {
            console.log(r.data);
            setSessions(r.data);
        })
    },[]);

    if(sessions==null){
       return <p>loading</p>
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessions.days.map(e=>
                    <Sessions weekday={e.weekday} date={e.date} times={e.showtimes} key={e.id}/>
                )}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessions.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessions.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
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