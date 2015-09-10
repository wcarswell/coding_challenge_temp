<?php namespace App;
use Illuminate\Database\Eloquent\Model;
class Product extends Model {
    protected $table = 'product';
    protected $fillable = [
        'type',
        'name',
        'price',
        'quantity_on_hand',
        'clinic_id'
    ];

    /**
     * Scope a query to only include low stock levels.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLowStock($quantity)
    {
        return \DB::table('product')
                    ->orderBy('country_name', 'asc')
                    ->orderBy('clinic_name', 'asc')
                    ->orderBy('name', 'asc')
                    ->join('clinic', 'clinic.clinic_id', '=', 'product.clinic_id')
                    ->join('country', 'country.country_id', '=', 'clinic.country_id')
                    ->where('quantity_on_hand', '<', $quantity)
                    ->select('product.*', 'clinic.name as clinic_name', 'country.name as country_name')
                    ->get();
    }
}