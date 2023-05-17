import { render } from '@testing-library/react';

import SingIn from './sing-in';

describe('SingIn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SingIn />);
    expect(baseElement).toBeTruthy();
  });
});
