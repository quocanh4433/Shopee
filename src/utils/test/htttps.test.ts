import HttpStatusCode from 'src/constant/httpStatusCode.enum';
import { describe, expect, it, beforeEach } from 'vitest';
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth';
import https from '../https';
import { access_token_1s, refresh_token_1000days } from 'src/msw/auth.msw';

describe('http axios', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Gọi API', async () => {
    // Không nên đụng đến thư mục apis
    // Vì chúng ta test riêng file http thì chỉ "nên" dùng http thôi
    // vì lỡ như thư mục apis có thay đổi gì đó
    // thì cũng không ảnh hưởng gì đến file test này
    const res = await https.get('products');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it('Auth Request', async () => {
    // Nên có 1 cái account test
    // và 1 server test
    await https.post('login', {
      email: 'd3@gmail.com',
      password: 'useruser'
    });
    const res = await https.get('me');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it('Refresh Token', async () => {
    setAccessTokenToLS(access_token_1s);
    setRefreshTokenToLS(refresh_token_1000days);
    const res = await https.get('me');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });
});
