const fs = require('fs');
const path = require('path');

const DIR = __dirname;

const pages = [
    { file: "syos.html", title: "Sy OS", desc: "Scratch 制作的伪桌面操作系统，Sy OS 系列的核心产品，带来极简交互体验。", img: "Sy OS.jpg", eyebrow: "CLASSIC", detail: "经典桌面体验，Sy OS 系列的起点。", tags: ["核心产品", "经典桌面"] },
    { file: "syos-next.html", title: "Sy OS NEXT", desc: "完全自研的 64 位桌面操作系统，代表 Sy OS 系列的最高技术成就，性能全面跃升。", img: "Sy OS NEXT.jpg", eyebrow: "NEXT GEN", detail: "全新架构与性能优化，正在持续迭代。", tags: ["全新发布", "64 位架构"] },
    { file: "syos-intl.html", title: "Sy OS 国际版", desc: "面向全球用户的国际化版本，打破语言边界，连接世界。", img: "Sy OS 国际版.jpg", eyebrow: "GLOBAL", detail: "多语言支持，连接全球生态。", tags: ["多语言", "全球生态"] },
    { file: "syos-pad.html", title: "Sy OS for Pad", desc: "专为大屏触控体验优化的伪平板操作系统，激发无限创造力。", img: "Sy OS for Pad.jpg", eyebrow: "TABLET", detail: "专为触控打造的直观操作体验，释放大屏生产力。", tags: ["触控大屏", "创意无限"] },
    { file: "syos-se.html", title: "Sy OS SE", desc: "Sy OS 精简版，轻量高效，在基础硬件上依然保持流畅运行。", img: "Sy OS SE.jpg", eyebrow: "LITE", detail: "化繁为简，去除冗余，回归纯粹的使用体验。", tags: ["轻量精简", "高效流畅"] },
    { file: "syos-vision.html", title: "Sy OS Vision", desc: "适用于 AR 设备的伪操作系统，探索空间计算与增强现实的新境界。", img: "Sy OS Vision.jpg", eyebrow: "AR VISION", detail: "虚拟与现实交融，重塑数字交互方式。", tags: ["增强现实", "空间交互"] },
    { file: "open-syos.html", title: "Open Sy OS", desc: "开源版本的 Sy OS，开放生态，欢迎社区贡献与二次开发。", img: "Open Sy OS.jpg", eyebrow: "OPEN SOURCE", detail: "共享代码，共建未来，打造繁荣的开源生态。", tags: ["开源", "社区共建"] },
    { file: "syos-linux.html", title: "Sy OS on Linux", desc: "基于 Debian 运行的 Sy OS，完美融合庞大的 Linux 软件生态。", img: "Sy OS on Linux.jpg", eyebrow: "LINUX", detail: "拥抱开源，尽享海量 Linux 应用生态。", tags: ["开源生态", "Debian"] }
];

const template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- 导航 - 毛玻璃 -->
    <nav class="nav" aria-label="主导航">
        <div class="nav-container">
            <a href="index.html" class="nav-logo"><img src="Logo.png" alt="Sy OS Logo" class="nav-logo-img"><span>Sy OS</span></a>
            <span class="nav-page-title">__TITLE__</span>
            <ul class="nav-links">
                <li><a href="index.html#products">产品</a></li>
                <li><a href="index.html#features">特性</a></li>
                <li><a href="index.html#experience">在线体验</a></li>
                <li><a href="https://github.com/Shiyuan-318" target="_blank">开源社区</a></li>
            </ul>
            <a href="index.html#experience" class="nav-cta">立即体验</a>
            <button class="nav-toggle" aria-label="打开菜单" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- 页头 -->
    <header class="page-hero">
        <div class="hero-bg-grid"></div>
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
        <div>
            <span class="page-hero-eyebrow">__EYEBROW__</span>
            <h1 class="page-hero-title">__TITLE__</h1>
            <p class="page-hero-desc">__DESC__</p>
        </div>
    </header>

    <!-- 内容 -->
    <section class="page-content">
        <div class="page-image-card" data-animate>
            <img src="__IMG__" alt="__TITLE__ 详细展示" onerror="this.onerror=null;this.src='1145.png';">
        </div>
        <div class="section-header" data-animate>
            <span class="section-eyebrow">FEATURES</span>
            <h2 class="section-title">功能详情</h2>
            <p class="section-subtitle">__DETAIL__</p>
        </div>
        <div class="detail-tags" data-animate>
            __TAGS__
        </div>
        <p class="detail-text" data-animate>__TITLE__ 更多功能与介绍正在持续更新中，敬请期待。</p>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-brand">
                <a href="index.html" class="footer-brand-logo"><img src="Logo.png" alt="Sy OS"> Sy OS</a>
                <p class="footer-tagline">Sy OS 系列操作系统，持续探索更流畅的数字体验。</p>
            </div>
            <div class="footer-links">
                <div class="footer-column">
                    <h4>产品</h4>
                    <ul>
                        <li><a href="syos.html">Sy OS</a></li>
                        <li><a href="syos-next.html">Sy OS NEXT</a></li>
                        <li><a href="syos-vision.html">Sy OS Vision</a></li>
                        <li><a href="open-syos.html">Open Sy OS</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>社区</h4>
                    <ul>
                        <li><a href="https://qm.qq.com/q/bWZFbX8iwE" target="_blank">QQ 社群</a></li>
                        <li><a href="https://github.com/Shiyuan-318" target="_blank">GitHub</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>体验</h4>
                    <ul>
                        <li><a href="index.html#experience">在线体验</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2026 Sy OS · 开发者 Shiyuan · 保留所有权利。</p>
            <p><a href="index.html" class="footer-link">返回首页</a></p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

pages.forEach(p => {
    const tagsHtml = p.tags.map(tag => `            <span class="product-tag">${tag}</span>`).join('\n');
    let content = template
        .replace(/__TITLE__/g, p.title)
        .replace(/__DESC__/g, p.desc)
        .replace(/__IMG__/g, p.img)
        .replace(/__EYEBROW__/g, p.eyebrow)
        .replace(/__DETAIL__/g, p.detail)
        .replace(/__TAGS__/g, tagsHtml);
    fs.writeFileSync(path.join(DIR, p.file), content, 'utf8');
});
console.log('Done');