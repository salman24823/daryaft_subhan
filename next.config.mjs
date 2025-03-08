/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  webpack(config) {
    // Add a rule to handle .glb files using file-loader
    config.module.rules.push({
      test: /\.glb$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash].[ext]', // Output path and filename pattern
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
