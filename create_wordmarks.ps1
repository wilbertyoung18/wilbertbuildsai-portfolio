Add-Type -AssemblyName System.Drawing

# Helper to create bitmap with Format32bppArgb
function New-ArgbBitmap($w, $h) {
    return New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

# Process dark logo -> dark wordmark (for light mode)
$img = [System.Drawing.Image]::FromFile("public/images/brand/Wilbert Builds AI dark Logo.png")
$bmp = [System.Drawing.Bitmap] $img

$padTop = 22; $padBottom = 934; $padLeft = 5; $padRight = 1501
$cropWidth = $padRight - $padLeft + 1
$cropHeight = $padBottom - $padTop + 1

$rect = [System.Drawing.Rectangle]::new($padLeft, $padTop, $cropWidth, $cropHeight)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)

$outBmp = New-ArgbBitmap $cropWidth $cropHeight
$g = [System.Drawing.Graphics]::FromImage($outBmp)
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImage($cropped, 0, 0, $cropWidth, $cropHeight)
$g.Dispose()

$outData = $outBmp.LockBits([System.Drawing.Rectangle]::new(0, 0, $cropWidth, $cropHeight), [System.Drawing.Imaging.ImageLockMode]::ReadWrite, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))
$bytes = New-Object byte[] ($outData.Stride * $cropHeight)
[System.Runtime.InteropServices.Marshal]::Copy($outData.Scan0, $bytes, 0, $bytes.Length)

for($i=0; $i -lt $bytes.Length; $i+=4) {
    $a = $bytes[$i+3]
    if($a -gt 0) { $bytes[$i+3] = 255 }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $outData.Scan0, $bytes.Length)
$outBmp.UnlockBits($outData)
$outBmp.Save("public/images/brand/WilbertBuildsAI-dark-wordmark.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved dark wordmark: $cropWidth x $cropHeight"

$outBmp.Dispose()
$cropped.Dispose()
$bmp.Dispose()
$img.Dispose()

# Process white logo -> white wordmark (for dark mode)
$img2 = [System.Drawing.Image]::FromFile("public/images/brand/Wilbert Builds AI white logo.png")
$bmp2 = [System.Drawing.Bitmap] $img2

# Content bounds: top=123, bottom=907, left=23, right=1521
# Add 3% padding
$w = 1499; $h = 785
$padTop2 = [math]::Max(0, 123 - [math]::Floor($h * 0.03))
$padBottom2 = [math]::Min($bmp2.Height - 1, 907 + [math]::Floor($h * 0.03))
$padLeft2 = [math]::Max(0, 23 - [math]::Floor($w * 0.03))
$padRight2 = [math]::Min($bmp2.Width - 1, 1521 + [math]::Floor($w * 0.03))

$cropWidth2 = $padRight2 - $padLeft2 + 1
$cropHeight2 = $padBottom2 - $padTop2 + 1

Write-Host "White crop: left=$padLeft2, top=$padTop2, width=$cropWidth2, height=$cropHeight2"

$rect2 = [System.Drawing.Rectangle]::new($padLeft2, $padTop2, $cropWidth2, $cropHeight2)
$cropped2 = $bmp2.Clone($rect2, $bmp2.PixelFormat)

$outBmp2 = New-ArgbBitmap $cropWidth2 $cropHeight2
$g2 = [System.Drawing.Graphics]::FromImage($outBmp2)
$g2.Clear([System.Drawing.Color]::Transparent)
$g2.DrawImage($cropped2, 0, 0, $cropWidth2, $cropHeight2)
$g2.Dispose()

$outData2 = $outBmp2.LockBits([System.Drawing.Rectangle]::new(0, 0, $cropWidth2, $cropHeight2), [System.Drawing.Imaging.ImageLockMode]::ReadWrite, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))
$bytes2 = New-Object byte[] ($outData2.Stride * $cropHeight2)
[System.Runtime.InteropServices.Marshal]::Copy($outData2.Scan0, $bytes2, 0, $bytes2.Length)

for($i=0; $i -lt $bytes2.Length; $i+=4) {
    $a = $bytes2[$i+3]
    if($a -gt 0) { $bytes2[$i+3] = 255 }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes2, 0, $outData2.Scan0, $bytes2.Length)
$outBmp2.UnlockBits($outData2)
$outBmp2.Save("public/images/brand/WilbertBuildsAI-white-wordmark.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved white wordmark: $cropWidth2 x $cropHeight2"

$outBmp2.Dispose()
$cropped2.Dispose()
$bmp2.Dispose()
$img2.Dispose()