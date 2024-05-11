<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class DoctorController extends Controller
{
    public function index(Request $request){

        $query = Doctor::query();
        if($request->has('name')){
            $doctors = $query->where('first_name','like','%'.$request->input('name').'%')->orWhere('last_name','like','%'.$request->input('name').'%');
        }


        $doctors = $query->latest()->paginate(10);
        return response()->json([
            'doctors'=>$doctors
        ]);
    }
    public function store(Request $request){
        $data = $request->validate([
            'first_name'=>'required',
            'last_name'=>'required',
            'email'=>'required|email',
            'image'=>'nullable|image',
            'password'=>['required',Password::min(8)->letters()],
            'confirm_password'=>'required|same:password',
            'gender'=>['required',Rule::in(['female', 'male',])],
            'status'=>['required',Rule::in(['not available', 'available'])],
            'specialization_id'=>'required',
            'address'=>'required|max:255',
            'phone'=>'required',
        ]);

        $data['password'] = Hash::make($data['password']);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = 'doctor/image_' . time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public', $imageName);
            $data['image'] = $imageName;
        } else {
            $data['image'] = null;
        }

        Doctor::create($data);
        return response()->json([
            'message'=>'Doctor created successfully!'
        ]);
                                      
    }
    public function show(Doctor $doctor){
        $appointments = $doctor->appointments()->with('patient')->get();

        return response()->json([
            'doctor'=>$doctor,
            'appointments' => $doctor->appointments,
            'upcoming_appointments'=>$doctor->appointments()->where('status','Scheduled')->count(),
            'completed_appointments'=>$doctor->appointments()->where('status','Completed')->count(),
            'patient' => $appointments->isNotEmpty() ? $appointments->first()->patient : null,
        ]);
    }
    public function update(Request $request, Doctor $doctor){
        $data = $request->validate([
            'first_name'=>'required',
            'last_name'=>'required',
            'email'=>'required|email',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
            'password' => 'nullable|min:8|confirmed', 
            'gender'=>['required',Rule::in(['female', 'male',])],
            'status'=>['required',Rule::in(['not available', 'available'])],
            'address'=>'required|max:255',
            'phone'=>'required',
        ]);

        if(isset($data['password'])){
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imageName = 'doctor/image_' . time().'.' . $image->getClientOriginalExtension();
            $image->storeAs('public',$imageName);
            $data['image'] = $imageName;
        }
        $doctor->update($data);
        return response()->json([
            'message'=>'Doctor updated successfully!'
        ]);
    }
    public function destroy(Doctor $doctor){
        
        if($doctor->image){
            Storage::disk('public')->delete($doctor->image);
        }

        $doctor->delete();
        return response()->json([
            'message'=>'Doctor deleted successfully!'
        ]);
        
    }
}
