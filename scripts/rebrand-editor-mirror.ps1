
param([string]$Web)

$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)

if (-not $Web) {
    $Web = Join-Path (Resolve-Path (Join-Path $PSScriptRoot '..')).Path 'src-tauri\data\editor\web'
}
if (-not (Test-Path -LiteralPath $Web)) { throw "找不到镜像目录：$Web" }
Write-Host "目标镜像：$Web"

function Read-Text([string]$path) {
    return [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
}

function Write-Text([string]$path, [string]$text) {
    [System.IO.File]::WriteAllText($path, $text, $utf8)
}

$cp936 = [System.Text.Encoding]::GetEncoding(936)
$renames = @{}
foreach ($file in @(Get-ChildItem -LiteralPath $Web -Recurse -File)) {
    $name = $file.Name
    if ($cp936.GetString($cp936.GetBytes($name)) -eq $name) { continue }

    $new = $name.Replace('Å', 'A').Replace('å', 'a')
    if ($cp936.GetString($cp936.GetBytes($new)) -ne $new) {
        $chars = foreach ($ch in $new.ToCharArray()) {
            $one = [string]$ch
            if ($cp936.GetString($cp936.GetBytes($one)) -eq $one) { $one } else { '_' }
        }
        $new = -join $chars
    }
    if ($new -eq $name) { continue }

    Rename-Item -LiteralPath $file.FullName -NewName $new
    $renames[$name] = $new
}
if ($renames.Count -gt 0) {
    foreach ($file in @(Get-ChildItem -LiteralPath $Web -Recurse -File -Include *.json, *.js, *.html, *.css)) {
        $text = Read-Text $file.FullName
        $original = $text
        foreach ($key in $renames.Keys) { $text = $text.Replace($key, $renames[$key]) }
        if ($text -ne $original) { Write-Text $file.FullName $text }
    }
}
Write-Host "1) 文件名规范化：$($renames.Count) 个"

function Blank-ValueAfter([string]$text, [string[]]$prefixes) {
    foreach ($prefix in $prefixes) {
        $keep = $prefix
        $question = $prefix.IndexOf('?')
        if ($question -ge 0) { $keep = $prefix.Substring(0, $question) }

        $start = 0
        while ($true) {
            $index = $text.IndexOf($prefix, $start, [System.StringComparison]::Ordinal)
            if ($index -lt 0) { break }

            $valueStart = $index + $prefix.Length
            $quote = $text.IndexOf('"', $valueStart)
            if ($quote -lt 0) { break }

            $text = $text.Substring(0, $index) + $keep + $text.Substring($quote)
            $start = $index + $keep.Length + 1
        }
    }
    return $text
}

$nameKeys = @(
    'description', 'application-name', 'author', 'creator', 'publisher',
    'keywords', 'wxcard-title', 'wxcard-desc', 'wxcard-image',
    'baidu-site-verification', 'msvalidate.01', 'google-site-verification',
    'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'
)
$propertyKeys = @(
    'og:title', 'og:description', 'og:url', 'og:site_name', 'og:locale', 'og:type',
    'og:image', 'og:image:url', 'og:image:secure_url', 'og:image:type',
    'og:image:width', 'og:image:height', 'og:image:alt'
)

$identityPrefixes = New-Object System.Collections.Generic.List[string]
foreach ($pair in @(@('name', $nameKeys), @('property', $propertyKeys))) {
    $attribute = $pair[0]
    foreach ($key in $pair[1]) {
        $identityPrefixes.Add('\"' + $attribute + '\":\"' + $key + '\",\"content\":\"')
        $identityPrefixes.Add('"' + $attribute + '":"' + $key + '","content":"')
        $identityPrefixes.Add($attribute + '="' + $key + '" content="')
    }
}
foreach ($rel in @('\"rel\":\"canonical\",\"href\":\"', '"rel":"canonical","href":"', 'rel="canonical" href="')) {
    $identityPrefixes.Add($rel)
}

$analyticsPrefixes = @('\"gaId\":\"', '"gaId":"', '/__offline-noop.js?id=')

$identityFiles = 0
$analyticsFiles = 0
foreach ($file in @(Get-ChildItem -LiteralPath $Web -Recurse -File -Include *.html, *.js, *.json)) {
    $text = Read-Text $file.FullName
    $original = $text

    $text = Blank-ValueAfter $text $analyticsPrefixes
    $text = $text.Replace('https://www.googletagmanager.com/gtag/js', '/__offline-noop.js')
    if ($text -ne $original) { $analyticsFiles++ }

    $beforeIdentity = $text
    $text = Blank-ValueAfter $text $identityPrefixes.ToArray()
    $text = [regex]::Replace(
        $text,
        '(?s)(<script[^>]*type="application/ld\+json"[^>]*>).*?(</script>)',
        '${1}{}${2}'
    )
    if ($text -ne $beforeIdentity) { $identityFiles++ }

    if ($text -ne $original) { Write-Text $file.FullName $text }
}
Write-Host "2) 统计标识清理：$analyticsFiles 个文件"
Write-Host "3) 站点身份清理：$identityFiles 个文件"

$entry = Join-Path $Web 'index.html'
if (Test-Path -LiteralPath $entry) {
    $text = Read-Text $entry
    $text = $text.Replace('<title>MCBlock Studio 离线版</title>', '<title>投影编辑器</title>')
    $text = $text.Replace('<title>投影编辑器 · 离线版</title>', '<title>投影编辑器</title>')
    $text = $text.Replace(
        '<img src="/oss-static/images/logo/logo-horizontal.png" alt="MCBlock">',
        '<span class="brand">投影编辑器</span>'
    )
    $text = $text.Replace('<span class="tag">离线版 · 本地运行</span>', '<span class="tag">本地运行</span>')
    $text = $text.Replace('离线版不含账号功能：', '本程序不含账号功能：')
    $text = $text.Replace(
        '关闭本窗口（或结束命令行窗口）即停止本地服务。',
        '本地服务跟随 McSTools 进程，退出应用即随之停止。'
    )
    $text = $text.Replace('MCBlock Studio 离线版', '投影编辑器')
    $text = $text.Replace('MCBlock', '投影编辑器')
    $text = $text.Replace('mcblock.top', '投影编辑器')
    $text = $text.Replace('mcblock', '投影编辑器')
    $text = $text.Replace(' · 离线版', '').Replace('离线版 · ', '').Replace('离线版', '')
    Write-Text $entry $text
    Write-Host "4) 入口页去品牌：完成"
}

if (Test-Path -LiteralPath $entry) {
    $text = Read-Text $entry
    if (-not $text.Contains('id="open-library"')) {
        $nl = if ($text.Contains("`r`n")) { "`r`n" } else { "`n" }
        $rowAnchor = '      <a class="btn" href="/studio/editor">直接进入编辑器</a>' + $nl + '    </div>'
        if (-not $text.Contains($rowAnchor)) {
            Write-Warning "入口页结构与预期不一致，跳过「从本地蓝图库打开」的注入"
        } else {
            $replacement = @(
                '      <a class="btn" href="/studio/editor">直接进入编辑器</a>'
                '      <button class="btn" type="button" id="open-library">从本地蓝图库打开</button>'
                '    </div>'
                ''
                '    <div id="library-panel" hidden>'
                '      <div class="status info" id="library-status">正在读取本地蓝图库……</div>'
                '      <ul id="library-list"></ul>'
                '    </div>'
            ) -join $nl
            $text = $text.Replace($rowAnchor, $replacement)

            $libraryScript = @(
                '<script>'
                '(function () {'
                '  var button = document.getElementById(''open-library'');'
                '  var panel = document.getElementById(''library-panel'');'
                '  var status = document.getElementById(''library-status'');'
                '  var list = document.getElementById(''library-list'');'
                '  if (!button || !panel || !status || !list) { return; }'
                ''
                '  button.addEventListener(''click'', function () {'
                '    panel.hidden = !panel.hidden;'
                '    if (panel.hidden) { return; }'
                '    status.textContent = ''正在读取本地蓝图库……'';'
                '    list.textContent = '''';'
                '    fetch(''/local/schematics'')'
                '      .then(function (response) { return response.json(); })'
                '      .then(function (payload) {'
                '        var items = (payload && payload.data) || [];'
                '        if (!payload || payload.success !== true) {'
                '          status.textContent = ''本地蓝图库不可用'';'
                '          return;'
                '        }'
                '        if (items.length === 0) {'
                '          status.textContent = ''本地蓝图库里还没有投影，先在上面选一个文件导入。'';'
                '          return;'
                '        }'
                '        status.textContent = ''共 '' + items.length + '' 份，点一份打开：'';'
                '        items.forEach(function (item) {'
                '          var li = document.createElement(''li'');'
                '          var link = document.createElement(''a'');'
                '          link.className = ''btn'';'
                '          link.href = ''/local/open-schematic?id='' + encodeURIComponent(item.id);'
                '          link.textContent = item.name + '' · '' + item.extension + '' · '' + item.size + '' · '' + item.updatedAt;'
                '          li.appendChild(link);'
                '          list.appendChild(li);'
                '        });'
                '      })'
                '      .catch(function (error) {'
                '        status.textContent = ''读取本地蓝图库失败：'' + error;'
                '      });'
                '  });'
                '})();'
                '</script>'
            ) -join $nl
            $text = $text.Replace('</body>', $libraryScript + $nl + '</body>')
        }
    }

    Write-Text $entry $text
    Write-Host "5) 本地蓝图库入口：$(if ($text.Contains('id="open-library"')) { '已就位' } else { '未注入' })"
}

$entryText = Read-Text $entry
$editorPath = Join-Path $Web 'studio\editor\index.html'
$editorText = if (Test-Path -LiteralPath $editorPath) { Read-Text $editorPath } else { '' }
Write-Host ""
Write-Host "自检："
Write-Host ("  入口页含「投影编辑器」：{0}" -f $entryText.Contains('投影编辑器'))
Write-Host ("  入口页残留 MCBlock / logo-horizontal：{0} / {1}" -f $entryText.Contains('MCBlock'), $entryText.Contains('logo-horizontal'))
Write-Host ("  入口页残留「离线版」：{0}" -f $entryText.Contains('离线版'))
Write-Host ("  编辑器页残留量测 ID：{0}" -f ($editorText.Contains('G-P5QMJ6H9ZH') -or $editorText.Contains('googletagmanager')))
