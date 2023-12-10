import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stacking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export const stackingABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'initialSupply', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Staked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unstaked',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'calculateReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakes',
    outputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unstake',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export const stackingAddress = {
  11155111: '0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export const stackingConfig = {
  address: stackingAddress,
  abi: stackingABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"calculateReward"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingCalculateReward<
  TFunctionName extends 'calculateReward',
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'calculateReward',
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"stakes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingStakes<
  TFunctionName extends 'stakes',
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'stakes',
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof stackingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractRead({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof stackingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stackingABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof stackingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stackingABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof stackingABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof stackingABI, TFunctionName, TMode>({
    abi: stackingABI,
    address: stackingAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof stackingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stackingABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof stackingABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof stackingABI, 'approve', TMode>({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"stake"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingStake<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof stackingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stackingABI,
          'stake'
        >['request']['abi'],
        'stake',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'stake' }
    : UseContractWriteConfig<typeof stackingABI, 'stake', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'stake'
      } = {} as any,
) {
  return useContractWrite<typeof stackingABI, 'stake', TMode>({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'stake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof stackingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stackingABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof stackingABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof stackingABI, 'transfer', TMode>({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof stackingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stackingABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof stackingABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof stackingABI, 'transferFrom', TMode>({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"unstake"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingUnstake<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof stackingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof stackingABI,
          'unstake'
        >['request']['abi'],
        'unstake',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unstake' }
    : UseContractWriteConfig<typeof stackingABI, 'unstake', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unstake'
      } = {} as any,
) {
  return useContractWrite<typeof stackingABI, 'unstake', TMode>({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'unstake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stackingABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function usePrepareStackingWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stackingABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: stackingABI,
    address: stackingAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof stackingABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function usePrepareStackingApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stackingABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stackingABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"stake"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function usePrepareStackingStake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stackingABI, 'stake'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'stake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stackingABI, 'stake'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function usePrepareStackingTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stackingABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stackingABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function usePrepareStackingTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stackingABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stackingABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link stackingABI}__ and `functionName` set to `"unstake"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function usePrepareStackingUnstake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof stackingABI, 'unstake'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: stackingABI,
    address: stackingAddress[11155111],
    functionName: 'unstake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof stackingABI, 'unstake'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stackingABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof stackingABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractEvent({
    abi: stackingABI,
    address: stackingAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof stackingABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stackingABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof stackingABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractEvent({
    abi: stackingABI,
    address: stackingAddress[11155111],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof stackingABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stackingABI}__ and `eventName` set to `"Staked"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingStakedEvent(
  config: Omit<
    UseContractEventConfig<typeof stackingABI, 'Staked'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractEvent({
    abi: stackingABI,
    address: stackingAddress[11155111],
    eventName: 'Staked',
    ...config,
  } as UseContractEventConfig<typeof stackingABI, 'Staked'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stackingABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof stackingABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractEvent({
    abi: stackingABI,
    address: stackingAddress[11155111],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof stackingABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link stackingABI}__ and `eventName` set to `"Unstaked"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb1034831dc5A8b637223DA010e7eB3c6B9FA46BC)
 */
export function useStackingUnstakedEvent(
  config: Omit<
    UseContractEventConfig<typeof stackingABI, 'Unstaked'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof stackingAddress } = {} as any,
) {
  return useContractEvent({
    abi: stackingABI,
    address: stackingAddress[11155111],
    eventName: 'Unstaked',
    ...config,
  } as UseContractEventConfig<typeof stackingABI, 'Unstaked'>)
}
