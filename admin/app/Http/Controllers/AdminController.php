<?php namespace App\Http\Controllers;

use DB;
use App\Country;
use App\Clinic;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller 
{
	
    public function countryList()
    {
		// Return all countries alphabetically
		return Country::orderBy('name', 'asc')->get();
    }

    public function clinicList()
    {	
        return DB::table('clinic')
            ->join('country', 'country.country_id', '=', 'clinic.country_id')
            ->select('clinic.*', 'country.name as country_name')
            ->get();
    }

    public function addCountry(Request $request)
    {
        // Fetch Posted country variables
    	$country = $request->input('country');

        // Insert new country
        if( !empty($country['name']) && !empty($country['currency']) ) {
            // Check if country name is unique
            if( Country::where('name', $country['name'])->count() > 0 ) {
                return response()->json(
                    array('status' => 'fail','message' => 'Country exists')
                );
            }
    	
    		// Initialise country object
            $country = new Country(
                array(
                    'name' => $country['name'],
                    'currency' => $country['currency']
                )
            );

            // Save new country
            $country->save();

            $return = array(
                'status' => 'succcess'
            );
    	} else {
            $return = array(
                'status' => 'fail',
                'message' => 'Name or Currency value not set'
            );
    	}

    	return response()->json($return);
    }

    public function updateCountry($country_id, Request $request) 
    {   
        // Do we have a valid table key?
        if(!is_numeric($country_id)) {
            return response()->json(
                array('status' => 'fail','message' => 'ID not numeric')
            );
        }

        // Fetch Posted country variables
        $country = $request->input('country');

        // Modify entry
        if( !empty($country['name']) && !empty($country['currency']) ) {
            Country::where('country_id', $country['country_id'])
                        ->update(['name' => $country['name'], 'currency' => $country['currency']]);

            $return = array(
                'status' => 'succcess'
            );
        } else {
            $return = array(
                'status' => 'fail',
                'message' => 'Name or Currency value not set'
            );
        }      
    }

    public function deleteCountry($country_id) 
    {
        // Do we have a valid table key?
        if(!is_numeric($country_id)) {
            return response()->json(
                array('status' => 'fail','message' => 'ID not numeric')
            );
        }

        // Check if country name is unique
        if( Clinic::where('country_id', $country_id)->count() > 0 ) {
            return response()->json(
                array('status' => 'fail','message' => 'Items still exist in clinic')
            );
        }

        // @Todo: save into temp table
        DB::table('country')->where('country_id', $country_id)->delete();

        $return = array(
            'status' => 'succcess'
        );
    }
}