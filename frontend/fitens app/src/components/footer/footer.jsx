import './style-footer.css';
export default function Footer() { 

    let data = new Date();
    let year = data.getFullYear();

    return(
        <div className="footer-container">
            <p>Wszelkie prawa zastrzeżone &copy; {year}</p>
            <div className="social-media">
                <a href="https://github.com/Miameekk" target="_blank" className="social-links">M</a>
                <a href="#" target="_blank" className="social-links">B</a>
            </div>
        </div>
    );

}