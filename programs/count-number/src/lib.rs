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


}

#[derive(Accounts)]
pub struct Initialize {}
