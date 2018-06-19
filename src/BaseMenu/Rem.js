export const  RemYdui = function(){
    /* 设计图文档宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* 添加倍屏标识，安卓倍屏为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
export const TransformTime  = function (timestamp) {
        var timestamp = timestamp;
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var year = d.getFullYear();
        var Month = d.getMonth() + 1;
        if (Month.toString().length < 2) {
            Month = '0' + Month;
        }
        var datas = d.getDate();
        if (datas.toString().length < 2) {
            datas = '0' + datas;
        }
        var hour = d.getHours();
        if (hour.toString().length < 2) {
            hour = '0' + hour;
        }
        var minute = d.getMinutes();
        if (minute.toString().length < 2) {
            minute = '0' + minute;
        }
        var times = year + '-' + Month + '-' + datas + ' ' + hour + ':' + minute;
        return times;

}