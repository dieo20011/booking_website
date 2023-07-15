import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { PlacesPage } from "./PlacesPage";
import { AccountNav } from "../AccountNav";

export const ProfilePage = () => {
  const [redirect, setRedirect] = useState(false);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage = "profile" } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user, setUser]);

  async function logout() {
    await axios.post("/api/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }


  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-xl mx-auto mt-4 w-64">
          Logged in as {user.name} ({user.email}) <br />
          <button
            className="primary text-white py-2 px-4 mt-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};
