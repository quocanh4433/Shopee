import { waitFor } from '@testing-library/react';
import { path } from 'src/constant/path';
import { access_token } from 'src/msw/auth.msw';
import { setAccessTokenToLS } from 'src/utils/auth';
import { logScreen, renderWithRouter } from 'src/utils/testUtil';
import { describe, expect, it } from 'vitest';

describe('Profile', () => {
  it('Hiển thị trang profile', async () => {
    setAccessTokenToLS(access_token);
    const { container } = renderWithRouter({ route: path.profile });
    await logScreen();
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe(
        'Dư Thanh Được'
      );
    });
  });
});
