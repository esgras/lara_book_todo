<?php

use Illuminate\Database\Seeder;
use App\Entity\Book;

class BookTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genres = factory(Book::class, 20)->create();
    }
}
