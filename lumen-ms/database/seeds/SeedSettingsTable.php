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
          ['key' => 'inflation', 'value' => '2.8', 'display_name' => 'Inflation Rate'],
          ['key' => 'womenSalaryRatio', 'value' => '0.9', 'display_name' => 'Average gender wage gap (Men to Women)'],
      ]);
    }
}
