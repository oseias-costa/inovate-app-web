import Image from 'next/image';
import styled from 'styled-components';
import { Flex, List, Popover } from 'antd';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { httpClient } from '../utils/httpClient';
import Logo from '@/public/assets/logo-i.png';
import { Notification } from '../types/notification.type';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUser } from './UserProvider';
import { Pagination } from '../types/pagination.type';
import Button from 'antd/lib/button';

const Content = () => {
  const { user } = useUser();
  dayjs.extend(relativeTime);

  const { data, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Pagination<Notification>>({
      queryKey: [`notification-list`],
      queryFn: async ({ pageParam }) =>
        httpClient({
          path: `/notifications`,
          method: 'GET',
          queryString: {
            page: pageParam,
            limit: 4,
            subjectUuid: user?.uuid,
            // type: filter,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    });

  const mutate = useMutation({
    mutationKey: ['update-notifications'],
    mutationFn: async () =>
      httpClient({
        path: '/notifications',
        method: 'PATCH',
        queryString: {
          userUuid: user?.uuid,
        },
      }),
  });

  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={data?.pages.flatMap((page) => page.items) || []}
        renderItem={(item: Notification, index) => (
          <List.Item>
            <A href={`/portal/request/${item.itemUuid}`}>
              <Image src={Logo} alt="Logo" width={24} height={24} />
              <div style={{ paddingLeft: 15 }}>
                <p>
                  <strong>{item.title}</strong>
                </p>

                <p>{dayjs(item.createAt).fromNow()}</p>
              </div>
            </A>
          </List.Item>
        )}
      />
      <Flex justify="center" align="center">
        <Button style={{ textAlign: 'center' }} onClick={() => fetchNextPage()}>
          Carregar
        </Button>
      </Flex>
    </Container>
  );
};

export default function Notifications({ button }: { button: JSX.Element }) {
  return (
    <Popover placement="bottomRight" title="Notificações" content={Content} trigger="click">
      {button}
    </Popover>
  );
}

const Container = styled.div`
  min-width: 400px;
  max-height: 600px;
  overflow-y: auto;

  @media (max-width: 840px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const A = styled.a`
  text-decoration: none;
  color: #404040;
  display: flex;
`;
