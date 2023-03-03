import { Fragment } from 'react';
import Footer from 'src/components/Footer';
import HeaderRegisterLayout from 'src/components/HeaderRegisterLayout';

interface Props {
  children?: React.ReactNode;
}

export default function RegisterLayout({ children }: Props) {
  return (
    <Fragment>
      <HeaderRegisterLayout />
      {children}
      <Footer />
    </Fragment>
  );
}
