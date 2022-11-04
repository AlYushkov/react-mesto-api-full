import React from 'react';

const Footer = React.memo(() => {
    return (
        <footer className="footer">
            <p className="footer__text">&copy;{`2022 Mesto Russia`}</p>
        </footer>
    );
});

export default Footer;
