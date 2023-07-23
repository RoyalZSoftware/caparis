import { useDependencies } from "../infrastructure/deps";
import LoginScreen from "./login";

export default function AuthGuard({children}) {
    const {userRepository} = useDependencies();

    if (userRepository.currentUser == undefined) return (<LoginScreen></LoginScreen>);

    return children;
}