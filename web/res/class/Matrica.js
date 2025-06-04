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

    search(query) {
        if (!query || query.length < 1) {
            return this.icons;
        }
        return this.dataFilter.filter(query);
    }
}