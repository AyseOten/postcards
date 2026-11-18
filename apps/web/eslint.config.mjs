import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import root from '../../eslint.config.mjs';

export default defineConfig([root, nextVitals]);
