Add-Type -AssemblyName System.Drawing

# Process white logo -> create corrected white logo for dark mode
$img = [System.Drawing.Image]::FromFile("public/images/brand/Wilbert Builds AI white logo.png")
$bmp = [System.Drawing.Bitmap] $img
$corrected = New-Object System.Drawing.Bitmap $bmp.Width, $bmp.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

if(-not $corrected) {
  Write-Host "Failed to create corrected bitmap"
  exit 1
}

$blueR = 0; $blueG = 102; $blueB = 255

# Use LockBits for much faster processing
$rect = [System.Drawing.Rectangle]::new(0, 0, $bmp.Width, $bmp.Height)
$bmpData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))
$correctedData = $corrected.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))

$bytes = New-Object byte[] ($bmpData.Stride * $bmp.Height)
[System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $bytes, 0, $bytes.Length)

$outBytes = New-Object byte[] ($bytes.Length)

for($i=0; $i -lt $bytes.Length; $i+=4) {
  $b = $bytes[$i]
  $g = $bytes[$i+1]
  $r = $bytes[$i+2]
  $a = $bytes[$i+3]

  if($a -gt 0) {
    $isBlue = ($b -gt $r -and $b -gt $g -and $b -gt 100)
    if($isBlue) {
      $outBytes[$i] = $blueB
      $outBytes[$i+1] = $blueG
      $outBytes[$i+2] = $blueR
      $outBytes[$i+3] = 255
    } else {
      $outBytes[$i] = 255
      $outBytes[$i+1] = 255
      $outBytes[$i+2] = 255
      $outBytes[$i+3] = 255
    }
  } else {
    $outBytes[$i] = 0
    $outBytes[$i+1] = 0
    $outBytes[$i+2] = 0
    $outBytes[$i+3] = 0
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($outBytes, 0, $correctedData.Scan0, $outBytes.Length)
$bmp.UnlockBits($bmpData)
$corrected.UnlockBits($correctedData)

$corrected.Save("public/images/brand/WilbertBuildsAI-white-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved white corrected: $($corrected.Width)x$($corrected.Height)"
$corrected.Dispose()
$bmp.Dispose()
$img.Dispose()

# Process dark logo -> create corrected dark logo for light mode
$img2 = [System.Drawing.Image]::FromFile("public/images/brand/Wilbert Builds AI dark Logo.png")
$bmp2 = [System.Drawing.Bitmap] $img2
$corrected2 = New-Object System.Drawing.Bitmap $bmp2.Width, $bmp2.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

if(-not $corrected2) {
  Write-Host "Failed to create corrected2 bitmap"
  exit 1
}

$rect2 = [System.Drawing.Rectangle]::new(0, 0, $bmp2.Width, $bmp2.Height)
$bmpData2 = $bmp2.LockBits($rect2, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))
$correctedData2 = $corrected2.LockBits($rect2, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))

$bytes2 = New-Object byte[] ($bmpData2.Stride * $bmp2.Height)
[System.Runtime.InteropServices.Marshal]::Copy($bmpData2.Scan0, $bytes2, 0, $bytes2.Length)

$outBytes2 = New-Object byte[] ($bytes2.Length)

for($i=0; $i -lt $bytes2.Length; $i+=4) {
  $b = $bytes2[$i]
  $g = $bytes2[$i+1]
  $r = $bytes2[$i+2]
  $a = $bytes2[$i+3]

  if($a -gt 0) {
    $isBlue = ($b -gt $r -and $b -gt $g -and $b -gt 100)
    if($isBlue) {
      $outBytes2[$i] = $blueB
      $outBytes2[$i+1] = $blueG
      $outBytes2[$i+2] = $blueR
      $outBytes2[$i+3] = 255
    } else {
      $outBytes2[$i] = 26
      $outBytes2[$i+1] = 26
      $outBytes2[$i+2] = 26
      $outBytes2[$i+3] = 255
    }
  } else {
    $outBytes2[$i] = 0
    $outBytes2[$i+1] = 0
    $outBytes2[$i+2] = 0
    $outBytes2[$i+3] = 0
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($outBytes2, 0, $correctedData2.Scan0, $outBytes2.Length)
$bmp2.UnlockBits($bmpData2)
$corrected2.UnlockBits($correctedData2)

$corrected2.Save("public/images/brand/WilbertBuildsAI-dark-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved dark corrected: $($corrected2.Width)x$($corrected2.Height)"
$corrected2.Dispose()
$bmp2.Dispose()
$img2.Dispose()