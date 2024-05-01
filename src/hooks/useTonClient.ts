import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from './useAsyncInitialize';
// import { useTonConnect } from './useTonConnect';
// import { CHAIN } from '@tonconnect/ui-react';
// import { flushSync } from 'react-dom';

export function useTonClient() {
  return useAsyncInitialize(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint({ network: 'testnet' }),
      })
  );
}

// export function useTonClient() {
//   const {network} = useTonConnect()


//   return {
//     client: useAsyncInitialize(async () => {
//       if(!network) return;

//       return new TonClient({
//         endpoint: await getHttpEndpoint({
//           network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet'
//         })
//       })
//     },[network])
//   }
// }
