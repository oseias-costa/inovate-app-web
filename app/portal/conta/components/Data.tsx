import { Button, Input, Typography } from 'antd';
import styled from 'styled-components';
import DrawerUpdateUserData from './DrawerUpdateUserData';
import { useState } from 'react';
import { useUser } from '@/app/lib/components/UserProvider';

export default function Data() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user) {
    return <p>...Loading</p>;
  }

  return (
    <Container>
      <DrawerUpdateUserData open={open} setOpen={setOpen} />
      <InputBlock>
        <Typography style={{ fontWeight: 400, color: '#8c8c8c' }}>Nome:</Typography>
        <Input defaultValue={user?.name} disabled style={{ background: 'transparent' }} />
      </InputBlock>
      <InputBlock type="left">
        <Typography style={{ fontWeight: 400, color: '#8c8c8c' }}>E-mail:</Typography>
        <Input defaultValue={user?.email} disabled style={{ background: 'transparent' }} />
      </InputBlock>
      <Button type="default" onClick={() => setOpen(true)}>
        Editar informações
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: 'flex';
`;

const InputBlock = styled.div<{ type?: 'left' | 'right' }>`
  width: 350px;
  margin-bottom: 15px;
  margin-left: ${(props) => (props.type === 'left' ? '10px' : '0px')}

  @media(max-width: 840px){
    margin-left: 0px
    }
  }
`;
