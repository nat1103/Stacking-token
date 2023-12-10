import { Address } from "viem";
import Button from "../components/Button";
import Input from "../components/Input";
import checkAddress from "../utils/checkAddress";
import {convertNumberToBigInt} from "../utils/convertNumberToBigInt";
import { useStackingTransfer } from "./wagmi.generated";
import { useState } from "react";
import Card from "../components/Card";

const Transfert = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const { write} = useStackingTransfer({
    args: [
      address as Address,
      convertNumberToBigInt(amount),
    ],
  });


  const handleOnClick = () => {
    checkAddress(address) && write();
  };

  return (
    <Card className="bg-quaternary" title="Transfer Your Token">
        <div className="flex flex-col">
          <label className="text-slate-50">Address</label>
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
          disabled={!write || !address || !amount}
          onClick={() => handleOnClick()}
        >
          Transfer
        </Button>
    </Card>
  );
};

export default Transfert;
