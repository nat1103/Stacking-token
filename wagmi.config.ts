import { defineConfig } from "@wagmi/cli";
import { sepolia } from "wagmi/chains";
import { etherscan, react } from '@wagmi/cli/plugins'
import { Address } from "viem";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export default defineConfig({
  out: "src/web3/generated/wagmi.generated.ts",
  plugins: [
    etherscan({
      apiKey : process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id ,
      contracts: [
        {
          name : 'Stacking',
          address : {
            [sepolia.id] : process.env.STACKING_CONTRACT_ADDRESS! as Address,
          }
        }
      ]
    }),
    react()
  ],
});
