import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Footer extends React.Component {
    render() {
        return (
              
  <div className="footer-area" style={{boxShadow: '0 0 6px 0 rgba(0,0,0,.2)'}}>
  <div className="container">
      <div className="footer-wrapper">
          <div className="row">
              <div className="col-lg-10 offset-lg-1 ">
                  <div className="footer-content">
                      <div className="footer-nav">
                          <ul className='p-0'>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://dyp.finance/">Home</a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://coinmarketcap.com/currencies/defi-yield-protocol/">CoinMarketCap</a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://www.coingecko.com/en/coins/defi-yield-protocol/">CoinGecko</a></li>

                              <li><a target='_blank' rel='noopener noreferrer' href="https://dyp.finance/audit">Security</a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://dyp.finance/disclaimer">Disclaimer</a></li>
                          </ul>
                      </div>
                      <div className="social-list mt-4">
                          <ul className='p-0'>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://t.co/N5rPQ12obJ?amp=1"><span><i className="fab fa-discord"></i></span></a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="mailto:contact@dyp.finance"><span><i className="fas fa-envelope"></i></span></a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://gov.dyp.finance/"><span><i className="fas fa-users"></i></span></a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://medium.com/@dypfinance"><span><i className="fab fa-medium"></i></span></a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://t.me/dypfinance"><span><i className="fab fa-telegram-plane"></i></span></a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://twitter.com/dypfinance"><span><i className="fab fa-twitter"></i></span></a></li>
                              <li><a target='_blank' rel='noopener noreferrer' href="https://www.linkedin.com/company/defi-yield-protocol"><span><i className="fab fa-linkedin-in"></i></span></a></li>
                          </ul>
                      </div>
                      <div className="line mb-4">
                        <div style={{textAlign: 'center'}} className="mt-2 pb-2 copyright">
                          Copyright © DeFi Yield Protocol 2022. All rights reserved.
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>

        )
    }
}