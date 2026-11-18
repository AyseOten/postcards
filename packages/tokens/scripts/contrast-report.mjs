/**
 * Writes docs/design/tokens-contrast.md from the tokens.
 *   pnpm --filter @postcards/tokens contrast:report         # write
 *   pnpm --filter @postcards/tokens contrast:report --check # fail if out of date
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderContrastReport } from '../src/report.ts';

const target = resolve(import.meta.dirname, '../../../docs/design/tokens-contrast.md');
const report = `${renderContrastReport()}\n`;

if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(target, 'utf8');
  } catch {
    // missing file counts as out of date
  }
  if (current !== report) {
    console.error(
      'docs/design/tokens-contrast.md is out of date. Run: pnpm --filter @postcards/tokens contrast:report',
    );
    process.exit(1);
  }
  console.log('Contrast report is up to date.');
} else {
  writeFileSync(target, report);
  console.log(`Wrote ${target}`);
}
