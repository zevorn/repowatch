# PepoWatch - GitHub 信息订阅平台

一个功能完整的网页应用，用于订阅和展示GitHub仓库更新、CVE漏洞信息，并提供智能AI总结功能。

## 🚀 项目简介

PepoWatch 是一个专业的仓库信息聚合平台，帮助开发者和安全研究人员实时监控关注的 GitHub 仓库动态和最新的 CVE 安全漏洞信息。通过 AI 智能分析和 GitHub API 集成，实时获取仓库 Issues、提交记录和发布信息，快速了解安全风险和重要更新。

## ✨ 核心功能

### 1. GitHub仓库订阅模块
- ✅ 支持添加/删除订阅的GitHub仓库（格式：owner/repo）
- ✅ **真实 GitHub API 集成**，获取实时仓库数据
- ✅ **实时显示仓库 Issues**，包括标签、评论数、创建者等详细信息
- ✅ 实时显示仓库的最新提交、发布版本、Issue和Pull Request
- ✅ 展示仓库统计信息（Star数、Fork数、编程语言、Open Issues数等）
- ✅ **单个仓库动态刷新**功能，一键更新仓库信息
- ✅ 仓库搜索和过滤功能
- ✅ 订阅数据本地持久化存储
- ✅ **可选配置 GitHub Personal Access Token** 以提高 API 限额

### 2. CVE漏洞信息模块
- ✅ 展示最新的 CVE 漏洞列表
- ✅ 包含漏洞编号、CVSS 评分、严重程度、发布时间
- ✅ 支持按严重等级筛选（Critical / 严重、High / 高危、Medium / 中危、Low / 低危）
- ✅ 漏洞详情包含产品、类型、影响范围
- ✅ CVE搜索功能（支持编号、描述、产品名称搜索）

### 3. AI智能总结功能
- ✅ 对每条 GitHub 更新提供简洁的 AI 总结
- ✅ CVE 漏洞的智能安全分析
- ✅ 智能提取关键信息和影响范围
- ✅ 突出显示重要的安全风险和建议措施
- ✅ 支持中英文双语（可在设置中切换）

### 4. 可视化仪表板
- ✅ 实时统计数据展示（订阅仓库数、今日更新数、CVE 数量、高危漏洞数）
- ✅ 最新 GitHub 更新和 CVE 漏洞的快速预览
- ✅ 清晰的卡片式布局，信息一目了然
- ✅ 响应式设计，适配各种屏幕尺寸

### 5. 高级功能
- ✅ 自动刷新机制（可自定义间隔：30 秒、1 分钟、5 分钟、10分钟）
- ✅ **全局和单仓库手动刷新**功能
- ✅ **GitHub API 速率限制检测**
- ✅ 桌面通知支持（新 CVE 漏洞、重要更新）
- ✅ 数据本地存储（订阅列表、Issues 数据、用户设置）
- ✅ 暗色主题界面（适合开发者长时间使用）
- ✅ **GitHub Actions 自动部署到 GitHub Pages**

## 📋 已完成功能列表

### 仪表板页面 (`/#dashboard`)
- [x] 四个统计卡片（订阅仓库、今日更新、新增 CVE、高危漏洞）
- [x] 最新GitHub更新预览（显示最近5条）
- [x] 最新CVE漏洞预览（显示最近5条）
- [x] 快速跳转到详细页面

### GitHub订阅页面 (`/#github`)
- [x] 添加仓库功能（格式验证、重复检测）
- [x] 仓库列表展示（包含描述、统计信息、最后更新时间）
- [x] 删除订阅功能（带确认提示）
- [x] 刷新单个仓库
- [x] 仓库搜索功能
- [x] 更新流展示（提交、发布、Issue、Pull Request）
- [x] 每条更新带AI智能总结

### CVE漏洞页面 (`/#cve`)
- [x] CVE漏洞列表展示
- [x] 严重程度分类显示（带颜色标识）
- [x] 按严重等级筛选（全部/严重/高危/中危/低危）
- [x] CVE搜索功能
- [x] CVSS评分显示
- [x] 漏洞详细信息（产品、类型、发布时间）
- [x] AI安全分析和建议措施
- [x] 点击CVE编号跳转到官方详情页

### 设置页面 (`/#settings`)
- [x] 自动刷新间隔设置
- [x] AI总结语言选择（中文/英文）
- [x] 桌面通知开关
- [x] 清除本地数据功能
- [x] 版本信息显示

## 🎯 功能入口和路由

| 功能 | 访问路径 | 说明 |
|------|---------|------|
| 仪表板 | `index.html` 或 `#dashboard` | 首页，显示统计数据和最新动态 |
| GitHub订阅 | `#github` | 管理GitHub仓库订阅 |
| CVE漏洞 | `#cve` | 查看和筛选CVE漏洞信息 |
| 系统设置 | `#settings` | 配置应用参数和偏好 |

## 🛠️ 技术实现

### 前端技术栈
- **HTML5** - 语义化标签，提升可访问性
- **CSS3** - 现代化暗色主题设计，响应式布局
- **JavaScript (ES6+)** - 模块化代码组织，事件驱动架构
- **LocalStorage** - 本地数据持久化

### 外部资源
- **Font Awesome 6.4.0** - 图标库 (CDN)
- **Google Fonts (Inter)** - 字体 (CDN)

### 设计特点
- **暗色主题** - 减少眼睛疲劳，适合长时间使用
- **响应式设计** - 适配桌面、平板、手机等各种设备
- **卡片式布局** - 信息层次清晰，易于浏览
- **渐变色彩** - 使用蓝色、绿色、红色、橙色等区分不同功能
- **动画效果** - 平滑过渡，提升用户体验

## 📊 数据模型

### 仓库数据结构
```javascript
{
    id: 唯一标识,
    owner: 所有者,
    name: 仓库名称,
    fullName: 完整名称 (owner/repo),
    description: 描述,
    stars: Star数量,
    forks: Fork数量,
    language: 编程语言,
    lastUpdate: 最后更新时间,
    url: 仓库链接
}
```

### 更新数据结构
```javascript
{
    id: 唯一标识,
    repo: 仓库名称,
    type: 更新类型 (commit/release/issue/pull_request),
    title: 标题,
    description: 描述,
    author: 作者,
    time: 时间,
    aiSummary: AI总结
}
```

### CVE数据结构
```javascript
{
    id: CVE编号 (CVE-YYYY-XXXXX),
    severity: 严重程度 (critical/high/medium/low),
    score: CVSS评分,
    product: 受影响产品,
    vulnerabilityType: 漏洞类型,
    description: 描述,
    published: 发布时间,
    vector: CVSS向量,
    references: 参考链接,
    aiSummary: AI安全分析
}
```

## 💾 本地存储

应用使用 `localStorage` 存储以下数据：

- **PepoWatch_repos** - 订阅的仓库列表
- **PepoWatch_settings** - 用户设置（刷新间隔、语言、通知等）

## 🎨 主题颜色

```css
--bg-primary: #0d1117        /* 主背景色 */
--bg-secondary: #161b22      /* 次背景色 */
--bg-tertiary: #21262d       /* 第三背景色 */
--accent-blue: #1f6feb       /* 蓝色强调 */
--accent-green: #238636      /* 绿色强调 */
--accent-red: #da3633        /* 红色强调 */
--severity-critical: #ff4444 /* 严重漏洞 */
--severity-high: #ff6b35     /* 高危漏洞 */
--severity-medium: #ffa500   /* 中危漏洞 */
--severity-low: #4ecdc4      /* 低危漏洞 */
```

## 📱 响应式断点

- **桌面** - 1400px+ (大屏显示)
- **平板** - 968px - 1399px (中等屏幕)
- **手机** - 640px - 967px (小屏幕)
- **小屏手机** - < 640px (超小屏幕)

## 🎉 新增功能（v2.0）

### ✨ 已实现的增强功能
- ✅ **真实 GitHub API 集成** - 实时获取仓库信息、Issues、提交记录
- ✅ **Issues 展示功能** - 完整显示仓库的 open issues，包括标签、评论数等
- ✅ **动态刷新机制** - 支持单个仓库和全局数据刷新
- ✅ **GitHub Token 配置** - 可选配置 Personal Access Token 提高 API 限额
- ✅ **API 速率检测** - 实时监控 GitHub API 使用情况
- ✅ **GitHub Actions 自动部署** - 推送代码后自动部署到 GitHub Pages
- ✅ **本地数据持久化** - Issues 数据本地缓存

## 🔮 未来计划

### 尚未实现的功能
- [ ] 真实的CVE数据源集成（NVD API）
- [ ] GraphQL API 支持（GitHub API v4）
- [ ] WebSocket实时推送
- [ ] 导出数据功能（JSON/CSV）
- [ ] 数据可视化图表（趋势分析）
- [ ] 邮件/Webhook通知
- [ ] 多用户支持和云端同步
- [ ] 自定义过滤规则
- [ ] 漏洞影响范围智能评估
- [ ] 与JIRA/GitLab等工具集成

### 推荐的下一步开发
1. **升级到 GraphQL** - 使用 GitHub API v4 提升性能和灵活性
2. **增强AI功能** - 接入真实的AI模型（OpenAI、Claude等）进行智能分析
3. **数据可视化** - 使用 Chart.js/ECharts 添加趋势图表
4. **云端同步** - 开发后端服务，支持多设备数据同步
5. **高级筛选** - 添加更多筛选条件（日期范围、语言、标签等）
6. **自定义监控规则** - 允许用户设置关键词监控和告警规则

## 🚀 使用说明

### 快速开始
1. **本地运行**：直接打开 `index.html` 文件即可运行
2. **在线访问**：部署到 GitHub Pages 后通过 URL 访问
3. 首次使用会自动添加5个示例仓库（React、Vue、VSCode、Node.js、Go）
4. 点击"添加仓库"可以订阅更多GitHub仓库
5. 在设置页面可以配置自动刷新和通知

### 配置 GitHub Token（推荐）
1. 访问 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. 生成新的 Classic Token
3. 选择权限：`public_repo`（或 `repo` 如需访问私有仓库）
4. 复制生成的 token
5. 进入应用的"设置"页面
6. 将 token 粘贴到"GitHub API Token"输入框
7. 点击"测试"按钮验证 token 是否有效
8. **注意**：配置 token 后可大幅提升 API 请求限额（从 60/小时 提升到 5000/小时）

### 添加仓库订阅
1. 进入"GitHub订阅"标签页
2. 点击"添加仓库"按钮
3. 输入仓库地址（格式：owner/repo，例如：facebook/react）
4. 点击"订阅"按钮
5. 应用会自动从 GitHub API 获取真实数据

### 查看仓库 Issues
1. 在仓库卡片右上角点击 <i class="fas fa-exclamation-circle"></i> 图标
2. Issues 列表会展开显示
3. 点击"刷新Issues"按钮更新数据
4. 点击 Issue 标题可跳转到 GitHub 查看详情

### 刷新仓库数据
- **单个仓库刷新**：点击仓库卡片的 🔄 按钮
- **全局刷新**：点击右上角的"刷新"按钮
- **自动刷新**：勾选"自动刷新"并设置刷新间隔

### 筛选CVE漏洞
1. 进入"CVE漏洞"标签页
2. 使用顶部搜索框搜索CVE编号或描述
3. 点击严重等级按钮筛选不同级别的漏洞
4. 点击CVE编号可跳转到官方详情页

### 部署到 GitHub Pages
1. Fork 或克隆此仓库
2. 进入仓库设置 > Pages
3. 选择 Source 为 "GitHub Actions"
4. 推送代码到 main/master 分支
5. GitHub Actions 会自动构建并部署
6. 部署完成后通过 `https://username.github.io/repo-name/` 访问

## 📝 注意事项

- ✅ **已集成真实 GitHub API**，可获取实时数据
- ⚠️ 未配置 GitHub Token 时，API 限额为 **60 请求/小时**
- ✅ 配置 Token 后，限额提升至 **5000 请求/小时**
- 💡 CVE 数据当前使用模拟数据（未来将集成 NVD API）
- 🌐 建议在 Chrome、Edge、Firefox 等现代浏览器中使用
- 💾 LocalStorage 有大小限制（通常 5-10MB），大量数据可能需要其他存储方案
- ⚡ 自动刷新功能会在后台持续运行，可能消耗额外资源
- 🔒 GitHub Token 仅存储在本地浏览器，不会上传到服务器
- 🚀 部署到 GitHub Pages 后，所有数据仍存储在用户本地浏览器

## 📄 许可证

MIT License - 可自由使用、修改和分发

## 👨‍�💻 作者

PepoWatch v1.0.0 - 2024

---

**提示**: 要部署此项目并使其在线可访问，请使用编辑器顶部的"Publish"（发布）标签，一键发布到互联网！
## 🔧 技术架构

### 前端技术
- HTML5 + CSS3 + JavaScript (ES6+)
- GitHub REST API v3
- LocalStorage API
- Notification API

### API 集成
- **GitHub API**: 获取仓库信息、Issues、提交记录、发布版本
- **速率限制处理**: 自动检测并显示 API 配额
- **错误容错**: API 失败时回退到模拟数据

### 部署方式
- **GitHub Actions**: 自动化 CI/CD 流程
- **GitHub Pages**: 静态网站托管
- **零配置部署**: 推送代码即可自动部署

## 📊 API 使用说明

### GitHub API 端点
```
GET /repos/:owner/:repo              # 仓库基本信息
GET /repos/:owner/:repo/issues       # 仓库 Issues
GET /repos/:owner/:repo/commits      # 最新提交
GET /repos/:owner/:repo/releases     # 发布版本
GET /rate_limit                      # API 配额检查
```

### 速率限制
- **未认证**: 60 请求/小时
- **已认证**: 5000 请求/小时
- **建议**: 配置 Personal Access Token

## 更新日志

### v2.0.0 (2024-11)
- ✨ 新增 GitHub API 真实数据集成
- ✨ 新增 Issues 展示功能
- ✨ 新增动态刷新机制
- ✨ 新增 GitHub Token 配置
- ✨ 新增 GitHub Actions 自动部署

### v1.0.0 (2024)
- 🎉 初始版本，模拟数据展示

---

**🚀 快速部署指南**: 
1. Fork 此仓库
2. 启用 GitHub Pages（Settings > Pages > Source: GitHub Actions）
3. 推送代码，自动部署完成！
