import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const useAuth = () => {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        user && user.displayName ? setUsername(user.displayName) : null;
    }, []);

    return [username, setUsername];
}

export default useAuth;