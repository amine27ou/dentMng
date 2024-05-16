<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Patient extends Authenticatable
{
    use Notifiable,HasApiTokens, HasFactory;
    protected $visible = ['id','gender','address','phone','updated_at', 'first_name','last_name','created_at', 'email', 'appointments_count','unique_id','role'];
    protected $fillable = ['unique_id','first_name','last_name','password', 'email', 'address','gender','phone','birthdate']; 
    protected $appends = ['role'];
    
    public function appointments(){
        return $this->hasMany(Appointment::class);
    }
    public function getRoleAttribute(){
        return 'patient';
    }
}
