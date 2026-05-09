/**
 * Contact Service — Firestore writes for the `contacts` collection.
 * Each form submission creates a new document.
 */

import { collection, addDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants';

/**
 * Submit a contact form message.
 * @param {{ name: string, email: string, phone?: string, subject: string, message: string }} payload
 * @returns {Promise<string>} new document ID
 */
export async function submitContact(payload) {
  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();
  const phone = payload.phone?.trim() ?? '';
  const subject = payload.subject;
  const message = payload.message.trim();

  const ref = await addDoc(collection(db, COLLECTIONS.CONTACTS), {
    name,
    email,
    phone,
    subject,
    message,
    status:    'new',      // new | read | replied
    createdAt: serverTimestamp(),
  });

  // For Firebase "Trigger Email" extension: creating a doc in `mail` sends an email.
  await setDoc(doc(db, 'mail', ref.id), {
    to: ['info@aytgrup.com'],
    message: {
      subject: `Yeni iletisim talebi - ${name}`,
      text: `Yeni bir iletisim formu talebi geldi.

Ad Soyad: ${name}
E-posta: ${email}
Telefon: ${phone || '-'}
Konu: ${subject || '-'}
Mesaj:
${message}`,
    },
    contactId: ref.id,
    contactName: name,
    contactEmail: email,
    contactSubject: subject || '',
    contactMessage: message,
    createdAt: serverTimestamp(),
  });

  return ref.id;
}
