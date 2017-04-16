const body = document.body;
const qs = document.querySelector.bind(document);
const create = document.createElement.bind(document);

function qsa(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function node(selector) {
    const [node, ...classes] = selector.split('.');
    const domNode = create(node);
    domNode.classList.add(...classes);
    return domNode;
}

const slidesContainer = node('div.slides-container');
const previewPanel = node('div.slides-preview');
const slides = Array.from(qsa('.slide'));

const slidesLayer = node('div.slides-layer');

slides.forEach((slide, index) => {
    const wrapper = node('div.slide-wrapper');
    wrapper.appendChild(slide);
    slidesLayer.appendChild(wrapper);
    slide.id = index;
});

slidesContainer.appendChild(slidesLayer);
slidesLayer.style.width = slides.length * 100 + '%';

body.appendChild(previewPanel);
body.appendChild(slidesContainer);

Array.from(qsa('a')).forEach(a => a.target = '_blank');

const width = body.offsetWidth;
const height = body.offsetHeight;
const widthRatio = width / height;

const slidesPreviewLayer = node('div.slides-preview-layer');
slidesPreviewLayer.style.width = slides.length * 0.2 * 100 + '%';
previewPanel.appendChild(slidesPreviewLayer);

const slidesPreviewHeight = previewPanel.offsetHeight;

slides.forEach((slide, index) => {
    const a = node('a');
    a.href = `#${index}`;
    clone = slide.cloneNode(true);
    a.style.width = `${slidesPreviewHeight * widthRatio}px`;
    clone.id = '';
    a.appendChild(clone);
    slidesPreviewLayer.appendChild(a);
});

slidesPreviewLayer.children[0].classList.add('current-slide');

let scrollTimeout;
slidesContainer.addEventListener('scroll', (e) => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
        const activeSlideIndex = Math.round(slidesContainer.scrollLeft / slidesContainer.offsetWidth);
        Array.from(slidesPreviewLayer.children).forEach(child => child.classList.remove('current-slide'));
        slidesPreviewLayer.children[activeSlideIndex].classList.add('current-slide');
    }, 50);
})

qsa('img.background').forEach(img => {
    const slide = img.parentNode;
    slide.style.backgroundImage = `url(${img.src})`;
    img.remove();
});
