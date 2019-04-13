export default {
  dictionary: {
    pl: {
      messages: {
        email: function (field1) {
          return `Wpisz poprawny adres email.`
        },
        required: function (field1) {
          return `Wpisz ${field1}.`
        },
        confirmed: function () {
          return `Hasła muszą być zgodne.`
        },
        min_value: function (field) {
          return `Podana wartość jest za mała`
        },
        decimal: function () {
          return 'Pole może zawierać tylko liczby oraz kropkę'
        }
      }
    }
  }
}
