import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/ButtonShopee',
  component: Button,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      description: 'Hiển thị icon loading'
    },
    children: {
      description: 'Nội dung button',
      table: { type: { summary: 'React.ReactNode' }, defaultValue: { summary: '' } }
    },
    className: {
      description: 'class',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    isLoading: true,
    children: 'Đăng nhập',
    className:
      'flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
  }
};
