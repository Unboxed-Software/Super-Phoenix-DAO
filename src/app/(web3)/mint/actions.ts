'use server';

import { MINTING_GROUP } from '@/app/models/candyMachine';
import { getMerkleProof, getMerkleRoot } from '@metaplex-foundation/mpl-candy-machine';
import { PublicKey } from '@solana/web3.js';
import base58 from 'bs58';

const { NEXT_PUBLIC_SOLANA_EXPLORER_LINK, NEXT_PUBLIC_CM_ID, NEXT_PUBLIC_BASE_URL } = process.env;

async function loadList(filePath: string): Promise<string[]> {
  const response = await fetch(filePath);
  const csvText = await response.text();
  const rows = csvText.split('\n').map((row) => row.replace(/,/g, '').trim());
  return rows;
}

const parseAndCheckList = async (listPath: string): Promise<PublicKey[]> => {
  const rows = await loadList(listPath);

  const addresses = rows.map((row) => new PublicKey(row));
  if (addresses.some((address) => !address)) {
    throw new Error(`Invalid address in ${listPath}`);
  }

  // Check for duplicates
  const addressSet = new Set(addresses);
  if (addressSet.size !== addresses.length) {
    throw new Error(`Duplicate addresses found in ${listPath}`);
  }

  if (addresses.length == 0) {
    throw new Error(`No addresses found in ${listPath}`);
  }

  return addresses;
};

export async function validateAccountForEarlyMinting(accountId: string, earlyMintGroup: keyof typeof MINTING_GROUP) {
  if (!NEXT_PUBLIC_SOLANA_EXPLORER_LINK || !NEXT_PUBLIC_CM_ID || !NEXT_PUBLIC_BASE_URL) {
    console.error(
      'Please provide the NEXT_PUBLIC_CM_ID, WHITELIST_4_HOURS_IDS, WHITELIST_2_HOURS_IDS, and NEXT_PUBLIC_SOLANA_EXPLORER_LINK env vars',
    );
    throw new Error('Internal server Error');
  }

  const freelist = await parseAndCheckList(
    'https://shdw-drive.genesysgo.net/Drz6cRx664L9zH4Gir6Gw1LpzTwhbdNRzfwAZSFeD56v/spd_freelist.csv',
  );
  const whitelist = await parseAndCheckList(
    'https://shdw-drive.genesysgo.net/Drz6cRx664L9zH4Gir6Gw1LpzTwhbdNRzfwAZSFeD56v/spd_whitelist.csv',
  );

  let allowList: string[] = [];

  switch (earlyMintGroup) {
    case MINTING_GROUP.FL:
      allowList = freelist.map((a) => a.toBase58());
      break;
    case MINTING_GROUP.WLSOL:
    case MINTING_GROUP.WLSA:
      allowList = whitelist.map((a) => a.toBase58());
      break;
    default:
      throw new Error('Invalid early minting group');
  }

  const isFound = allowList.find((a) => a === accountId);
  if (!isFound) {
    return {
      status: 400,
      error: 'Account not found in allow list',
    };
  }

  return {
    status: 200,
    merkleRoot: base58.encode(getMerkleRoot(allowList)),
    merkleProof: getMerkleProof(allowList, accountId).map((p) => base58.encode(p)),
  };
}
