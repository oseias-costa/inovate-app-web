'use client';
import styled from 'styled-components';
import Header from '../lib/components/Header';
import Menu from '../lib/components/Menu';
import { useState } from 'react';
import Spinner from '../lib/components/Spinner';
import { useUser } from '../lib/components/UserProvider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [openMenu, setOpenMenu] = useState(false);

  const closeMenu = () => {
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <div style={{ paddingLeft: '0px' }}>
      <Header open={openMenu} setOpen={setOpenMenu} />
      <div style={{ paddingTop: '2px', display: 'flex' }}>
        <Menu open={openMenu} setOpen={setOpenMenu} />
        <BodyContainer onClick={closeMenu}>{children}</BodyContainer>
      </div>
    </div>
  );
}

const BodyContainer = styled.section`
  padding-left: 236px;
  padding-top: 30px;

  @media (max-width: 840px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`;
