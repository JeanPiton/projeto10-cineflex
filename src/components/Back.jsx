import { useNavigate } from "react-router-dom";

export default function Back(){
    const navigate = useNavigate();

    return(
        <ion-icon name="arrow-back-sharp" onClick={()=>navigate(-1)} data-test="go-home-btn"></ion-icon>
    );
}