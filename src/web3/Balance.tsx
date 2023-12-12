import { Address, useAccount } from 'wagmi';
import Card from '../components/Card'
import { useStackingBalanceOf } from './wagmi.generated'
import { convertBigIntToNumber } from '../utils/convertNumberToBigInt';

const Balance = () => {
    const { address } = useAccount();
    const {data} = useStackingBalanceOf({
    args: [
      address as Address,
    ],
    })
  return (
    <Card title="Balance">
            <p className="text-slate-50 text-xl text-center">{convertBigIntToNumber(data)} FMY</p>
    </Card>
  )
}

export default Balance