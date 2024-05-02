import { fetchCandyGuard, fetchCandyMachine, mintV2, route } from '@metaplex-foundation/mpl-candy-machine';
import { Umi, generateSigner, publicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { base58 } from '@metaplex-foundation/umi/serializers';
import bs58 from 'bs58';
import { validateAccountForEarlyMinting } from '../(web3)/mint/actions';

const CM_ID = process.env.NEXT_PUBLIC_CM_ID;

if (!CM_ID) {
  throw new Error('Please provide the NEXT_PUBLIC_CM_ID env var');
}

export const EARLY_MINTING_GROUP = {
  EARLY2: 'EARLY2',
  EARLY4: 'EARLY4',
} as const;

export const REGUALR_MINTING_GROUP = {
  SOL: 'SOL',
  TOKEN: 'TOKEN',
} as const;

export const MINTING_GROUP = { ...EARLY_MINTING_GROUP, ...REGUALR_MINTING_GROUP };

export const mintWithSol = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);

  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_GROUP.SOL);

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
        group: MINTING_GROUP.SOL,
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

export const mintWithEarly4 = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);
  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);

  const res = await validateAccountForEarlyMinting(umi.identity.publicKey, MINTING_GROUP.EARLY4);

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(
      route(umi, {
        guard: 'allowList',
        candyMachine: candyMachine.publicKey,
        group: MINTING_GROUP.EARLY4,
        routeArgs: {
          path: 'proof',
          merkleRoot: bs58.decode(res.merkleRoot),
          merkleProof: res.merkleProof.map((p) => bs58.decode(p)),
        },
      }),
    )
    .add(
      mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        collectionMint: candyMachine.collectionMint,
        collectionUpdateAuthority: candyMachine.authority,
        candyGuard: candyMachine.mintAuthority,
        tokenStandard: candyMachine.tokenStandard,
        group: MINTING_GROUP.EARLY4,
        mintArgs: {
          allowList: { merkleRoot: bs58.decode(res.merkleRoot) },
        },
      }),
    )
    .sendAndConfirm(umi);

  return base58.deserialize(sig.signature)[0];
};

export const mintWithEarly2 = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);

  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_GROUP.SOL);

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const solDestination = guardGroup?.guards.solPayment.value.destination;

  const res = await validateAccountForEarlyMinting(umi.identity.publicKey, MINTING_GROUP.EARLY2);

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(
      route(umi, {
        guard: 'allowList',
        candyMachine: candyMachine.publicKey,
        group: MINTING_GROUP.EARLY2,
        routeArgs: {
          path: 'proof',
          merkleRoot: bs58.decode(res.merkleRoot),
          merkleProof: res.merkleProof.map((p) => bs58.decode(p)),
        },
      }),
    )
    .add(
      mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        collectionMint: candyMachine.collectionMint,
        collectionUpdateAuthority: candyMachine.authority,
        candyGuard: candyMachine.mintAuthority,
        tokenStandard: candyMachine.tokenStandard,
        group: MINTING_GROUP.EARLY2,
        mintArgs: {
          solPayment: {
            destination: solDestination,
          },
          allowList: { merkleRoot: bs58.decode(res.merkleRoot) },
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
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_GROUP.TOKEN);

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
        group: MINTING_GROUP.TOKEN,
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
