/*
 * Copyright 2022 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
