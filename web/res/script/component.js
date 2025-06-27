// 标签页切换
$(document).on('click', '.tabpage-nav .tabpage-nav-item:not(.disabled)', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const navid = $(this).parent().data('navid');
    const pageid = $(this).data('pageid');
    // console.log($(`.tabpage-centent[data-navid="${navid}"] .tabpage-panel`));
    // document.startViewTransition(() => {});
    $(`.tabpage-centent[data-navid="${navid}"]>.tabpage-panel`).addClass('hidden');
    $(`.tabpage-centent[data-navid="${navid}"]>.tabpage-panel[data-pageid="${pageid}"]`).removeClass('hidden');
});

$(document).on('click', '.select-button .button:not([aria-selected="true"])', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
});

// 获取滚动条宽度
function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // 强制显示滚动条
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    outer.style.width = '100px';

    document.body.appendChild(outer);

    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

$(document).ready(calcElementSize);
$(window).resize(calcElementSize);

function calcElementSize() {
    $('body').css('--calc-height-title-bar', $('.title-bar').height() + 'px');
    $('body').css('--calc-scroll-bar-size', getScrollbarWidth() + 'px');
}