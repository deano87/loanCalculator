<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ScriptsController extends Controller {
  private $req;
  private $scripts = [
      'update-inflation' => [
          'description' => 'Updates the inflation value according to tradingeconomics.com/united-kingdom/inflation-cpi',
          'command' => 'inflation:update'
      ]
  ];

  public function __construct(Request $req) {
    $this->req = $req;
  }
  public function index() {
    return $this->scripts;
  }

  public function run($name) {
    if(array_key_exists($name, $this->scripts)) {
        Artisan::call($this->scripts[$name]['command']);
        return ['status' => 'ok'];
    }
  }

}
