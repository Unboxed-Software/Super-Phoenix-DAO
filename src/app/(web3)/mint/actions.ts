'use server';

import { EARLY_MINTING_GROUP } from '@/app/models/candyMachine';
import { getMerkleProof, getMerkleRoot } from '@metaplex-foundation/mpl-candy-machine';
import base58 from 'bs58';

const { WHITELIST_4_HOURS_IDS, WHITELIST_2_HOURS_IDS, NEXT_PUBLIC_SOLANA_EXPLORER_LINK, NEXT_PUBLIC_CM_ID } =
  process.env;

export async function validateAccountForEarlyMinting(
  accountId: string,
  earlyMintGroup: keyof typeof EARLY_MINTING_GROUP,
) {
  if (!WHITELIST_4_HOURS_IDS || !WHITELIST_2_HOURS_IDS || !NEXT_PUBLIC_SOLANA_EXPLORER_LINK || !NEXT_PUBLIC_CM_ID) {
    console.error(
      'Please provide the NEXT_PUBLIC_CM_ID, WHITELIST_4_HOURS_IDS, WHITELIST_2_HOURS_IDS, and NEXT_PUBLIC_SOLANA_EXPLORER_LINK env vars',
    );
    throw new Error('Internal server Error');
  }

  let allowList: string[] = [];

  switch (earlyMintGroup) {
    case EARLY_MINTING_GROUP.EARLY4:
      allowList = WHITELIST_4_HOURS_IDS.split(',');
      break;
    case EARLY_MINTING_GROUP.EARLY2:
      allowList = WHITELIST_2_HOURS_IDS.split(',');
      break;
    default:
      throw new Error('Invalid early minting group');
  }

  return {
    status: 200,
    merkleRoot: base58.encode(getMerkleRoot(allowList)),
    merkleProof: getMerkleProof(allowList, accountId).map((p) => base58.encode(p)),
  };
}
