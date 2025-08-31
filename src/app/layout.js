import { Inter, Inconsolata } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';
import { TooltipProvider } from '../components/ui/tooltip';

// import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
const inconsolata = Inconsolata({ subsets: ['latin'], variable: '--font-inconsolata' });
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inconsolata.variable}`}>
      <body className={inter.className}>
        <ClientProvider>
          <TooltipProvider>{children}</TooltipProvider>
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
    description: `This is a dynamically generated description for ${slug}.`, // Dynamic description
    // Add other metadata fields as needed, like keywords, open graph tags, etc.
    keywords: [`${slug}`, 'dynamic', 'page'],
    openGraph: {
      title: `ConcertCapsule - digital concert memories`,
      description: `Open Graph Description for ${slug}`,
      url: `https://yourwebsite.com/${slug}`,
    },
  };
};
