<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */

    public function store(LoginRequest $request)
{
    $request->authenticate();

    $guards = ['web', 'doctor','patient'];
    $user = null;

    foreach ($guards as $guard) {
        $currentGuard = Auth::guard($guard);
        if ($currentGuard->check()) {
            $user = $currentGuard->user();  
            break;
        }
    }
    $request->session()->regenerate();

    
    return response()->json([
        'user' => $user,
        'token' => $user->createToken('auth-token',[$user->getRoleAttribute()])->plainTextToken,
    ]);
}
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        $guards = array_keys(config('auth.guards'));
        $user = null;

        foreach ($guards as $guard) {
            $currentGuard = Auth::guard($guard);
            if ($currentGuard->check()) {
                $user = $currentGuard->user();
                break;
            }
        }

        if ($user) {
            $user->tokens()->delete();
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        return response()->noContent();
    }
}
