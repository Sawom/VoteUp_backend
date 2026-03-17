import cors from "cors";
import express, { Application, Request, Response } from "express";

/**
 * Express application instance for the VoteUp backend.
 *
 * How requests flow through this file:
 * - `express()` creates the app container.
 * - `app.use(...)` registers global middleware that runs before route handlers.
 * - `app.get(...)` registers a route handler for a specific HTTP method + path.
 *
 * In larger apps, this module typically only wires middleware + mounts router
 * modules (e.g. `app.use('/api', apiRouter)`), while controllers/services live
 * elsewhere. Right now the project contains a single health/root endpoint.
 */
const app: Application = express();

// Enable CORS so browsers can call this API from other origins (frontend apps, local dev, etc.).
app.use(cors());

/**
 * Root endpoint (simple sanity/health response).
 *
 * This is often used by:
 * - load balancers / uptime checks
 * - humans verifying the server is reachable
 * - local dev "is it running?" checks
 */
app.get("/", (req: Request, res: Response) => {
  // Respond with JSON; Express detects the object and sets the content-type.
  res.send({
    Message: "voteUp server",
  });
});

export default app;
