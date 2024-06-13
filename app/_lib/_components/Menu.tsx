"use client"
import { Button } from "antd"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import React from 'react';
import { AppstoreOutlined, FileOutlined, HomeOutlined, SettingOutlined, UserOutlined, UserSwitchOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAnt } from 'antd';
import Sider from "antd/lib/layout/Sider";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  // {
  //   key: 'sub1',
  //   label: 'Navigation One',
  //   icon: <MailOutlined />,
  //   children: [
  //     {
  //       key: 'g1',
  //       label: 'Item 1',
  //       type: 'group',
  //       children: [
  //         { key: '1', label: 'Option 1' },
  //         { key: '2', label: 'Option 2' },
  //       ],
  //     },
  //     {
  //       key: 'g2',
  //       label: 'Item 2',
  //       type: 'group',
  //       children: [
  //         { key: '3', label: 'Option 3' },
  //         { key: '4', label: 'Option 4' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   key: 'sub2',
  //   label: 'Navigation Two',
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     { key: '5', label: 'Option 5' },
  //     { key: '6', label: 'Option 6' },
  //     {
  //       key: 'sub3',
  //       label: 'Submenu',
  //       children: [
  //         { key: '7', label: 'Option 7' },
  //         { key: '8', label: 'Option 8' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   type: 'divider',
  // },
//   {
//     key: 'sub4',
//     label: 'Navigation Three',
//     icon: <SettingOutlined />,
//     children: [
//       { key: '9', label: 'Option 9' },
//       { key: '10', label: 'Option 10' },
//       { key: '11', label: 'Option 11' },
//       { key: '12', label: 'Option 12' },
//     ],
//   },
  {
    key: 'grp',
    type: 'group',
    children: [
      { key: '/portal/dashboard', label: 'Início', icon: <HomeOutlined /> },
      { key: '/portal/documentos', label: 'Documentos', icon: <FileOutlined /> },
      { key: '/portal/configuracoes', label: 'Configurações', icon: <SettingOutlined /> },
      { key: '/portal/conta', label: 'Conta', icon: <UserOutlined /> },
    ],
  },
    {
    key: 'sub2',
    label: 'Usuários',
    icon: <UsergroupAddOutlined />,
    children: [
      { key: '/administrativo/usuarios', label: 'Usuários' },
      { key: '/administrativo/empresas', label: 'Empresas' },
    ],
  },
];

export default function Menu({isMobile}:{isMobile: boolean}){

const styles = {
  container: {
      display: isMobile ? 'none' : 'block',
      width: '236px',
      height: '100vh',
      // boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      // borderRight: '1px solid #d3d3d3',
      background: '#fff',
      position: 'absolute'
      // paddingLeft: '8px',
      // paddingRight: '8px'
  } as const,
  logo: {
      height: 'auto',
      width: '80%',
      paddingBottom: '24px',
      paddingLeft: '8px',
      marginLeft: '0 auto',
      marginRight: '0 auto'
  },
  item: {
      // backgroundColor: '#8c8c8c',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingLeft: '16px',
      borderBottom: '1px solid #d3d3d3',
      borderTop: '1px solid #d3d3d3',
      ":hover": {
          backgroundColor: '#fff',
      },
      borderRight: '4px solid blue'
  }, 
  itemText: {
      color: '#8c8c8c',
      fontFamilu: 'Lato',
      fontWeight: '100',
  }
}

    const router = useRouter()
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        router.push(e.key)
      };
    
    return(
        <Sider style={styles.container}>
        <MenuAnt
            onClick={onClick}
            style={{ width: 236 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
           {/*  <Image src={Logo} alt="Logo" style={styles.logo}  />
             <Item path='/portal/dashboard' text="Dashboard" />
             <Item path='/portal/documentos' text="Documentos" />
             <Item path='/portal/atividades' text="Atividades" />
             <Item path='/portal/licencas-operacionais' text="Licenças Operacionais" />
             <Item path='/portal/configuracoes' text="Configurações" /> */}
            
        </Sider>
    )
}

const Item = ({path, text}: {path: string, text: string}) => {
    const router = useRouter()
    const params = usePathname()
    const atualPath = params.split('/')[2]
    const isEqual = path.split('/')[2] === atualPath
    const style = isEqual 
        ? { width: '100%', textAlign: 'start', borderRadius: 0} as const
        : { marginBottom: 5, width: '100%', textAlign: 'start', borderRadius: 0, backgroundColor: '#fff', color: '#1677ff' } as const
    return(
        <Button
              type="primary" 
              onClick={() => router.replace(path)}
              style={style}
        >{text}</Button>
    )
}