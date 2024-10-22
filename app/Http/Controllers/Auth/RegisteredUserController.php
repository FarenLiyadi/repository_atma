<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:'.User::class,
            'email' => 'nullable|string|lowercase|email|max:255',
            'roles' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'roles' => $request->roles,
        ]);

        // event(new Registered($user));

        // Auth::login($user);
        // Flash success message
        // session(['success' => 'Berhasil membuat data user!']);
        // session()->flash('success', 'You have logged in successfully!');
        // Session::flash('success','Data berhasil dibuat!');
        // return redirect(route('dashboard'))->with('success', 'Item successfully created!');
        return redirect()->route('dashboard',['success'=> 'Registration successful!'])->with('success', 'Registration successful!');
    }
}
