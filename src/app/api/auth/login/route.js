import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// POST - User login
export async function POST(request) {
    try {
        await connectDB();
        const { email, password } = await request.json();

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check if account is active
        if (!user.isActive) {
            return NextResponse.json(
                { error: 'Your account has been deactivated. Please contact support.' },
                { status: 403 }
            );
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Return user data (without password)
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
        };

        return NextResponse.json({
            message: 'Login successful',
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
