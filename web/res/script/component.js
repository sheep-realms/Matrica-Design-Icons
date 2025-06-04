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