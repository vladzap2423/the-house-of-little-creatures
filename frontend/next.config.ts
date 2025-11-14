import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включаем переписывание маршрутов (rewrites)
  async rewrites() {
    return [
      {
        source: "/api/:path*",           // любое обращение на frontend/api/*
        destination: "http://localhost:5000/:path*", // уходит на backend
      },
    ];
  },
};

export default nextConfig;
