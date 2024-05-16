<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MedicineController extends Controller
{
    
    public function index(){
        $medicines = Medicine::latest()->get();
        return response()->json([
            'medicines'=>$medicines
        ]);
    }

    public function show(Medicine $medicine){
        return response()->json([
            'medicine'=>$medicine
        ]);
    }
    public function store(Request $request){
        $data = $request->validate([
            'name'=>'required',
            'category'=>['required',Rule::in(['tablets','capsules','syrups','injections'])],
            'selling_price'=>'required|integer',
            'buying_price'=>'required|integer',
            'quantity'=>'required|integer',
            'status'=>['required',Rule::in(['Available','Not Available'])],
        ]);

        Medicine::create($data);

        return response()->json([
            'message'=>'Medicine added successfully!'
        ]);   
    }
    public function update(Medicine $medicine,Request $request){
        $data = $request->validate([
            'name'=>'nullable',
            'category'=>['nullable',Rule::in(['tablets','capsules','syrups','injections'])],
            'selling_price'=>'nullable|integer',
            'buying_price'=>'nullable|integer',
            'quantity'=>'nullable|integer',
            'status'=>['nullable',Rule::in(['Available','Not Available'])],
        ]);

        $medicine->update($data);

        return response()->json([
            'message'=>'Medicine updated successfully!'
        ]);   
    }

    public function destroy(Medicine $medicine){
        $medicine->delete();
        return response()->json([
            'message'=>'Medicine deleted successfully!'
        ]);
    }
}
