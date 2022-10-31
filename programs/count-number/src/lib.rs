use anchor_lang::prelude::*;
use instructions::*;
pub mod state;
pub mod instructions;

declare_id!("FGeNfaypJ3dphFJaitvxLqRAWCAtUWmNV2ps42FrzehS");

#[program]
pub mod count_number {
    // use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    use super::*;
    
    pub fn create(ctx: Context<Create>) -> Result<()> {
        instructions::create_number::create(ctx)
    }

    pub fn increase(ctx: Context<IncreaseNumber>, delta: u64) -> Result<()> {
        instructions::increase_number::increase(ctx, delta)
    }


}

#[derive(Accounts)]
pub struct Initialize {}
