<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SettingsController extends Controller
{
    private $req;
    private $setting;

    public function __construct(Request $req, Setting $setting)
    {
        $this->req = $req;
        $this->setting = $setting;
    }

    /**
     * Get a list of all settings from the DB
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function index()
    {
        return $this->setting->all();
    }

    /**
     * update settings
     * @return array
     */
    public function update()
    {
        $values = $this->req->input('settings');
        foreach ($values as $id => $value) {
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
