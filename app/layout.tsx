import type { Metadata } from 'next';
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JMD Jewellers | Luxury Gold & Bridal Jewellery | Mohripur, Gorakhpur',
  description:
    'Discover 100% BIS Hallmarked Gold, Diamond & Bridal Jewellery at JMD Jewellers, Mohripur, Gorakhpur. Check live gold rates, custom designs & bridal collections. Call 9569407857.',
  keywords: [
    'JMD Jewellers',
    'Jeweller Gorakhpur',
    'Mohripur Jewellers',
    'BIS 916 Hallmark Gold Gorakhpur',
    'Bridal Jewellery Gorakhpur',
    'Gold Rate Gorakhpur',
    'Karatmeter Testing',
  ],
  openGraph: {
    title: 'JMD Jewellers | Luxury Gold & Bridal Jewellery | Mohripur, Gorakhpur',
    description:
      '100% BIS Hallmarked 916 Gold, Diamond Solitaires & Bespoke Bridal Jewellery in Mohripur, Gorakhpur.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#0d0b0a] text-white font-sans antialiased selection:bg-[#d4af37] selection:text-black" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

