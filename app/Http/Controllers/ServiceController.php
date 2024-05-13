<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    public function index(Request $request){
        $query = Service::query();
        if($request->has('name')){
            $query->where('name','like','%'.$request->input('name').'%');
        }
        $services = $query->latest()->paginate(10);
        return response()->json([
            'services'=>$services,
        ]);
    }

    public function show(Service $service){
        return response()->json([
            'service'=>$service
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'image'=>'image|required',
            'name'=>'required|max:255',
            'category'=>'required|max:255',
            'service_charge' => 'numeric|required',
            'status'=>['required',Rule::in(['Available','Not Available'])],
        ]);
        $image = $request->file('image');
        $imagePath = 'services/image_' . time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('public', $imagePath);
        $data['image'] = $imagePath;
        Service::create($data);
        return response()->json([
            'message'=>'Service created successfully!'
        ]);
    }
    public function update(Service $service, Request $request){
        $data = $request->validate([
            'image' => 'image|nullable',
            'name' => 'nullable|max:255',
            'category' => 'nullable|max:255',
            'service_charge' => 'integer|nullable',
            'status' => ['nullable', Rule::in(['Available','Not Available'])],
        ]);
        if($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = 'services/image_' . time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public', $imagePath);
            $data['image'] = $imagePath;
        }
        else{
            $data['image']=$service->image;
        }
    
        $service->update($data);
    
        return response()->json([
            'message' => 'Service updated successfully!'
        ]);
    }
    
    public function destroy(Service $service){
        Storage::disk('public')->delete($service->image);
        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully!'
        ]);
    }
}
