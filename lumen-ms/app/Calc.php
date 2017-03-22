<?php

namespace App;

class Calc {
  public function getFormattedJobs() {
    $jobs = new JobType;
    $arr = [];
    foreach($jobs->all() as $key => $job) {
        $row = [
            'type' => $job['name'],
            'salary' => [
                'growth' => $job['salaryGrowth'],
                'start' => $job['startSalary']
            ]
        ];
        $arr[] = $row;
    }
    return $arr;
  }

  public function getBasicSettings() {
    $settings = new Setting;
    $arr = [];
    foreach($settings->all() as $key => $setting) {
        $arr[$setting['key']] = $setting['value'];
    }

    $arr['jobTypes'] = $this->getFormattedJobs();

    return $arr;
  }
}
