import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

// GET - Get all contact messages
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        let query = {};
        if (status) query.status = status;

        const contacts = await Contact.find(query).sort({ createdAt: -1 });
        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}

// POST - Submit a new contact message
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.subject || !body.message) {
            return NextResponse.json(
                { error: 'Name, email, subject, and message are required' },
                { status: 400 }
            );
        }

        const contact = await Contact.create(body);
        return NextResponse.json(
            { message: 'Message sent successfully', contact },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to send message' },
            { status: 400 }
        );
    }
}
