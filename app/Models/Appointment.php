<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    protected $fillable = ['doctor_id','patient_id','service_id','payment_method','appointment_date','payment_status','amount','status'];
    
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {   
        return $this->belongsTo(Doctor::class);
    }
    public function service()
    {   
        return $this->belongsTo(Service::class);
    }
}
