
// Load navbar (desktop)
fetch("navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    // Attach click listeners after navbar loads
    document.querySelectorAll("#navbar a[data-page]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        loadContent(link.getAttribute("data-page"));
      });
    });
  });

// Load portrait
fetch("portrait.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("portrait").innerHTML = html;

    // Optional reveal button inside portrait
    const reveal = document.querySelector(".reveal");
    if (reveal) {
      reveal.addEventListener("click", e => {
        e.preventDefault();
        loadContent("poem.html");
      });
    }
  });

// Load artifact
fetch("artifact.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("artifact").innerHTML = html;
  });

// Universal loader
function loadContent(file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      const content = document.getElementById("content");
      content.innerHTML = html;
      content.style.display = "block";

      // ✅ Now that content is in the DOM, run wrapping logic
      const para = document.getElementById("my-paragraph");
      if (para) {
        wrapWords(para);

        const spans = para.querySelectorAll("span");
        const totalSpans = spans.length;
        const countToTransform = Math.max(5, Math.floor(totalSpans * 0.3));

        function getRandomRotation(maxDegree = 5) {
          return (Math.random() * 2 - 1) * maxDegree;
        }

        const indexes = new Set();
        while (indexes.size < countToTransform) {
          indexes.add(Math.floor(Math.random() * totalSpans));
        }

        indexes.forEach(i => {
          spans[i].style.display = "inline-block";
          spans[i].style.transform = `rotate(${getRandomRotation()}deg)`;
        });
      }
    })
    .catch(err => console.error("Error loading file:", err));
}
// 🔹 Loader for replacing the ENTIRE container
function loadContainer(file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("container");
      container.innerHTML = html;
    })
    .catch(err => console.error("Error loading container file:", err));
}
window.addEventListener("DOMContentLoaded", () => {
  loadContent("info.html"); // change to whichever page you want as default
});


// work page
// Load navbar (desktop)
fetch("navbar-work.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-work").innerHTML = html;

    // Attach click listeners after navbar loads
    document.querySelectorAll("#navbar-work a[data-page]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        loadContent(link.getAttribute("data-page"));
      });
    });
  });

// Load portrait
fetch("portrait-work.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("portrait-work").innerHTML = html;

    
  });


$(".move").click(function () {
  $(".image").toggleClass("spin");
});

$(".draggable").draggable({
  start: function (event, ui) {
    const $el = $(this);

    // Get current visual pixel values
    const offset = $el.offset();
    const width = $el.outerWidth();

    // Convert to pixel-based layout temporarily for stable dragging
    $el.css({
      position: "absolute",
      left: offset.left + "px",
      top: offset.top + "px",
      width: width + "px",
      transform: "none",
    });
  },
});

$shape.on("mouseenter", function () {
  $poem.css("opacity", 1);
});

$shape.on("mousemove", function (e) {
  const offsetX = 15;
  const offsetY = 15;
  $poem.css({
    left: e.clientX + offsetX + "px",
    top: e.clientY + offsetY + "px",
  });
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
