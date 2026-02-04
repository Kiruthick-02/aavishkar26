import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { REGISTRATIONS_OPEN, WORKSHOP_REGISTRATIONS_OPEN } from '@/lib/registration-config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetSheet } = body;

    if (targetSheet === 'Sheet2' && !REGISTRATIONS_OPEN) {
      return NextResponse.json(
        { error: 'Ticket registrations are temporarily closed.' },
        { status: 503 }
      );
    }

    if (targetSheet === 'Workshop' && !WORKSHOP_REGISTRATIONS_OPEN) {
      return NextResponse.json(
        { error: 'Workshop registrations are temporarily closed.' },
        { status: 503 }
      );
    }

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
    } else if (targetSheet === 'Workshop') {
      rowData = [
        body.custom_id || 'N/A',
        body.full_name || 'N/A',
        body.college_name || 'N/A',
        body.phone || 'N/A',
        body.student_type || 'N/A',
        body.registration_type || 'N/A',
        body.fee || 'N/A',
        body.timestamp || new Date().toLocaleString(),
      ];
      range = 'Workshop!A2:H';
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

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheets = google.sheets({ auth, version: 'v4' });

    if (targetSheet === 'Workshop') {
      const meta = await sheets.spreadsheets.get({ spreadsheetId });
      const hasWorkshop = meta.data.sheets?.some(
        (s: any) => s.properties?.title === 'Workshop'
      );
      if (!hasWorkshop) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: { title: 'Workshop' },
                },
              },
            ],
          },
        });
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Workshop!A1:H1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              ['Custom ID', 'Full Name', 'College Name', 'Phone', 'Student Type', 'Registration Type', 'Fee', 'Timestamp'],
            ],
          },
        });
      }
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
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