<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use \App\Calc;

class LoanCalcController extends Controller {
  private $req;
  private $calc;

  public function __construct(Request $req, Calc $calc) {
    $this->req = $req;
    $this->calc = $calc;
  }
  public function index() {
    return $this->calc->getBasicSettings();
  }

  public function calc() {
    $input = $this->req->all();

    if($input['gender'] === 'female') {
      $salary = (float) $input['startSalary'] * (float) $input['womenSalaryRatio'];
    } else {
      $salary = (float) $input['startSalary'];
    }

    $ceiling = 0;

    if($salary < 20000) {
      $ceiling = 30000 - (20000 - $salary);
    } elseif ($salary < 30000) {
      $ceiling = 60000 - (30000 - $salary);
    } else {
      $ceiling = 80000 + ($salary - 30000);
    }

    $duration = (int) $input['courseDuration'];

    $interest = (((float) $input['inflation'] + 3) / 100) + 1;
    $tuition = (float) $input['tuition'];
    $maintenance = (float) $input['maintenance'];
    $loan = $tuition + $maintenance;

    $firstDebt = 0;
    for($i=0; $i<$duration; $i++) {
      $firstDebt += $loan * $interest;
    }

    $salaries = [];
    $inputSalGrowth = ((float) $input["salaryGrowth"] - 1) * 10;
    $salaryGrowth = 1 + (($inputSalGrowth + (float) $input['inflation'] - 1) / 100);

    foreach(range(1, 30) as $year) {
      if($year === 1) {
        $salaries[1] = $salary;
      } else {
        $salaries[$year] = $salaries[$year-1] * $salaryGrowth;

        if ($salaries[$year] > $ceiling) {
          $salaries[$year] = $ceiling;
        }
      }
    }

    $years = [];
    $age = (int) $input["age"] + $duration - 1;
    $paybackSum = 0;
    foreach(range(1, 30) as $year) {
      $payback = 0;
      if($salaries[$year] > 17495) {
        $payback = ($salaries[$year] - 17495) * 0.09;
        $paybackSum += $payback;
      }
      if($year === 1) {
        $years[$age + 1] = number_format(($firstDebt * $interest) - $payback, 2, '.', '');
      } else {
        $years[$age + $year] = number_format(($years[$age + $year - 1] * $interest) - $payback, 2, '.', '');
      }
      if($years[$age + $year] <= 0) {
        $years[$age + $year] = 0;
        break;
      }
    }
    $yearsToPay = sizeof($years);
    $avgPayback = $paybackSum / $yearsToPay;

    return [
      'estimatedFirstSalary' => $salary,
      'debtAfterGraduation' => $firstDebt,
      'debtOverYears' => $years,
      'totalPay' => max($years),
      'yearsToPay' => sizeof($years),
      'averageMonthlyPayback' => number_format($avgPayback / 12, 2, '.', '')
    ];
  }
}
