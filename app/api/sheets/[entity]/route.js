import { NextResponse } from 'next/server';
import { getRows, appendRow, updateRowById, deleteRowById } from '../../../../lib/sheetsHelper';

const ALLOWED = ['Projects', 'Documents', 'Employees', 'Materials'];

function tabName(entity) {
  return entity.charAt(0).toUpperCase() + entity.slice(1);
}

export async function GET(request, { params }) {
  const tab = tabName((await params).entity);
  if (!ALLOWED.includes(tab)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  try {
    const rows = await getRows(tab);
    return NextResponse.json(rows);
  } catch (err) {
    console.error('GET sheets error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const tab = tabName((await params).entity);
  if (!ALLOWED.includes(tab)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  try {
    const data = await request.json();
    await appendRow(tab, data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('POST sheets error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const tab = tabName((await params).entity);
  if (!ALLOWED.includes(tab)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  try {
    const data = await request.json();
    await updateRowById(tab, data.id, data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('PUT sheets error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const tab = tabName((await params).entity);
  if (!ALLOWED.includes(tab)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  try {
    const { id } = await request.json();
    await deleteRowById(tab, id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE sheets error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
