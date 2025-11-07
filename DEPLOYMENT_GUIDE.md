# 🚀 部署指南

## GitHub Pages 部署步骤

### 1. 启用 GitHub Pages

1. 进入仓库设置页面：`https://github.com/zevorn/repowatch/settings`
2. 在左侧菜单找到 **Pages**
3. 在 **Source** 下拉菜单中选择 **GitHub Actions**
4. 保存设置

### 2. 添加 GitHub Actions Workflow

由于权限限制，workflow 文件需要手动创建。请按以下步骤操作：

#### 方法一：通过 GitHub 网页界面

1. 进入仓库首页
2. 点击 **Add file** > **Create new file**
3. 文件路径输入：`.github/workflows/deploy.yml`
4. 粘贴以下内容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. 点击 **Commit changes**

#### 方法二：通过命令行

```bash
# 克隆仓库
git clone https://github.com/zevorn/repowatch.git
cd repowatch

# 创建 workflow 文件
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# 提交并推送
git add .github/workflows/deploy.yml
git commit -m "chore: add GitHub Actions workflow for Pages deployment"
git push origin main
```

### 3. 触发部署

Workflow 添加后，部署会自动触发。你也可以：

1. 进入 **Actions** 标签页
2. 选择 **Deploy to GitHub Pages** workflow
3. 点击 **Run workflow** 按钮手动触发

### 4. 访问网站

部署完成后，网站将在以下地址访问：

```
https://zevorn.github.io/repowatch/
```

## 配置 GitHub Token（可选但推荐）

为了提高 API 请求限额，建议配置 GitHub Personal Access Token：

### 1. 生成 Token

1. 访问：https://github.com/settings/tokens
2. 点击 **Generate new token** > **Generate new token (classic)**
3. 设置以下信息：
   - **Note**: `PepoWatch API Token`
   - **Expiration**: 建议选择 **90 days** 或 **No expiration**
   - **Scopes**: 勾选 `public_repo`（或 `repo` 如需访问私有仓库）
4. 点击 **Generate token**
5. **立即复制 token**（离开页面后将无法再次查看）

### 2. 配置 Token

1. 访问部署后的网站
2. 点击右上角 **设置** 标签
3. 找到 **GitHub API Token** 设置项
4. 粘贴你的 token
5. 点击 **测试** 按钮验证

### 3. API 限额对比

- **未配置 Token**: 60 请求/小时
- **已配置 Token**: 5000 请求/小时

## 本地开发测试

如果想在本地测试：

```bash
# 克隆仓库
git clone https://github.com/zevorn/repowatch.git
cd repowatch

# 直接打开 index.html
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# 或使用简单 HTTP 服务器
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 故障排查

### 部署失败

1. 检查 **Actions** 标签页的错误日志
2. 确认 GitHub Pages 已在设置中启用
3. 确认 workflow 文件路径正确

### API 限额不足

1. 配置 GitHub Token
2. 减少自动刷新频率
3. 避免频繁手动刷新

### Issues 不显示

1. 检查浏览器控制台错误
2. 确认仓库有 open issues
3. 点击 Issues 图标展开列表
4. 点击"刷新Issues"按钮重新加载

## 技术支持

如遇问题，请：

1. 查看 [README.md](./README.md) 了解详细功能说明
2. 在 [GitHub Issues](https://github.com/zevorn/repowatch/issues) 提交问题
3. 查看浏览器控制台的错误信息

---

**版本**: v2.0.0  
**最后更新**: 2024-11
