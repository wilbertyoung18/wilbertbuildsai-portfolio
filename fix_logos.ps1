Add-Type -AssemblyName System.Drawing

# Process white logo -> create corrected white logo for dark mode
$img = [System.Drawing.Image]::FromFile("public/images/brand/Wilbert Builds AI white logo.png")
$bmp = [System.Drawing.Bitmap] $img
$corrected = New-Object System.Drawing.Bitmap $bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb

# Blue color for "AI" - sample from original to match
$blueR = 0; $blueG = 102; $blueB = 255  # approximate blue

for($y=0; $y -lt $bmp.Height; $y++) {
  for($x=0; $x -lt $bmp.Width; $x++) {
    $c = $bmp.GetPixel($x,$y)
    if($c.A -gt 0) {
      # Use alpha as mask, fill with white for text, blue for AI area
      # Detect blue-ish pixels in original
      $isBlue = ($c.B -gt $c.R -and $c.B -gt $c.G -and $c.B -gt 100)
      if($isBlue) {
        $corrected.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $blueR, $blueG, $blueB))
      } else {
        $corrected.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
      }
    }
  }
}

$corrected.Save("public/images/brand/WilbertBuildsAI-white-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved white corrected: $($corrected.Width)x$($corrected.Height)"
$corrected.Dispose()
$bmp.Dispose()
$img.Dispose()

# Process dark logo -> create corrected dark logo for light mode
$img2 = [System.Drawing.Image]::FromFile("public/images/brand/Wilbert Builds AI dark Logo.png")
$bmp2 = [System.Drawing.Bitmap] $img2
$corrected2 = New-Object System.Drawing.Bitmap $bmp2.Width, $bmp2.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb

for($y=0; $y -lt $bmp2.Height; $y++) {
  for($x=0; $x -lt $bmp2.Width; $x++) {
    $c = $bmp2.GetPixel($x,$y)
    if($c.A -gt 0) {
      $isBlue = ($c.B -gt $c.R -and $c.B -gt $c.G -and $c.B -gt 100)
      if($isBlue) {
        $corrected2.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $blueR, $blueG, $blueB))
      } else {
        # Dark text - near black
        $corrected2.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 26, 26, 26))
      }
    }
  }
}

$corrected2.Save("public/images/brand/WilbertBuildsAI-dark-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved dark corrected: $($corrected2.Width)x$($corrected2.Height)"
$corrected2.Dispose()
$bmp2.Dispose()
$img2.Dispose()