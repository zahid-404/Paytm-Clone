import paytmLogo from "../assets/paytm.png";
import { Button, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/user/me",
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

    fetchUser();
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-50">
        <div>
          <div className="w-full bg-black  opacity-90 h-20 flex justify-between ">
            <div className="w-full lg:w-30/6 xl:w-full  h-full flex items-center px-4 ">
              <img
                className="rounded-lg w-32"
                src={paytmLogo}
                alt="addify logo"
              />
            </div>
            {isLoggedIn && (
              <div className="w-full mr-16 text-white h-full flex justify-end items-center">
                <User
                  name={user?.firstName}
                  description={user?.username}
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
        <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
            <h2 className="text-4xl font-bold sm:text-5xl">
              India&apos;s Slowest Payment Gateway
            </h2>

            <div className="space-x-8 ">
              {isLoggedIn ? (
                <>
                  <Button
                    color="primary"
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsLoggedIn(false);
                    }}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button color="primary" onClick={() => navigate("/signup")}>
                    SignUp
                  </Button>
                  <Button color="primary" onClick={() => navigate("/signin")}>
                    SignIn
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
          <img className="w-96" src="https://i.ibb.co/5BCcDYB/Remote2.png" />
        </div>
      </aside>

      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="sahilnetic"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#FFDD00"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      ></script>
    </div>
  );
}

export default Landing;
