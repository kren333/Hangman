import React from 'react';

function Footer() {
    const css = `
    .footer {
        position:absolute;
        left:0;
        bottom:0;
        right:0;        
        background-color: #89CFF0;
    }
    `
    return (
        <div class="footer">
            <style>{css}</style>
            <center>
                <p>created by kevin ren, CMU '25</p>
            </center>
        </div>
    )
}

export default Footer;
