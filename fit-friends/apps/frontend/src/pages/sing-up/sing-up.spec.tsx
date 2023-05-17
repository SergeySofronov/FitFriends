import { render } from '@testing-library/react';

import SingUp from './sing-up';

describe('SingUp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SingUp />);
    expect(baseElement).toBeTruthy();
  });
});
