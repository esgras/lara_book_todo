<?php

declare(strict_types=1);

namespace App\Http\Repository;

use App\Entity\Book;

final class BookRepository
{
    public function getById(int $id): Book
    {
        return Book::findOrFail($id);
    }

    public function getAll()
    {
        return Book::orderBy('created_at', 'asc')->get();
    }

    public function getByQuery(string $query)
    {
        return Book::where('name','LIKE',"%{$query}%")
                    ->orWhere('author','LIKE',"%{$query}%")
                    ->orWhere('tags','LIKE',"%{$query}%")
                    ->get();
    }

}