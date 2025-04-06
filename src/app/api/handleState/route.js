import dbConnection from '@/config/dbConnection';
import ToggleModel from '@/models/stateModel';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
    try {
      await dbConnection();
  
      const id = "67f2447665975e6579a7e86c";
  
      const record = await ToggleModel.findById(id);
  
      if (!record) {
        return NextResponse.json({ error: 'Toggle not found' }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: record });
    } catch (err) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }
export async function PUT(request) {
 

  const body = await request.json();
  const { isSelected } = body;

  try {

    await dbConnection()

    const id = "67f2447665975e6579a7e86c"

    const updated = await ToggleModel.findByIdAndUpdate(
      id,
      { isSelected },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
