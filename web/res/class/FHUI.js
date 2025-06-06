/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class FHUINotice {
    constructor() {}

    static notice(message = '', title = '', type = 'info', data = {}) {
        const themes = {
            info: {
                icon: 'material:information',
                color: 'general'
            },
            success: {
                icon: 'material:check',
                color: 'safe'
            },
            alert: {
                icon: 'material:alert',
                color: 'warn'
            },
            warn: {
                icon: 'material:alert',
                color: 'warn'
            },
            error: {
                icon: 'material:close',
                color: 'danger'
            },
            fatal: {
                icon: 'material:alert-octagon',
                color: 'danger'
            },
            experimental: {
                icon: 'material:test-tube',
                color: 'special'
            },
            trophy: {
                icon: 'material:trophy',
                color: 'general'
            },
            tips: {
                icon: 'material:lightbulb-on',
                color: 'general'
            }
        };
        let theme = themes[type];
        if (theme === undefined) {
            theme = {
                icon: 'material:information',
                color: 'general'
            };
        }

        data = {
            animation: true,
            hasClick: false,
            icon: theme.icon,
            id: undefined,
            index: -1,
            waitTime: undefined,
            width: undefined,
            ...data
        };
        let iconDOM = Icon.getIcon(data.icon) !== undefined ? Icon.getIcon(data.icon) : Icon.getIcon('material:information');

        return `<div
                class="
                    fh-notice-item
                    fh-${ theme.color }
                    ${ data.animation ? 'fh-notice-ani-in' : '' }
                    ${ data.waitTime < 0 ? 'is-permanently' : '' }
                    ${ data.hasClick ? 'has-click' : '' }
                "
                data-index="${ data.index }"
                ${ data.id ? `data-id="${ data.id }"` : '' }
                style="${ data?.width !== undefined ? `--fh-notice-width-custom: ${ data.width };` : '' }"
            >
            <div class="fh-notice-item-container">
                <div class="fh-notice-item-content">
                    <div class="fh-notice-item-content-icon">
                        ${ iconDOM }
                    </div>
                    <div class="fh-notice-item-content-message">
                        ${ title !== '' ? `<div class="title">${ title }</div>` : '' }
                        <div class="message">${ message }</div>
                    </div>
                </div>
                <div class="fh-notice-item-bg"></div>
            </div>
        </div>`;
    }
}