
// toggle
const tog = document.getElementById('toggle');
const code = document.querySelector('.editor-pane');
const prev = document.querySelector('.preview-pane');
const edit = document.querySelector('.editor');

tog.addEventListener('click', () => {
  code.classList.toggle('hide');  // Toggle the .hide class on the .editor-pane
  prev.classList.toggle('full');  // Toggle the .full class on the .preview-pane
  edit.classList.toggle('flex');
});

// Code content for each tab
const codeSamples = {
  html: `<div class="slider-container">
  <div class="slider">
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Mountain Landscape" class="slide active" />
    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" alt="Forest Pathway" class="slide" />
    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" class="slide" />
  </div>
  <button class="prev">&#10094;</button>
  <button class="next">&#10095;</button>
</div>`,
  css: `.slider-container {
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto;
position: relative;
max-height: 450px;
max-width: 800px;
overflow: hidden;
border-radius: 10px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.slider {
display: flex;
}
.slide {
min-width: 100%;
display: none;
}
.slide.active {
display: block;
}
.prev, .next {
position: absolute;
top: 50%;
transform: translateY(-50%);
background-color: rgba(0,0,0,0.5);
color: #fff;
border: none;
padding: 12px;
cursor: pointer;
font-size: 24px;
z-index: 2;
border-radius: 50%;
}
.prev:hover, .next:hover {
background-color: rgba(0,0,0,0.8);
}
.prev {
left: 10px;
}
.next {
right: 10px;
}`,
  js: `let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

setInterval(nextSlide, 20000);`
};

let currentLang = "html";

// Initialize CodeMirror editor as READ-ONLY
const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: "htmlmixed",  // Set the default mode to HTML
  theme: "dracula",
  readOnly: true  // 👈 make editor read-only
});

// Set the initial content for the editor
editor.setValue(codeSamples[currentLang]);

// Make CodeMirror editor fill the container
editor.setSize("100%", "100%");

// If the window resizes, make sure CodeMirror resizes as well
window.addEventListener("resize", () => {
  editor.setSize("100%", "100%");
});

// Update the preview pane
function updatePreview() {
  const container = document.querySelector(".preview");

  // Remove old iframe
  container.innerHTML = "";  // Clear container

  // Create new iframe
  const newIframe = document.createElement("iframe");
  newIframe.id = "preview";
  newIframe.setAttribute("sandbox", "allow-scripts allow-same-origin");  // safer

  container.appendChild(newIframe);

  const previewDoc = newIframe.contentDocument || newIframe.contentWindow.document;
  const html = codeSamples.html || "";
  const css = `<style id="live-styles">${codeSamples.css || ""}</style>`;
  const js = `<script id="live-script">${codeSamples.js || ""}<\/script>`;

  previewDoc.open();
  previewDoc.write(`${html}${css}${js}`);
  previewDoc.close();
}

// Tab click logic
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    editor.setOption("mode", currentLang === "js" ? "javascript" : currentLang === "css" ? "css" : "htmlmixed");
    editor.setValue(codeSamples[currentLang]);
  });
});

// Initialize preview on load
updatePreview();


// copy function



document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const container = button.closest('.code-container');
      const lines = container.querySelectorAll('.line');

      // Extract content inside .line-code, or fallback to line text if missing
      const codeText = Array.from(lines)
        .map(line => {
          const codeSpan = line.querySelector('.line-code');
          return codeSpan ? codeSpan.textContent : line.textContent;
        })
        .join('\n');

      navigator.clipboard.writeText(codeText.trim()).then(() => {
        const original = button.textContent;
        button.textContent = 'Copied ✓';
        button.disabled = true;
        setTimeout(() => {
          button.textContent = original;
          button.disabled = false;
        }, 1500);
      }).catch(err => {
        console.error('Copy failed', err);
      });
    });
  });
});








// Second editor toggle
const tog2 = document.getElementById('toggle2'); // For the second editor's toggle button
const code2 = document.querySelector('.editor-pane2'); // For the second editor's code pane
const prev2 = document.querySelector('.preview-pane2'); // For the second preview pane
const edit2 = document.querySelector('.editor2'); // For the second editor

tog2.addEventListener('click', () => {
    code2.classList.toggle('hide2');  // Toggle the .hide2 class on the second editor's .editor-pane
    prev2.classList.toggle('full2');  // Toggle the .full2 class on the second editor's .preview-pane
    edit2.classList.toggle('flex2');
});

// Code content for each tab (same content for the second editor, if needed)
const codeSamples2 = {
    html: `<div class="slider-container">
  <div class="slider">
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Mountain Landscape" class="slide active" />
    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" alt="Forest Pathway" class="slide" />
    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" class="slide" />
  </div>
  <button class="prev">&#10094;</button>
  <button class="next">&#10095;</button>
</div>`,
    css: `.slider-container {
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto;
position: relative;
max-height: 450px;
max-width: 800px;
overflow: hidden;
border-radius: 10px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.slider {
display: flex;
position: relative;
}
.slide {
min-width: 100%;
opacity: 0;
position: absolute;
transition: opacity 1s ease-in-out;
}
.slide.active {
opacity: 1;
position: relative;
z-index: 1;
}
.prev, .next {
position: absolute;
top: 50%;
transform: translateY(-50%);
background-color: rgba(0,0,0,0.5);
color: #fff;
border: none;
padding: 12px;
cursor: pointer;
font-size: 24px;
z-index: 2;
border-radius: 50%;
}
.prev:hover, .next:hover {
background-color: rgba(0,0,0,0.8);
}
.prev {
left: 10px;
}
.next {
right: 10px;
}`,
    js: `let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

setInterval(nextSlide, 20000);`
};

// Second editor setup
let currentLang2 = "html";  // Default language for second editor
const previewFrame2 = document.getElementById("preview2");

// Initialize CodeMirror for the second editor
const editor2 = CodeMirror.fromTextArea(document.getElementById("code2"), {
    lineNumbers: true,
    mode: "htmlmixed",  // Set the default mode to HTML
    theme: "dracula"
});

// Set the initial content for the second editor
editor2.setValue(codeSamples2[currentLang2]);

// Make CodeMirror editor fill the container
editor2.setSize("100%", "100%");

// If the window resizes, make sure CodeMirror resizes as well
window.addEventListener("resize", () => {
    editor2.setSize("100%", "100%");
});

// Update the second preview pane
// function updatePreview2() {
//     const container2 = document.querySelector(".preview2");

//     if (currentLang2 === "html") {
//         // Remove old iframe
//         container2.innerHTML = "";  // Clear container

//         // Create new iframe
//         const newIframe = document.createElement("iframe");
//         newIframe.id = "preview2";
//         newIframe.setAttribute("sandbox", "allow-scripts allow-same-origin");  // safer

//         container2.appendChild(newIframe);

//         const previewDoc = newIframe.contentDocument || newIframe.contentWindow.document;
//         const html = codeSamples2.html || "";
//         const css = `<style id="live-styles">${codeSamples2.css || ""}</style>`;
//         const js = `<script id="live-script">${codeSamples2.js || ""}<\/script>`;

//         previewDoc.open();
//         previewDoc.write(`${html}${css}${js}`);
//         previewDoc.close();
//     } else {
//         const previewFrame2 = document.getElementById("preview2");
//         const previewDoc = previewFrame2.contentDocument || previewFrame2.contentWindow.document;

//         if (currentLang2 === "css") {
//             const styleTag = previewDoc.getElementById("live-styles");
//             if (styleTag) {
//                 styleTag.textContent = codeSamples2.css;
//             }
//         } else if (currentLang2 === "js") {
//             const oldScript = previewDoc.getElementById("live-script");
//             if (oldScript) {
//                 oldScript.remove();
//             }
//             const newScript = previewDoc.createElement("script");
//             newScript.id = "live-script";
//             newScript.textContent = codeSamples2.js;
//             previewDoc.body.appendChild(newScript);
//         }
//     }
// }


function updatePreview2() {
  const container = document.querySelector(".preview2");

  // Clear the container first
  container.innerHTML = "";

  // Create a fresh iframe
  const newIframe = document.createElement("iframe");
  newIframe.id = "preview2";
  newIframe.setAttribute("sandbox", "allow-scripts allow-same-origin");

  container.appendChild(newIframe);

  const previewDoc = newIframe.contentDocument || newIframe.contentWindow.document;
  const html = codeSamples2.html || "";
  const css = `<style>${codeSamples2.css || ""}</style>`;
  const js = `<script>${codeSamples2.js || ""}<\/script>`;

  // Inject all code at once
  previewDoc.open();
  previewDoc.write(`${html}${css}${js}`);
  previewDoc.close();
}


// Tab click logic for the second editor
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentLang2 = btn.dataset.lang;
        editor2.setOption("mode", currentLang2 === "js" ? "javascript" : currentLang2 === "css" ? "css" : "htmlmixed");
        editor2.setValue(codeSamples2[currentLang2]);
    });
});

// Run button functionality for the second editor
const runBtn2 = document.getElementById('run2');

runBtn2.addEventListener('click', () => {
    codeSamples2[currentLang2] = editor2.getValue();  // Save latest code
    updatePreview2();  // Only update when Run is clicked
});

// Initialize preview on load for the second editor
updatePreview2();



document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
