<?php namespace App\Http\Middleware;

use Closure;

class OldMiddleware {

    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->input('age') < 200) {
            abort(404);
        }

        return $next($request);
    }

}