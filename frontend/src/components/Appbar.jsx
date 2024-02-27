import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  User,
  Spinner,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import paytmLogo from "../assets/paytm.png";
import { useState } from "react";

export default function Appbar({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/signin");
      setLoading(false);
    }, 2000);
  };

  return (
    <Navbar>
      {loading ? (
        <Spinner label="Logged Out" color="danger" labelColor="danger" />
      ) : (
        <NavbarBrand>
          <img src={paytmLogo} width={80} height={80} />
        </NavbarBrand>
      )}

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User name={user.firstName} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.username}</p>
            </DropdownItem>
            <DropdownItem onClick={() => logout()} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
