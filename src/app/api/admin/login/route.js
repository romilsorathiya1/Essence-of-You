import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// POST - Admin login
export async function POST(request) {
    try {
        await connectDB();
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });

        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Simple password check (in production, use bcrypt)
        if (admin.password !== password) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        if (!admin.isActive) {
            return NextResponse.json(
                { error: 'Account is deactivated' },
                { status: 403 }
            );
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Return admin data (without password)
        const adminData = {
            id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role
        };

        return NextResponse.json({
            message: 'Login successful',
            admin: adminData
        });
    } catch (error) {
        console.error('Admin Login Error:', error);
        return NextResponse.json(
            { error: 'Login failed', details: error.message },
            { status: 500 }
        );
    }
}
