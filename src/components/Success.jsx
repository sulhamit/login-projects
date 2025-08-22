import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export default function Success() {

    function handleTurnBack() {
        const history = useHistory();
        history.push("/");
    }
    return (
        <div >
            <h1>Login Successful!</h1>
            <Button className="w-100" onClick={handleTurnBack}>Turn Back</Button>   </div>)
}