import { NextResponse } from 'next/server';

import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';
import { convertToCSV } from '@/utils/FileHelper';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const characters = body.characters as CharacterSearchResultEntry[];

    if (!Array.isArray(characters) || characters.length === 0) {
      return NextResponse.json(
        { error: 'There is no data to export' },
        { status: 400 }
      );
    }

    const csvContent = convertToCSV(characters);

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${characters.length}_items.csv"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
