<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PatientController extends Controller
{
    public function index(Request $request){
        $query = Patient::query();
        if($request->has('name')){
            $query->where('first_name','like','%'.$request->input('name').'%')->orWhere('last_name','like','%'.$request->input('name').'%');
        }
        $patients = $query->latest()->paginate(10);

        foreach($patients as $patient){
            $patient->appointments_count = $patient->appointments()->where('status','Scheduled')->count();
        }
        return response()->json([
            'patients'=>$patients
        ]);
    }
    public function store(Request $request){
        $data = $request->validate([
            'first_name'=>'required',
            'last_name'=>'required',
            'email'=>'required|email',
            'password'=>['required',Password::min(8)->letters()],
            'confirm_password'=>'required|same:password',
            'gender'=>'required',
            'address'=>'required|max:255',
            'phone'=>'required',
            'birthdate'=>'required|date', 
        ]);
        $data['unique_id'] = uniqid();
        $data['password'] = Hash::make($data['password']);
        Patient::create($data);
        return response()->json([
            'message'=>'Patient added successfully!'
        ]);
    }

    public function update(Request $request, Patient $patient){
        $data = $request->validate([
            'first_name'=>'required',
            'last_name'=>'required',
            'email'=>'required|email',
            'password'=>['nullable',Password::min(8)->letters()],
            'confirm_password'=>'nullable|same:password',
            'gender'=>'required',
            'address'=>'required|max:255',
            'phone'=>'required',
            'birthdate'=>'required|date', 
        ]);
        if(isset($data['password'])){
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
           
        $patient->update($data);
        return response()->json([
            'message'=>'Patient updated successfully!'
        ]);
    }

    public function show(Patient $patient){
        $appointments = $patient->appointments()->with('doctor')->get();

        return response()->json([
            'patient' => $patient,
            'doctor' => $appointments->isNotEmpty() ? $appointments->first()->doctor : null,
            'appointments' => $patient->appointments,
            'upcoming_appointments' => $patient->appointments()->where('status', 'Scheduled')->count(),
            'completed_appointments' => $patient->appointments()->where('status', 'Completed')->count(),
        ]);
    }
    

    public function destroy(Patient $patient){
        $patient->delete();
        return response()->json([
            'message'=>'Patient deleted successfully!'
        ]);
    }
    
}
