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
      // Event Registration Data (Sheet 2)
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
      // User Signup Data (Sheet 1)
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

    // 2. ULTIMATE FIX: Base64 Decoding for Hugging Face
    const rawKey = process.env.GOOGLE_PRIVATE_KEY;
    
    if (!rawKey) {
        throw new Error("GOOGLE_PRIVATE_KEY is missing in environment variables.");
    }

    let formattedKey = "";

    // Check if the key is Base64 encoded (doesn't start with the PEM header)
    if (!rawKey.trim().startsWith("-----BEGIN")) {
        console.log("Detecting Base64 encoded key, decoding...");
        formattedKey = Buffer.from(rawKey, 'base64').toString('utf-8');
    } else {
        // Fallback for standard PEM format
        formattedKey = rawKey.replace(/\\n/g, '\n');
    }

    // Final cleanup to ensure no leading/trailing quotes or whitespace
    formattedKey = formattedKey.replace(/^"(.*)"$/, '$1').trim();

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

    console.log(`Successfully synced data to ${targetSheet || 'Sheet1'}`);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    // High-visibility logging for Hugging Face Container Logs
    console.error('--- GOOGLE SHEET ERROR REPORT ---');
    console.error('Status:', error.code || 'No Code');
    console.error('Message:', error.message);
    
    // Check for specific permission error
    if (error.message?.includes('caller does not have permission')) {
        console.error('ACTION REQUIRED: Share your Google Sheet with the Service Account Email as an Editor.');
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}