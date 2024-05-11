<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;


class Doctor extends Authenticatable
{
    use Notifiable,HasApiTokens, HasFactory;
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'gender',
        'address',
        'phone',
        'image',
        'status',
        'updated_at',
        'created_at',
        'specialization_id'
    ];    
    protected $appends = ['role'];
    public function appointments()
    {
    return $this->hasMany(Appointment::class);
    }
    public function specialization()
    {
    return $this->belongsTo(Specialization::class);
    }
    public function getRoleAttribute()
    {
        return 'doctor';
    }
}
