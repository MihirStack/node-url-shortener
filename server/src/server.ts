import mongoose from "mongoose";

import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async (): Promise<void> => {
  await connectDatabase();

  const server = app.listen(
    env.PORT,
    () => {
      console.log(
        `🚀 API running at ${env.BACKEND_URL}`
      );

      console.log(
        `❤️ Health: ${env.BACKEND_URL}/api/v1/health`
      );
    }
  );

  const shutdown = async (
    signal: string
  ): Promise<void> => {
    console.log(
      `\n${signal} received. Shutting down...`
    );

    server.close(async () => {
      await mongoose.connection.close();

      console.log(
        "✅ HTTP server and MongoDB connection closed"
      );

      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
};

startServer().catch((error) => {
  console.error(
    "❌ Failed to start application:",
    error
  );

  process.exit(1);
});