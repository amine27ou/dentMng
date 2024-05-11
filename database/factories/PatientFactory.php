<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'unique_id'=>uniqid(),
            'first_name'=>fake()->firstName(),
            'last_name'=>fake()->lastName(),
            'email'=>fake()->email(),
            'phone'=>fake()->phoneNumber(),
            'birthdate' => fake()->dateTimeBetween('-70 years', '-12 years')->format('Y-m-d'),
            'password'=>Hash::make('12345678'),
            'gender'=>fake()->randomElement(['female','male']),
            'address'=>fake()->address(),
        ];
    }
}
