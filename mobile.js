// Load navbar (desktop)
fetch("navbar-mobile.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-mobile").innerHTML = html;

    // Attach click listeners after navbar loads
    document.querySelectorAll("#navbar-mobile a[data-page]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        loadContent(link.getAttribute("data-page"));
      });
    });
  });

// Load portrait
fetch("portrait-mobile.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("portrait-mobile").innerHTML = html;

 
  });

function wrapWords(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const words = node.textContent.trim().split(/\s+/);
    const wrappedWords = words.map(word => {
      return `<span>${word}</span>`;
    }).join(' ');

    const temp = document.createElement("span");
    temp.innerHTML = wrappedWords;
    node.replaceWith(...temp.childNodes);
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    node.tagName !== "A" // skip <a> tags completely
  ) {
    Array.from(node.childNodes).forEach(wrapWords);
  }
}

const para = document.getElementById("my-paragraph");
wrapWords(para);

// After wrapping, select all spans inside #my-paragraph
const spans = para.querySelectorAll("span");

// Parameters for crookedness
const totalSpans = spans.length;
const countToTransform = Math.max(5, Math.floor(totalSpans * 0.3));

function getRandomRotation(maxDegree = 5) {
  return (Math.random() * 2 - 1) * maxDegree; // -maxDegree to +maxDegree
}

// Pick unique random indexes for spans to transform
const indexes = new Set();
while (indexes.size < countToTransform) {
  indexes.add(Math.floor(Math.random() * totalSpans));
}

// Apply random rotation to selected spans
indexes.forEach(i => {
  spans[i].style.display = "inline-block"; // ensure transform works
  spans[i].style.transform = `rotate(${getRandomRotation()}deg)`;
});
