<?php

namespace App\Http\Controllers;

use App\JobType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JobTypesController extends Controller
{
    private $req;
    private $jobTypes;

    /**
     * JobTypesController constructor.
     * @param Request $req
     * @param JobType $jobType
     */
    public function __construct(Request $req, JobType $jobType)
    {
        $this->req = $req;
        $this->jobTypes = $jobType;
    }

    /**
     * Fetch all of the available jobs from the DB
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function index()
    {
        return $this->jobTypes->all();
    }

    /**
     * Insert a new Job Type
     * @return array
     */
    public function store()
    {
        $input = $this->req->all();
        try {
            $this->jobTypes->name = $input['title'];
            $this->jobTypes->startSalary = $input['startSalary'];
            $this->jobTypes->salaryGrowth = $input['salaryGrowth'];
            $this->jobTypes->save();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return ['status' => 'error'];
        }
        return ['status' => 'ok'];
    }

    /**
     * Update a job type by ID
     * @param $id
     * @return array
     */
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
            return ['status' => 'error'];
        }
        return ['status' => 'ok'];
    }

    /**
     * Delete job by ID
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        $input = $this->req->all();
        try {
            $jobType = $this->jobTypes->findOrFail($id);
            $jobType->delete();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return ['status' => 'error'];
        }
        return ['status' => 'ok'];
    }

}
