import { BRAND_FONT_CSS_VAR, FONT_WEIGHTS } from '@postcards/tokens';

// next/font needs literal options, so app/fonts.ts cannot import the tokens.
// This test checks the options it passes against the tokens.
const plusJakartaSans = jest.fn((options: { variable: string }) => ({
  className: 'brand',
  variable: options.variable,
}));

jest.mock('next/font/google', () => ({
  Plus_Jakarta_Sans: (options: { variable: string }) => plusJakartaSans(options),
}));

describe('brand font', () => {
  beforeAll(async () => {
    await import('../app/fonts');
  });

  it('is loaded with the CSS variable, weights and subsets from the tokens', () => {
    expect(plusJakartaSans).toHaveBeenCalledTimes(1);
    expect(plusJakartaSans).toHaveBeenCalledWith(
      expect.objectContaining({
        variable: BRAND_FONT_CSS_VAR,
        weight: [...FONT_WEIGHTS],
        subsets: expect.arrayContaining(['latin', 'latin-ext']),
      }),
    );
  });
});
