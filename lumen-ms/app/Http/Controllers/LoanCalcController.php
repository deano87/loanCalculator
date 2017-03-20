<?php

namespace App\Http\Controllers;
use \App\Calc;

class LoanCalcController extends Controller {
  private $calc;

  public function __construct(Calc $calc) {
    $this->calc = $calc;
  }
  public function index() {
    return $this->calc->getBasicSettings();
  }

  public function calc() {
    return [];
  }
}
