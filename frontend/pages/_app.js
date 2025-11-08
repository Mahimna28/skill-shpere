/**
 * Next.js App Entry Point
 * * This _app.js file wraps all pages. It's the perfect place
 * to provide the AuthContext to the entire application.
 */
import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}