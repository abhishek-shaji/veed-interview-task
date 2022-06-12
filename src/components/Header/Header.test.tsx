// write tests using jest for RepositoryList component
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/Header/Header';

describe('Header', () => {
  it('should render correctly', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
