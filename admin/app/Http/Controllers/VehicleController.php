<?php namespace App\Http\Controllers;

use App\Vehicle;
use App\Http\Controllers\Controller;

class VehicleController extends Controller 
{

   

    public function test()
    {
    	\DB::select('select * from test');
    }

}