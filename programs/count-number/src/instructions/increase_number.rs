use crate::state::CounterAccount;
use anchor_lang::prelude::*;

pub fn increase(ctx: Context<IncreaseNumber>, delta: u64) -> Result<()> {
    let counter_acc = &mut ctx.accounts.counter_account;

    counter_acc.count += delta;

    Ok(())
}

#[derive(Accounts)]
pub struct IncreaseNumber<'info> {
    #[account(mut)]
    pub counter_account: Account<'info, CounterAccount>
}