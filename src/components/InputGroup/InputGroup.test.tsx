// write tests using jest for RepositoryList component
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputGroup } from '@/components/InputGroup/InputGroup';

describe('InputGroup', () => {
  it('should render correctly', () => {
    const { container } = render(
      <InputGroup
        onChange={() => {}}
        placeholder="test placeholder"
        value={''}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with value', () => {
    const { container } = render(
      <InputGroup
        onChange={() => {}}
        placeholder="test placeholder"
        value="test value"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with label', () => {
    const { container } = render(
      <InputGroup
        label="test label"
        onChange={() => {}}
        placeholder="test placeholder"
        value="test value"
      />,
    );

    const element = screen.getByTestId('input-group-label');

    expect(container).toContainElement(element);

    expect(container).toMatchSnapshot();
  });
});
