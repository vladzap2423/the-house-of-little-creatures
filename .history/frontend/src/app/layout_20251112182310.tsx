import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { Root } from '@/components/Root/Root';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/global.css';
import { BottomNav } from '@/components/BootomNav';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

export default async function RootLayout({ children }: PropsWithChildren) {

  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
          <Root>
            {children}
            <BottomNav
          </Root>
      </body>
    </html>
  );
}