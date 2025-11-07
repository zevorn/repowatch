// PepoWatch - GitHub 信息订阅平台
// 全局状态管理
const AppState = {
    repos: [],
    updates: [],
    cves: [],
    settings: {
        refreshInterval: 60000,
        aiLanguage: 'zh-CN',
        notificationEnabled: false,
        autoRefresh: false
    },
    filters: {
        github: '',
        cve: '',
        cveSeverity: 'all'
    },
    refreshTimer: null
};

// 本地存储管理
const Storage = {
    save() {
        localStorage.setItem('PepoWatch_repos', JSON.stringify(AppState.repos));
        localStorage.setItem('PepoWatch_settings', JSON.stringify(AppState.settings));
    },
    load() {
        const repos = localStorage.getItem('PepoWatch_repos');
        const settings = localStorage.getItem('PepoWatch_settings');
        
        if (repos) AppState.repos = JSON.parse(repos);
        if (settings) AppState.settings = { ...AppState.settings, ...JSON.parse(settings) };
    },
    clear() {
        localStorage.removeItem('PepoWatch_repos');
        localStorage.removeItem('PepoWatch_settings');
    }
};

// Toast 通知
const Toast = {
    show(message, type = 'success') {
        const toast = document.getElementById('toast');
        const messageEl = document.getElementById('toastMessage');
        const icon = toast.querySelector('i');
        
        messageEl.textContent = message;
        toast.className = `toast ${type}`;
        
        if (type === 'error') {
            icon.className = 'fas fa-exclamation-circle';
        } else {
            icon.className = 'fas fa-check-circle';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
};

// 模拟数据生成器
const DataGenerator = {
    // 生成GitHub仓库数据
    generateRepoData(repoName) {
        const [owner, name] = repoName.split('/');
        return {
            id: Date.now() + Math.random(),
            owner,
            name,
            fullName: repoName,
            description: `${name} 的示例仓库描述 - 这是一个开源项目`,
            stars: Math.floor(Math.random() * 10000),
            forks: Math.floor(Math.random() * 1000),
            language: ['JavaScript', 'Python', 'Go', 'Rust', 'TypeScript'][Math.floor(Math.random() * 5)],
            lastUpdate: new Date().toISOString(),
            url: `https://github.com/${repoName}`
        };
    },

    // 生成GitHub更新数据
    generateRepoUpdates(repos) {
        const updates = [];
        const updateTypes = ['commit', 'release', 'issue', 'pull_request'];
        const titles = {
            commit: ['修复了一个严重的安全漏洞', '添加了新功能：API 限流', '优化性能，提升 30%', '更新依赖包到最新版本'],
            release: ['v2.1.0 正式发布', 'v1.5.3 安全更新', 'Beta 版本发布', '重大版本更新'],
            issue: ['发现内存泄漏问题', '请求新功能：支持多语言', '登录失败问题', '性能下降报告'],
            pull_request: ['重构核心模块', '添加单元测试', '修复 XSS 漏洞', '改进错误处理']
        };

        repos.slice(0, 5).forEach(repo => {
            const type = updateTypes[Math.floor(Math.random() * updateTypes.length)];
            const titleList = titles[type];
            
            updates.push({
                id: Date.now() + Math.random(),
                repo: repo.fullName,
                type,
                title: titleList[Math.floor(Math.random() * titleList.length)],
                description: this.generateDescription(type),
                author: `user${Math.floor(Math.random() * 100)}`,
                time: this.getRandomTime(),
                aiSummary: this.generateAISummary(type)
            });
        });

        return updates.sort((a, b) => new Date(b.time) - new Date(a.time));
    },

    generateDescription(type) {
        const descriptions = {
            commit: '本次提交包含重要的安全修复和性能优化，建议所有用户及时更新。',
            release: '此版本包含新功能、错误修复和性能改进。查看完整的变更日志了解详情。',
            issue: '用户报告了一个问题，需要开发团队进行调查和修复。',
            pull_request: '贡献者提交了代码改进，正在等待审核和合并。'
        };
        return descriptions[type];
    },

    generateAISummary(type) {
        const summaries = {
            commit: '🤖 AI 分析：这是一次重要的安全更新，修复了潜在的 SQL 注入漏洞。建议优先级：高。影响范围：所有使用数据库查询的模块。',
            release: '🤖 AI 分析：新版本带来了显著的性能提升和多个安全补丁。推荐所有用户升级。主要改进：API 响应速度提升 40%，修复 3 个中危漏洞。',
            issue: '🤖 AI 分析：该问题可能影响生产环境，建议尽快修复。初步判断为资源管理问题，可能导致服务不稳定。',
            pull_request: '🤖 AI 分析：代码质量良好，改进了错误处理逻辑。建议合并后进行充分测试。涉及核心功能，需要仔细审查。'
        };
        return summaries[type];
    },

    // 生成CVE漏洞数据
    generateCVEData() {
        const cves = [];
        const severities = ['critical', 'high', 'medium', 'low'];
        const products = ['Linux Kernel', 'Apache HTTP Server', 'OpenSSL', 'Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'MySQL', 'Redis', 'Nginx'];
        const vulnerabilityTypes = ['SQL注入', '远程代码执行', 'XSS跨站脚本', '权限提升', '信息泄露', '拒绝服务', '身份认证绕过', '缓冲区溢出'];

        for (let i = 0; i < 20; i++) {
            const severity = severities[Math.floor(Math.random() * severities.length)];
            const product = products[Math.floor(Math.random() * products.length)];
            const vulnType = vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)];
            const year = 2024;
            const cveId = `CVE-${year}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;

            cves.push({
                id: cveId,
                severity,
                score: this.getCVSSScore(severity),
                product,
                vulnerabilityType: vulnType,
                description: `${product} 中发现${vulnType}漏洞。攻击者可利用此漏洞在目标系统上执行恶意操作，可能导致系统完全被控制或敏感信息泄露。`,
                published: this.getRandomTime(),
                vector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`,
                references: [
                    `https://nvd.nist.gov/vuln/detail/${cveId}`,
                    `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cveId}`
                ],
                aiSummary: this.generateCVEAISummary(severity, product, vulnType)
            });
        }

        return cves.sort((a, b) => new Date(b.published) - new Date(a.published));
    },

    getCVSSScore(severity) {
        const scores = {
            critical: (9.0 + Math.random()).toFixed(1),
            high: (7.0 + Math.random() * 2).toFixed(1),
            medium: (4.0 + Math.random() * 3).toFixed(1),
            low: (1.0 + Math.random() * 3).toFixed(1)
        };
        return parseFloat(scores[severity]);
    },

    generateCVEAISummary(severity, product, vulnType) {
        const urgency = {
            critical: '极高',
            high: '高',
            medium: '中等',
            low: '较低'
        };

        const impact = {
            critical: '可能导致系统完全被控制，数据被窃取或破坏，建议立即采取行动',
            high: '可能被攻击者利用获取敏感信息或提升权限，建议尽快修复',
            medium: '存在安全风险，但利用难度较大或影响范围有限，建议计划修复',
            low: '影响较小，建议在常规更新周期中修复'
        };

        const actions = {
            critical: '立即更新到最新版本，如无法更新请采取临时缓解措施',
            high: '尽快升级到修复版本，同时加强监控和访问控制',
            medium: '计划在近期进行更新，评估业务环境的实际风险',
            low: '在下次常规更新时处理即可'
        };

        return `🤖 AI 安全分析：
        
紧急程度：${urgency[severity]}
影响评估：${product} 的${vulnType}漏洞。${impact[severity]}。

漏洞特征：
• 攻击向量：网络可达
• 利用复杂度：${severity === 'critical' || severity === 'high' ? '低' : '中等'}
• 权限要求：${severity === 'critical' ? '无需认证' : '需要认证'}

建议措施：${actions[severity]}

相关组件：请检查您的系统中是否使用了受影响的 ${product} 版本。`;
    },

    getRandomTime() {
        const now = new Date();
        const randomHours = Math.floor(Math.random() * 24);
        const randomMinutes = Math.floor(Math.random() * 60);
        return new Date(now - randomHours * 3600000 - randomMinutes * 60000).toISOString();
    }
};

// 时间格式化
const TimeUtils = {
    formatTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return '刚刚';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} 分钟前`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} 小时前`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} 天前`;
        
        return date.toLocaleDateString('zh-CN');
    }
};

// UI 渲染器
const Renderer = {
    // 渲染统计数据
    renderStats() {
        document.getElementById('statsRepoCount').textContent = AppState.repos.length;
        document.getElementById('statsUpdateCount').textContent = AppState.updates.length;
        document.getElementById('statsCveCount').textContent = AppState.cves.length;
        
        const criticalCount = AppState.cves.filter(cve => cve.severity === 'critical' || cve.severity === 'high').length;
        document.getElementById('statsCriticalCount').textContent = criticalCount;
    },

    // 渲染仓库列表
    renderRepoList() {
        const container = document.getElementById('repoList');
        const search = AppState.filters.github.toLowerCase();

        const filteredRepos = AppState.repos.filter(repo => 
            repo.fullName.toLowerCase().includes(search) ||
            repo.description.toLowerCase().includes(search)
        );

        if (filteredRepos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fab fa-github"></i>
                    <h3>暂无订阅的仓库</h3>
                    <p>点击上方"添加仓库"按钮开始订阅</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredRepos.map(repo => `
            <div class="repo-card">
                <div class="repo-header">
                    <div class="repo-title">
                        <i class="fab fa-github"></i>
                        <h3 onclick="window.open('${repo.url}', '_blank')">${repo.fullName}</h3>
                    </div>
                    <div class="repo-actions">
                        <button class="btn-icon" onclick="App.refreshRepo('${repo.fullName}')" title="刷新">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                        <button class="btn-icon delete" onclick="App.deleteRepo('${repo.fullName}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="repo-description">${repo.description}</div>
                <div class="repo-stats">
                    <span><i class="fas fa-star"></i> ${repo.stars.toLocaleString()}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks.toLocaleString()}</span>
                    <span><i class="fas fa-circle"></i> ${repo.language}</span>
                    <span><i class="fas fa-clock"></i> ${TimeUtils.formatTimeAgo(repo.lastUpdate)}</span>
                </div>
            </div>
        `).join('');
    },

    // 渲染更新流
    renderUpdates(containerId = 'repoUpdates', limit = null) {
        const container = document.getElementById(containerId);
        const updates = limit ? AppState.updates.slice(0, limit) : AppState.updates;

        if (updates.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-stream"></i>
                    <h3>暂无更新</h3>
                    <p>订阅仓库后将显示最新动态</p>
                </div>
            `;
            return;
        }

        const typeIcons = {
            commit: 'fa-code-branch',
            release: 'fa-tag',
            issue: 'fa-exclamation-circle',
            pull_request: 'fa-code-pull-request'
        };

        const typeNames = {
            commit: '提交',
            release: '发布',
            issue: '议题',
            pull_request: '拉取请求'
        };

        container.innerHTML = updates.map(update => `
            <div class="update-card">
                <div class="update-header">
                    <div class="update-title">
                        <i class="fas ${typeIcons[update.type]}"></i>
                        ${update.title}
                    </div>
                    <div class="update-time">${TimeUtils.formatTimeAgo(update.time)}</div>
                </div>
                <div class="update-repo">
                    <i class="fab fa-github"></i> ${update.repo} • ${typeNames[update.type]} by ${update.author}
                </div>
                <div class="update-description">${update.description}</div>
                <div class="ai-summary">
                    <div class="ai-summary-label">
                        <i class="fas fa-robot"></i>
                        AI 智能总结
                    </div>
                    <div class="ai-summary-content">${update.aiSummary}</div>
                </div>
            </div>
        `).join('');
    },

    // 渲染CVE列表
    renderCVEList(containerId = 'cveList', limit = null) {
        const container = document.getElementById(containerId);
        const search = AppState.filters.cve.toLowerCase();
        const severity = AppState.filters.cveSeverity;

        let filteredCVEs = AppState.cves.filter(cve => 
            (cve.id.toLowerCase().includes(search) ||
            cve.description.toLowerCase().includes(search) ||
            cve.product.toLowerCase().includes(search)) &&
            (severity === 'all' || cve.severity === severity)
        );

        if (limit) filteredCVEs = filteredCVEs.slice(0, limit);

        if (filteredCVEs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bug"></i>
                    <h3>暂无CVE数据</h3>
                    <p>请稍后刷新或调整筛选条件</p>
                </div>
            `;
            return;
        }

        const severityNames = {
            critical: '严重',
            high: '高危',
            medium: '中危',
            low: '低危'
        };

        container.innerHTML = filteredCVEs.map(cve => `
            <div class="cve-card ${cve.severity}">
                <div class="cve-header">
                    <div class="cve-id" onclick="window.open('${cve.references[0]}', '_blank')">
                        ${cve.id}
                    </div>
                    <div class="severity-badge ${cve.severity}">
                        ${severityNames[cve.severity]}
                    </div>
                </div>
                <div class="cve-description">${cve.description}</div>
                <div class="cve-meta">
                    <span><i class="fas fa-box"></i> 产品: ${cve.product}</span>
                    <span><i class="fas fa-shield-alt"></i> 类型: ${cve.vulnerabilityType}</span>
                    <span><i class="fas fa-clock"></i> ${TimeUtils.formatTimeAgo(cve.published)}</span>
                    <span class="cve-score">
                        <i class="fas fa-chart-line"></i>
                        CVSS: ${cve.score}
                    </span>
                </div>
                <div class="ai-summary">
                    <div class="ai-summary-label">
                        <i class="fas fa-robot"></i>
                        AI 安全分析
                    </div>
                    <div class="ai-summary-content" style="white-space: pre-line;">${cve.aiSummary}</div>
                </div>
            </div>
        `).join('');
    }
};

// 主应用逻辑
const App = {
    init() {
        // 加载本地数据
        Storage.load();
        
        // 初始化事件监听
        this.initEventListeners();
        
        // 加载初始数据
        this.loadInitialData();
        
        // 应用设置
        this.applySettings();
        
        Toast.show('欢迎使用 PepoWatch 安全监控平台', 'success');
    },

    initEventListeners() {
        // 标签页切换
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });

        // 刷新按钮
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        // 自动刷新
        document.getElementById('autoRefresh').addEventListener('change', (e) => {
            AppState.settings.autoRefresh = e.target.checked;
            this.toggleAutoRefresh();
            Storage.save();
        });

        // 添加仓库
        document.getElementById('addRepoBtn').addEventListener('click', () => {
            document.getElementById('addRepoForm').classList.remove('hidden');
            document.getElementById('repoInput').focus();
        });

        document.getElementById('submitRepoBtn').addEventListener('click', () => {
            this.addRepo();
        });

        document.getElementById('cancelRepoBtn').addEventListener('click', () => {
            document.getElementById('addRepoForm').classList.add('hidden');
            document.getElementById('repoInput').value = '';
        });

        document.getElementById('repoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addRepo();
            }
        });

        // 搜索过滤
        document.getElementById('githubSearch').addEventListener('input', (e) => {
            AppState.filters.github = e.target.value;
            Renderer.renderRepoList();
        });

        document.getElementById('cveSearch').addEventListener('input', (e) => {
            AppState.filters.cve = e.target.value;
            Renderer.renderCVEList();
        });

        // CVE严重程度过滤
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                AppState.filters.cveSeverity = btn.dataset.severity;
                Renderer.renderCVEList();
            });
        });

        // 设置
        document.getElementById('refreshInterval').addEventListener('change', (e) => {
            AppState.settings.refreshInterval = parseInt(e.target.value);
            this.toggleAutoRefresh();
            Storage.save();
            Toast.show('刷新间隔已更新', 'success');
        });

        document.getElementById('aiLanguage').addEventListener('change', (e) => {
            AppState.settings.aiLanguage = e.target.value;
            Storage.save();
            Toast.show('语言设置已更新', 'success');
        });

        document.getElementById('notificationEnabled').addEventListener('change', (e) => {
            AppState.settings.notificationEnabled = e.target.checked;
            Storage.save();
            if (e.target.checked) {
                this.requestNotificationPermission();
            }
        });

        document.getElementById('clearDataBtn').addEventListener('click', () => {
            if (confirm('确定要清除所有本地数据吗？此操作不可撤销。')) {
                Storage.clear();
                AppState.repos = [];
                AppState.updates = [];
                this.refreshUI();
                Toast.show('数据已清除', 'success');
            }
        });
    },

    switchTab(tabName) {
        // 更新导航按钮状态
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // 切换标签页内容
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    },

    loadInitialData() {
        // 如果没有仓库，添加一些示例仓库
        if (AppState.repos.length === 0) {
            const exampleRepos = [
                'facebook/react',
                'vuejs/vue',
                'microsoft/vscode',
                'nodejs/node',
                'golang/go'
            ];

            exampleRepos.forEach(repo => {
                AppState.repos.push(DataGenerator.generateRepoData(repo));
            });
            Storage.save();
        }

        // 生成更新数据
        AppState.updates = DataGenerator.generateRepoUpdates(AppState.repos);

        // 生成CVE数据
        AppState.cves = DataGenerator.generateCVEData();

        // 渲染UI
        this.refreshUI();
    },

    refreshUI() {
        Renderer.renderStats();
        Renderer.renderRepoList();
        Renderer.renderUpdates('repoUpdates');
        Renderer.renderUpdates('dashboardGithubUpdates', 5);
        Renderer.renderCVEList('cveList');
        Renderer.renderCVEList('dashboardCveList', 5);
    },

    addRepo() {
        const input = document.getElementById('repoInput');
        const repoName = input.value.trim();

        if (!repoName) {
            Toast.show('请输入仓库地址', 'error');
            return;
        }

        // 验证格式
        if (!repoName.match(/^[\w-]+\/[\w-]+$/)) {
            Toast.show('仓库地址格式不正确，请使用 owner/repo 格式', 'error');
            return;
        }

        // 检查是否已存在
        if (AppState.repos.some(repo => repo.fullName === repoName)) {
            Toast.show('该仓库已订阅', 'error');
            return;
        }

        // 添加仓库
        const newRepo = DataGenerator.generateRepoData(repoName);
        AppState.repos.push(newRepo);
        Storage.save();

        // 生成新的更新
        const newUpdates = DataGenerator.generateRepoUpdates([newRepo]);
        AppState.updates = [...newUpdates, ...AppState.updates];

        // 清空输入框
        input.value = '';
        document.getElementById('addRepoForm').classList.add('hidden');

        // 刷新UI
        this.refreshUI();
        Toast.show(`成功订阅 ${repoName}`, 'success');
    },

    deleteRepo(fullName) {
        if (!confirm(`确定要取消订阅 ${fullName} 吗？`)) {
            return;
        }

        AppState.repos = AppState.repos.filter(repo => repo.fullName !== fullName);
        AppState.updates = AppState.updates.filter(update => update.repo !== fullName);
        Storage.save();

        this.refreshUI();
        Toast.show(`已取消订阅 ${fullName}`, 'success');
    },

    refreshRepo(fullName) {
        Toast.show(`正在刷新 ${fullName}...`, 'success');
        // 在实际应用中，这里会调用真实的 GitHub API
        setTimeout(() => {
            Toast.show(`${fullName} 已更新`, 'success');
        }, 1000);
    },

    refreshData() {
        const btn = document.getElementById('refreshBtn');
        btn.classList.add('spinning');

        Toast.show('正在刷新数据...', 'success');

        setTimeout(() => {
            // 重新生成数据
            AppState.updates = DataGenerator.generateRepoUpdates(AppState.repos);
            AppState.cves = DataGenerator.generateCVEData();

            this.refreshUI();
            btn.classList.remove('spinning');
            Toast.show('数据已更新', 'success');
        }, 1500);
    },

    toggleAutoRefresh() {
        if (AppState.refreshTimer) {
            clearInterval(AppState.refreshTimer);
            AppState.refreshTimer = null;
        }

        if (AppState.settings.autoRefresh) {
            AppState.refreshTimer = setInterval(() => {
                this.refreshData();
            }, AppState.settings.refreshInterval);
            Toast.show(`已启用自动刷新 (${AppState.settings.refreshInterval / 1000}秒)`, 'success');
        }
    },

    applySettings() {
        document.getElementById('refreshInterval').value = AppState.settings.refreshInterval;
        document.getElementById('aiLanguage').value = AppState.settings.aiLanguage;
        document.getElementById('notificationEnabled').checked = AppState.settings.notificationEnabled;
        document.getElementById('autoRefresh').checked = AppState.settings.autoRefresh;

        if (AppState.settings.autoRefresh) {
            this.toggleAutoRefresh();
        }
    },

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    Toast.show('通知权限已授予', 'success');
                    new Notification('PepoWatch', {
                        body: '您将收到重要的安全更新通知',
                        icon: '/favicon.ico'
                    });
                }
            });
        }
    }
};

// 全局函数（供HTML调用）
function switchTab(tabName) {
    App.switchTab(tabName);
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
