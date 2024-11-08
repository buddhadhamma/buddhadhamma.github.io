// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="titlepage.html">Buddhadhamma</a></li><li class="chapter-item expanded affix "><a href="anumodana.html">Anumodanā</a></li><li class="chapter-item expanded affix "><a href="abbreviations.html">Abbreviations</a></li><li class="chapter-item expanded affix "><a href="foreword-by-ajahn-jayasaro.html">Foreword by Ven. Ajahn Jayasaro</a></li><li class="chapter-item expanded affix "><a href="foreword-by-khun-yongyuth.html">Foreword by the President of the Buddhadhamma Foundation</a></li><li class="chapter-item expanded affix "><a href="foreword-by-translator.html">Foreword by the Translator</a></li><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded "><a href="middle-teaching.html">Part 1: Middle Teaching</a></li><li class="chapter-item expanded "><a href="nature-of-human-life.html">Section 1: Nature of Human Life</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="five-aggregates.html">Ch. 1. Five Aggregates</a></li><li class="chapter-item expanded "><a href="six-sense-spheres.html">Ch. 2. Six Sense Spheres</a></li></ol></li><li class="chapter-item expanded "><a href="attributes-of-life.html">Section 2: Attributes of Life</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="three-characteristics.html">Ch. 3. Three Characteristics</a></li></ol></li><li class="chapter-item expanded "><a href="process-of-life.html">Section 3: Process of Life</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="dependent-origination.html">Ch. 4. Dependent Origination</a></li><li class="chapter-item expanded "><a href="law-of-kamma.html">Ch. 5. The Law of Kamma</a></li></ol></li><li class="chapter-item expanded "><a href="goal-of-life.html">Section 4: Goal of Life</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nibbana-supreme-peace.html">Ch. 6. Nibbāna: the Supreme Peace</a></li><li class="chapter-item expanded "><a href="awakened-beings.html">Ch. 7. Awakened Beings</a></li><li class="chapter-item expanded "><a href="calm-and-insight.html">Ch. 8. Calm and Insight</a></li></ol></li><li class="chapter-item expanded "><a href="a-noble-life.html">Section 5: A Noble Life</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="the-supernatural-and-the-divine.html">Ch. 9. The Supernatural and the Divine</a></li><li class="chapter-item expanded "><a href="the-buddhist-teachings-on-desire.html">Ch. 10. The Buddhist Teachings on Desire</a></li><li class="chapter-item expanded "><a href="happiness.html">Ch. 11. Happiness</a></li></ol></li><li class="chapter-item expanded "><a href="middle-way.html">Part 2: Middle Way</a></li><li class="chapter-item expanded "><a href="a-worthy-life.html">Section 6: A Worthy Life</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="introduction-to-the-middle-way.html">Ch. 12. Introduction to the Middle Way</a></li><li class="chapter-item expanded "><a href="virtuous-friendship.html">Ch. 13. Virtuous Friendship</a></li><li class="chapter-item expanded "><a href="faith-and-confidence.html">Ch. 14. Faith and Confidence</a></li><li class="chapter-item expanded "><a href="wise-reflection.html">Ch. 15. Wise Reflection</a></li></ol></li><li class="chapter-item expanded "><a href="path-factors.html">Section 7: Path Factors</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="path-factors-of-wisdom.html">Ch. 16. Path Factors of Wisdom</a></li><li class="chapter-item expanded "><a href="path-factors-of-virtuous-conduct.html">Ch. 17. Path Factors of Virtuous Conduct</a></li><li class="chapter-item expanded "><a href="path-factors-of-concentration.html">Ch. 18. Path Factors of Concentration</a></li><li class="chapter-item expanded "><a href="four-noble-truths.html">Ch. 19. Four Noble Truths</a></li></ol></li><li class="chapter-item expanded "><a href="appendix-citta-vinnana-mano.html">Appendix: Citta, Viññāṇa, Mano</a></li><li class="chapter-item expanded "><a href="authors-postscript.html">Author&#39;s Postscript</a></li><li class="chapter-item expanded "><a href="bibliography.html">Bibliography</a></li><li class="chapter-item expanded "><a href="p-a-payutto.html">P. A. Payutto</a></li><li class="chapter-item expanded "><a href="president-of-the-buddhadhamma-foundation.html">President of the Buddhadhamma Foundation</a></li><li class="chapter-item expanded affix "><a href="copyright.html">Copyright</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
