<template>
  <div class="container">
    <div class="jumbotron jumbotron-fluid px-lg-5">
      <div class="row d-flex justify-content-center my-lg-3">
        <h3>Dziękujemy za przesłanie zgłoszenia rejestracji!</h3>
      </div>
      <div class="row d-flex justify-content-center my-lg-3">
        <h6>W ciągu paru minut na adres e-mail podany przez państwo w formularzu zostanie przesłany link aktywacyjny
          konto.
          Może się zdarzyć, że wiadomość zostanie potraktowana jako spam. Jeśli nie otrzymali państwo żadnej wiadomości,
          prosimy o kliknięcie przycisku poniżej
        </h6>
      </div>
      <div class="row d-flex justify-content-center my-lg-3">
        <button class="btn btn-outline-success">Prześlij link aktywacyjny ponownie</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeDestroy () {
    this.$store.dispatch('unsetRegisteredFlag')
  }
}
</script>
