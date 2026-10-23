Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("public/images/brand/Wilbert Builds AI white logo.png")
$bmp = [System.Drawing.Bitmap] $img
$alphaValues = @{}
for($y=0; $y -lt $bmp.Height; $y++) {
  for($x=0; $x -lt $bmp.Width; $x++) {
    $c = $bmp.GetPixel($x,$y)
    if($c.A -gt 0) {
      if(-not $alphaValues.ContainsKey($c.A)) { $alphaValues[$c.A] = 0 }
      $alphaValues[$c.A]++
    }
  }
}
Write-Host "White logo alpha distribution:"
$keys = $alphaValues.Keys | Sort-Object
foreach($k in $keys) {
  $v = $alphaValues[$k]
  $line = "  Alpha " + $k + ": " + $v + " pixels"
  Write-Host $line
}
$bmp.Dispose()
$img.Dispose()