function initLightbox() {
  var lightbox = document.getElementById('image-lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxTitle = document.getElementById('lightbox-title');
  var closeBtn = document.getElementById('lightbox-close');
  var triggers = document.querySelectorAll('[data-lightbox-trigger]');

  if (!lightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  var returnFocus = null;

  function lockScroll() {
    document.body.dataset.lightboxLock = 'true';
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    delete document.body.dataset.lightboxLock;
    if (document.body.dataset.mobileMenuLock !== 'true') {
      document.body.style.overflow = '';
    }
  }

  function openLightbox(image, alt, title) {
    returnFocus = document.activeElement;
    lightboxImage.src = image;
    lightboxImage.alt = alt;
    lightboxTitle.textContent = title;
    
    lockScroll();
    if (typeof lightbox.showModal === 'function') {
      lightbox.showModal();
    } else {
      lightbox.setAttribute('open', '');
    }
  }

  function closeLightbox() {
    if (typeof lightbox.close === 'function') {
      if (lightbox.open) {
        lightbox.close();
      }
    } else {
      lightbox.removeAttribute('open');
      cleanupLightbox();
    }
  }

  function cleanupLightbox() {
    unlockScroll();
    lightboxImage.src = '';
    if (returnFocus) {
      returnFocus.focus();
      returnFocus = null;
    }
  }

  lightbox.addEventListener('close', cleanupLightbox);

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var image = trigger.getAttribute('data-image') || '';
      var alt = trigger.getAttribute('data-alt') || '';
      var title = trigger.getAttribute('data-title') || '';
      openLightbox(image, alt, title);
    });

    trigger.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        var image = trigger.getAttribute('data-image') || '';
        var alt = trigger.getAttribute('data-alt') || '';
        var title = trigger.getAttribute('data-title') || '';
        openLightbox(image, alt, title);
      }
    });

    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('role', 'button');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', function (evt) {
    if (evt.target === lightbox) {
      closeLightbox();
    }
  });

  if (typeof lightbox.showModal !== 'function') {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' && lightbox.hasAttribute('open')) {
        closeLightbox();
      }
    });
  }
}

initLightbox();
