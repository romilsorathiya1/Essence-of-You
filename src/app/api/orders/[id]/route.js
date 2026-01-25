import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// GET - Get single order
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        // Try to find by ID or order number
        let order = await Order.findById(id).catch(() => null);
        if (!order) {
            order = await Order.findOne({ orderNumber: id });
        }

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch order' },
            { status: 500 }
        );
    }
}

// PUT - Update order (status, tracking, etc.)
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const order = await Order.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to update order' },
            { status: 400 }
        );
    }
}

// DELETE - Delete order
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete order' },
            { status: 500 }
        );
    }
}
