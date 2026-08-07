import React from 'react';
import { PageView, Product } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCalibrator: () => void;
  onOpenScience: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenCalibrator,
  onOpenScience,
  onSelectProduct,
}) => {
  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex flex-col justify-between selection:bg-[#ccff00] selection:text-black">
      <Navbar
        activePage={activePage}
        onNavigate={onNavigate}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onOpenCalibrator={onOpenCalibrator}
        onOpenScience={onOpenScience}
        onSelectProduct={onSelectProduct}
      />

      <main className="flex-1">{children}</main>

      <Footer
        onNavigate={onNavigate}
        onOpenCalibrator={onOpenCalibrator}
        onOpenScience={onOpenScience}
      />
    </div>
  );
};

