## 1. 架构设计

```mermaid
flowchart TD
    "React 前端" --> "React Router"
    "React Router" --> "首页"
    "React Router" --> "产品详情页"
    "首页" --> "Hero 轮播组件"
    "首页" --> "产品矩阵组件"
    "首页" --> "特性展示组件"
    "首页" --> "在线体验组件"
    "产品详情页" --> "产品数据"
```

## 2. 技术说明
- 前端：React@18 + TypeScript + Tailwind CSS@3 + Vite
- 初始化工具：vite-init
- 后端：无
- 数据库：无，使用静态数据
- 路由：react-router-dom@6
- 动画：CSS 动画 + IntersectionObserver + 自定义 Hook
- 图标：lucide-react

## 3. 路由定义
| 路由 | 用途 |
|------|------|
| / | 首页，含 Hero 轮播、产品矩阵、特性、体验入口 |
| /syos | Sy OS 产品详情页 |
| /syos-next | Sy OS NEXT 产品详情页 |
| /syos-vision | Sy OS Vision 产品详情页 |
| /syos-intl | Sy OS 国际版产品详情页 |
| /syos-pad | Sy OS for Pad 产品详情页 |
| /syos-se | Sy OS SE 产品详情页 |
| /open-syos | Open Sy OS 产品详情页 |
| /syos-linux | Sy OS on Linux 产品详情页 |

## 4. API 定义
无后端 API，所有数据为静态配置。

## 5. 数据模型

### 5.1 产品数据结构
```typescript
interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  detailDescription: string;
  image: string;
  badge?: string;
  route: string;
  experienceUrl?: string;
  experienceLabel?: string;
  experienceDesc?: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}
```
