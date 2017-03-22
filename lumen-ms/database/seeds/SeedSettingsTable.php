<?php

use Illuminate\Database\Seeder;

class SeedSettingsTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('settings')->insert([
          ['key' => 'inflation', 'value' => '2.8'],
          ['key' => 'womenSalaryRatio', 'value' => '0.9'],
      ]);
    }
}
