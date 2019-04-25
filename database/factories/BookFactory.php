<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Entity\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence,
        'author' => $faker->name,
        'tags' => $faker->word
    ];
});
