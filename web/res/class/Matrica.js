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
                        'name'
                    ]
                }
            }
        ];
        this.dataFilter = null;

        this.init();
    }

    init() {
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
                        added_version: e2.added_version || e.added_version
                    }

                    if (Array.isArray(e?.tags)) {
                        if (Array.isArray(e2?.tags)) {
                            e2.tags = [...e.tags, ...e2.tags]
                        } else {
                            e2.tags = e.tags
                        }
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
    }

    getIconByName(name) {
        return this.icons.find(icon => icon.name === name);
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

    static navItem(name) {
        return `<button class="icon-nav-item" data-tag="${ name }">
            <span class="icon">${ Icon.getIcon('material:tag-outline') }</span>
            <span class="title">${ $t('nav.' + name) }</span>
        </button>`;
    }
}