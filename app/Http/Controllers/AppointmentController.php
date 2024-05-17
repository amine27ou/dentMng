<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{

public function index(Request $request)
{

    $query = Appointment::query();

    if ($request->has('app_status')) {
        $query->where('status', 'like', '%' . $request->input('app_status') . '%');
    }

    $appointments = $query->with('doctor', 'patient','service')->oldest('appointment_date')->paginate(10);


    return response()->json([
        'appointments' => $appointments,
        'doctors' => Doctor::all(),
        'patients' => Patient::all(),
        'services' => Service::all(),
    ]);
}
public function store(Request $request){
    $data = $request->validate([
            'doctor_id'=>'required',
            'patient_id'=>'required',
            'service_id'=>'required',
            'appointment_date'=>'required|date',
            'status'=>['required',Rule::in(['Scheduled','Canceled','Completed'])],
            'amount'=>'nullable|int',
            'payment_method'=>['required',Rule::in(['Cash','Credit Card'])],
            'payment_status'=>['nullable',Rule::in(['Pending','Paid'])],
            
        ]);

        
        Appointment::create($data);
        return response()->json([
            'message'=>'Appointment created successfully!'
        ]);
    }
    public function update(Appointment $appointment,Request $request){
        $data = $request->validate([

            'status'=>['nullable',Rule::in(['Scheduled','Canceled','Completed'])],
            'payment_status'=>['nullable',Rule::in(['Pending','Paid'])],
        ]);
        if (isset($data['status'])) {
            $appointment->status = $data['status'];
        }
    
        if (isset($data['payment_status'])) {
            $appointment->payment_status = $data['payment_status'];
        }
    
        $appointment->save();
        
        return response()->json([
            'message'=>'Appointment updated successfully!'
        ]);
    }
    public function show( Appointment $appointment) {
        
        $appointment->load('patient', 'doctor', 'service');
    
        return response()->json([
            'appointment' => $appointment
        ]);
    }
    
    
    public function destroy(Appointment $appointment){
        $appointment->delete();

        return response()->json([
            'message'=>'Appointment deleted successfully!'
        ]);
    }
}
