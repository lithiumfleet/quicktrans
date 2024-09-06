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
            this.dest = await window.translateAPI.baidutrans(this.src, 'auto', 'zh')
        } else {
            this.dest = ""
        }
    },

    clear() {
        this.src = ""
        this.dest = ""
    }
})