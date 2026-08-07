import React, { useState } from 'react';
import { PageView, Product, CartItem, ShippingAddress, Order } from './types';
import { PRODUCTS } from './data/products';
import { MainLayout } from './layouts/MainLayout';
import { HeroSection } from './components/HeroSection';
import { AnatomySection } from './components/AnatomySection';
import { CollectionGrid } from './components/CollectionGrid';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AboutPage } from './components/AboutPage';
import { PoliciesPage } from './components/PoliciesPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { PostPurchaseModal } from './components/PostPurchaseModal';
import { OrderConfirmation } from './components/OrderConfirmation';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { ContactPage } from './components/ContactPage';
import { FitCalibratorModal } from './components/FitCalibratorModal';
import { ScienceModal } from './components/ScienceModal';
import { ShopifyStorefrontSection } from './components/ShopifyStorefrontSection';
import { FaqSection } from './components/FaqSection';
import { CustomerPerspectives } from './components/CustomerPerspectives';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Cart State (Pre-populated with 1 Pro-Elite Court Tee for instant rich experience)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'court-tee-pro-elite-#0a0a0c-L',
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colors[0],
      selectedSize: 'L',
      quantity: 1,
    },
  ]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false);
  const [isScienceOpen, setIsScienceOpen] = useState(false);
  const [isPostPurchaseOpen, setIsPostPurchaseOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    size: string,
    colorHex: string,
    qty: number = 1
  ) => {
    const colorObj =
      product.colors.find((c) => c.hex === colorHex) || product.colors[0];
    const compositeId = `${product.id}-${colorHex}-${size}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === compositeId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: compositeId,
            product,
            selectedColor: colorObj,
            selectedSize: size,
            quantity: qty,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleAddBundleToCart = (
    primaryProduct: Product,
    primarySize: string,
    secondaryProduct: Product
  ) => {
    handleAddToCart(primaryProduct, primarySize, primaryProduct.colors[0].hex, 1);
    handleAddToCart(
      secondaryProduct,
      secondaryProduct.sizes[0] || 'M',
      secondaryProduct.colors[0].hex,
      1
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Checkout flow
  const handleInitiateCheckout = (address: ShippingAddress) => {
    // Show Post-Purchase Upsell Modal
    setIsPostPurchaseOpen(true);
  };

  const handleAcceptPostPurchaseUpsell = () => {
    const paddleCover = PRODUCTS.find((p) => p.id === 'pro-guard-paddle-cover') || PRODUCTS[6];
    const upsellItem: CartItem = {
      id: 'pro-guard-paddle-cover-upsell',
      product: paddleCover,
      selectedColor: paddleCover.colors[0],
      selectedSize: 'Universal Fit',
      quantity: 1,
    };

    const finalItems = [...cartItems, upsellItem];
    finalizeOrder(finalItems, true);
    setIsPostPurchaseOpen(false);
  };

  const handleDeclinePostPurchaseUpsell = () => {
    finalizeOrder(cartItems, false);
    setIsPostPurchaseOpen(false);
  };

  const finalizeOrder = (itemsToOrder: CartItem[], hasUpsell: boolean) => {
    const subtotal = itemsToOrder.reduce(
      (s, i) => s + i.product.price * i.quantity,
      0
    );
    const discount = hasUpsell ? 15 : 0; // $15 discount off paddle cover standard $30 price
    const shippingFee = subtotal >= 150 ? 0 : 12;
    const total = subtotal + shippingFee;

    const order: Order = {
      orderId: `CL-LAB-${Math.floor(100000 + Math.random() * 900000)}`,
      items: itemsToOrder,
      subtotal,
      discount,
      shippingFee,
      total,
      shippingAddress: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@courtlab.io',
        address: '1100 Congress Ave, Suite 400',
        city: 'Austin',
        postalCode: '78701',
        country: 'United States',
      },
      hasPostPurchaseUpsell: hasUpsell,
      createdAt: new Date().toISOString(),
      trackingNumber: `CL-SATELLITE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      status: 'In Deployment',
    };

    setCompletedOrder(order);
    setCartItems([]);
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={handleNavigate}
      cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      onOpenCart={() => setIsCartOpen(true)}
      onOpenCalibrator={() => setIsCalibratorOpen(true)}
      onOpenScience={() => setIsScienceOpen(true)}
      onSelectProduct={handleSelectProduct}
    >
      <div key={activePage} className="animate-page-entrance min-h-screen">
        {activePage === 'home' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onOpenCalibrator={() => setIsCalibratorOpen(true)}
            />
            <AnatomySection
              onNavigate={handleNavigate}
              onOpenScience={() => setIsScienceOpen(true)}
            />
            <CollectionGrid
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
            <CustomerPerspectives />
            <FaqSection />
            <ShopifyStorefrontSection />
          </>
        )}

        {activePage === 'shopify' && (
          <div className="pt-4">
            <ShopifyStorefrontSection />
          </div>
        )}

        {activePage === 'catalog' && (
          <div className="pt-8">
            <CollectionGrid
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {activePage === 'anatomy' && (
          <div className="pt-8">
            <AnatomySection
              onNavigate={handleNavigate}
              onOpenScience={() => setIsScienceOpen(true)}
            />
            <CollectionGrid
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {activePage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setActivePage('catalog')}
            onAddToCart={handleAddToCart}
            onAddBundleToCart={handleAddBundleToCart}
            onOpenCalibrator={() => setIsCalibratorOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {activePage === 'policies' && (
          <PoliciesPage onNavigate={handleNavigate} />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            onBackToCart={() => setIsCartOpen(true)}
            onCompleteCheckout={(address) => handleInitiateCheckout(address)}
          />
        )}

        {activePage === 'order-confirmation' && completedOrder && (
          <OrderConfirmation
            order={completedOrder}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'order-tracking' && (
          <OrderTrackingPage
            onNavigate={handleNavigate}
            initialOrder={completedOrder}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </div>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setActivePage('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Post Purchase One-Time Offer Upsell Modal */}
      <PostPurchaseModal
        isOpen={isPostPurchaseOpen}
        onAcceptUpsell={handleAcceptPostPurchaseUpsell}
        onDeclineUpsell={handleDeclinePostPurchaseUpsell}
      />

      {/* Biometric Fit Calibrator Modal */}
      <FitCalibratorModal
        isOpen={isCalibratorOpen}
        onClose={() => setIsCalibratorOpen(false)}
      />

      {/* Science of Play Research Paper Modal */}
      <ScienceModal
        isOpen={isScienceOpen}
        onClose={() => setIsScienceOpen(false)}
      />
    </MainLayout>
  );
}

