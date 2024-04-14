"use client";
import { Lato } from "next/font/google";
import './globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css'

const lato = Lato({
  weight: '300',
  subsets: ['latin']
 });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 60 * 24, // 24 hours
      // refetchOnWindowFocus: false,
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
