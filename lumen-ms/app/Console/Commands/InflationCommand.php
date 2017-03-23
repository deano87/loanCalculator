<?php

namespace App\Console\Commands;

use App\Setting;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use phpQuery;

class InflationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inflation:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update inflation value';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Log::info('Running ' . $this->signature);

        // load external html using phpQuery
        phpQuery::newDocumentFileHTML('http://www.tradingeconomics.com/united-kingdom/inflation-cpi');

        // select & prettify value from HTML
        $inflation = pq('#aspnetForm  div.container  div.row  div.col-lg-8.col-md-9  div:nth-child(12) div table td:nth-child(2):first');
        $inflation = trim($inflation);
        $inflation = rtrim($inflation, '</td>');
        $inflation = ltrim($inflation, '<td>');
        Log::info('Inflation recorded ' . $inflation);

        if(is_numeric($inflation)) {
            Log::info('Updating inflation value');
            $setting = new Setting; // untouched model
            $setting->where('key', 'inflation')->update(['value' => $inflation]);
        } else {
            Log::error('Inflation value incorrect. Skipped update');
        }
    }
}