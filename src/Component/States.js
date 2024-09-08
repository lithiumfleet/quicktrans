import { ref, reactive, watch } from "vue"

export const readingFileState = reactive({
    path: "",
    content: "",
    get_content() {
        this.content = window.api.readfile(this.path)
    },
    clean() {
        this.path = ""
        this.content = ""
    }
})

export const translateState = reactive({
    srcLangContent: "",
    destLangContent: "",

    get dest() { return this.destLangContent },
    set dest(val) { this.destLangContent = val },
    get src() { return this.srcLangContent },
    set src(val) { this.srcLangContent = val },

    async translate() {
        if (this.src) {
            const { from, to } = this.autoDetect(this.src)
            this.dest = await window.translateAPI.baidutrans(this.src, from, to)
        } else {
            this.dest = ""
        }
    },

    autoDetect(content) {
        let lang = detectLanguage(content)
        let tasks = {
            en : 'zh',
            jp : 'zh',
            zh : 'en'
        }
        return { from: lang, to: tasks[lang]}
    },

    clear() {
        this.src = ""
        this.dest = ""
    }
})

function detectLanguage(text) {
    // thank you gpt :-)
    const englishWordPattern = /\b[A-Za-z]+\b/g;  // Count English words
    const chinesePattern = /[\u4E00-\u9FFF]/g;    // Count Chinese characters
    const japaneseHiraganaPattern = /[\u3040-\u309F]/g;  // Count Hiragana
    const japaneseKatakanaPattern = /[\u30A0-\u30FF]/g;  // Count Katakana
    
    const englishMatches = text.match(englishWordPattern) || [];
    const chineseMatches = text.match(chinesePattern) || [];
    const hiraganaMatches = text.match(japaneseHiraganaPattern) || [];
    const katakanaMatches = text.match(japaneseKatakanaPattern) || [];

    const counts = {
        en: englishMatches.length * 2,
        zh: chineseMatches.length,
        jp: hiraganaMatches.length + katakanaMatches.length
    };

    const dominantLanguage = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    
    return dominantLanguage;
}
