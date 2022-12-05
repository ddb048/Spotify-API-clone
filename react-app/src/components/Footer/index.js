import React from "react";
import './index.css'

function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-title">Created by David Burch</div>
                <div className="icon">
                    <a href='https://github.com/ddb048'>
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="tech">
                    JavaScript * CSS * React * Redux * Express * Sequelize * PostgreSQL
                </div>
            </div>

        </div>
    )
}

export default Footer;
