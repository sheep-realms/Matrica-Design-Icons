/* ============================================================
 * Matrica Design Icons
 * Github: https://github.com/sheep-realms/Matrica-Design-Icons
 * License: GNU General Public License 3.0
 * ============================================================
 */


"use strict";

const matrica = new Matrica();

const notice = new SystemNotice();

let debunceTimer = null;
let debunceTimerInside = null;

const debunceTimerDetail = {
    duration_min: 300,
    duration_max: 1000,
    growth_factor: 50,
    stack: 0
};

let iconList = matrica.icons;
let currentCount = 0;
let AllIconHasShow = false;

let lastSearch = '';

const navItem = [
    'agriculture',
    'card',
    'code',
    'edit',
    {
        name: 'file',
        tag: 'file,folder'
    },
    {
        name: 'food',
        tag: 'food,drink'
    },
    'mob',
    'player',
    'ticket',
    'view'
];

function getIconList(offset = 0, limit = 100) {
    if (AllIconHasShow) return [];
    if (iconList.length === 0) return [];
    if (offset >= iconList.length) {
        if (AllIconHasShow) return [];
        AllIconHasShow = true;
        $('#icon-list-bottom').addClass('hidden');
        return [];
    }
    const end = Math.min(offset + limit, iconList.length);
    const currentIcons = iconList.slice(offset, end);
    $('#icon-list').append(MatricaComponent.iconBoxList(currentIcons));
    currentCount += currentIcons.length;
}

function resetIconList() {
    $('#icon-list').removeClass('waiting');
    $('#icon-list').html('');
    $('#icon-list-bottom').removeClass('hidden');
    AllIconHasShow = false;
    currentCount = 0;
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
    observer.unobserve(document.getElementById('icon-list-bottom'));
    getIconList(0);
    observer.observe(document.getElementById('icon-list-bottom'));
}

// 防抖
function debunce(func) {
    return function(...args) {
        interruptDebunce();
        const delay = getDebunceDuration();
        debunceTimer = setTimeout(() => func.apply(this, args), delay);
        debunceTimerInside = setTimeout(() => resetDubunce(), delay);
    };
}

function getDebunceDuration() {
    return Math.min(
        debunceTimerDetail.duration_min + (debunceTimerDetail.growth_factor * debunceTimerDetail.stack),
        debunceTimerDetail.duration_max
    );
}

function interruptDebunce() {
    clearTimeout(debunceTimer);
    clearTimeout(debunceTimerInside);
    debunceTimerDetail.stack++;
}

function resetDubunce() {
    debunceTimerDetail.stack = 0;
}

$(document).ready(function() {
    getIconList(0);
    observer.observe(document.getElementById('icon-list-bottom'));

    $('#version-tag').text('v' + APP_META.version);

    // 初始化语言选项
    const language = localStorageManager.getItem('config').language;
    const languageIndex = translator.langIndex;
    for (const lang of languageIndex) {
        $('#select-language').append(`<option value="${lang.code}">${lang.title}</option>`);
    }
    setTimeout(() => $('#select-language').val(language), 1);

    translator.ready(() => {
        $('nav').html(MatricaComponent.nav(navItem));
        $('body').append(MatricaComponent.iconDetailDialog());
    });
    
    setTimeout(() => {
        $('#nav-loading').text($t('notice.nav_loading_timeout', {}, 'The navigation took too much time to load, click here to reload!'));
    }, 1500);

    $('#search-view').html(MatricaComponent.searchViewSelect());
});

$(document).on('click', '#search-view-select button', function() {
    $('#icon-list').removeClass('view-compact-1 view-compact-2 view-compact-3');
    $('#icon-list').addClass('view-compact-' + $(this).data('view'));
});

$(document).on('click', '#nav-loading', function() {
    $('nav').html(MatricaComponent.nav(navItem));
});


$(document).on('input', '#icon-search-input', function() {
    $('#icon-list').addClass('waiting');
    debunce(() => {
        const searchValue = $(this).val().trim();
        if (lastSearch === searchValue) return $('#icon-list').removeClass('waiting');;
        lastSearch = searchValue;
        iconList = matrica.search(searchValue);
        resetIconList();
    })();
});

function setSearchTag(tag) {
    let search = $('#icon-search-input').val().replace(DataFilter.REGEXP_CONDITION, '').trim();
    const tags = tag.split(',');
    if (tags.length > 1) {
        $('#icon-search-input').val(`tag:(${ tag }) ${ search }`);
    } else {
        $('#icon-search-input').val(`tag:${ tag } ${ search }`);
    }
    $('#icon-search-input').trigger('input');
}

$(document).on('click', '.icon-nav-item', function() {
    const tagName = $(this).data('tag');
    setSearchTag(tagName);
});

$(document).on('click', '.icon-detail-dialog-tag', function() {
    const tagName = $(this).data('tag');
    setSearchTag(tagName);
    closeIconDetailDialog();
});

$(document).on('input', '#select-language', function() {
    const lang = $(this).val();
    const config = localStorageManager.getItem('config');
    config.language = lang;
    localStorageManager.setItem('config', config);
    location.reload();
});

$(document).on('click', '.icon-box', function() {
    const unicode = $(this).data('icon-unicode');
    const file = $(this).data('icon-file');
    openIconDetailDialog(file, unicode);
});

$(document).on('click', '.input-copy-button-component .copy-button', function() {
    const text = $(this).parent().children('input').eq(0).val();
    setClipboard(text);
});

$(document).on('click', '#icon-unicode-info', function() {
    const text = $(this).text().trim();
    setClipboard('\\u' + text);
});

$(document).on('click', '#icon-font-name-info', function() {
    const text = $(this).text().trim();
    setClipboard(text);
});

$(document).on('click', '#icon-detail-dialog-close', function() {
    closeIconDetailDialog();
});

$(document).on('mousedown', '#icon-detail-dialog-mask', function(e) {
    if (e.target !== this) return;
    closeIconDetailDialog();
});

function closeIconDetailDialog() {
    $('#icon-detail-dialog-mask').addClass('hidden');
    $('body').removeClass('disable-scroll');
}

function openIconDetailDialog(file, unicode) {
    const iconData = matrica.getIconByFileAndUnicode(file, unicode);
    if (!iconData) return;

    const textComponent = `{"text":"\\u${ iconData.unicode }","font":"matrica:${ iconData.font_name }"}`;
    const tellrawCommand = `/tellraw @a [${ textComponent },{"text":"Hello, world!","font":"minecraft:default"}]`;

    $('#icon-detail-dialog-title').text(iconData.name);
    $('#icon-added-version-info').text($t('detail.added_version', { ver: iconData.added_version }));
    $('#icon-preview-image').css('--icon-pos-x', iconData.pos.x);
    $('#icon-preview-image').css('--icon-pos-y', iconData.pos.y);
    $('#icon-preview-image').css('background-image', `url(assets/matrica/textures/font/${ iconData.file })`);
    $('#output-text-component').val(textComponent);
    $('#output-tellraw-command').val(tellrawCommand);
    $('#icon-unicode-info .title').text(iconData.unicode);
    $('#icon-font-name-info .title').text('matrica:' + iconData.font_name);
    if (iconData.tags) $('#icon-detail-dialog-tag-list').html(MatricaComponent.iconDetailDialogTagList(iconData.tags));
    if (iconData.alias) $('#icon-detail-dialog-tag-list').append(MatricaComponent.iconDetailDialogAliasList(iconData.alias));

    $('#icon-detail-dialog-mask').removeClass('hidden');
    $('body').addClass('disable-scroll');
}

function setClipboard(text) {
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
        () => {
            notice.sendT('notice.copy_success', {}, 'success');
        },
        () => {
            notice.sendT('notice.copy_fail', {}, 'error');
        }
    );
}


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            getIconList(currentCount);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0
});