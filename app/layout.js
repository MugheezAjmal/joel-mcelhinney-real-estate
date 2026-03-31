import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Joel McElhinney | REALTOR® | Saint John Real Estate',
    template: '%s | Joel McElhinney Real Estate',
  },
  description:
    'Joel McElhinney — trusted REALTOR® with EXIT Realty Specialists. Serving Saint John, Rothesay, Quispamsis and surrounding New Brunswick communities. Expert guidance for buyers and sellers.',
  keywords: [
    'Saint John real estate', 'Joel McElhinney REALTOR', 'homes for sale Saint John NB',
    'EXIT Realty Specialists', 'Rothesay homes', 'Quispamsis homes', 'New Brunswick real estate',
    'buy home Saint John', 'sell home Saint John', 'MLS listings Saint John',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://joelmcelhinney.ca',
    siteName: 'Joel McElhinney Real Estate',
    images: [{ url: '/joel-photo.jpg', width: 1200, height: 630 }],
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
