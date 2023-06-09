import './globals.css';
import { Karla } from 'next/font/google';
import Model from '@/components/Modal';

const karla = Karla({ subsets: ['latin'] });

export const metadata = {
  title: 'Trello Clone',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${karla.className} bg-[#f5f6f8]`}>
        {children}
        <Model />
      </body>
    </html>
  );
}
