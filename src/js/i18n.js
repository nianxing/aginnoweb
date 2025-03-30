// 语言配置
const languages = {
    'zh': '中文',
    'en': 'English'
};

// 翻译内容
const translations = {
    zh: {},  // 中文翻译将从单独的文件加载
    en: {}   // 英文翻译将从单独的文件加载
};

class I18n {
    constructor() {
        this.currentLang = 'en';
        this.loadTranslations();
        this.detectLanguage();
        this.initializeLanguageSelector();
    }

    // 初始化语言选择器
    initializeLanguageSelector() {
        document.addEventListener('DOMContentLoaded', () => {
            const languageSelector = document.getElementById('language-selector');
            if (languageSelector) {
                languageSelector.value = this.currentLang;
                
                // 直接给语言选择器添加事件监听
                languageSelector.addEventListener('change', (event) => {
                    console.log('Language change event triggered:', event.target.value);
                    this.setLanguage(event.target.value);
                });
                
                console.log('Language selector initialized with language:', this.currentLang);
            } else {
                console.error('Language selector element not found');
            }
        });
    }

    // 加载翻译文件
    async loadTranslations() {
        try {
            // 使用相对路径加载翻译文件
            const zhResponse = await fetch('js/translations/zh.json');
            const enResponse = await fetch('js/translations/en.json');
            
            if (!zhResponse.ok || !enResponse.ok) {
                throw new Error('Failed to fetch translation files');
            }
            
            translations.zh = await zhResponse.json();
            translations.en = await enResponse.json();
            console.log('Translations loaded successfully');
            this.translate();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    // 检测用户语言
    async detectLanguage() {
        try {
            // 先尝试从localStorage读取语言设置
            const savedLang = localStorage.getItem('preferred_language');
            if (savedLang && savedLang in languages) {
                this.setLanguage(savedLang);
                return;
            }
            
            // 使用浏览器语言设置
            const browserLang = navigator.language.toLowerCase().split('-')[0];
            this.setLanguage(browserLang in languages ? browserLang : 'en');
        } catch (error) {
            console.error('Error detecting language:', error);
            this.setLanguage('en');
        }
    }

    // 设置语言
    setLanguage(lang) {
        if (lang in languages) {
            this.currentLang = lang;
            document.documentElement.setAttribute('lang', lang);
            localStorage.setItem('preferred_language', lang);
            this.translate();
            this.updateLanguageSelector();
            console.log('Language switched to:', lang);
        }
    }

    // 翻译页面
    translate() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[this.currentLang] && translations[this.currentLang][key]) {
                // 处理HTML内容
                if (element.hasAttribute('data-i18n-html')) {
                    element.innerHTML = translations[this.currentLang][key];
                } else {
                    element.textContent = translations[this.currentLang][key];
                }
            }
        });
    }

    // 更新语言选择器
    updateLanguageSelector() {
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = this.currentLang;
        }
    }
}

// 创建全局实例
window.i18n = new I18n();

// 为了确保即使在非模块环境中也能工作
if (typeof exports !== 'undefined') {
    exports.i18n = window.i18n;
} 