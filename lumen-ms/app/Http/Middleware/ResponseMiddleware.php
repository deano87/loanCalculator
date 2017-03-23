<?php
namespace App\Http\Middleware;
use Illuminate\Http\Response;

class ResponseMiddleware {
  public function handle($request, \Closure $next) {
    $response = $next($request);
    $response->header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');

    if ($request->getMethod() == 'OPTIONS' && $response->getStatusCode() == 405) {
            $response = new Response('', 204, $response->headers->all());
    }

    $response->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));

    // @TODO: Limit access in production
    $response->header('Access-Control-Allow-Origin', '*');
    return $response;
  }
}
