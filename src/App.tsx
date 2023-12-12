import {
  ArrowsRightLeftIcon,
  BanknotesIcon,
  CheckCircleIcon,
  CircleStackIcon,
  ScaleIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import Navigation from "./components/Navigation";
import Approve from "./web3/Approve";
import Balance from "./web3/Balance";
import Stacking from "./web3/Stacking";
import Transfert from "./web3/Transfert";
import UnStacking from "./web3/Unstacking";
import Wagmi from "./web3/Wagmi";
import { useState } from "react";
import { OptionButton } from "./components/OptionButton";
import Reward from "./web3/Reward";

const options = [
  { name: "Balance", logo: <ScaleIcon />, component: <Balance /> },
  { name: "Approve", logo: <CheckCircleIcon />, component: <Approve /> },
  { name: "Stacking", logo: <CircleStackIcon />, component: <Stacking /> },
  { name: "Unstacking", logo: <BanknotesIcon />, component: <UnStacking /> },
  {name: "Transfert",logo: <ArrowsRightLeftIcon />,component: <Transfert />,},
  {name : "Reward", logo: <TrophyIcon />, component: <Reward />,}
];

function App() {
  const [selectedOption, setSelectedOption] = useState(4);

  return (
    <main className="bg-gray-100 pb-2">
      <Wagmi>
        <Navigation />
        <section className="p-2 h-[90vh] flex items-center justify-center relative ">
          <div className="flex flex-col gap-4 h-full justify-center absolute left-1 z-40">
            {options.map((option, index) => (
              <OptionButton
                key={index}
                logo={option.logo}
                name={option.name}
                isSelected={selectedOption === index}
                onClick={() => setSelectedOption(index)}
              />
            ))}
          </div>
          <div className="h-full flex flex-col items-center justify-center relative">
            {options[selectedOption].component}
          </div>
        </section>
      </Wagmi>
    </main>
  );
}

export default App;
