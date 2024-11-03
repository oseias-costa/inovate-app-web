import Image from "next/image";
import styled from "styled-components";
import { List, Popover } from "antd";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../utils/httpClient";
import Logo from '@/public/assets/logo-i.png'
import { Notification } from "../types/notification.type";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUser } from "./UserProvider";

const Content = () => {
  const { user } = useUser()
  dayjs.extend(relativeTime);


  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => httpClient({
      method: 'GET',
      path: '/notifications',
      queryString: {
        subjectUuid: user?.uuid,
        page: 1,
        limit: 10
      }
    })
  })

  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={Array.isArray(data?.items) ? data.items : []}
        renderItem={(item: Notification, index) => (
          <List.Item>
            <A href={`/portal/request/${item.itemUuid}`}>
              <Image src={Logo} alt="Logo" width={24} height={24} />
              <div style={{ paddingLeft: 15 }}>
                <p><strong>{item.title}</strong></p>
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
                <p>{dayjs(item.createAt).fromNow()}</p>
              </div>
            </A>
          </List.Item>
        )}
      />
    </Container>
  )
}

export default function Notifications({
  button
}: {
  button: JSX.Element
}) {
  return (
    <Popover placement="bottomRight" title="Notificações" content={Content} trigger="click">
      {button}
    </Popover>

  );
}

const Container = styled.div`
  min-width: 400px;

  @media (max-width: 840px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const A = styled.a`
   text-decoration: none;
   color: #404040;
   display:flex;
`
