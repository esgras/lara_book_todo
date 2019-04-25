<?php

namespace App\Http\Controllers\Api;

use App\Entity\Book;
use App\Http\Controllers\Controller;
use App\Http\Repository\BookRepository;
use App\Http\Requests\BookRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    private $repository;

    public function __construct(BookRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        return $this->repository->getAll();
    }

    public function store(BookRequest $request)
    {
        return Book::create(request(['name', 'author', 'tags']));
    }


    public function update(BookRequest $request, int $id)
    {
        $book = $this->repository->getById($id);
        $book->update(request(['name', 'author', 'tags']));

        return $book;
    }

    public function show($id)
    {
        return $this->repository->getById($id);
    }

    public function search(string $query='')
    {
        return empty($query) ? $this->repository->getAll()
            : $this->repository->getByQuery($query);
    }

    public function destroy(int $id)
    {
        Book::findOrFail($id);
        $book = $this->repository->getById($id);
        $book->delete();

        return json_encode(['success' => true]);
    }
}