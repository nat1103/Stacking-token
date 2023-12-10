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
    <Card title="Balance" className='mt-4 bg-black w-56'>
        <div className="flex flex-col text-slate-50">
            <p className="text-slate-50">{convertBigIntToNumber(data)} FMY</p>
        </div>
    </Card>
  )
}

export default Balance