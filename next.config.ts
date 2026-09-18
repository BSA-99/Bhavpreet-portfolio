import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Pins Turbopack's root to this repo. Without it, Turbopack walks up
     and finds an unrelated package-lock.json in the home directory and
     warns that it might be a monorepo root — harmless, but noisy on
     every dev/build run. */
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
