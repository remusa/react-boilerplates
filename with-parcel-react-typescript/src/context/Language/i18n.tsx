import en from './translations/en.json'
import es from './translations/es.json'

export interface ITranslationMessages {
  [language: string]: {}
}

export const translationMessages: ITranslationMessages = {
  en,
  es,
}
