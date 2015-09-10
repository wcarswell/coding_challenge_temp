<?php namespace App;
use Illuminate\Database\Eloquent\Model;
class Clinic extends Model {
    protected $table = 'clinic';
    protected $fillable = [
        'name',
        'country_id'
    ];
}