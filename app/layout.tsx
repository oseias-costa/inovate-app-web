"use client";
import { Lato } from "next/font/google";
import './globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import 'dayjs/locale/pt-br'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.locale('pt-br')

const lato = Lato({
  weight: ['100','300', "400", '700'],
  subsets: ['latin']
 });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // retry: 1,
    },
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body suppressHydrationWarning={true} className={lato.className}>
                  <AntdRegistry>
                    {children}
                  </AntdRegistry>
          </body>
        </html>
    </QueryClientProvider>
  );
}
