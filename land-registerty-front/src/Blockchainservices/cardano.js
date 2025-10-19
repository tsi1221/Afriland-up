import { Lucid, Blockfrost } from "lucid-cardano";

let lucid;

export async function initLucid() {
  if (!window.cardano || !window.cardano.nami) {
    alert("Install Nami Wallet first!");
    return;
  }

  lucid = await Lucid.new(
    new Blockfrost("https://preprod.blockfrost.io/api/v0", "YOUR_BLOCKFROST_PROJECT_ID"),
    "Preprod"
  );

  await lucid.selectWallet("Nami");
  return lucid;
}

export function getLucid() {
  if (!lucid) throw new Error("Lucid not initialized");
  return lucid;
}
