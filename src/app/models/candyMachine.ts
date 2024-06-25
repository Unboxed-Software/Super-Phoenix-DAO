import { fetchCandyGuard, fetchCandyMachine, mintV2, route } from '@metaplex-foundation/mpl-candy-machine';
import { Umi, generateSigner, publicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { setComputeUnitLimit, setComputeUnitPrice } from '@metaplex-foundation/mpl-toolbox';
import { base58 } from '@metaplex-foundation/umi/serializers';
import bs58 from 'bs58';
import { validateAccountForEarlyMinting } from '../(web3)/mint/actions';

const CM_ID = process.env.NEXT_PUBLIC_CM_ID;

if (!CM_ID) {
  throw new Error('Please provide the NEXT_PUBLIC_CM_ID env var');
}

export const FREELIST_MINTING_GROUP = {
  FL: 'FL',
} as const;

export const WHITELIST_MINTING_GROUP = {
  WLSOL: 'WLSOL',
  WLSA: 'WLSA',
} as const;

export const PUBLIC_MINTING_GROUP = {
  PSOL: 'PSOL',
  PSA: 'PSA',
} as const;

export const MINTING_GROUP = { ...FREELIST_MINTING_GROUP, ...WHITELIST_MINTING_GROUP, ...PUBLIC_MINTING_GROUP };

export const mintWithPublicSOL = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);

  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_GROUP.PSOL);

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const solDestination = guardGroup?.guards.solPayment.value.destination;

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(setComputeUnitPrice(umi, { microLamports: 10000 }))
    .add(
      mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        collectionMint: candyMachine.collectionMint,
        collectionUpdateAuthority: candyMachine.authority,
        candyGuard: candyMachine.mintAuthority,
        tokenStandard: candyMachine.tokenStandard,
        group: MINTING_GROUP.PSOL,
        mintArgs: {
          solPayment: {
            destination: solDestination,
          },
        },
      }),
    )
    .sendAndConfirm(umi);

  if (sig.result.value.err) {
    console.log(sig.result.value.err);
    throw new Error('Error, Something went wrong while minting, please try again.');
  }

  return { tx: base58.deserialize(sig.signature)[0], mint: nftMint.publicKey };
};

export const mintWithPublicToken = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);

  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_GROUP.PSA);

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const tokenPaymentMint = guardGroup?.guards.tokenPayment.value.mint;
  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const tokenPaymentDest = guardGroup?.guards.tokenPayment.value.destinationAta;

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(setComputeUnitPrice(umi, { microLamports: 10000 }))
    .add(
      mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        collectionMint: candyMachine.collectionMint,
        collectionUpdateAuthority: candyMachine.authority,
        candyGuard: candyMachine.mintAuthority,
        tokenStandard: candyMachine.tokenStandard,
        group: MINTING_GROUP.PSA,
        mintArgs: {
          tokenPayment: {
            destinationAta: tokenPaymentDest,
            mint: tokenPaymentMint,
          },
        },
      }),
    )
    .sendAndConfirm(umi, { send: { skipPreflight: true } });

  if (sig.result.value.err) {
    console.log(sig.result.value.err);
    throw new Error('Error, Something went wrong while minting, please try again.');
  }

  return { tx: base58.deserialize(sig.signature)[0], mint: nftMint.publicKey };
};

export const mintWithFreelist = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);
  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);

  const res = await validateAccountForEarlyMinting(umi.identity.publicKey, MINTING_GROUP.FL);

  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_GROUP.FL);

  // @ts-expect-error - TS dosn't know that the mintLimit.value exists
  const limitID = guardGroup?.guards.mintLimit.value.id;

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(setComputeUnitPrice(umi, { microLamports: 10000 }))
    .add(
      route(umi, {
        guard: 'allowList',
        candyMachine: candyMachine.publicKey,
        group: MINTING_GROUP.FL,
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
        group: MINTING_GROUP.FL,
        mintArgs: {
          allowList: { merkleRoot: bs58.decode(res.merkleRoot) },
          mintLimit: { id: limitID },
        },
      }),
    )
    .sendAndConfirm(umi);

  if (sig.result.value.err) {
    console.log(sig.result.value.err);
    throw new Error('Error, Something went wrong while minting, please try again.');
  }

  return { tx: base58.deserialize(sig.signature)[0], mint: nftMint.publicKey };
};

export const mintWithWhitelistSOL = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);
  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);

  const res = await validateAccountForEarlyMinting(umi.identity.publicKey, MINTING_GROUP.WLSOL);

  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_GROUP.WLSOL);

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const limitID = guardGroup?.guards.mintLimit.value.id;

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const solDestination = guardGroup?.guards.solPayment.value.destination;

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(setComputeUnitPrice(umi, { microLamports: 10000 }))
    .add(
      route(umi, {
        guard: 'allowList',
        candyMachine: candyMachine.publicKey,
        group: MINTING_GROUP.WLSOL,
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
        group: MINTING_GROUP.WLSOL,
        mintArgs: {
          allowList: { merkleRoot: bs58.decode(res.merkleRoot) },
          mintLimit: { id: limitID },
          solPayment: {
            destination: solDestination,
          },
        },
      }),
    )
    .sendAndConfirm(umi);

  if (sig.result.value.err) {
    console.log(sig.result.value.err);
    throw new Error('Error, Something went wrong while minting, please try again.');
  }

  return { tx: base58.deserialize(sig.signature)[0], mint: nftMint.publicKey };
};

export const mintWithWhitelistToken = async (umi: Umi) => {
  const candyMachinePublicKey = publicKey(CM_ID);
  const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);

  const res = await validateAccountForEarlyMinting(umi.identity.publicKey, MINTING_GROUP.WLSA);

  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
  const guardGroup = candyGuard.groups.find((g) => g.label === MINTING_GROUP.WLSA);

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const limitID = guardGroup?.guards.mintLimit.value.id;

  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const tokenPaymentMint = guardGroup?.guards.tokenPayment.value.mint;
  // @ts-expect-error - TS dosn't know that the solPayment.value exists
  const tokenPaymentDest = guardGroup?.guards.tokenPayment.value.destinationAta;

  const nftMint = generateSigner(umi);
  const sig = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(setComputeUnitPrice(umi, { microLamports: 10000 }))
    .add(
      route(umi, {
        guard: 'allowList',
        candyMachine: candyMachine.publicKey,
        group: MINTING_GROUP.WLSA,
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
        group: MINTING_GROUP.WLSA,
        mintArgs: {
          allowList: { merkleRoot: bs58.decode(res.merkleRoot) },
          mintLimit: { id: limitID },
          tokenPayment: {
            destinationAta: tokenPaymentDest,
            mint: tokenPaymentMint,
          },
        },
      }),
    )
    .sendAndConfirm(umi);

  if (sig.result.value.err) {
    console.log(sig.result.value.err);
    throw new Error('Error, Something went wrong while minting, please try again.');
  }

  return { tx: base58.deserialize(sig.signature)[0], mint: nftMint.publicKey };
};
