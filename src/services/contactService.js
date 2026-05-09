/**
 * Contact Service — Firestore writes for the `contacts` collection.
 * Each form submission creates a new document.
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants';

const MAIL_COLLECTION = 'mail';
const SUPPORTED_LOCALES = ['tr', 'en', 'de'];

function normalizeLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale) ? locale : 'tr';
}

function getSubjectLabel(subject, locale) {
  const labels = {
    tr: {
      general: 'Genel',
      quote: 'Teklif',
      project: 'Proje',
      career: 'Kariyer',
      other: 'Diğer',
    },
    en: {
      general: 'General',
      quote: 'Quote',
      project: 'Project',
      career: 'Career',
      other: 'Other',
    },
    de: {
      general: 'Allgemein',
      quote: 'Angebot',
      project: 'Projekt',
      career: 'Karriere',
      other: 'Andere',
    },
  };

  return labels[locale]?.[subject] ?? subject ?? '-';
}

function getUserReplyTemplate(locale, name) {
  if (locale === 'en') {
    return {
      subject: 'We received your contact request',
      text: `Hello ${name},

Thank you for contacting AYT Grup.
We have received your request and our team will get back to you as soon as possible.

Best regards,
AYT Grup`,
    };
  }

  if (locale === 'de') {
    return {
      subject: 'Wir haben Ihre Kontaktanfrage erhalten',
      text: `Hallo ${name},

Vielen Dank, dass Sie AYT Grup kontaktiert haben.
Wir haben Ihre Anfrage erhalten und unser Team wird sich so schnell wie möglich bei Ihnen melden.

Mit freundlichen Grüßen
AYT Grup`,
    };
  }

  return {
    subject: 'İletişim talebinizi aldık',
    text: `Merhaba ${name},

AYT Grup ile iletişime geçtiğiniz için teşekkür ederiz.
Talebinizi aldık, ekibimiz en kısa sürede sizinle iletişime geçecektir.

Saygılarımızla
AYT Grup`,
  };
}

/**
 * Submit a contact form message.
 * @param {{ name: string, email: string, phone?: string, subject: string, message: string, language?: string }} payload
 * @returns {Promise<string>} new document ID
 */
export async function submitContact(payload) {
  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();
  const phone = payload.phone?.trim() ?? '';
  const subject = payload.subject;
  const message = payload.message.trim();
  const language = normalizeLocale(payload.language);
  const subjectLabel = getSubjectLabel(subject, language);
  const userReply = getUserReplyTemplate(language, name);

  const ref = await addDoc(collection(db, COLLECTIONS.CONTACTS), {
    name,
    email,
    phone,
    subject,
    message,
    status:    'new',      // new | read | replied
    createdAt: serverTimestamp(),
  });

  // For Firebase "Trigger Email" extension: each doc in `mail` queues one email.
  await addDoc(collection(db, MAIL_COLLECTION), {
    type: 'admin',
    to: ['info@aytgrup.com'],
    message: {
      subject: `Yeni iletişim talebi - ${name}`,
      text: `Yeni bir iletişim formu talebi geldi.

Ad Soyad: ${name}
E-posta: ${email}
Telefon: ${phone || '-'}
Konu: ${subjectLabel}
Mesaj:
${message}`,
    },
    contactId: ref.id,
    language,
    contactName: name,
    contactEmail: email,
    contactSubject: subject,
    contactMessage: message,
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, MAIL_COLLECTION), {
    type: 'user',
    to: [email],
    message: userReply,
    contactId: ref.id,
    language,
    contactName: name,
    contactEmail: email,
    contactSubject: subject,
    contactMessage: message,
    createdAt: serverTimestamp(),
  });

  return ref.id;
}
