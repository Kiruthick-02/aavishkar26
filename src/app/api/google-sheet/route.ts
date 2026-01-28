import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetSheet } = body;

    let rowData: any[] = [];
    let range = "";

    // 1. Data Mapping Logic
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

    // 2. CRITICAL FIX: Robust Private Key Cleaning for Hugging Face/Docker
    const rawKey = process.env.GOOGLE_PRIVATE_KEY;
    
    if (!rawKey) {
        throw new Error("GOOGLE_PRIVATE_KEY is missing in environment variables.");
    }

    // This handles literal \n, escaped \\n, and accidental wrapping quotes
    const formattedKey = rawKey
      .replace(/\\n/g, '\n')     // Convert string literal \n to real newlines
      .replace(/^"(.*)"$/, '$1') // Remove surrounding double quotes if present
      .trim();                   // Clean up whitespace

    // 3. Authenticate with Google
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

    // 4. Append Data to Spreadsheet
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
    // Detailed error logging for Hugging Face Container Logs
    console.error('--- GOOGLE SHEET ERROR REPORT ---');
    console.error('Message:', error.message);
    if (error.stack) console.error('Stack:', error.stack.split('\n')[0]);
    
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}