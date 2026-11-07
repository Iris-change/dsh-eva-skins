$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

function Line($t) { Write-Host $t }
Line '=========================================='
Line ' DeepSeek Harness  EVA 皮肤合集'
Line ' 二号机 / 零号机 / 初号机 / 八号机'
Line '=========================================='
Line ''

# ---------- 1. 找 DSH 安装目录 ----------
$roots = @(
  (Join-Path $env:LOCALAPPDATA 'Programs'),
  $env:ProgramFiles,
  ${env:ProgramFiles(x86)},
  $env:ProgramW6432,
  (Join-Path $env:USERPROFILE 'AppData\Local\Programs'),
  'D:\',
  'C:\'
) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -Unique

$exe = $null
foreach ($r in $roots) {
  $exe = Get-ChildItem -LiteralPath $r -Directory -Filter '*DeepSeek*' -ErrorAction SilentlyContinue |
         ForEach-Object { Join-Path $_.FullName 'DeepSeek Harness.exe' } |
         Where-Object { Test-Path -LiteralPath $_ } |
         Select-Object -First 1
  if ($exe) { break }
}
if (-not $exe) {
  $reg = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*' -ErrorAction SilentlyContinue |
         Where-Object { $_.DisplayName -like '*DeepSeek*' } | Select-Object -First 1
  if ($reg -and $reg.InstallLocation) {
    $p = Join-Path $reg.InstallLocation 'DeepSeek Harness.exe'
    if (Test-Path -LiteralPath $p) { $exe = $p }
  }
}
if ($exe) { Line "[√] 找到 DSH：$exe" } else { Line '[!] 没找到 DeepSeek Harness 安装目录（会走直接写配置的方式）' }

# ---------- 2. 找 dsh 命令行 ----------
$dshCli = $null
if ($exe) {
  $appDir = Split-Path -Parent $exe
  $rels = @(
    'resources\runtime\cli\bin\dsh.cmd',
    'resources\runtime\bin\dsh.cmd',
    'resources\runtime\cli\bin\dsh'
  )
  foreach ($rel in $rels) {
    $p = Join-Path $appDir $rel
    if (Test-Path -LiteralPath $p) { $dshCli = $p; break }
  }
}
if (-not $dshCli) {
  $c = Get-Command 'dsh.cmd' -ErrorAction SilentlyContinue
  if (-not $c) { $c = Get-Command 'dsh' -ErrorAction SilentlyContinue }
  if ($c) { $dshCli = $c.Source }
}
if ($dshCli) { Line "[√] 找到 dsh 命令：$dshCli" } else { Line '[!] 没找到 dsh 命令，改用直接写配置' }
Line ''

$installed = $false

# ---------- 3. 首选：用 dsh plugin ----------
if ($dshCli -and $env:EVA_SKIP_CLI -ne '1') {
  Line '正在安装（方式一：dsh plugin）...'
  & $dshCli plugin --profile desktop add $here
  if ($LASTEXITCODE -eq 0) { $installed = $true; Line '[√] 安装成功' }
  else { Line "[!] dsh plugin 返回 $LASTEXITCODE，改用方式二" }
  Line ''
}

# ---------- 4. 兜底：直接写 profile ----------
if (-not $installed) {
  $dshHome = if ($env:DSH_HOME) { $env:DSH_HOME } else { Join-Path $env:USERPROFILE '.dsh' }
  $prof = Join-Path $dshHome 'profiles\desktop'
  Line "配置目录：$prof"
  if (-not (Test-Path -LiteralPath $prof)) {
    Line ''
    Line '[×] 这个目录还不存在。'
    Line '    请先打开一次 DeepSeek Harness（让它生成配置），彻底退出后再双击本文件。'
    Line ''
    if ($env:EVA_NOPAUSE -ne '1') { Read-Host '按回车退出' }
    exit 1
  }

  $dest = Join-Path $prof 'node_modules\dsh-eva-skins'
  if (Test-Path -LiteralPath $dest) { Remove-Item -LiteralPath $dest -Recurse -Force -ErrorAction SilentlyContinue }
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  $skip = @('.git', 'dist', '.github')
  robocopy $here $dest /E /XD $skip /XF *.zip /NFL /NDL /NJH /NJS /NP | Out-Null
  Line '[√] 插件文件已复制'

  # package.json
  $pkgPath = Join-Path $prof 'package.json'
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  if (Test-Path -LiteralPath $pkgPath) {
    Copy-Item -LiteralPath $pkgPath -Destination "$pkgPath.bak-$stamp" -Force
    $raw = [System.IO.File]::ReadAllText($pkgPath, [System.Text.Encoding]::UTF8)
    # 去 BOM
    $raw = $raw.TrimStart([char]0xFEFF)
    $pkg = $raw | ConvertFrom-Json
    if (-not $pkg.PSObject.Properties['dependencies']) {
      $pkg | Add-Member -NotePropertyName dependencies -NotePropertyValue ([pscustomobject]@{}) -Force
    }
    $linkPath = 'link:' + ($here -replace '\\', '/')
    $pkg.dependencies | Add-Member -NotePropertyName 'dsh-eva-skins' -NotePropertyValue $linkPath -Force
    if (-not $pkg.PSObject.Properties['dsh']) {
      $pkg | Add-Member -NotePropertyName dsh -NotePropertyValue ([pscustomobject]@{ profile = [pscustomobject]@{ bundles = @() } }) -Force
    }
    $bundles = @($pkg.dsh.profile.bundles)
    if ($bundles -notcontains 'dsh-eva-skins') { $bundles += 'dsh-eva-skins' }
    $pkg.dsh.profile.bundles = $bundles
    $json = $pkg | ConvertTo-Json -Depth 20
    [System.IO.File]::WriteAllText($pkgPath, $json, (New-Object System.Text.UTF8Encoding($false)))
    Line '[√] package.json 已更新'
  }

  # cordis.patch.yml
  $patchPath = Join-Path $prof 'cordis.patch.yml'
  if (Test-Path -LiteralPath $patchPath) {
    $patch = [System.IO.File]::ReadAllText($patchPath, [System.Text.Encoding]::UTF8)
    if ($patch -notmatch 'dsh-eva-skins') {
      Copy-Item -LiteralPath $patchPath -Destination "$patchPath.bak-$stamp" -Force
      $block = "`n- insert:`n    - id: dsh-eva-skins`n      name: 'dsh-eva-skins'`n"
      [System.IO.File]::AppendAllText($patchPath, $block, (New-Object System.Text.UTF8Encoding($false)))
      Line '[√] cordis.patch.yml 已追加'
    } else {
      Line '[√] cordis.patch.yml 里已有条目，跳过'
    }
  }

  $installed = $true
  Line '[√] 安装完成（方式二）'
}

Line ''
Line '------------------------------------------'
Line ' 装好了。现在请【彻底退出】DeepSeek Harness：'
Line '   任务栏图标右键退出，或任务管理器结束 DeepSeek Harness.exe'
Line ' 然后重新打开，输入框左侧会出现 ● UNIT-02 ▾ 胶囊。'
Line ''
Line ' 面板里切换：默认 / 二号机 / 零号机 / 初号机 / 八号机'
Line ' 快捷键：Ctrl+Alt+U 开关皮肤，Ctrl+Alt+B 重播开机动画'
Line '------------------------------------------'
Line ''
if ($env:EVA_NOPAUSE -ne '1') { Read-Host '按回车退出' }
