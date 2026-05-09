/**
 * Auto-translate service – uses the free MyMemory API.
 * No API key required. Free tier: ~5 000 chars/day (anonymous).
 * Swap the `translateOne` function to plug in Google, DeepL, etc.
 */

const LANG_CODES = {
  tr: 'tr-TR',
  en: 'en-US',
  de: 'de-DE',
};

const ALL_LANGS = ['tr', 'en', 'de'];

/**
 * Translate a single string with MyMemory.
 * @param {string} text
 * @param {'tr'|'en'|'de'} fromLang
 * @param {'tr'|'en'|'de'} toLang
 * @returns {Promise<string>}
 */
async function translateOne(text, fromLang, toLang) {
  if (!text || !text.trim()) return '';
  const pair = `${LANG_CODES[fromLang]}|${LANG_CODES[toLang]}`;
  const url =
    `https://api.mymemory.translated.net/get` +
    `?q=${encodeURIComponent(text.trim().slice(0, 500))}` +
    `&langpair=${pair}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  if (data.responseStatus !== 200) {
    throw new Error(data.responseMessage ?? 'Translation failed');
  }
  return data.responseData.translatedText ?? '';
}

/**
 * Translate an object of field values from `fromLang` to all other languages.
 *
 * @param {{ [field: string]: string }} fields  – e.g. { title: 'Proje', desc: '...' }
 * @param {'tr'|'en'|'de'} fromLang             – source language
 * @returns {Promise<{ [toLang: string]: { [field: string]: string } }>}
 *          – e.g. { en: { title: 'Project', desc: '...' }, de: { ... } }
 */
export async function autoTranslateFields(fields, fromLang) {
  const targets = ALL_LANGS.filter((l) => l !== fromLang);
  const result = {};

  for (const toLang of targets) {
    result[toLang] = {};
    for (const [key, text] of Object.entries(fields)) {
      result[toLang][key] = text?.trim()
        ? await translateOne(text, fromLang, toLang)
        : '';
    }
  }

  return result;
}
