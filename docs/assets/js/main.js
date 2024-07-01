/**
Glavne javaskript funkcije
*/
(function() {
  "use strict";

  /**
   * Pomoćna selektor funkcija
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Event listener funkcija
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * On scroll event listener - osluškivač dogadjaja
   */
  const naskrol = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * navigacioniBar link aktivno stanje na scroll
   */
  let navigacioniBarlinks = select('#navigacioniBar .skrolujka', true)
  const navigacioniBarLinkoviAktivni = () => {
    let pozicija = window.scrollY + 200
    navigacioniBarlinks.forEach(navigacioniBarlink => {
      if (!navigacioniBarlink.hash) return
      let section = select(navigacioniBarlink.hash)
      if (!section) return
      if (pozicija >= section.offsetTop && pozicija <= (section.offsetTop + section.offsetHeight)) {
        navigacioniBarlink.classList.add('active')
      } else {
        navigacioniBarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navigacioniBarLinkoviAktivni)
  naskrol(document, navigacioniBarLinkoviAktivni)

  /**
   * Skroluje na element sa zaglavlje offset om
   */
  const skrolujka = (el) => {
    let header = select('#zaglavlje')
    let offset = header.offsetHeight

    if (!header.classList.contains('zaglavlje-skrolovano')) {
      offset -= 16
    }

    let elementPozicija = select(el).offsetTop
    window.scrollTo({
      top: elementPozicija - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Zaglavlje fixiran vrh na scroll
   */
  let selektujZaglavlje = select('#zaglavlje')
  if (selektujZaglavlje) {
    let headerOffset = selektujZaglavlje.offsetTop
    let nextElement = selektujZaglavlje.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selektujZaglavlje.classList.add('fixed-top')
        nextElement.classList.add('skrolovano-offset')
      } else {
        selektujZaglavlje.classList.remove('fixed-top')
        nextElement.classList.remove('skrolovano-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    naskrol(document, headerFixed)
  }

  /**
   * Nazad na vrh dugme
   */
  let nazadNaVrh = select('.nazad-na-vrh')
  if (nazadNaVrh) {
    const toggleNazadNaVrh = () => {
      if (window.scrollY > 100) {
        nazadNaVrh.classList.add('active')
      } else {
        nazadNaVrh.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleNazadNaVrh)
    naskrol(document, toggleNazadNaVrh)
  }

  /**
   * Mobilna navigacija toggle
   */
  on('click', '.mobilni-nav-toggle', function(e) {
    select('#navigacioniBar').classList.toggle('navigacioniBar-mobilni')
    this.classList.toggle('bi-lista')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobilna navigacija dropdown aktivan
   */
  on('click', '.navigacioniBar .dropdown > a', function(e) {
    if (select('#navigacioniBar').classList.contains('navigacioniBar-mobilni')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Skrol sa ofsetom na klase sa imenom .skrolujka
   */
  on('click', '.skrolujka', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navigacioniBar = select('#navigacioniBar')
      if (navigacioniBar.classList.contains('navigacioniBar-mobilni')) {
        navigacioniBar.classList.remove('navigacioniBar-mobilni')
        let navigacioniBarToggle = select('.mobilni-nav-toggle')
        navigacioniBarToggle.classList.toggle('bi-lista')
        navigacioniBarToggle.classList.toggle('bi-x')
      }
      skrolujka(this.hash)
    }
  }, true)

  /**
   * Skrol sa ofsetom na učitavanje stranice sa hash linkovima u url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        skrolujka(window.location.hash)
      }
    }
  });

  /**
   * baner vrteska indikatori
   */
  let banerVrteskaIndikatori = select("#baner-vrteska-indikatori")
  let banerVrteskaItemi = select('#banerVrteska .vrteska-item', true)

  banerVrteskaItemi.forEach((item, index) => {
    (index === 0) ?
    banerVrteskaIndikatori.innerHTML += "<li data-bs-target='#banerVrteska' data-bs-slide-to='" + index + "' class='active'></li>":
      banerVrteskaIndikatori.innerHTML += "<li data-bs-target='#banerVrteska' data-bs-slide-to='" + index + "'></li>"
  });

  

})()