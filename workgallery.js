fetch("gallery-items.html")
    .then(res => res.text())
    .then(html => {
        document.querySelector(".gallery-items").innerHTML = html;
    });
fetch("gallery-items.html")
    .then(res => res.text())
    .then(html => {
        document.querySelector(".gallery-items-mobile").innerHTML = html;
    });
///

// const isDesktop = window.matchMedia("(min-width: 600px)").matches;
// if (isDesktop) {
//     document.write('<script src="desktop.js"><\/script>');
// } else {
//     document.write('<script src="mobile.js"><\/script>');
// }
// //

window.addEventListener("DOMContentLoaded", () => {
    const isDesktop = window.matchMedia("(min-width: 820px)").matches;
    const script = document.createElement("script");
    script.src = isDesktop ? "desktop.js" : "mobile.js";
    document.body.appendChild(script);
});
const items = document.querySelectorAll('.work-gallery .item');
// filter buttons
const buttons = document.querySelectorAll(".filters button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        // toggle active state per group
        const group = button.closest(".filters");
        group.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // re-select items every time (so they exist after fetch)
        document.querySelectorAll(".gallery-items .item, .gallery-items-mobile .item")
            .forEach(item => {
                const tags = (item.getAttribute("data-tags") || "").split(" ");
                if (filter === "all" || tags.includes(filter)) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
    });
});
