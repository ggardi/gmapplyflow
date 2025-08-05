<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    /**
     * Show the application form
     */
    public function index()
    {
        // Let's add some debugging
        Log::info('Index route hit');

        return Inertia::render('Welcome', [
            'test' => 'Hello from Laravel!'
        ]);
    }

    /**
     * Handle the application form submission
     */
    public function submit(Request $request)
    {
        // Validate the form data
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email:rfc,dns|max:255',
        ]);

        // // Check if email already exists in the database
        // try {
        //     if ($this->emailExists($validated['email'])) {
        //         return redirect()->back()
        //             ->withErrors(['email' => 'This email address is already registered.'])
        //             ->withInput();
        //     }
        // } catch (\Exception $e) {
        //     Log::error('Database connection error: ' . $e->getMessage());
        //     return redirect()->back()
        //         ->withErrors(['email' => 'Unable to verify email. Please try again.'])
        //         ->withInput();
        // }

        // Just log the data for now (no database saving)
        Log::info('New application submitted:', $validated);

        // Return success response with the submitted data
        return redirect()->back()->with('success', 'Thank you ' . $validated['first_name'] . '! Your application has been submitted successfully.');
    }

    /**
     * Check if an email already exists in the users table
     */
    private function emailExists($email)
    {
        return User::where('email', $email)->exists();
    }
}
