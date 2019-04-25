<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Repository\BookRepository;

class MainController extends Controller
{
    public function index(BookRepository $repository)
    {
        return view('frontend.main.index', [
            'books' => $repository->getAll()
        ]);
    }
}