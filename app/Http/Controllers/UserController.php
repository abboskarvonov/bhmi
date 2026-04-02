<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function toggleAdmin(User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->with('error', 'O\'z admin huquqingizni o\'zgartira olmaysiz.');
        }

        $user->update(['isAdmin' => $user->isAdmin ? 0 : 1]);

        return back()->with(
            'success',
            $user->isAdmin
                ? "{$user->name} foydalanuvchiga admin huquqi berildi."
                : "{$user->name} foydalanuvchidan admin huquqi olib tashlandi."
        );
    }
}
