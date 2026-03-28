import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import QuickBar from './QuickBar';

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <QuickBar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
