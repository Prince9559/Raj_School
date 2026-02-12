
import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [submitID, setSubmitID] = useState(null);
    
    
    
    return (
        <UserContext.Provider value={{ user, setUser, submitID, setSubmitID }}>
        {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;