import "./authors.css";

export default function Authors() {
  return (
    <div className="authors-page">
      <section className="authors-hero">
        <h1>Autorzy Fitnes App</h1>
        <p>Projekt stworzony z myślą o młodzieżowym, nowoczesnym stylu życia.</p>
      </section>

      <section className="authors-grid">
        <article className="author-card">
          <img src="/danon.jpg" alt="Danon to ja" className="author-avatar"/>
          <h2>Damian Bukowiec</h2>
          <p className="role">Frontend</p>
          <p>
            Odpowiedzialny za frontend: UI, responsywność i UX. Damian zadbał o
            atrakcyjny design, animacje i dobrą pracę aplikacji na telefonach oraz
            dużych ekranach.
          </p>
        </article>
        <article className="author-card">
          <img src="/jakup.png" alt="Jakub Pławecki" className="author-avatar"/>
          <h2>Jakub Pławecki</h2>
          <p className="role">Backend</p>
          <p>
            Autor backendu: logika generowania planów, przetwarzanie danych oraz
            API. Jakub zapewnił stabilność oraz poprawną obsługę modeli AI.
          </p>
        </article>
      </section>
    </div>
  );
}
