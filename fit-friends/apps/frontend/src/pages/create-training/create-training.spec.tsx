import { render } from '@testing-library/react';

import CreateTraining from './create-training';

describe('CreateTraining', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateTraining />);
    expect(baseElement).toBeTruthy();
  });
});
