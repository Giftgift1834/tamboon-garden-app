import { NextResponse } from 'next/server';
import { getDrive, DRIVE_FOLDER_ID } from '../../../../lib/google';
import { Readable } from 'stream';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || '';

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const drive = getDrive();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);

    // Create subfolder if specified
    let parentId = DRIVE_FOLDER_ID;
    if (folder) {
      const search = await drive.files.list({
        q: `name='${folder}' and mimeType='application/vnd.google-apps.folder' and '${DRIVE_FOLDER_ID}' in parents and trashed=false`,
        fields: 'files(id)',
      });
      if (search.data.files.length > 0) {
        parentId = search.data.files[0].id;
      } else {
        const created = await drive.files.create({
          requestBody: { name: folder, mimeType: 'application/vnd.google-apps.folder', parents: [DRIVE_FOLDER_ID] },
          fields: 'id',
        });
        parentId = created.data.id;
      }
    }

    const uploaded = await drive.files.create({
      requestBody: { name: file.name, parents: [parentId] },
      media: { mimeType: file.type || 'application/octet-stream', body: stream },
      fields: 'id,name,webViewLink,webContentLink',
    });

    await drive.permissions.create({
      fileId: uploaded.data.id,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    return NextResponse.json({
      ok: true,
      id: uploaded.data.id,
      name: uploaded.data.name,
      viewLink: uploaded.data.webViewLink,
      downloadLink: uploaded.data.webContentLink,
      previewUrl: `https://drive.google.com/thumbnail?id=${uploaded.data.id}&sz=w800`,
    });
  } catch (err) {
    console.error('Drive upload error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
