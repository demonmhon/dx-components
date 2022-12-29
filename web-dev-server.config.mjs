import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
  open: true,
  watch: true,
  appIndex: 'demo/index.html',
  nodeResolve: true,
  esbuildTarget: 'auto',
  plugins: [esbuildPlugin({ ts: true })],
};