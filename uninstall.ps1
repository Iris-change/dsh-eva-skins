$ErrorActionPreference = 'Continue'
Write-Host '=========================================='
Write-Host ' DeepSeek Harness  EVA 皮肤合集 - 卸载'
Write-Host '=========================================='
Write-Host ''

$removed = $false

# 方式一：dsh 命令
$roots = @(
  (Join-Path $env:LOCALAPPDATA 'Programs'),
  $env:ProgramFiles,
  ${env:ProgramFiles(x86)},
  $env:ProgramW6432,
  (Join-Path $env:USERPROFILE 'AppData\Local\Programs')
) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -Unique

$exe = $null
foreach ($r in $roots) {
  $exe = Get-ChildItem -LiteralPath $r -Directory -Filter '*DeepSeek*' -ErrorAction SilentlyContinue |
         ForEach-Object { Join-Path $_.FullName 'DeepSeek Harness.exe' } |
         Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
  if ($exe) { break }
}
$dshCli = $null
if ($exe) {
  foreach ($rel in @('resources\runtime\cli\bin\dsh.cmd','resources\runtime\bin\dsh.cmd')) {
    $p = Join-Path (Split-Path -Parent $exe) $rel
    if (Test-Path -LiteralPath $p) { $dshCli = $p; break }
  }
}
if (-not $dshCli) {
  $c = Get-Command 'dsh.cmd' -ErrorAction SilentlyContinue
  if ($c) { $dshCli = $c.Source }
}
if ($dshCli) {
  Write-Host "使用 dsh 命令卸载：$dshCli"
  & $dshCli plugin --profile desktop remove dsh-eva-skins
  if ($LASTEXITCODE -eq 0) { $removed = $true; Write-Host '[√] 已卸载' }
}

# 方式二：直接改 profile
$dshHome = if ($env:DSH_HOME) { $env:DSH_HOME } else { Join-Path $env:USERPROFILE '.dsh' }
$prof = Join-Path $dshHome 'profiles\desktop'
if (Test-Path -LiteralPath $prof) {
  $dest = Join-Path $prof 'node_modules\dsh-eva-skins'
  if (Test-Path -LiteralPath $dest) {
    Remove-Item -LiteralPath $dest -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host '[√] 已删除插件文件'
    $removed = $true
  }
  $pkgPath = Join-Path $prof 'package.json'
  if (Test-Path -LiteralPath $pkgPath) {
    $raw = [System.IO.File]::ReadAllText($pkgPath, [System.Text.Encoding]::UTF8).TrimStart([char]0xFEFF)
    $pkg = $raw | ConvertFrom-Json
    if ($pkg.PSObject.Properties['dependencies'] -and $pkg.dependencies.PSObject.Properties['dsh-eva-skins']) {
      $pkg.dependencies.PSObject.Properties.Remove('dsh-eva-skins')
      Write-Host '[√] 已从 dependencies 移除'
      $removed = $true
    }
    if ($pkg.PSObject.Properties['dsh'] -and $pkg.dsh.profile.bundles) {
      $bundles = @($pkg.dsh.profile.bundles) | Where-Object { $_ -ne 'dsh-eva-skins' }
      $pkg.dsh.profile.bundles = $bundles
      Write-Host '[√] 已从 bundles 移除'
    }
    $pkg | ConvertTo-Json -Depth 20 | ForEach-Object {
      [System.IO.File]::WriteAllText($pkgPath, $_, (New-Object System.Text.UTF8Encoding($false)))
    }
  }
  $patchPath = Join-Path $prof 'cordis.patch.yml'
  if (Test-Path -LiteralPath $patchPath) {
    $patch = [System.IO.File]::ReadAllText($patchPath, [System.Text.Encoding]::UTF8)
    if ($patch -match 'dsh-eva-skins') {
      $new = $patch -replace "(?ms)^\s*- insert:\s*\r?\n\s*- id: dsh-eva-skins\s*\r?\n\s*name: 'dsh-eva-skins'\s*\r?\n", ''
      [System.IO.File]::WriteAllText($patchPath, $new, (New-Object System.Text.UTF8Encoding($false)))
      Write-Host '[√] 已从 cordis.patch.yml 移除'
    }
  }
}

if (-not $removed) { Write-Host '[!] 没找到已安装的插件，可能本来就没装。' }
Write-Host ''
Write-Host '请【彻底退出】DeepSeek Harness 再重新打开，即恢复默认主题。'
Write-Host ''
if ($env:EVA_NOPAUSE -ne '1') { Read-Host '按回车退出' }
