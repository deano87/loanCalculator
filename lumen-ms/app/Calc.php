<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calc extends Model {
  public function getJobs() {
    return [
      [
        'type' => 'Lawyer',
        'salary' => [
          'growth' => 2.5,
          'start' => 35000,
        ]
      ],
      [
        'type' => 'Teacher',
        'salary' => [
          'growth' => 2,
          'start' => 25000,
        ]
      ],
      [
        'type' => 'Other',
        'salary' => [
          'growth' => 1.5,
          'start' => 27000,
        ]
      ],
    ];
  }

  public function getBasicSettings() {
    return [
      'inflation' => 2.8,
      'womenSalaryRatio' => 0.9,
      'jobTypes' => $this->getJobs()
    ];
  }
}
