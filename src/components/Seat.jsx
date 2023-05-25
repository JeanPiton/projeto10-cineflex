import styled from "styled-components"

export default function Seat(props){

    function Selected(){
        if(props.available){
            props.func(props.id);
        }else{
            alert("Esse assento não está disponível");
        }
    }

    return(
        <SeatItem $avaible={props.available} $selected={props.select} onClick={()=>Selected()}>
            {props.name}
        </SeatItem>
    );
}

const SeatItem = styled.div`
    border: 1px solid;
    border-color: ${props=>props.$selected?"#0E7D71":props.$avaible?"blue":"#F7C52B"};
    background-color: ${props=>props.$selected?"#1AAE9E":props.$avaible?"lightblue":"#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`