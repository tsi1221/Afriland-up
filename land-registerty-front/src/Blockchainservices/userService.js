import { getLucid } from "./cardano";

// Register new user
export async function registerUser({ name, email }) {
  const lucid = getLucid();
  const walletAddr = await lucid.wallet.address();

  // Metadata for registration
  const metadata = {
    721: {
      UserRegistry: {
        [walletAddr]: { name, email }
      }
    }
  };

  const tx = await lucid.newTx()
    .attachMetadata(721, metadata)
    .complete();

  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();

  console.log("User registered with TX:", txHash);
  return { walletAddr, txHash };
}

// Login user (check if wallet registered)
export async function loginUser() {
  const lucid = getLucid();
  const walletAddr = await lucid.wallet.address();

  // Check blockchain metadata
  const response = await fetch(
    `https://cardano-preprod.blockfrost.io/api/v0/addresses/${walletAddr}/transactions`,
    { headers: { project_id: "YOUR_BLOCKFROST_PROJECT_ID" } }
  );

  if (!response.ok) throw new Error("User not found");
  const txs = await response.json();
  return { walletAddr, txs };
}
