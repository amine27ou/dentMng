<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'patient_id' => \App\Models\Patient::factory(),
            'doctor_id' => \App\Models\Doctor::factory(),
            'service_id' => \App\Models\Service::factory(),
            'appointment_date' => $this->faker->dateTimeBetween('+1 week', '+1 month')->format('Y-m-d'),
            'status' => $this->faker->randomElement(['Scheduled', 'Completed', 'Canceled']),
            'amount' => $this->faker->randomFloat(50, 200, 1000),
            'payment_method' => $this->faker->randomElement(['Cash', 'Credit Card']),
            'payment_status' => $this->faker->randomElement(['Pending', 'Paid']),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
