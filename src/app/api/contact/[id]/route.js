import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

// GET - Get single contact message
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(contact);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch contact' },
            { status: 500 }
        );
    }
}

// PUT - Update contact status
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const contact = await Contact.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(contact);
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to update contact' },
            { status: 400 }
        );
    }
}

// DELETE - Delete contact message
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete contact' },
            { status: 500 }
        );
    }
}
