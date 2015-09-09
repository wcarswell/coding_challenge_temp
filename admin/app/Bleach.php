<?php namespace App;
use Illuminate\Database\Eloquent\Model;
class Bleach extends Model {
    protected $table = 'bleach';
    protected $fillable = [
        'id',
        'url'
    ];
 //   protected $hidden = [ 'password’ ];
}