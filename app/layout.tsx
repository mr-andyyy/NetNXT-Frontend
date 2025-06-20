import './globals.css';
import type { Metadata } from 'next';
import { Inter, Source_Sans_3 } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NetNXT - IT & Security Solutions',
  description: 'IT & Security Solutions for Digital Native Companies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${sourceSans.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
