const tapScreen = document.getElementById("tapScreen");
const heroVideo = document.getElementById("heroVideo");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

let invitationOpened = false;

function openInvitation() {
  if (invitationOpened) return;

  invitationOpened = true;
  document.body.classList.add("opened");
  tapScreen.classList.add("hide");

  heroVideo.play().catch(function(error) {
    console.log("Video play was blocked:", error);
  });

  setTimeout(function() {
    tapScreen.style.display = "none";
  }, 1000);
}

tapScreen.addEventListener("click", openInvitation);
tapScreen.addEventListener("touchstart", openInvitation, { passive: true });

navToggle.addEventListener("click", function() {
  navLinks.classList.toggle("active");
});

navItems.forEach(function(item) {
  item.addEventListener("click", function() {
    navLinks.classList.remove("active");
  });
});

const weddingDate = new Date("2026-12-20T14:00:00+08:00").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const countdownMessage = document.getElementById("countdownMessage");

const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");

function formatNumber(number) {
  return number < 10 ? "0" + number : number;
}

function updateCountdownText() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    countdownMessage.textContent = "Today is the day. Our forever begins now.";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysElement.textContent = days;
  hoursElement.textContent = formatNumber(hours);
  minutesElement.textContent = formatNumber(minutes);
  secondsElement.textContent = formatNumber(seconds);
}

const clockStartDate = new Date();
const clockStartTime = performance.now();

const startSeconds = clockStartDate.getSeconds() + clockStartDate.getMilliseconds() / 1000;
const startMinutes = clockStartDate.getMinutes() + startSeconds / 60;
const startHours = (clockStartDate.getHours() % 12) + startMinutes / 60;

const startSecondAngle = startSeconds * 6;
const startMinuteAngle = startMinutes * 6;
const startHourAngle = startHours * 30;

function animateClockHands(currentTime) {
  const elapsedSeconds = (currentTime - clockStartTime) / 1000;

  const secondAngle = startSecondAngle + elapsedSeconds * 6;
  const minuteAngle = startMinuteAngle + elapsedSeconds * 0.1;
  const hourAngle = startHourAngle + elapsedSeconds * (360 / 43200);

  secondHand.style.transform = "translateX(-50%) rotate(" + secondAngle + "deg)";
  minuteHand.style.transform = "translateX(-50%) rotate(" + minuteAngle + "deg)";
  hourHand.style.transform = "translateX(-50%) rotate(" + hourAngle + "deg)";

  requestAnimationFrame(animateClockHands);
}

updateCountdownText();
setInterval(updateCountdownText, 1000);
requestAnimationFrame(animateClockHands);

const RSVP_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw7vKhGqGGsMk7SC-0zUe5m8jd9s__PkxNAGDb-chj0-Ja345vfboc1w8SD2WwZpxBP/exec";

const rsvpForm = document.getElementById("rsvpForm");
const rsvpButton = document.getElementById("rsvpButton");
const rsvpStatus = document.getElementById("rsvpStatus");

rsvpForm.addEventListener("submit", function(event) {
  event.preventDefault();

  rsvpButton.disabled = true;
  rsvpButton.textContent = "Sending...";
  rsvpStatus.textContent = "";

  const formData = new FormData(rsvpForm);

  fetch(RSVP_WEB_APP_URL, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  })
  .then(function() {
    rsvpStatus.textContent = "Thank you for your response. We truly appreciate your love and support.";
    rsvpForm.reset();
  })
  .catch(function() {
    rsvpStatus.textContent = "Sorry, something went wrong. Please try again.";
  })
  .finally(function() {
    rsvpButton.disabled = false;
    rsvpButton.textContent = "Send RSVP";
  });
});

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

const revealTargets = document.querySelectorAll(
  ".couple-wrapper, .details-wrapper, .countdown-wrapper, .schedule-wrapper, .location-poster, .dress-poster, .rsvp-wrapper, .gallery-wrapper, .closing-card, .map-card, .attire-guide-layout, .gallery-item, .detail-card, .schedule-item, .person-card"
);

revealTargets.forEach(function(target) {
  target.classList.add("scroll-reveal");
});

if (window.IntersectionObserver) {
  const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -25% 0px"
  });

  revealTargets.forEach(function(target) {
    revealObserver.observe(target);
  });

  window.addEventListener("load", function() {
    revealTargets.forEach(function(target) {
      const bounds = target.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        target.classList.add("visible");
      }
    });
  });
} else {
  revealTargets.forEach(function(target) {
    target.classList.add("visible");
  });
}

galleryItems.forEach(function(item) {
  item.addEventListener("click", function() {
    const image = item.querySelector("img");
    const caption = item.getAttribute("data-caption") || "";

    lightboxImage.src = image.src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("active");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImage.src = "";
  lightboxCaption.textContent = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function(event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});