import { useAccount } from "wagmi";
import ConnectButton from "../web3/ConnectButton";
import shortAddr from "../utils/shortAddr";

const Navigation = () => {
    const { address } = useAccount();
  return (
    <nav className="bg-white flex p-4 sticky w-full top-0 h-[8.9vh] items-center">
      <div className="w-1/2">
        <a className="text-xl ">FalzarMoney</a>
      </div>
      <div>
      {address && ( shortAddr(address) || "")}
      </div>
      <div className="w-1/2 inline-flex justify-end">
        <ul className="">
          <li>
            <ConnectButton>Home</ConnectButton>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
