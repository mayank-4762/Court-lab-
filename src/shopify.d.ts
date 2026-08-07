import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
      'shopify-store': any;
      'shopify-context': any;
      'shopify-list-context': any;
      'shopify-cart': any;
      'shopify-media': any;
      'shopify-money': any;
      'shopify-variant-selector': any;
      'shopify-data': any;
    }
  }
}

