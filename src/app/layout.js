import { Inter, Inconsolata } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
const inconsolata = Inconsolata({ subsets: ['latin'], variable: '--font-inconsolata' });
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inconsolata.variable}`}>
      <body className={inter.className}>
        <ClientProvider>
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster
              richColors
              position="top-left"
              toastOptions={{
                className: 'font-inconsolata',
              }}
            />
          </QueryProvider>
        </ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// You can manage the metadata, tab content and info about your app dynamically using this. It will work on every page in your app:
export const generateMetadata = async ({ params }) => {
  // Destructure parameters or fetch necessary data here
  const { slug } = params; // Example of accessing dynamic route params

  return {
    title: `ConcertCapsule - ${slug || 'HOME'}`, // Dynamically set the title using route parameters
    description: `Capture and relive all your concert memories with ConcertCapsule.`, // Dynamic description
    // Add other metadata fields as needed, like keywords, open graph tags, etc.
    keywords: [`${slug}`, 'dynamic', 'page'],
    openGraph: {
      title: `ConcertCapsule - Digital Concert Memories`,
      description: `Relive your concert memories and share them with others on ConcertCapsule.`,
      url: `https://yourwebsite.com/${slug}`,
    },
  };
};
