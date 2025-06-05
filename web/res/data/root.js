echoLiveSystem.registry.init([
    {
        name: 'auto_tag',
        unique_key: 'name',
        default_data: {
            name: 'missingno'
        }
    }, {
        name: 'icon',
        unique_key: 'name',
        default_data: {
            name: 'missingno',
            content: ''
        }
    }, {
        name: 'language',
        unique_key: 'lang.code_iso_639_3',
        default_data: {
            lang: {
                code_iso_639_3: 'zho-Hans',
                code_ietf: 'zh-Hans',
                title: 'missingno'
            }
        }
    }, {
        name: 'language_index',
        unique_key: 'code',
        default_data: {
            code: 'zho-Hans',
            code_ietf: 'zh-Hans',
            title: 'missingno',
            url: 'missingno.js'
        }
    }, {
        name: 'system'
    }, {
        name: 'texture_set',
        unique_key: 'file',
        default_data: {
            file: 'missingno.png',
            unicode_prefix: 'e0',
            added_version: '0.0.0',
            width: 256,
            height: 256,
            char_x_count: 16,
            char_y_count: 16,
            chars: {}
        }
    }
]);