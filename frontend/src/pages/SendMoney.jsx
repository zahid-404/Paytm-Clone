import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Input, Button, Spinner } from "@nextui-org/react";
import { SuccessToast, ErrorToast, WarningToast } from "../components/Toast";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [transfer, setTransfer] = useState(false);
  const [toast, setToast] = useState({ type: "", msg: "" });

  const intiateTranscation = async () => {
    try {
      if (amount <= 0) {
        setToast({ type: "Warning", msg: "Amount must be greater than 0." });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setToast({ type: "", msg: "" });
        return;
      }

      setTransfer(true);
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTransfer(false);
      setToast({ type: "Success", msg: response?.data?.msg });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setToast({ type: "", msg: "" });
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTransfer(false);
      setToast({ type: "Error", msg: error?.response?.data?.msg });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setToast({ type: "", msg: "" });
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center items-center relative">
        {toast.type === "Success" && <SuccessToast msg={toast?.msg} />}
        {toast.type === "Warning" && <WarningToast msg={toast?.msg} />}
        {toast.type === "Error" && <ErrorToast msg={toast?.msg} />}
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-4 pt-6">
                <Input
                  type="number"
                  label="Enter Amount"
                  placeholder="0"
                  isRequired
                  labelPlacement="outside"
                  onValueChange={setAmount}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">₹</span>
                    </div>
                  }
                />
              </div>
              <div className="flex flex-col space-y-4 justify-center">
                {transfer ? (
                  <Spinner label="Processing Payment..." color="warning" />
                ) : (
                  <Button
                    onClick={() => intiateTranscation()}
                    color="primary"
                    className="text-white w-full bold text-xl"
                  >
                    Initiate Transfer
                  </Button>
                )}
                <Button
                  color="warning"
                  className="text-white w-full bold text-xl"
                >
                  <Link to={"/dashboard"}>Back to Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
