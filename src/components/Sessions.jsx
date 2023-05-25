import styled from "styled-components"
import { Link } from "react-router-dom";

export default function Sessions(props){
    const times = [...props.times]

    return(
        <SessionContainer>
            {props.weekday} - {props.date}
            <ButtonsContainer>
                {times.map(e=> <Link to={`/assentos/${e.id}`} key={e.id}><button>{e.name}</button></Link>)}
            </ButtonsContainer>
        </SessionContainer>
    );
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`