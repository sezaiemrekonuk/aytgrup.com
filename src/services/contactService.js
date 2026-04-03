/**
 * Contact Service — Firestore writes for the `contacts` collection.
 * Each form submission creates a new document.
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants';

/**
 * Submit a contact form message.
 * @param {{ name: string, email: string, phone?: string, subject: string, message: string }} payload
 * @returns {Promise<string>} new document ID
 */
export async function submitContact(payload) {
  const ref = await addDoc(collection(db, COLLECTIONS.CONTACTS), {
    name:      payload.name.trim(),
    email:     payload.email.trim().toLowerCase(),
    phone:     payload.phone?.trim() ?? '',
    subject:   payload.subject,
    message:   payload.message.trim(),
    status:    'new',      // new | read | replied
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
