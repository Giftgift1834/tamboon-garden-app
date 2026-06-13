import { google } from 'googleapis';

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });
}

export function getSheets() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

export function getDrive() {
  return google.drive({ version: 'v3', auth: getAuth() });
}

export const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
