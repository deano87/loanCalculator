<?php

namespace App\Http\Controllers;
use App\Setting;
use Illuminate\Http\Request;
use \App\Calc;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class SettingsController extends Controller {
  private $req;
  private $setting;

  public function __construct(Request $req, Setting $setting) {
    $this->req = $req;
    $this->setting = $setting;
  }
  public function index() {
    return $this->setting->all();
  }

  public function update() {
    $values = $this->req->input('settings');
    foreach($values as $id => $value) {
        try {
            $this->setting = new Setting; // untouched model
            $setting = $this->setting->findOrFail($id);
            $setting->value = $value;
            $setting->save();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
    }

    return ['status' => 'ok'];

  }

}
