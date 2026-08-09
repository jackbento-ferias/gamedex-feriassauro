function slug(text) {
    return text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function getPlatformLogo(platform) {
    return `assets/images/platforms/${slug(platform)}-logo.png`;
}


/* ==================================================
   ANIMATIONS
================================================== */

function animateCounter(element, endValue) {

    let currentValue = 0;

    const duration = 800;
    const interval = 20;

    const increment = Math.max(
        1,
        Math.ceil(endValue / (duration / interval))
    );

    const timer = setInterval(() => {

        currentValue += increment;

        if (currentValue >= endValue) {

            currentValue = endValue;

            clearInterval(timer);

        }

        element.textContent =
            String(currentValue).padStart(3, "0");

    }, interval);

}