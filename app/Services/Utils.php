<?php

namespace App\Services;


class Utils
{
  public static function generateIncrementNo($date_str, $count, $prefix)
  {
    $date = date_create($date_str);
    return str($prefix) . date_format($date, "Ymd") . $count + 1000;
  }
}
