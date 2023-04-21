import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils';
import { describe, expect, it } from 'vitest';
import { isAxiosError } from '../utils';
import { AxiosError } from 'axios';
import HttpsStatusCode from 'src/constant/httpStatusCode.enum';

// describe dùng để mô tả tập hợp các ngữ cảnh
// hoặc 1 đơn vị cần test: Ví dụ function, component
describe('isAxiosError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('isAxiosError return boolean', () => {
    expect(isAxiosError(new Error())).toBe(false);
    expect(isAxiosError(new AxiosError())).toBe(true);
  });
});

describe('isAxiosErrorUnprocessableEntity', () => {
  it('isAxiosErrorUnprocessableEntity return boolean', () => {
    expect(isAxiosErrorUnprocessableEntity(new Error())).toBe(false);
    expect(
      isAxiosErrorUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpsStatusCode.BadGateway,
          data: null
        } as any)
      )
    ).toBe(false);
    expect(
      isAxiosErrorUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpsStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true);
  });
});
