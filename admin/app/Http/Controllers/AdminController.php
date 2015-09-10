<?php namespace App\Http\Controllers;

use App\Country;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller 
{
	
    public function countrylist()
    {
		// Return all countries alphabetically
		return Country::orderBy('name', 'asc')->get();
    }

    public function insertCountry(Request $request)
    {
    	
    	$new_country = $request->input('country');

    	$return = ['message'=>''];
    	if( !empty($new_country['name']) && !empty($new_country['currency']) ) {
    		if(!empty($new_country['country_id'])) {
    			Country::where('country_id', $new_country['country_id'])
	          					  ->update(['name' => $new_country['name'], 'currency' => $new_country['currency']]);
    		} else {
		    	$country = new Country(
		    		array(
		    			'name' => $new_country['name'],
		    			'currency' => $new_country['currency']
		    		)
		    	);

		    	$country->save();
	    	}

	    	$return['status'] = 'success';
	    	$return['country_id'] = $country->id;
    	} else {
    		$return['message'] = 'Name or Currency value not set';
    	}

    	return response()->json($return);
    }

}