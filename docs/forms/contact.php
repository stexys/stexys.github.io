<?php
  /**
  *bez bibiloteke PHP_Email_Forma ne radi - nije implementirana. Treba je dodati u  vendor/php-email-form/php-email-form.php
  * 
  */


  $email_adresa_primaoca = 'iznajmljivanjebicikala@gmail.com';

  if( file_exists($php_email_forma = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_forma );
  } else {
    die( 'Nije moguće učitati biblioteku "PHP Email Forma"!');
  }

  $kontakt = new PHP_Email_Forma;
  $kontakt->ajax = true;
  
  $kontakt->adresaPrimaoca = $email_adresa_primaoca;
  $kontakt->imePosiljaoca = $_POST['ime'];
  $kontakt->adresaPosiljaoca = $_POST['email'];
  $kontakt->tema = $_POST['tema'];

  // Koristi SMTP za slanje emaila
  /*
  $kontakt->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $kontakt->dodaj_poruku( $_POST['ime'], 'From');
  $kontakt->dodaj_poruku( $_POST['email'], 'Email');
  $kontakt->dodaj_poruku( $_POST['poruka'], 'Message', 10);

  echo $kontakt->posaljiEmail();
?>
