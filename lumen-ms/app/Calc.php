<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calc extends Model {
  public function getJobs() {
    return [
      [
        'type' => 'Lawyer',
        'salary' => [
          'growth' => 1.025,
          'start' => 35000,
        ]
      ],
      [
        'type' => 'Teacher',
        'salary' => [
          'growth' => 1.02,
          'start' => 25000,
        ]
      ],
      [
        'type' => 'Other',
        'salary' => [
          'growth' => 1.015,
          'start' => 27000,
        ]
      ],
    ];
  }

  public function getBasicSettings() {
    return [
      'inflation' => 0.1,
      'womenSalaryRatio' => 0.9,
      'jobTypes' => $this->getJobs()
    ];
  }
}
