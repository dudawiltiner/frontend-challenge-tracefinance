import { mount } from 'cypress/react';

// Mock Next.js navigation hooks
const mockRouter = {
  push: () => {},
  refresh: () => {},
  back: () => {},
  forward: () => {},
  replace: () => {},
  prefetch: () => Promise.resolve(),
};

const mockPathname = '/pt-BR/transactions';

// Mock next/navigation module
if (typeof window !== 'undefined') {
  (window as any).__NEXT_ROUTER_MOCK__ = {
    useRouter: () => mockRouter,
    usePathname: () => mockPathname,
  };
}

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

before(() => {
  cy.readFile('src/app/globals.css', 'utf8').then((css) => {
    const style = document.getElementById('cypress-globals');
    if (style) {
      style.textContent = css;
    } else {
      const styleElement = document.createElement('style');
      styleElement.id = 'cypress-globals';
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    }
  });
});

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('app router to be mounted')) {
    return false;
  }
  if (
    err.message.includes('useRouter') ||
    err.message.includes('usePathname')
  ) {
    return false;
  }
  return true;
});
