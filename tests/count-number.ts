import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { CountNumber } from "../target/types/count_number";
import BN from "bn.js";

describe("count-number", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CountNumber as Program<CountNumber>;
  const programProvider = program.provider as anchor.AnchorProvider;

  const counterAccount = anchor.web3.Keypair.generate();

  // it("Is initialized!", async () => {
  //   // Add your test here.
  //   const tx = await program.methods.initialize().rpc();
  //   console.log("Your transaction signature", tx);
  // });
  it("Is initialized!", async () => {
    // await program.rpc.create({
    //   accounts: {
    //     counterAccount: counterAccount.publicKey,
    //     user: provider.wallet.publicKey,
    //     systemProgram: anchor.web3.SystemProgram.programId,
    //   },
    //   signers: [counterAccount],
    // } as any);

    await program.methods
      .create()
      .accounts({
        counterAccount: counterAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([counterAccount])
      .rpc();
  });
  it("Increment counter", async () => {
    // await program.rpc.increment({
    //   accounts: {
    //     counterAccount: counterAccount.publicKey,
    //   },
    // } as any);

    // await program.methods
    // .create()
    // .accounts({
    //   counterAccount: counterAccount.publicKey,
    //   user: provider.wallet.publicKey,
    //   systemProgram: anchor.web3.SystemProgram.programId,
    // })
    // .signers([counterAccount])
    // .rpc();

    // await program.methods
    //   .create()
    //   .accounts({
    //     counterAccount: counterAccount.publicKey,
    //     user: provider.wallet.publicKey,
    //     systemProgram: anchor.web3.SystemProgram.programId,
    //   })
    //   .signers([counterAccount])
    //   .rpc();

    await program.methods
      .increase(new BN("5", 10))
      .accounts({
        counterAccount: counterAccount.publicKey,
      })
      // .signers(counterAccount instanceof (anchor.Wallet as any) ? [] : [counterAccount])
      // .signers([counterAccount])
      .signers([])
      .rpc();

    const account = await program.account.counterAccount.fetch(
      counterAccount.publicKey
    );
    expect(Number(account.count)).to.be.equal(5);
  });
  it("Fetch account", async () => {
    const account: any = await program.account.counterAccount.fetch(
      counterAccount.publicKey
    );
    console.log(account.count);
  });
});
