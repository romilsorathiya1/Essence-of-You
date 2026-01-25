import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// GET - Get all orders
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const email = searchParams.get('email');

        let query = {};
        if (status) query.status = status;
        if (email) query['customer.email'] = email;

        const orders = await Order.find(query).sort({ createdAt: -1 });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

// POST - Create a new order
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        const order = await Order.create(body);
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to create order' },
            { status: 400 }
        );
    }
}
