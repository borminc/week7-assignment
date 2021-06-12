<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\User;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'author', 
        'description', 
        'publisher', 
        'year', 
        'image', 
        'category_id',
        'stock'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function users() {
        return $this->belongsToMany(User::class)->withPivot('borrow_time', 'return_time');
    }

}
