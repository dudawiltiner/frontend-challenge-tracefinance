import { AccountType, PixKeyType } from '@transaction-types/transaction';

import { isPixFormValid, isTedFormValid } from '../transactionForm.functions';

const TEST_PIX_KEY = 'joao@email.com';

describe('transactionForm.functions - Validation', () => {
  const mockTransactionFormData = {
    amount: '1.000,00',
    cpfCnpj: '123.456.789-00',
    legalName: 'João Silva',
  };

  describe('isPixFormValid', () => {
    it('deve retornar true quando todos os campos estão preenchidos', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: PixKeyType.EMAIL,
      };

      expect(isPixFormValid(mockTransactionFormData, pixData)).toBe(true);
    });

    it('deve retornar false quando amount está vazio', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: PixKeyType.EMAIL,
      };

      expect(
        isPixFormValid({ ...mockTransactionFormData, amount: '' }, pixData)
      ).toBe(false);
    });

    it('deve retornar false quando cpfCnpj está vazio', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: PixKeyType.EMAIL,
      };

      expect(
        isPixFormValid({ ...mockTransactionFormData, cpfCnpj: '' }, pixData)
      ).toBe(false);
    });

    it('deve retornar false quando legalName está vazio', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: PixKeyType.EMAIL,
      };

      expect(
        isPixFormValid({ ...mockTransactionFormData, legalName: '' }, pixData)
      ).toBe(false);
    });

    it('deve retornar false quando pixKey está vazio', () => {
      const pixData = {
        pixKey: '',
        keyType: PixKeyType.EMAIL,
      };

      expect(isPixFormValid(mockTransactionFormData, pixData)).toBe(false);
    });

    it('deve retornar false quando keyType é inválido', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: '' as PixKeyType,
      };

      expect(isPixFormValid(mockTransactionFormData, pixData)).toBe(false);
    });

    it('deve retornar false quando campos têm apenas espaços', () => {
      const pixData = {
        pixKey: '   ',
        keyType: PixKeyType.EMAIL,
      };

      expect(
        isPixFormValid(
          {
            ...mockTransactionFormData,
            amount: '   ',
            cpfCnpj: '   ',
            legalName: '   ',
          },
          pixData
        )
      ).toBe(false);
    });
  });

  describe('isTedFormValid', () => {
    it('deve retornar true quando todos os campos estão preenchidos', () => {
      const tedData = {
        bank: '001',
        account: '12345-6',
        agency: '1234',
        accountType: AccountType.CORRENTE,
      };

      expect(isTedFormValid(mockTransactionFormData, tedData)).toBe(true);
    });

    it('deve retornar false quando bank está vazio', () => {
      const tedData = {
        bank: '',
        account: '12345-6',
        agency: '1234',
        accountType: AccountType.CORRENTE,
      };

      expect(isTedFormValid(mockTransactionFormData, tedData)).toBe(false);
    });

    it('deve retornar false quando account está vazio', () => {
      const tedData = {
        bank: '001',
        account: '',
        agency: '1234',
        accountType: AccountType.CORRENTE,
      };

      expect(isTedFormValid(mockTransactionFormData, tedData)).toBe(false);
    });

    it('deve retornar false quando agency está vazio', () => {
      const tedData = {
        bank: '001',
        account: '12345-6',
        agency: '',
        accountType: AccountType.CORRENTE,
      };

      expect(isTedFormValid(mockTransactionFormData, tedData)).toBe(false);
    });

    it('deve retornar false quando accountType é inválido', () => {
      const tedData = {
        bank: '001',
        account: '12345-6',
        agency: '1234',
        accountType: '' as AccountType,
      };

      expect(isTedFormValid(mockTransactionFormData, tedData)).toBe(false);
    });

    it('deve retornar false quando campos têm apenas espaços', () => {
      const tedData = {
        bank: '   ',
        account: '   ',
        agency: '   ',
        accountType: AccountType.CORRENTE,
      };

      expect(
        isTedFormValid(
          {
            ...mockTransactionFormData,
            amount: '   ',
            cpfCnpj: '   ',
            legalName: '   ',
          },
          tedData
        )
      ).toBe(false);
    });
  });
});
