import {
  AccountType,
  PixKeyType,
  TransactionType,
} from '@transaction-types/transaction';

import {
  createPixPayload,
  createTedPayload,
} from '../transactionForm.functions';

const TEST_CPF_CNPJ = '12345678900';
const TEST_PIX_KEY = 'joao@email.com';

describe('transactionForm.functions - Payload Creation', () => {
  const mockTransactionFormData = {
    amount: '1.000,00',
    cpfCnpj: '123.456.789-00',
    legalName: 'João Silva',
  };

  describe('createPixPayload', () => {
    it('deve criar payload PIX corretamente', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: PixKeyType.EMAIL,
        description: 'Teste',
      };

      const payload = createPixPayload(mockTransactionFormData, pixData);

      expect(payload.type).toBe(TransactionType.PIX);
      expect(payload.amount).toBe(100000);
      expect(payload.cpfCnpj).toBe(TEST_CPF_CNPJ);
      expect(payload.pixKey).toBe(TEST_PIX_KEY);
      expect(payload.keyType).toBe(PixKeyType.EMAIL);
      expect(payload.description).toBe('Teste');
    });

    it('deve criar payload PIX sem descrição quando não fornecida', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: PixKeyType.EMAIL,
      };

      const payload = createPixPayload(mockTransactionFormData, pixData);

      expect(payload.description).toBeUndefined();
    });

    it('deve lançar erro quando keyType é vazio', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: '' as PixKeyType,
      };

      expect(() => createPixPayload(mockTransactionFormData, pixData)).toThrow(
        'keyType is required'
      );
    });

    it('deve remover formatação do CPF/CNPJ', () => {
      const pixData = {
        pixKey: TEST_PIX_KEY,
        keyType: PixKeyType.EMAIL,
      };

      const formDataWithFormattedCpf = {
        ...mockTransactionFormData,
        cpfCnpj: '123.456.789-00',
      };

      const payload = createPixPayload(formDataWithFormattedCpf, pixData);

      expect(payload.cpfCnpj).toBe('12345678900');
    });
  });

  describe('createTedPayload', () => {
    it('deve criar payload TED corretamente', () => {
      const tedData = {
        bank: '001',
        account: '12345-6',
        agency: '1234',
        accountType: AccountType.CORRENTE,
        description: 'Teste',
      };

      const payload = createTedPayload(mockTransactionFormData, tedData);

      expect(payload.type).toBe(TransactionType.TED);
      expect(payload.amount).toBe(100000);
      expect(payload.cpfCnpj).toBe(TEST_CPF_CNPJ);
      expect(payload.bank).toBe('001');
      expect(payload.account).toBe('12345-6');
      expect(payload.agency).toBe('1234');
      expect(payload.accountType).toBe(AccountType.CORRENTE);
      expect(payload.description).toBe('Teste');
    });

    it('deve criar payload TED sem descrição quando não fornecida', () => {
      const tedData = {
        bank: '001',
        account: '12345-6',
        agency: '1234',
        accountType: AccountType.CORRENTE,
      };

      const payload = createTedPayload(mockTransactionFormData, tedData);

      expect(payload.description).toBeUndefined();
    });

    it('deve lançar erro quando accountType é vazio', () => {
      const tedData = {
        bank: '001',
        account: '12345-6',
        agency: '1234',
        accountType: '' as AccountType,
      };

      expect(() => createTedPayload(mockTransactionFormData, tedData)).toThrow(
        'accountType is required'
      );
    });
  });
});
