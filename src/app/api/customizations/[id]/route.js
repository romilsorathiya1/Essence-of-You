import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Customization from '@/models/Customization';

// GET - Get single customization request
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const customization = await Customization.findById(id);

        if (!customization) {
            return NextResponse.json(
                { error: 'Customization not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(customization);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch customization' },
            { status: 500 }
        );
    }
}

// PUT - Update customization status
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const customization = await Customization.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!customization) {
            return NextResponse.json(
                { error: 'Customization not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(customization);
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to update customization' },
            { status: 400 }
        );
    }
}

// DELETE - Delete customization
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const customization = await Customization.findByIdAndDelete(id);

        if (!customization) {
            return NextResponse.json(
                { error: 'Customization not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Customization deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete customization' },
            { status: 500 }
        );
    }
}
