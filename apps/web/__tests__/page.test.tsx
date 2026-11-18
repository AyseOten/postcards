import { render, screen } from '@testing-library/react';
import { getMessages } from '@postcards/i18n';
import Home from '../app/page';

describe('Home', () => {
  it('renders the Turkish app name and tagline', () => {
    const messages = getMessages('tr');
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: messages.app.name })).toBeInTheDocument();
    expect(screen.getByText(messages.app.tagline)).toBeInTheDocument();
  });
});
