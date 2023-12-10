import { type FC } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
interface ConnectButtonProps {}

const ConnectButton: FC<ConnectButtonProps> = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  return (
    <>
      {!isConnected || !address ? (
        <>
          <button className='bg-red-900 hover:text-slate-200 p-1 rounded-md text-slate-50' onClick={() => connect({ connector: connectors[0]! })}> Disconnected </button>
        </>
      ) : (
        <>
          <button className='bg-lime-700 hover:text-slate-200 p-1 rounded-md text-slate-50' onClick={() => disconnect()}>Connected</button>
        </>
      )}
    </>
  );
};

export default ConnectButton;