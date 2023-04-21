import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { logScreen } from './utils/testUtil';

expect.extend(matchers);

describe('App', () => {
  test('App render và chuyển trang', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    });
    const user = userEvent.setup();
    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */

    // Verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee');
    });

    // Verify chuyển sang trang login
    await user.click(screen.getByText(/Đăng nhập/i));
    await waitFor(() => {
      expect(screen.queryByText('Bạn mới đến Shopee?')).toBeInTheDocument();
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee');
    });
    screen.debug(document.body.parentElement as HTMLElement, 99999999);
  });

  test('Về trang not found', async () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });
    // await logScreen();
  });
});
