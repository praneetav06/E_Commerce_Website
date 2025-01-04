import './NewsLetter.css';
function NewsLetter() { //mount the component in Shop.jsx
    return(
        <div className="newsletter">
            <h1>Get Exclusive offers on your E-mail</h1>
            <p>Subscribe to our Newsletter and stay updated</p>
            <div>
                <input type="email" name="email" id="email" placeholder="Your E-mail ID" />
                <button>Subscribe</button>
            </div>
        </div>
    )
}
export default NewsLetter;