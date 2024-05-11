<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Medicine;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
{
    $total_appointments = Appointment::count();
    $upcoming_appointments = Appointment::where('status', 'Scheduled')->count();
    $doctors = Doctor::count();
    $medicines = Medicine::count();
    $patients = Patient::all();

    $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
    $endOfMonth = Carbon::now()->endOfMonth()->toDateString();

    $latest_patients = Patient::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->orderByDesc('created_at')
            ->get();

    foreach($latest_patients as $patient){
        $patient->appointments_count = $patient->appointments()->count();
    }

    return response()->json([
        'total_appointments' => $total_appointments,
        'upcoming_appointments' => $upcoming_appointments,
        'doctors' => $doctors,
        'medicines' => $medicines,
        'patients' => $patients, 
        'latest_patients' => $latest_patients, 
    ]);
}

}
