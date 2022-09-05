<?php

namespace App\Services;


class Utils
{
  public static function generateIncrementNo($date_str, $count, $prefix)
  {
    $date = date_create($date_str);
    return str($prefix) . date_format($date, "Ymd") . str_pad($count, 5, '0', STR_PAD_LEFT);
  }
}
