import { Server } from "http";
import app from "./app";

/**
 * Port the HTTP server listens on.
 *
 * In production, this is commonly driven by `process.env.PORT`, but this
 * project currently uses a fixed value for simplicity.
 */
const port = 3000;

/**
 * Bootstraps the HTTP server.
 *
 * Request lifecycle at runtime:
 * - Node creates an HTTP server via `app.listen(...)`
 * - Incoming requests are handed to Express (`app`)
 * - Express runs middleware in the order registered (e.g. `cors()`)
 * - Express matches the request to a route handler (e.g. GET `/`)
 * - The handler writes the response and ends the request
 */
async function main() {
  // Start listening. The callback fires once the port is successfully bound.
  const Server: Server = app.listen(port, () => {
    console.log("voteUp app is listening on port", port);
  });
}

// Invoke the bootstrap function.
main();
