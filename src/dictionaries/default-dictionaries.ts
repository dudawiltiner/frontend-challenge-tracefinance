import { enUS } from './default-language-collections/enUS/default-en-US';
import { ptBR } from './default-language-collections/ptBR/default-pt-BR';

export const defaultDictionary = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

export type Langs = keyof typeof defaultDictionary;
export type DictionaryResult = typeof ptBR;
