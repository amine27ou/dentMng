<?php

namespace Database\Factories;

use App\Models\Specialization;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name'=>fake()->firstName(),
            'last_name'=>fake()->lastName(),
            'email'=>fake()->email(),
            'image'=>fake()->imageUrl(),
            'password'=>Hash::make('12345678'),
            'phone'=>fake()->phoneNumber(),
            'status'=>fake()->randomElement(['available','not available']),
            'gender'=>fake()->randomElement(['female','male']),
            'address'=>fake()->address(),
            'specialization_id' => Specialization::all()->random()->id, 
        ];
    }
}
