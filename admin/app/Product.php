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
                    ->where('quantity_on_hand', '<', $quantity)
                    ->get();
    }
}