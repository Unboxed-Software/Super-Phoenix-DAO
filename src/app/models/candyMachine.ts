import { fetchCandyGuard, fetchCandyMachine, mintV2 } from '@metaplex-foundation/mpl-candy-machine';
import { Umi, generateSigner, publicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { base58 } from '@metaplex-foundation/umi/serializers';

const CM_ID = process.env.NEXT_PUBLIC_CM_ID;

if (!CM_ID) {
  throw new Error('Please provide the NEXT_PUBLIC_CM_ID env var');
}

export const MINTING_PAYMENT_METHOD = {
  SOL: 'SOL',
  TOKEN: 'TOKEN',
} as const;

export const mintWithSol = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);

  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_PAYMENT_METHOD.SOL);

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const solDestination = guardGroup?.guards.solPayment.value.destination;

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(
      mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        collectionMint: candyMachine.collectionMint,
        collectionUpdateAuthority: candyMachine.authority,
        candyGuard: candyMachine.mintAuthority,
        tokenStandard: candyMachine.tokenStandard,
        group: MINTING_PAYMENT_METHOD.SOL,
        mintArgs: {
          solPayment: {
            destination: solDestination,
          },
        },
      }),
    )
    .sendAndConfirm(umi);

  return base58.deserialize(sig.signature)[0];
};

export const mintWithToken = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);

  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_PAYMENT_METHOD.TOKEN);

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const tokenPaymentMint = guardGroup?.guards.token2022Payment.value.mint;
  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const tokenPaymentDest = guardGroup?.guards.token2022Payment.value.destinationAta;

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(
      mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        collectionMint: candyMachine.collectionMint,
        collectionUpdateAuthority: candyMachine.authority,
        candyGuard: candyMachine.mintAuthority,
        tokenStandard: candyMachine.tokenStandard,
        group: MINTING_PAYMENT_METHOD.TOKEN,
        mintArgs: {
          token2022Payment: {
            destinationAta: tokenPaymentDest,
            mint: tokenPaymentMint,
          },
        },
      }),
    )
    .sendAndConfirm(umi);

  return base58.deserialize(sig.signature)[0];
};
