<?php namespace App\Http\Controllers;

use DB;
use App\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportController extends Controller 
{
	
    public function products()
    {
		// Return all countries alphabetically
        $product = new Product;
		return $product->scopeLowStock(5);
    }

}