// An translate function should looks like: trans(q, from, to)
// When from set to 'auto' will enable detectLanguage
// When to set to 'auto' will follow the presetted 'tasks'
const { sendBaiduTrans } = require('./baiduTrans')

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

function parseTask(config, q) {
    const presettedTasks = {
        en : 'zh',
        jp : 'zh',
        zh : 'en'
    }
    const from = config.from==='auto' ? detectLanguage(q) : config.from
    const to = config.to==='auto' ? presettedTasks[from] : config.to

    return { from, to }
}

async function translate(config, q) {
    const { from, to } = parseTask(config, q)
    if (config.translateBackend==='baiduTrans' ) {
        return await sendBaiduTrans(q, from, to)
    } 
    else if (config.translateBackend==='rwkv') {
        return 'no rwkv yet :-('
    }
}

module.exports = translate

