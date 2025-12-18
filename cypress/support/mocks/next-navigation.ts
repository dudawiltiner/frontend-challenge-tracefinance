const mockRouter = {
  push: () => {},
  refresh: () => {},
  back: () => {},
  forward: () => {},
  replace: () => {},
  prefetch: () => Promise.resolve(),
};

const mockPathname = '/pt-BR/transactions';

export const useRouter = () => mockRouter;
export const usePathname = () => mockPathname;
