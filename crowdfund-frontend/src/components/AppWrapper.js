import App from "../App";
import {AuthProvider} from "../context/AuthContext";

function AppWrapper() {
    return (<AuthProvider><App/></AuthProvider>);
}

export default AppWrapper;