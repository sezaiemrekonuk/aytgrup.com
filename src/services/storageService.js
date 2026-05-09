import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

function sanitizeFileName(name = 'file') {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildStoragePath({ folder, fileName }) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 10);
  return `${folder}/${timestamp}-${random}-${fileName}`;
}

function assertStorageConfigured() {
  if (!process.env.REACT_APP_FIREBASE_STORAGE_BUCKET) {
    throw new Error('Firebase Storage is not configured.');
  }
}

function isFirebaseStorageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const bucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
  return (
    url.startsWith('gs://') ||
    url.includes('firebasestorage.googleapis.com') ||
    (bucket ? url.includes(bucket) : false)
  );
}

export async function uploadImageFile(file, { folder = 'uploads' } = {}) {
  if (!file) {
    throw new Error('No file selected.');
  }
  if (!file.type?.startsWith('image/')) {
    throw new Error('Please select an image file.');
  }

  assertStorageConfigured();

  const fileName = sanitizeFileName(file.name || 'image');
  const path = buildStoragePath({ folder, fileName });
  const fileRef = ref(storage, path);

  await uploadBytes(fileRef, file, {
    contentType: file.type,
    cacheControl: 'public,max-age=31536000',
  });

  return getDownloadURL(fileRef);
}

export async function deleteImageByUrl(url, { ignoreMissing = true } = {}) {
  if (!isFirebaseStorageUrl(url)) {
    return false;
  }

  assertStorageConfigured();

  try {
    await deleteObject(ref(storage, url));
    return true;
  } catch (error) {
    if (ignoreMissing && error?.code === 'storage/object-not-found') {
      return false;
    }
    throw error;
  }
}
