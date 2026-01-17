import { Server } from "http";
import app from "./app";

const port = 3000;

async function main() {
  const Server: Server = app.listen(port, () => {
    console.log("voteUp app is listening on port", port);
  });
}

main();
