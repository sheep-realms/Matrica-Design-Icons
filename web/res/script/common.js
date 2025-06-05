/* ============================================================
 * Matrica Design Icons
 * Github: https://github.com/sheep-realms/Matrica-Design-Icons
 * License: GNU General Public License 3.0
 * ============================================================
 */


"use strict";

const matrica = new Matrica();

let debunceTimer = null;

let iconList = matrica.icons;
let currentCount = 0;
let AllIconHasShow = false;

let lastSearch = '';

const navItem = [
    'card',
    'file',
    'player',
    'ticket'
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
    $('#icon-list').html('');
    $('#icon-list-bottom').removeClass('hidden');
    AllIconHasShow = false;
    currentCount = 0;
    getIconList(0);
}

function debunce(func, delay = 700) {
    return function(...args) {
        clearTimeout(debunceTimer);
        debunceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

$(document).ready(function() {
    getIconList(0);
    observer.observe(document.getElementById('icon-list-bottom'));

    $('#version-tag').text(APP_META.version);

    // 初始化语言选项
    const language = localStorageManager.getItem('config').language;
    const languageIndex = translator.langIndex;
    for (const lang of languageIndex) {
        $('#select-language').append(`<option value="${lang.code}">${lang.title}</option>`);
    }
    setTimeout(() => $('#select-language').val(language), 1);

    translator.ready(() => {
        $('nav').html(MatricaComponent.nav(navItem));
    });
    
    setTimeout(() => {
        $('#nav-loading').text($t('notice.nav_loading_timeout', {}, 'The navigation took too much time to load, click here to reload!'));
    }, 1500);
});

$(document).on('click', '#nav-loading', function() {
    $('nav').html(MatricaComponent.nav(navItem));
});


$(document).on('input', '#icon-search-input', function() {
    debunce(() => {
        const searchValue = $(this).val().trim();
        if (lastSearch === searchValue) return;
        lastSearch = searchValue;
        iconList = matrica.search(searchValue);
        resetIconList();
    })();
});

$(document).on('click', '.icon-nav-item', function() {
    const tagName = $(this).data('tag');
    let search = $('#icon-search-input').val().replace(DataFilter.REGEXP_CONDITION, '').trim();
    $('#icon-search-input').val(`tag:${ tagName } ${ search }`);
    $('#icon-search-input').trigger('input');
});

$(document).on('input', '#select-language', function() {
    const lang = $(this).val();
    const config = localStorageManager.getItem('config');
    config.language = lang;
    localStorageManager.setItem('config', config);
    location.reload();
});


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            getIconList(currentCount);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});