import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import root from '../../eslint.config.mjs';
import uiRules from '../../eslint.ui-rules.mjs';

export default defineConfig([root, nextVitals, uiRules]);
