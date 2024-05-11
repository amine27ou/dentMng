<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
use Illuminate\Http\Request;

class SpecializationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $specializations = Specialization::latest()->get();
        return response()->json([
            'specializations'=>$specializations,
            
        ]);
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'=>'required'
        ]);

        Specialization::create($data);

        return response()->json([
            'message'=>'Specialization added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Specialization $specialization)
    {
        return response()->json([
            'specialization'=>$specialization
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Specialization $specialization)
    {
        $data = $request->validate([
            'name'=>'required'
        ]);
        
        $specialization->update($data);
        return response()->json([
            'message'=>'Specialization updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Specialization $specialization)
    {
        $specialization->delete();
        return response()->json([
            'message'=>'Specialization deleted successfully!'
        ]);
        
    }
}
