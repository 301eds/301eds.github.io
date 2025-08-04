// 语言切换功能
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'zh';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setLanguage(this.currentLang);
    }

    bindEvents() {
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // 更新按钮状态
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // 更新所有需要翻译的元素
        const elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(el => {
            const text = el.dataset[lang];
            if (el.tagName === 'INPUT') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        });
    }
}

// 主题切换功能
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        document.documentElement.setAttribute('data-theme', theme);
        
        // 更新图标
        const sunIcon = document.querySelector('.fa-sun');
        const moonIcon = document.querySelector('.fa-moon');
        
        if (theme === 'dark') {
            sunIcon.style.opacity = '0.5';
            moonIcon.style.opacity = '1';
        } else {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0.5';
        }
    }
}

// 平滑滚动功能
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // 为所有section添加平滑滚动
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new ThemeManager();
    new SmoothScroll();

    // 添加一些交互效果
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 社交媒体链接管理
class SocialMediaManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindSocialEvents();
        this.bindQREvents();
    }

    bindSocialEvents() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.dataset.platform;
                this.handleSocialClick(platform, link);
            });

            // 添加触摸支持
            link.addEventListener('touchstart', () => {
                link.style.transform = 'scale(0.95)';
            });
            link.addEventListener('touchend', () => {
                link.style.transform = 'scale(1)';
            });
        });
    }

    bindQREvents() {
        const qrPlaceholder = document.querySelector('.qr-placeholder');
        if (qrPlaceholder) {
            qrPlaceholder.addEventListener('click', () => {
                this.showQRUploadHint();
            });
        }
    }

    handleSocialClick(platform, link) {
        // 这里可以设置实际的社交媒体链接
        const socialUrls = {
            bilibili: 'https://space.bilibili.com/[???]',
            douyin: 'https://www.douyin.com/user/[???]',
            weibo: 'https://weibo.com/[???]',
            github: 'https://github.com/[???]'
        };

        // 显示提示或跳转到链接
        if (link.href === '#' || link.href.endsWith('/#')) {
            this.showSocialHint(platform, socialUrls[platform]);
        } else {
            window.open(link.href, '_blank', 'noopener,noreferrer');
        }
    }

    showSocialHint(platform, placeholderUrl) {
        const tooltip = document.createElement('div');
        tooltip.innerHTML = `
            <div style="text-align: center;">
                <strong>${this.getPlatformName(platform)}</strong><br>
                <small>建设中</small><br>
                <code style="font-size: 0.8em;">${placeholderUrl}</code>
            </div>
        `;
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--card-bg);
            color: var(--text-color);
            padding: 20px;
            border-radius: 10px;
            z-index: 1001;
            box-shadow: var(--hover-shadow);
            border: 1px solid var(--border-color);
            max-width: 300px;
            font-size: 14px;
        `;
        document.body.appendChild(tooltip);
        
        // 点击任意位置关闭
        setTimeout(() => {
            const closeTooltip = (e) => {
                if (!tooltip.contains(e.target)) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            };
            document.addEventListener('click', closeTooltip);
        }, 100);
    }

    showQRUploadHint() {
        const tooltip = document.createElement('div');
        tooltip.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-info-circle" style="font-size: 2rem; color: var(--secondary-color); margin-bottom: 10px;"></i><br>
                <strong data-zh="二维码上传" data-en="QR Code Upload">二维码上传</strong><br>
                <span data-zh="替换此区域为您的微信公众号二维码" data-en="Replace this area with your WeChat QR code">替换此区域为您的微信公众号二维码</span>
            </div>
        `;
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--card-bg);
            color: var(--text-color);
            padding: 20px;
            border-radius: 10px;
            z-index: 1001;
            box-shadow: var(--hover-shadow);
            border: 1px solid var(--border-color);
            max-width: 250px;
            font-size: 14px;
        `;
        document.body.appendChild(tooltip);
        
        setTimeout(() => tooltip.remove(), 3000);
    }

    getPlatformName(platform) {
        const names = {
            bilibili: '哔哩哔哩',
            douyin: '抖音',
            weibo: '微博',
            github: 'GitHub'
        };
        return names[platform] || platform;
    }
}

// 添加一些实用的功能
function copyToClipboard(text) {
    const lang = localStorage.getItem('language') || 'zh';
    const message = lang === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard';
    
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.createElement('div');
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-color);
            color: var(--bg-color);
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1001;
            font-size: 14px;
        `;
        document.body.appendChild(tooltip);
        setTimeout(() => tooltip.remove(), 2000);
    });
}

// 移动端优化
class MobileOptimization {
    constructor() {
        this.init();
    }

    init() {
        this.handleViewport();
        this.preventZoom();
        this.addTouchFeedback();
    }

    handleViewport() {
        // 确保viewport设置正确
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(meta);
        }
    }

    preventZoom() {
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    addTouchFeedback() {
        const touchElements = document.querySelectorAll('.service-card, .job-card, .social-link');
        touchElements.forEach(element => {
            element.style.webkitTapHighlightColor = 'transparent';
            
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            });
        });
    }
}

// 为邮箱地址和微信号添加点击复制功能
document.addEventListener('DOMContentLoaded', () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.href.replace('mailto:', '');
            copyToClipboard(email);
        });
    });
    
    const copyElements = document.querySelectorAll('.copy-text');
    copyElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.title = '点击复制';
        element.addEventListener('click', () => {
            const text = element.dataset.text || element.textContent;
            copyToClipboard(text);
        });
    });
});

// 页面加载完成后初始化所有新功能
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new ThemeManager();
    new SmoothScroll();
    new SocialMediaManager();
    new MobileOptimization();

    // 添加卡片悬停效果
    const interactiveElements = document.querySelectorAll('.service-card, .job-card, .social-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-3px) scale(1.02)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
});