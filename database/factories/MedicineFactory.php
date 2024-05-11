<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medicine>
 */
class MedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->name(),
            'description'=>fake()->paragraph(3),
            'category'=>fake()->randomElement(['tablets','capsules','syrups','injections']),
            'selling_price'=>fake()->numberBetween(6,60),
            'buying_price'=>fake()->numberBetween(3,30),
            'quantity'=>fake()->numberBetween(5,30),
            'status'=>fake()->randomElement(['available','not available']),
        ];
    }
}
