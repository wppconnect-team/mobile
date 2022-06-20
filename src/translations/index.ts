import {I18n} from 'i18n-js';
import ptBR from 'i18n-js/json/pt-BR.json';
import en from 'i18n-js/json/en.json';
import * as RNLocalize from 'react-native-localize';

const i18n = new I18n({
  ...ptBR,
  ...en,
});

i18n.defaultLocale = 'en';

import memoize from 'lodash.memoize';
import {I18nManager} from 'react-native';
import {TranslateOptions} from 'i18n-js/typings/typing';

const translate = memoize(
  (key, config?: TranslateOptions) => i18n.t(key, config),
  (key, config?: TranslateOptions) =>
    config ? key + JSON.stringify(config) : key,
);

const translationGetters: {[index: string]: any} = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('assets/translations/en.json'),
};

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear?.();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18n.translations = {
    [languageTag]: translationGetters[languageTag](),
  };
  i18n.locale = languageTag;
};
setI18nConfig();

export {i18n, translate};
export default translate;
