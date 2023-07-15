import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        setUser(response.data);
        setReady(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setReady(true);
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
