import WebpackReactComponentNamePlugin from "webpack-react-component-name";

export default ({
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.plugins.push(new WebpackReactComponentNamePlugin());
    return config;
  },
});
