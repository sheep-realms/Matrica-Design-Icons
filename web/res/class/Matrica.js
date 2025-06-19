/* ============================================================
 * Matrica Design Icons
 * Github: https://github.com/sheep-realms/Matrica-Design-Icons
 * License: GNU General Public License 3.0
 * ============================================================
 */


class Matrica {
    constructor() {
        this.textureSet = [];
        this.icons = [];
        this.filterConditions = [
            {
                name: 'added_version',
                type: 'version',
                map: {
                    value: 'added_version',
                    search: 'added'
                }
            }, {
                name: 'file',
                type: 'string',
                map: {
                    value: 'file',
                    search: 'file'
                }
            }, {
                name: 'unicode',
                type: 'hex_number',
                map: {
                    value: 'unicode',
                    search: 'unicode'
                }
            }, {
                name: 'tag',
                type: 'tag',
                map: {
                    value: 'tags',
                    search: 'tag'
                }
            }, {
                name: 'main',
                type: 'string',
                map: {
                    value: [
                        'name',
                        'alias_search'
                    ]
                }
            }
        ];
        this.dataFilter = null;
        this.fastTag = [];

        this.init();
    }

    init() {
        this.fastTag = echoLiveSystem.registry.getRegistryValue('auto_tag', 'fast_tag')?.tags || [];
        this.load();
        this.dataFilter = new DataFilter('', this.filterConditions, this.icons);
    }

    load() {
        this.textureSet = echoLiveSystem.registry.getRegistry('texture_set') || [];

        this.textureSet.forEach(e => {
            for (const key in e.chars) {
                if (Object.prototype.hasOwnProperty.call(e.chars, key)) {
                    let e2 = e.chars[key];
                    if (typeof e2 === 'string') {
                        e2 = {
                            name: e2
                        };
                    }
                    if ((typeof e2 === 'object' && Array.isArray(e2)) || typeof e2 !== 'object') continue;

                    e2 = {
                        ...e2,
                        unicode: e.unicode_prefix + key,
                        file: e.file,
                        pos: {
                            x: parseInt(key.substring(1,2), 16),
                            y: parseInt(key.substring(0,1), 16)
                        },
                        added_version: e2.added_version || e.added_version,
                        font_name: e2.font_name || e.file.split('.')[0]
                    }

                    if (Array.isArray(e?.tags)) {
                        if (Array.isArray(e2?.tags)) {
                            e2.tags = [...e.tags, ...e2.tags]
                        } else {
                            e2.tags = e.tags
                        }
                    }

                    if (Array.isArray(e2?.alias)) {
                        e2.alias_search = e2.alias.join('\ue000')
                    }

                    this.icons.push(e2);
                }
            }
        });

        this.icons.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        this.fastTag.forEach(e => {
            let icons = this.filterIconByName(e, true);
            icons.forEach(e2 => {
                e2.tags = [...e2.tags, e];
            });
        });
    }

    getIconByName(name) {
        return this.icons.find(icon => icon.name === name);
    }

    filterIconByName(word, filterTag = false) {
        if (!word) return this.icons;
        if (filterTag) {
            return this.icons.filter(icon => !icon.tags.includes(word) && this.containsWholeWord(icon.name, word));
        } else {
            return this.icons.filter(icon => this.containsWholeWord(icon.name, word));
        }
    }

    getIconByFileAndUnicode(file, unicode) {
        return this.icons.find(icon => icon.file === file && icon.unicode === unicode);
    }

    getTextureSetByFileName(file) {
        return this.textureSet.find(set => set.file === file);
    }

    search(query) {
        if (!query || query.length < 1) {
            return this.icons;
        }
        return this.dataFilter.filter(query);
    }

    /**
     * 检查文本中是否包含完整的指定单词
     * @param {string} text - 要搜索的文本
     * @param {string} word - 要匹配的完整单词
     * @param {boolean} [ignoreCase=false] - 是否忽略大小写
     * @returns {boolean} - 是否匹配到完整的单词
     */
    containsWholeWord(text, word, ignoreCase = false) {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const flags = ignoreCase ? 'gi' : 'g';
        const regex = new RegExp(`\\b${escapedWord}\\b`, flags);
        return regex.test(text);
    }
}



class MatricaComponent {
    static iconBox(icon = {}, options = {}) {
        icon = {
            name: 'missingno',
            unicode: 'e000',
            file: 'missingno.png',
            pos: {
                x: 0,
                y: 0,
                ...icon.pos
            },
            ...icon
        };

        return `<button
            class="icon-box"
            data-icon-name="${icon.name}"
            data-icon-unicode="${icon.unicode}"
            data-icon-file="${icon.file}"
        >
            <div class="icon-image-box">
                <div
                    class="icon-image"
                    style="--icon-pos-x: ${icon.pos.x}; --icon-pos-y: ${icon.pos.y}; background-image: url('assets/matrica/textures/font/${icon.file}');"
                ></div>
            </div>
            <div class="icon-name">${icon.name}</div>
        </button>`;
    }

    static iconBoxList(icons = [], options = {}) {
        if (!Array.isArray(icons)) {
            icons = [icons];
        }

        return icons.map(icon => MatricaComponent.iconBox(icon, options)).join('');
    }

    static nav(navList) {
        return `<div class="icon-nav">
            ${navList.map(e => MatricaComponent.navItem(e)).join('')}
        </div>`;
    }

    static navItem(navItem) {
        if (typeof navItem === 'string') {
            navItem = {
                name: navItem,
                tag: navItem
            }
        }
        return `<button class="icon-nav-item" data-tag="${ navItem.tag }">
            <span class="icon">${ Icon.getIcon('material:tag-outline') }</span>
            <span class="title">${ $t('nav.' + navItem.name) }</span>
        </button>`;
    }

    static iconDetailDialog() {
        return `<div id="icon-detail-dialog-mask" class="hidden">
            <div id="icon-detail-dialog">
                <div class="icon-detail-dialog-header">
                    <h2 id="icon-detail-dialog-title">icon name</h2>
                    <button id="icon-detail-dialog-close" class="button button-circle button-icon-only button-danger text-regular">
                        <span class="icon">${ Icon.getIcon('material:close') }</span>
                    </button>
                </div>
                <div class="icon-detail-dialog-info-bar">
                    <div class="left">
                        <button class="button button-circle button-fill button-middle">
                            <span class="icon">${ Icon.getIcon('material:check') }</span>
                            <span id="icon-added-version-info" class="title">Added in vX.X.X</span>
                        </button>
                    </div>
                    <div class="right">
                        <button id="icon-unicode-info" class="button button-circle button-middle button-glass" style="text-transform: uppercase;">
                            <span class="title">e000</span>
                        </button>
                        <button id="icon-font-name-info" class="button button-circle button-middle button-glass">
                            <span class="title">name</span>
                        </button>
                    </div>
                </div>
                <div class="icon-detail-dialog-content">
                    <div class="image-wrapper">
                        <div class="icon-preview-wrapper">
                            <div id="icon-preview-image" class="icon-image"></div>
                        </div>
                    </div>
                    <div class="action-wrapper">
                        <div class="text-component-example-wrapper">
                            <div class="text-component-example-item">
                                <label for="output-text-component">${ $t('detail.text_component') }</label>
                                <div class="input-copy-button-component">
                                    <input type="text" id="output-text-component" class="font-mono readonly" value="" readonly>
                                    <button class="copy-button button button-icon-only button-middle text-regular">
                                        <span class="icon">${ Icon.getIcon('material:content-copy') }</span>
                                    </button>
                                </div>
                            </div>
                            <div class="text-component-example-item">
                                <label for="output-tellraw-command">${ $t('detail.tellraw_command') }</label>
                                <div class="input-copy-button-component">
                                    <input type="text" id="output-tellraw-command" class="font-mono readonly" value="" readonly>
                                    <button class="copy-button button button-icon-only button-middle text-regular">
                                        <span class="icon">${ Icon.getIcon('material:content-copy') }</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="icon-detail-dialog-tag-list"></div>
            </div>
        </div>`;
    }

    static iconDetailDialogTagList(tags) {
        return tags.map(tag => MatricaComponent.iconDetailDialogTag(tag)).join('');
    }

    static iconDetailDialogTag(tag) {
        return `<button class="icon-detail-dialog-tag button button-circle button-fill button-middle" data-tag="${ tag }">
            <span class="icon">${ Icon.getIcon('material:tag-outline') }</span>
            <span class="title">${ $t('tag.' + tag, {}, tag) }</span>
        </button>`;
    }

    static searchViewSelect() {
        return `<div id="search-view-select" class="select-button" role="tablist">
            <button class="button button-middle button-icon-only" data-view="1" role="tab" aria-selected="true"><span class="icon">${ Icon.getIcon('material:view-grid') }</span></button>
            <button class="button button-middle button-icon-only" data-view="2" role="tab" aria-selected="false"><span class="icon">${ Icon.getIcon('material:view-module') }</span></button>
            <button class="button button-middle button-icon-only" data-view="3" role="tab" aria-selected="false"><span class="icon">${ Icon.getIcon('material:view-comfy') }</span></button>
        </div>`;
    }

    static iconDetailDialogAliasList(alias) {
        return alias.map(a => MatricaComponent.iconDetailDialogAlias(a)).join('');
    }

    static iconDetailDialogAlias(alias) {
        return `<button class="icon-detail-dialog-alias button button-circle button-middle button-glass" data-tag="${ alias }">
            <span class="icon">${ Icon.getIcon('material:dots-horizontal') }</span>
            <span class="title">${ alias }</span>
        </button>`;
    }
}