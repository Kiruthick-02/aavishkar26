import { NextResponse } from 'next/server';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const TEMPLATES_DIR = join(process.cwd(), 'public', 'templates');
const DOWNLOAD_FILENAME = "Aavishkar'26-Paper Presentation.pptx";

export async function GET() {
  try {
    const files = readdirSync(TEMPLATES_DIR);
    const pptx = files.find((f) => f.toLowerCase().endsWith('.pptx'));
    if (!pptx) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    const filePath = join(TEMPLATES_DIR, pptx);
    const buffer = readFileSync(filePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${DOWNLOAD_FILENAME}"`,
      },
    });
  } catch (e) {
    console.error('Paper template download error:', e);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
