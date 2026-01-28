import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetSheet } = body;

    let rowData: any[] = [];
    let range = "";

    if (targetSheet === 'Sheet2') {
      rowData = [
        body.custom_id || 'N/A',
        body.full_name || 'N/A',
        body.college_name || 'N/A',
        body.phone || 'N/A',
        body.tier || 'N/A',
        body.events || 'N/A',
        body.timestamp || new Date().toLocaleString(),
      ];
      range = 'Sheet2!A2:G';
    } else {
      rowData = [
        body.custom_id || 'N/A',
        body.first_name || 'N/A',
        body.last_name || 'N/A',
        body.email || 'N/A',
        body.phone || 'N/A',
        body.college_name || 'N/A',
        body.created_at || new Date().toLocaleString(),
      ];
      range = 'Sheet1!A2:G';
    }

    const rawKey = process.env.GOOGLE_PRIVATE_KEY;
    if (!rawKey) throw new Error("GOOGLE_PRIVATE_KEY is missing.");

    let formattedKey = "";

    // 1. Handle Base64 vs Raw
    if (!rawKey.trim().startsWith("-----BEGIN")) {
      console.log("Decoding Base64 key...");
      formattedKey = Buffer.from(rawKey, 'base64').toString('utf-8');
    } else {
      formattedKey = rawKey;
    }

    // 2. AGGRESSIVE REPAIR: Fix escaping issues
    // This removes literal "\n" strings and replaces them with actual line breaks
    // It also handles cases where there are double escapes like "\\n"
    formattedKey = formattedKey
      .replace(/\\n/g, '\n')      // Fix single escaped newlines
      .replace(/\n\n+/g, '\n')    // Remove accidental double empty lines
      .replace(/"/g, '')          // Remove any accidental quotes
      .trim();

    // 3. Validation Log (Safe for Logs)
    console.log("System: Key Header Check ->", formattedKey.substring(0, 15) + "...");
    
    if (!formattedKey.startsWith("-----BEGIN PRIVATE KEY-----")) {
       throw new Error("Key repair failed: Result does not start with standard PEM header.");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: formattedKey,
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ auth, version: 'v4' });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log(`Sync Successful to ${targetSheet || 'Sheet1'}`);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('--- GOOGLE SHEET ERROR ---');
    console.error('Message:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}