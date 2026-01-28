import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetSheet } = body; // We'll pass this from the frontend

    let rowData: any[] = [];
    let range = "";

    if (targetSheet === 'Sheet2') {
      // Data mapping for Event Registrations (Sheet2)
      rowData = [
        body.custom_id || 'N/A',    // Col A: User ID
        body.full_name || 'N/A',    // Col B: Name
        body.college_name || 'N/A', // Col C: Institution
        body.phone || 'N/A',        // Col D: Phone
        body.tier || 'N/A',         // Col E: Tier
        body.events || 'N/A',       // Col F: Selected Events
        body.timestamp || new Date().toLocaleString(), // Col G: Time
      ];
      range = 'Sheet2!A2:G';
    } else {
      // Data mapping for New User Signups (Sheet1)
      rowData = [
        body.custom_id,    // Col A
        body.first_name,   // Col B
        body.last_name,    // Col C
        body.email,        // Col D
        body.phone,        // Col E
        body.college_name, // Col F
        body.created_at || new Date().toLocaleString(), // Col G
      ];
      range = 'Sheet1!A2:G';
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Google Sheet Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}