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

    get dst() { return this.destLangContent },
    set dst(val) { this.destLangContent = val },
    get src() { return this.srcLangContent },
    set src(val) { this.srcLangContent = val },

    async translate() {
        if (this.src) {
            const { from, to } = this.autoDetect(this.src)
            this.dst = await window.translateAPI.baidutrans(this.src, from, to)
        } else {
            this.dst = ""
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
        this.dst = ""
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


export const ocrZoneState = reactive({
    ocrZoneWidth: 0,
    ocrZoneHeight: 0,

    get width() { return this.ocrZoneWidth },
    set width(val) { this.ocrZoneWidth = val },
    get height() { return this.ocrZoneHeight },
    set height(val) { this.ocrZoneHeight = val },

    setWH(width, height) { 
        this.width = width
        this.height = height
    },

    update() {
        const ocrZoneElement = document.getElementById("OCRZONE")
        const dstzoneElement = document.getElementById("DSTZONE")
        this.setWH(ocrZoneElement.offsetWidth, ocrZoneElement.offsetHeight - dstzoneElement.offsetHeight)
        console.log(`set ocr wh! ${this.width} ${this.height}`)
    }

})