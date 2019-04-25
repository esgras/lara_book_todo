<?php

namespace App\Http\Controllers\Frontend;

use App\Entity\Book;
use App\Http\Controllers\Controller;
use App\Http\Repository\BookRepository;
use App\Http\Requests\BookRequest;

class BookController extends Controller
{
    private $repository;

    public function __construct(BookRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        return view('tasks', [
            'tasks' => $this->repository->getAll()
        ]);
    }

    public function store(BookRequest $request)
    {
        Book::create(request(['name', 'author']));

        return redirect()->route('books.index');
    }

    public function edit(Book $book)
    {
        return view('task', compact('book'));
    }

    public function update(BookRequest $request, Book $book)
    {
        $book->update($request->only(['name', 'author']));

        return redirect()->route('books.index');
    }

    public function show(Book $book)
    {
        return $book;
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index');
    }
}