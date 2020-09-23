/**
 * DSGVO Video Embed, v1.1.0
 * (c) 2021 Arndt von Lucadou
 * MIT License
 * https://github.com/a-v-l/dsgvo-video-embed
 */

(function () {
    // Config
    var text = {
        youtube: '<strong>' + django.gettext('External Video') + '</strong>' +
             '<div>' + '<p>' + django.gettext('Here you can find a video from YouTube. To protect your data the content will only be loaded after you give your consent. Only then will YouTube set Cookies that collect information on user behaviour.') +
             '</p>' + '<p>' + django.gettext('More information can be found in the privacy policy of YouTube under: ') +
             '<a href="https://www.google.de/intl/de/policies/privacy/" rel="noopener" target="_blank">' + 'https://policies.google.com/privacy/' +
             '</a>' + '</p>' + '</div>' + '<a class="video-link" href="https://youtu.be/%id%" rel="noopener" target="_blank">' + django.gettext('Link to Video: ') + 'https://youtu.be/%id%' + '</a>' + '<button>' + django.gettext('Play video') + '</button>',
        vimeo: '<strong>' + django.gettext('External Video') + '</strong>' +
             '<div>' + '<p>' + django.gettext('Here you can find a video from Vimeo. To protect your data the content will only be loaded after you give your consent. Only then will Vimeo set Cookies that collect information on user behaviour.') +
             '</p>' + '<p>' + django.gettext('More information can be found in the privacy policy of Vimeo under: ') +
             '<a href="https://vimeo.com/privacy" rel="noopener" target="_blank">' + 'https://vimeo.com/privacy' +
             '</a>' + '</p>' + '</div>' + '<a class="video-link" href="https://vimeo.com/%id%" rel="noopener" target="_blank">' + django.gettext('Link to Video: )' + 'https://vimeo.com/%id%' + '</a>' + '<button>' + django.gettext('Play video') + '</button>'
    };
    window.video_iframes = [];
    document.addEventListener("DOMContentLoaded", function () {
        var video_frame, wall, video_platform, video_src, video_id, video_w, video_h;
        for (var i = 0, max = window.frames.length - 1; i <= max; i += 1) {
            video_frame = document.getElementsByTagName('iframe')[0];
            video_src = video_frame.src || video_frame.dataset.src;
            // Only process video iframes [youtube|vimeo]
            if (video_src.match(/youtube|vimeo/) == null) {
                continue;
            }

            video_iframes.push(video_frame);
            video_w = video_frame.getAttribute('width');
            video_h = video_frame.getAttribute('height');
            wall = document.createElement('article');

            // Prevent iframes from loading remote content
            if (!!video_frame.src) {
                if (typeof (window.frames[0].stop) === 'undefined') {
                    setTimeout(function () {
                        window.frames[0].execCommand('Stop');
                    }, 1000);
                } else {
                    setTimeout(function () {
                        window.frames[0].stop();
                    }, 1000);
                }
            }
            video_platform = video_src.match(/vimeo/) == null ? 'youtube' : 'vimeo';
            video_id = video_src.match(/(embed|video)\/([^?\s]*)/)[2];
            wall.setAttribute('class', 'video-wall');
            wall.setAttribute('data-index', i);
            if (video_w && video_h) {
                wall.setAttribute('style', 'width:' + video_w + 'px;height:' + video_h + 'px');
            }
            wall.innerHTML = text[video_platform].replace(/\%id\%/g, video_id);
            video_frame.parentNode.replaceChild(wall, video_frame);
            document.querySelectorAll('.video-wall button')[i].addEventListener('click', function () {
                var video_frame = this.parentNode,
                    index = video_frame.dataset.index;
                if (!!video_iframes[index].dataset.src) {
                    video_iframes[index].src = video_iframes[index].dataset.src;
                    video_iframes[index].removeAttribute('data-src');
                }
                video_iframes[index].src = video_iframes[index].src.replace(/www\.youtube\.com/, 'www.youtube-nocookie.com');
                video_frame.parentNode.replaceChild(video_iframes[index], video_frame);
                video_iframes[index].classList.add('ck_embed_iframe');
                video_iframes[index].parentNode.classList.add('ck_embed_iframe__container');
            }, false);
        }
    });
})();
