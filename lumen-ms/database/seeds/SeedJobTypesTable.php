<?php

use Illuminate\Database\Seeder;

class SeedJobTypesTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('job_types')->insert([
          ['name' => 'Lawyer', 'startSalary' => 35000, 'salaryGrowth' => 1.5],
          ['name' => 'Teacher', 'startSalary' => 27000, 'salaryGrowth' => 1.2],
          ['name' => 'Other', 'startSalary' => 25000, 'salaryGrowth' => 1.1]
      ]);
    }
}
