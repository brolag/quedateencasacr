import { createDefaultConfig } from '@open-wc/building-rollup';
import outputManifest from 'rollup-plugin-output-manifest';

export default createDefaultConfig({ 
  input: './index.html',
  plugins: [
    outputManifest(),
  ] 
});
 
 
