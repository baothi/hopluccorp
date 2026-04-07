(function($) {
    'use strict';

    var LANGS = [
        {code: 'vi', label: 'Tiếng Việt'},
        {code: 'en', label: 'English'},
        {code: 'zh_hans', label: '中文'},
        {code: 'ko', label: '한국어'}
    ];
    var SUFFIXES = LANGS.map(function(l) { return '_' + l.code; });

    function initLanguageTabs() {
        var langRows = {};
        LANGS.forEach(function(l) { langRows[l.code] = []; });

        // Scan all form rows for translation fields
        $('.form-row').each(function() {
            var $row = $(this);
            var classes = ($row.attr('class') || '').split(/\s+/);
            var matched = false;

            for (var c = 0; c < classes.length && !matched; c++) {
                var cls = classes[c];
                if (cls.indexOf('field-') !== 0) continue;

                for (var i = 0; i < SUFFIXES.length; i++) {
                    if (cls.length > SUFFIXES[i].length && cls.slice(-SUFFIXES[i].length) === SUFFIXES[i]) {
                        langRows[LANGS[i].code].push($row);
                        matched = true;
                        break;
                    }
                }
            }
        });

        // If no translation fields found, exit
        var total = 0;
        LANGS.forEach(function(l) { total += langRows[l.code].length; });
        if (total === 0) return;

        // Hide original (non-suffixed) fields that have translations
        // e.g., hide .field-title if .field-title_vi exists
        var baseFields = {};
        LANGS.forEach(function(lang) {
            langRows[lang.code].forEach(function($row) {
                var classes = ($row.attr('class') || '').split(/\s+/);
                classes.forEach(function(cls) {
                    if (cls.indexOf('field-') === 0) {
                        var suffix = '_' + lang.code;
                        if (cls.slice(-suffix.length) === suffix) {
                            var baseName = cls.slice(0, -suffix.length);
                            baseFields[baseName] = true;
                        }
                    }
                });
            });
        });
        Object.keys(baseFields).forEach(function(baseCls) {
            $('.form-row.' + baseCls).not('[class*="_"]').each(function() {
                var isTranslation = false;
                SUFFIXES.forEach(function(s) {
                    if ($(this).attr('class').indexOf(baseCls + s) > -1) isTranslation = true;
                }.bind(this));
                if (!isTranslation) $(this).hide();
            });
        });

        // Create tab bar
        var $tabBar = $('<div class="lang-tabs-bar"></div>');
        LANGS.forEach(function(lang, i) {
            var $btn = $('<button type="button" class="lang-tab"></button>')
                .text(lang.label)
                .attr('data-lang', lang.code);
            if (i === 0) $btn.addClass('active');
            $tabBar.append($btn);
        });

        // Insert before first fieldset/module
        var $target = $('fieldset:first, .module:first').first();
        if ($target.length) {
            $target.before($tabBar);
        }

        // Switch language
        function switchLang(code) {
            LANGS.forEach(function(lang) {
                var show = (lang.code === code);
                langRows[lang.code].forEach(function($row) {
                    $row.toggle(show);
                });
            });
        }

        // Tab click
        $tabBar.on('click', '.lang-tab', function(e) {
            e.preventDefault();
            $tabBar.find('.lang-tab').removeClass('active');
            $(this).addClass('active');
            switchLang($(this).data('lang'));
        });

        // Initialize — show Vietnamese by default
        switchLang('vi');
    }

    $(document).ready(initLanguageTabs);
})(django.jQuery);
