Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("public/images/brand/Wilbert Builds AI white logo.png")
$bmp = [System.Drawing.Bitmap] $img
$samples = 0
for($y=0; $y -lt $bmp.Height -and $samples -lt 20; $y++) {
  for($x=0; $x -lt $bmp.Width -and $samples -lt 20; $x++) {
    $c = $bmp.GetPixel($x,$y)
    if($c.A -gt 0) {
      Write-Host ("Pixel at {0},{1}: R={2} G={3} B={4} A={5}" -f $x,$y,$c.R,$c.G,$c.B,$c.A)
      $samples++
    }
  }
}
$bmp.Dispose()
$img.Dispose()