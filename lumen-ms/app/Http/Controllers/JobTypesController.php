<?php

namespace App\Http\Controllers;

use App\JobType;
use App\Setting;
use Illuminate\Http\Request;
use \App\Calc;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class JobTypesController extends Controller
{
    private $req;
    private $jobTypes;

    public function __construct(Request $req, JobType $jobType)
    {
        $this->req = $req;
        $this->jobTypes = $jobType;
    }

    public function index()
    {
        return $this->jobTypes->all();
    }

    public function store()
    {
        $input = $this->req->all();
        try {
            $jobType = new JobType;
            $jobType->name = $input['title'];
            $jobType->startSalary = $input['startSalary'];
            $jobType->salaryGrowth = $input['salaryGrowth'];
            $jobType->save();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
        return ['status' => 'ok'];
    }

    public function update($id)
    {
        $input = $this->req->all();
        try {
            $jobType = $this->jobTypes->findOrFail($id);
            $jobType->name = $input['title'];
            $jobType->startSalary = $input['startSalary'];
            $jobType->salaryGrowth = $input['salaryGrowth'];
            $jobType->save();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
        return ['status' => 'ok'];
    }

    public function delete($id)
    {
        $input = $this->req->all();
        try {
            $jobType = $this->jobTypes->findOrFail($id);
            $jobType->delete();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
        return ['status' => 'ok'];
    }

}
