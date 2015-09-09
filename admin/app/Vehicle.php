<?php namespace App;
use Illuminate\Database\Eloquent\Model;
class Vehicle extends Model {
    protected $table = 'vehicle';
    protected $fillable = [
        'name',
        'group_id',
        'vehicle_description'
    ];
 //   protected $hidden = [ 'password’ ];
}