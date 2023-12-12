import { useState } from "react";
import { useStackingApprove } from "./wagmi.generated";
import { Address } from "viem";
import { convertNumberToBigInt } from "../utils/convertNumberToBigInt";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

const Approve = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { write, error } = useStackingApprove({
    args: [address as Address, convertNumberToBigInt(amount)],
  });

  const handleOnClick = () => {
    if (amount <= 0) {
      setErrorMsg("Amount must be greater than 0");
      return;
    }
    if (error) {
      setErrorMsg(error.message);
    } else {
      write({});
    }
  };
  return (
    <>
      <Card title="Approve transaction">
        <div className="flex flex-col">
          <label className="text-slate-50">Address From</label>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-slate-50">Amount</label>
          <Input
            type="text"
            value={amount.toString()}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <Button
          className="mt-4"
          disabled={!write || !address || !amount}
          onClick={() => handleOnClick()}
        >
          Approve
        </Button>
      </Card>
      {error && <div className="text-red-500 absolute bottom-24">{errorMsg}</div>}
    </>
  );
};

export default Approve;
