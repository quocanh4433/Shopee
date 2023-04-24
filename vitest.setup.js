import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { setupServer } from 'msw/node';
import authRequests from './src/msw/auth.msw.ts';
import productRequests from './src/msw/product.msw.ts';
import userRequests from './src/msw/user.msw.ts';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

const server = setupServer(...authRequests, ...productRequests, ...userRequests);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
