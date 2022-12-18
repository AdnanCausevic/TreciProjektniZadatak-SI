// Klasa UI: predstavlja knjigu i sve njene atribute
class Knjiga {
    constructor(naslov, autor, zanr) {
      this.naslov = naslov;
      this.autor = autor;
      this.zanr = zanr;
    }
  }
  
  // Klasa UI : vrši zadatke vezane za korisnicki interfejs stranice, dugmad obavještenja itd
  class UI {
    static displayKnjige() {
      const knjige = Spasi.getKnjige();
  
      knjige.forEach((knjiga) => UI.addKnjigaToList(knjiga));
    }
  
    static addKnjigaToList(knjiga) {
      const list = document.querySelector('#knjiga-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${knjiga.naslov}</td>
        <td>${knjiga.autor}</td>
        <td>${knjiga.zanr}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Ukloni</a></td>`; //premade dugme 
  
      list.appendChild(row);
    }
  
    static deleteKnjiga(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#knjiga-form');
      container.insertBefore(div, form);
  
      // Obavještenje stoji na ekranu 3 sekunde nakon klikanja dugmeta
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#naslov').value = '';
      document.querySelector('#autor').value = '';
      document.querySelector('#zanr').value = '';
    }
  }
  
  // Klasa Spasi: vrši zadatke vezane za spemanje knjiga, DOM
  class Spasi {
    static getKnjige() {
      let knjige;
      if(localStorage.getItem('knjige') === null) {
        knjige = [];
      } else {
        knjige = JSON.parse(localStorage.getItem('knjige'));
      }
  
      return knjige;
    }
  
    static addKnjiga(knjiga) {
      const knjige = Spasi.getKnjige();
      knjige.push(knjiga);
      localStorage.setItem('knjige', JSON.stringify(knjige));
    }
  
    static removeKnjiga(zanr) {
      const knjige = Spasi.getKnjige();
  
      knjige.forEach((knjiga, index) => {naslov
        if(knjiga.zanr === zanr) {
          knjige.splice(index, 1);
        }
      });
  
      localStorage.setItem('knjige', JSON.stringify(knjige));
    }
  }
  
  // Event za prikazivane knjiga koje su u bazi
  document.addEventListener('DOMContentLoaded', UI.displayKnjige);
  
  // Event za dodavanje knjige u bazu
  document.querySelector('#knjiga-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Dobijanje  vrijednosti iz tri forma
    const naslov = document.querySelector('#naslov').value;
    const autor = document.querySelector('#autor').value;
    const zanr = document.querySelector('#zanr').value;
  
    // Validacija da su sva polja ispunjena
    if(naslov === '' || autor === '' || zanr === '') {
      UI.showAlert('Molimo vas da ispunite sva polja...', 'danger');
    } else {
      // Prikazivanje knjige
      const knjiga = new Knjiga(naslov, autor, zanr);
  
      // Dodavanje knjige u user interfejs
      UI.addKnjigaToList(knjiga);
  
      // Dodavanje knjige u klasu Spasi
      Spasi.addKnjiga(knjiga);
  
      // Prikazivanje poruke da je knjiga uspjesno dodana
      UI.showAlert('Knjiga je dodana', 'success');
  
      // Čišćenje polja za unos naredne knjige
      UI.clearFields();
    }
  });
  
    // Event za uklanjanje knjige
    document.querySelector('#knjiga-list').addEventListener('click', (e) => {
    // Uklanjanje knjige iz user interfejsa
    UI.deleteKnjiga(e.target);
  
    // Uklanjanje knjige iz Spasi klase
    Spasi.removeKnjiga(e.target.parentElement.previousElementSibling.textContent);
  
    // Prikaz obavještenja da je knjiga uklonjena
    UI.showAlert('Knjiga je uklonjena', 'danger');
  });