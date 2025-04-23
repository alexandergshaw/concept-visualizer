import LandingPage from '@/app/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('LandingPage behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all language cards initially', () => {
    render(<LandingPage />);
    expect(screen.getByText('JavaScript')).toBeTruthy();
    expect(screen.getByText('Python')).toBeTruthy();
    expect(screen.getByText('TypeScript')).toBeTruthy();
    expect(screen.getByText('SQL')).toBeTruthy();
    expect(screen.getByText('PHP')).toBeTruthy();
    expect(screen.getByText('HTML')).toBeTruthy();
  });

  it('filters languages by search term', async () => {
    render(<LandingPage />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search languages/i);

    await user.type(input, 'python');
    expect(screen.getByText('Python')).toBeTruthy();
    expect(screen.queryByText('JavaScript')).not.toBeTruthy();
    expect(screen.queryByText('HTML')).not.toBeTruthy();
  });

  it('navigates to the correct route when a language is clicked', async () => {
    render(<LandingPage />);
    const user = userEvent.setup();
    const languageCard = screen.getByText('JavaScript');

    await user.click(languageCard);

    expect(mockPush).toHaveBeenCalledWith('/languages/javascript');
  });

  it('navigates correctly for all supported languages', async () => {
    render(<LandingPage />);
    const user = userEvent.setup();

    const expectedSlugs = [
      { name: 'JavaScript', slug: '/languages/javascript' },
      { name: 'Python', slug: '/languages/python' },
      { name: 'TypeScript', slug: '/languages/typescript' },
      { name: 'SQL', slug: '/languages/sql' },
      { name: 'PHP', slug: '/languages/php' },
      { name: 'HTML', slug: '/languages/html' },
    ];

    for (const { name, slug } of expectedSlugs) {
      await user.click(screen.getByText(name));
      expect(mockPush).toHaveBeenCalledWith(slug);
    }

    expect(mockPush).toHaveBeenCalledTimes(expectedSlugs.length);
  });
});
