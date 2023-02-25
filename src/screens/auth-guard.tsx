import { useContext } from "react";
import { UserContext } from "../infrastructure/user-context";
import LoginScreen from "./login";

export default function AuthGuard({children}) {
    const {user} = useContext(UserContext);

    if (user == undefined) return (<LoginScreen></LoginScreen>);

    return children;
}