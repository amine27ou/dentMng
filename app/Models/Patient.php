<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;
    protected $visible = ['id','gender','address','phone','updated_at', 'first_name','last_name','created_at', 'email', 'appointments_count','unique_id']; 
    protected $fillable = ['unique_id','first_name','last_name','password', 'email', 'address','gender','phone','birthdate']; 
    
    public function appointments(){
        return $this->hasMany(Appointment::class);
    }
}
