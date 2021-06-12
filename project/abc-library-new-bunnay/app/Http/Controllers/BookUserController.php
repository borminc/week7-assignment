<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use App\Models\Book;

class BookUserController extends Controller
{

    public function getUserBooks() {
        $books = Auth::user()->books;
        $books->load('category');
        $time_now = time();
        $cost_per_day = 1;
        
        foreach ($books as $book) {
            $book->return_time = time() + 2*24*3600; // for testing expired
            if ($book->return_time > $time_now) {
                $book->expired = true;
                $book->days_past_expired = ($book->return_time - $time_now) / (24*3600);
                $book->cost = $cost_per_day * $book->days_past_expired;
            } else {
                 $book->expired = false;
                 $book->cost = 0;
            }
        }
        return $books;
    }

    public function borrow(Request $request) {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|integer',
            'duration' => ''
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Input is valid'
            ], 400);
        }

        $duration = $request->duration || 7; // days
        $borrow_time = time();
        $return_time = $borrow_time + ($duration*24*3600);

        $book = Book::findOrFail($request->book_id);
        $user = Auth::user();

        if ($user->books->contains($book->id)) {
            // already borrowed
            return response()->json([
                    'error' => 'User has already borrowed this book.'
                ], 406);
        }

        if ($user->books()->get()->count() >= 3) {
            // exceed borrowed books at a time
            return response()->json([
                    'error' => 'User has exceeded number of borrowed books.'
                ], 406);
        }

        $user->books()->attach($request->book_id, [
            'borrow_time' => $borrow_time,
            'return_time' => $return_time
        ]);

        return response()->json([
            'message' => 'Successfully borrowed ' . $book->title . '!'
            ]); 
    }

    public function returnBook(Request $request) {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Input is valid'
            ], 400);
        }

        $user = User::findOrFail($request->user_id);
        $book = Book::findOrFail($request->book_id);
        $user->books()->detach($book);
        
        return response()->json([
            'message' => 'Successfully returned ' . $book->title . '!'
            ]); 
    }
}
