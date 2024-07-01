/**
* PHP Email Forma validacija
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let ovaForma = this;

      let action = ovaForma.getAttribute('action');
      let recaptcha = ovaForma.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        prikaziGresku(ovaForma, 'Svojstvo action forme nije podešeno!');
        return;
      }
      ovaForma.querySelector('.ucitavanje').classList.add('d-block');
      ovaForma.querySelector('.greska-poruka').classList.remove('d-block');
      ovaForma.querySelector('.poslata-poruka').classList.remove('d-block');

      let formaPodaci = new FormData( ovaForma );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_forma_posalji'})
              .then(token => {
                formaPodaci.set('recaptcha-odgovor', token);
                php_email_forma_posalji(ovaForma, action, formaPodaci);
              })
            } catch(error) {
              prikaziGresku(ovaForma, error);
            }
          });
        } else {
          prikaziGresku(ovaForma, 'reCaptcha javascript API url nije učitan!')
        }
      } else {
        php_email_forma_posalji(ovaForma, action, formaPodaci);
      }
    });
  });

  function php_email_forma_posalji(ovaForma, action, formaPodaci) {
    fetch(action, {
      method: 'POST',
      body: formaPodaci,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(odgovor => {
      if( odgovor.ok ) {
        return odgovor.text();
      } else {
        throw new Error(`${odgovor.status} ${odgovor.statusText} ${odgovor.url}`); 
      }
    })
    .then(data => {
      ovaForma.querySelector('.ucitavanje').classList.remove('d-block');
      if (data.trim() == 'OK') {
        ovaForma.querySelector('.poslata-poruka').classList.add('d-block');
        ovaForma.reset(); 
      } else {
        throw new Error(data ? data : 'Slanje forme nije uspelo i ni jedna poruka o grešci se nije vratila iz: ' + action); 
      }
    })
    .catch((error) => {
      prikaziGresku(ovaForma, error);
    });
  }

  function prikaziGresku(ovaForma, error) {
    ovaForma.querySelector('.ucitavanje').classList.remove('d-block');
    ovaForma.querySelector('.greska-poruka').innerHTML = error;
    ovaForma.querySelector('.greska-poruka').classList.add('d-block');
  }

})();
