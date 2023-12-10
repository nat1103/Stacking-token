import { useState } from "react"
import { useStackingApprove } from "./wagmi.generated"
import { Address } from "viem"
import {convertNumberToBigInt} from "../utils/convertNumberToBigInt"
import Input from "../components/Input"
import Button from "../components/Button"
import Card from "../components/Card"

const Approve = () => {
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState<number>(0)
    const {write} = useStackingApprove({
    args: [
      address as Address,
      convertNumberToBigInt(amount),
    ],
    })
  return (
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
          disabled={!write || !address || !amount}
          onClick={() => write()}
        >
          Approve
        </Button>
    </Card>
  )
}

export default Approve