<template>
  <footer id="footer">
    <div class="p-3">
      <div class="d-sm-flex align-items-start w-100 no-gutters">
        <nav class="navbar navbar-expand-sm vertical-menu m-0 p-0 w-100">
            <div class="navbar-toggler w-100 p-0" data-toggle="collapse"
                    href="#footerElem1"
                    aria-controls="verticalNavbar" aria-expanded="false" aria-label="Toggle navigation">
              <h6><b>Obsługa klienta<i class="fas fa-caret-down float-right"></i></b></h6>
              <hr/>
            </div>
            <div class="collapse navbar-collapse d-sm-table justify-content-center" id="footerElem1">
              <div class="p-3 d-block">
                <h6 class="d-none d-sm-block mb-3"><b>Obsługa klienta</b></h6>
                <p>Infolinia: +48 777 888 999</p>
                <p>Newsletter</p>
              </div>
            </div>
          </nav>
        <nav class="navbar navbar-expand-sm vertical-menu m-0 p-0 w-100">
          <div class="navbar-toggler w-100 p-0" data-toggle="collapse"
               href="#footerElem2"
               aria-controls="verticalNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <h6><b>Rozkłady jazdy<i class="fas fa-caret-down float-right"></i></b></h6>
            <hr/>
          </div>
          <div class="collapse navbar-collapse d-sm-table justify-content-center" id="footerElem2">
            <div class="p-3 d-block">
              <h6 class="d-none d-sm-block mb-3"><b>Rozkład jazdy</b></h6>
              <p>Przystanki</p>
              <p>Linie autobusowe</p>
              <p>Rozkłady jazdy</p>
            </div>
          </div>
        </nav>
        <nav class="navbar navbar-expand-sm vertical-menu m-0 p-0 w-100">
          <div class="navbar-toggler w-100 p-0" data-toggle="collapse"
               href="#footerElem3"
               aria-controls="verticalNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <h6><b>Podróż<i class="fas fa-caret-down float-right"></i></b></h6>
            <hr/>
          </div>
          <div class="collapse navbar-collapse d-sm-table justify-content-center" id="footerElem3">
            <div class="p-3 d-block">
              <h6 class="d-none d-sm-block mb-3"><b>Podróż</b></h6>
              <p><router-link to="/map">Mapa przystanków</router-link></p>
              <p>FAQ</p>
              <p>Regulamin</p>
            </div>
          </div>
        </nav>
        <nav class="navbar navbar-expand-sm vertical-menu m-0 p-0 w-100">
          <div class="navbar-toggler w-100 p-0" data-toggle="collapse"
               href="#footerElem4"
               aria-controls="verticalNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <h6><b>Kontakt<i class="fas fa-caret-down float-right"></i></b></h6>
            <hr/>
          </div>
          <div class="collapse navbar-collapse d-sm-table justify-content-center" id="footerElem4">
            <div class="p-3 d-block">
              <h6 class="d-none d-sm-block mb-3"><b>Kontakt</b></h6>
              <p>O firmie</p>
              <p>Kariera</p>
              <p>Formularz kontaktowy</p>
            </div>
          </div>
        </nav>
       </div>
    </div>

    <div class="footer-siteinfo">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg- 6 col-md-6 col-sm-6 col-xs-12">
            &copy; 2018 JanuszPol
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>
