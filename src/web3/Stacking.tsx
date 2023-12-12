import { useState } from "react";
import { useStackingStake } from "./wagmi.generated";
import {convertNumberToBigInt} from "../utils/convertNumberToBigInt";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

const Stacking = () => {

  const [amount, setAmount] = useState<number>(0);

  const { write } = useStackingStake({
    args: [convertNumberToBigInt(amount)],
  });
  return(
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
        onClick={() => write()}
      >
        Stake
      </Button>
    </Card>
  );
};

export default Stacking;
