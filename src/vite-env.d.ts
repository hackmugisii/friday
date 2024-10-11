/// <reference types="vite/client" />
import environment from "vite-plugin-environment";

process.env.II_URL =
 process.env.DFX_NETWORK === "local"
   ? `http://${process.env.INTERNET_IDENTITY_CANISTER_ID}.localhost:4943/`
   : `https://identity.ic0.app`;

export default defineConfig({
  // ...
  plugins: [
    environment(["II_URL"]),
  ],
  // ...
});