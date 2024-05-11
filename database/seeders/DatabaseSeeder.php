<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Medicine;
use App\Models\Patient;
use App\Models\Service;
use App\Models\Specialization;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Amine',
            'email' => 'amine@example.com',
            'password'=>'12345678'
        ]);

        Patient::factory(20)->create();
        Specialization::factory(10)->create();
        Doctor::factory(20)->create();
        Appointment::factory(20)->create();
        Medicine::factory(20)->create();
        Service::factory(10)->create();

        
    }
}
