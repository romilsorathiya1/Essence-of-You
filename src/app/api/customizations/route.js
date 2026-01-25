import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Customization from '@/models/Customization';

// GET - Get all customization requests
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const email = searchParams.get('email');

        let query = {};
        if (status) query.status = status;
        if (email) query['customer.email'] = email;

        const customizations = await Customization.find(query).sort({ createdAt: -1 });
        return NextResponse.json(customizations);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch customizations' },
            { status: 500 }
        );
    }
}

// POST - Submit a new customization request
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate customer info
        if (!body.customer?.name || !body.customer?.email) {
            return NextResponse.json(
                { error: 'Customer name and email are required' },
                { status: 400 }
            );
        }

        const customization = await Customization.create(body);
        return NextResponse.json(
            { message: 'Customization request submitted successfully', customization },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to submit customization request' },
            { status: 400 }
        );
    }
}
