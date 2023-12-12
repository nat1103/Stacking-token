import { useState } from "react";
import { useStackingApprove, useStackingStake } from "./wagmi.generated";
import { convertNumberToBigInt } from "../utils/convertNumberToBigInt";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

const Stacking = () => {
  const [amount, setAmount] = useState<number>(0);

  const { write } = useStackingStake({
    args: [convertNumberToBigInt(amount)],
  });

  const { write: writeApprove, error } = useStackingApprove({
    args: [
      '0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC',
      convertNumberToBigInt(amount),
    ],
  });

  const handleOnClick = () => {
    if (error && error.message.includes("User denied transaction signature")) {
      return;
    }
    writeApprove();
    write();
  };
  return (
    <>
      <Card title="Stacking transaction">
        <div className="flex flex-col">
          <label className="text-slate-50">Amount</label>
          <Input
            type="text"
            value={amount.toString()}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <Button
          disabled={!write || (!amount && amount <= 0)}
          onClick={() => handleOnClick()}
        >
          Stake
        </Button>
      </Card>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default Stacking;
