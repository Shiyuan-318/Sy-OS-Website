$pages = @(
    @{ file="syos.html"; title="Sy OS"; desc="Scratch 制作的伪桌面操作系统，Sy OS 系列的核心产品，带来极简交互体验。" },
    @{ file="syos-next.html"; title="Sy OS NEXT"; desc="完全自研的 64 位桌面操作系统，代表 Sy OS 系列的最高技术成就，性能全面跃升。" },
    @{ file="syos-intl.html"; title="Sy OS 国际版"; desc="面向全球用户的国际化版本，打破语言边界，连接世界。" },
    @{ file="syos-pad.html"; title="Sy OS for Pad"; desc="专为大屏触控体验优化的伪平板操作系统，激发无限创造力。" },
    @{ file="syos-se.html"; title="Sy OS SE"; desc="Sy OS 精简版，轻量高效，在基础硬件上依然保持流畅运行。" },
    @{ file="syos-vision.html"; title="Sy OS Vision"; desc="适用于 AR 设备的伪操作系统，探索空间计算与增强现实的新境界。" },
    @{ file="open-syos.html"; title="Open Sy OS"; desc="开源版本的 Sy OS，开放生态，欢迎社区贡献与二次开发。" },
    @{ file="syos-linux.html"; title="Sy OS on Linux"; desc="基于 Debian 运行的 Sy OS，完美融合庞大的 Linux 软件生态。" }
)

$template = @"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__ - Sy OS</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo" style="text-decoration: none;">
                <img src="Logo.png" alt="Sy OS Logo" class="logo-img">
                <span class="logo-text">Sy OS</span>
            </a>
            <ul class="nav-links">
                <li><a href="index.html#products">智能产品</a></li>
                <li><a href="index.html#features">核心特性</a></li>
                <li><a href="index.html#experience">在线体验</a></li>
                <li><a href="index.html#github">开源社区</a></li>
            </ul>
            <div class="nav-right">
                <button class="nav-toggle" aria-label="菜单">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </nav>

    <header class="page-hero">
        <div class="container">
            <h1>__TITLE__</h1>
            <p>__DESC__</p>
        </div>
    </header>

    <section class="page-content">
        <div class="container">
            <div class="product-image-wrapper" style="max-width: 800px; margin: 0 auto 60px; border-radius: 12px; box-shadow: var(--card-shadow); padding-top: 50%;">
                <img src="" alt="__TITLE__ 详细展示" class="product-img-placeholder">
                <div class="img-fallback-text">产品详细展示图片占位</div>
            </div>
            <div class="section-header">
                <h2 class="section-title">功能详情</h2>
                <p class="section-subtitle">此处预留为 __TITLE__ 的详细功能介绍和图文展示区域。</p>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-bottom" style="border-top: none; padding-top: 0;">
                <p class="copyright">&copy; 2026 Sy OS. 版权所有. 开发者: Shiyuan</p>
            </div>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>
"@

foreach ($p in $pages) {
    $content = $template.Replace("__TITLE__", $p.title).Replace("__DESC__", $p.desc)
    Set-Content -Path $p.file -Value $content -Encoding UTF8
}
