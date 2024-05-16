<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SpecializationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum,doctor,web,patient'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('patients',PatientController::class)->middleware('auth:sanctum,doctor,web,patient');
Route::apiResource('doctors',DoctorController::class)->middleware('auth:sanctum,doctor,web,patient');
Route::apiResource('appointments',AppointmentController::class)->middleware('auth:sanctum,doctor,web,patient');
Route::apiResource('patients',PatientController::class)->middleware('auth:sanctum,doctor,web,patient');
Route::apiResource('specializations',SpecializationController::class)->middleware('auth:sanctum,doctor,web,patient');
Route::apiResource('services',ServiceController::class)->middleware('auth:sanctum,doctor,web,patient');
Route::apiResource('medicines',MedicineController::class)->middleware('auth:sanctum,doctor,web,patient');
Route::get('/dashboard',[DashboardController::class,'index'])->middleware('auth:sanctum,doctor,web,patient');
