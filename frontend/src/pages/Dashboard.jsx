import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
const Dashboard = () => {
  const [balance, setBalance] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/user/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchBalance();
    fetchUser();
  }, []);

  return (
    <>
      <Appbar user={user} />
      <div className="m-8">
        <Balance balance={balance} />
        <Users signedInUser={user} />
      </div>
    </>
  );
};

export default Dashboard;
