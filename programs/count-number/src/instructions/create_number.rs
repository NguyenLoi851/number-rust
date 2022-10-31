use anchor_lang::prelude::*;
use crate::state::CounterAccount;

pub fn create(ctx: Context<Create>) -> Result<()> {
    let counter_account = &mut ctx.accounts.counter_account;
    counter_account.count = 0;
    Ok(())
}


#[derive(Accounts)]
pub struct Create<'info> {
    
    #[account(init, payer=user, space = 16+16)]
    pub counter_account: Account<'info, CounterAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}