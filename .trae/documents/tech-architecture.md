# Sy OS 产品官网 - 技术架构文档

## 1. 架构设计

```mermaid
flowchart TB
    subgraph "前端层"
        "HTML 静态页面"
        "CSS 样式系统"
        "JavaScript 交互"
    end
    subgraph "页面文件"
        "index.html"
        "syos.html"
        "syos-pad.html"
        "syos-se.html"
        "open-syos.html"
        "syos-next.html"
        "syos-auto.html"
        "syos-vision.html"
        "events.html"
    end
    subgraph "资源文件"
        "styles.css"
        "script.js"
        "images/"
    end
    "HTML 静态页面" --> "页面文件"
    "HTML 静态页面" --> "资源文件"
```

## 2. 技术说明
- **前端**：纯静态 HTML5 + CSS3 + Vanilla JavaScript（无框架依赖）
- **构建工具**：无（直接部署静态文件）
- **后端**：无
- **部署方式**：GitHub Pages 静态托管

### 技术选型理由
- 用户明确要求"静态网页，多个HTML"，采用纯静态方案
- 无需构建流程，直接部署
- 轻量级，加载速度快
- 通过 CSS 变量和 JavaScript 实现组件复用

## 3. 文件结构

```
/workspace/
├── index.html              # 首页
├── syos.html               # Sy OS 产品页
├── syos-pad.html           # Sy OS for Pad 产品页
├── syos-se.html            # Sy OS SE 产品页
├── open-syos.html          # Open Sy OS 产品页
├── syos-next.html          # Sy OS NEXT 产品页
├── syos-auto.html          # Sy OS Auto 产品页
├── syos-vision.html        # Sy OS Vision 产品页
├── events.html             # 活动页
├── styles.css              # 全局样式
├── script.js               # 全局交互脚本
├── CNAME                   # GitHub Pages 自定义域名
└── README.md               # 项目说明
```

## 4. CSS 架构

### 4.1 CSS 变量系统
```css
:root {
  /* 色彩系统 */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: rgba(255, 255, 255, 0.04);
  --bg-glass: rgba(255, 255, 255, 0.08);
  --text-primary: #f0f0f5;
  --text-secondary: rgba(255, 255, 255, 0.6);
  --accent-blue: #3b82f6;
  --accent-purple: #8b5cf6;
  --accent-gradient: linear-gradient(135deg, #3b82f6, #8b5cf6);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.2);

  /* 圆角系统 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* 间距系统 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* 字体系统 */
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Noto Sans SC', sans-serif;

  /* 动效系统 */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### 4.2 关键 CSS 模块
- 导航栏：悬浮圆角毛玻璃效果
- 卡片系统：圆角卡片 + 悬浮发光
- Hero 区域：全屏渐变 + 动态装饰
- 按钮系统：胶囊按钮 + 渐变 + 发光
- 动画系统：渐入、悬浮、脉冲

## 5. JavaScript 架构

### 5.1 核心模块
- **导航栏交互**：滚动时背景变化、移动端汉堡菜单
- **滚动动画**：IntersectionObserver 驱动的元素渐入
- **页面加载动画**：stagger 渐入效果
- **卡片交互**：悬浮 3D 倾斜效果

### 5.2 无外部依赖
- 所有交互使用原生 JavaScript 实现
- 不引入任何第三方库

## 6. 页面间导航

| 页面 | 导航链接 |
|------|----------|
| 所有页面 | 导航栏包含：首页、各产品页、活动页 |
| 首页产品矩阵 | 点击卡片跳转对应产品页 |
| 产品页 | 底部"返回首页"链接 |

## 7. 性能优化
- CSS/JS 内联关键路径资源
- 图片使用懒加载
- 字体使用 `font-display: swap`
- 最小化重绘和回流
