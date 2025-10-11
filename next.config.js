/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration for static export
  images: {
    unoptimized: true, // Required for static export
  },

  // Sass/SCSS support is now built-in
  sassOptions: {
    includePaths: ['./src/styles'],
  },

  // TypeScript and ESLint configuration
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },

  // Webpack configuration for path aliases
  webpack: (config) => {
    // Path aliases are now handled by TypeScript paths in tsconfig.json
    // No need for tsconfig-paths-webpack-plugin anymore
    return config;
  },

  // Static export configuration
  output: 'export',

  // Disable features not supported in static export
  trailingSlash: true,
};

module.exports = nextConfig;