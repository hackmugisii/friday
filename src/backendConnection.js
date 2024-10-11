// backendConnection.js
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/backend'; // Import the Candid interface (IDL)
import { canisterId } from './declarations/backend'; // Import the Canister ID

// Set up the HTTP agent to connect to the canister
const agent = new HttpAgent();

// For local development, you may need to fetch the root key to establish trust
if (process.env.NODE_ENV === 'development') {
  agent.fetchRootKey();
}

// Create the actor to interact with the canister
export const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
