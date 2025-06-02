import { Outlet } from 'react-router';
import { LayoutFooter } from '@/components/layout/Footer';

export function PrimaryLayout() {
  return (
    <main>
      <Outlet />
      <LayoutFooter />
    </main>
  );
}
