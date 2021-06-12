<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Book;
use App\Models\Category;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Book::all();
        if ($result) $result->load('category');
        return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|unique:books',
            'author' => 'required|string',
            'description' => 'required|string',
            'publisher' => 'required|string',
            'year' => 'required',
            'image' => '',
            'category_id' => 'required',
            'stock' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Input is valid'
            ], 400);
        }

        Book::create($request->all());

        return response()->json([
            'message' => 'Successfully added ' . $request->title . '!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $book = Book::findOrFail($id);
        if($book) $book->load('category');
        return $book;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);
        
        $book->title = $request->title;
        $book->author = $request->author;
        $book->description = $request->description;
        $book->publisher = $request->publisher;
        $book->year = $request->year;
        $book->image = $request->image;
        $book->category_id = $request->category_id;
        $book->stock = $request->stock;

        $book->save();

        return response()->json([
            'message' => 'Successfully updated ' . $request->title . '!'
            ]); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json([
            'message' => 'Successfully deleted ' . $book->title . '!'
            ]); 
    }

    public function search(Request $request) {
        // allowed search parameters 
        $params = ['title', 'author', 'description', 'publisher', 'year', 'category_id'];

        $by = $request->query('by');
        $value = $request->query('value');

        if (!($by && $value) || !in_array($by, $params)) {
            // invalid params
            return response()->json([
                'error' => 'Bad request'
            ], 400); 
        }

        $result = Book::where($by, 'LIKE', '%'.$value.'%')->get();
        
        if ($result) $result->load('category');

        return $result; 
    }
}
