import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pinterest_icon from '../Assets/pinterest_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
function Footer() { // mount the component in app.js
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="footer_logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icon-container">
                    <img src={instagram_icon} alt="instagram_icon" />
                </div>
                <div className="footer-icon-container">
                    <img src={whatsapp_icon} alt="whatsapp_icon" />
                </div>
                <div className="footer-icon-container">
                    <img src={pinterest_icon} alt="pinterest_icon"/>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright - All Rights Reserved</p>
            </div>
        </div>
    )
}
export default Footer;