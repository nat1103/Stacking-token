import { Address, useAccount } from "wagmi";
import Card from "../components/Card"
import { useStackingCalculateReward } from "./wagmi.generated"
import { convertBigIntToNumber } from "../utils/convertNumberToBigInt";


const Reward = () => {
    const { address } = useAccount();
    const { data } = useStackingCalculateReward({
    args: [
        address as Address,
    ],
    });
  return (
    <Card title="Stacking transaction">
      <div className="flex flex-col text-slate-50">
        <p>Your reward is {convertBigIntToNumber(data)} FMY</p>
      </div>
    </Card>
  )
}

export default Reward