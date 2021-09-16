import React from 'react'
import CountUp from 'react-countup'
import styled from "styled-components"

// styles
const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`

export default class Header extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        json_totalPaid: {
          ethTotal: {
            wethPaiOutTotals: ''
          },
          bnbTotal: {
            wbnbPaidOutTotals: ''
          },
          avaxTotal: {
            avaxPaidOutTotals: ''
          },
          totalPaidInUsd: 0
        }
      }
    }

    componentDidMount() {
      this.getTotalPaid()
    }

    getTotalPaid = async () => {
      let json = {}
      json = await window.getTotalPaid()

      let json_totalPaid = json
      this.setState({json_totalPaid})
      return json_totalPaid
    }

    render() {
      let {darkTheme, toggleTheme} = this.props
        return (
            <div style={{background: 'var(--box-bg)', padding: '16px', boxShadow: '0 0 6px 0 rgba(0,0,0,.2)', height: '100px'}} className='App-header'>
        <div className="container mr-0 ml-0" style={{maxWidth: '100%'}}>
          <div className="row">
            <div className="col-md-7 logo-column header-logo col-5">
              <h2  className='container text-left' style={{position: 'relative', maxWidth: '100%', marginLeft: '-10px' }}>
                <a href='/' style={{ display: 'flex' }}>
                  <img className='wlogo' style={{position: 'relative', maxWidth: '90%', objectFit: 'contain', paddingRight: '10px', height: '75px'}} alt='Staking DAPP' src='/logo192.png'
                       height='125'/>
                  <img className='d-none dlogo' style={{position: 'relative', maxWidth: '90%', objectFit: 'contain', paddingRight: '10px', height: '75px'}} alt='Staking DAPP' src='/img/dlogo.svg'
                       height='125'/>
                  {/*{' '}<p className="header-title-1" style={{ paddingLeft: '10px', marginTop: 'auto' }}>yield AVAX</p>*/}
                  {' '}<div className="header-title-1" style={{ paddingLeft: '25px', marginTop: 'auto' }}>
                  <p style={{fontSize: '15px'}} className='mb-0'>Total rewards paid</p>

                  {this.state.json_totalPaid.totalPaidInUsd == 0 ? (
                      <Dots />
                    ) : (
                      <CountUp style={{fontSize: '20px', fontWeight: '600'}}
                               start={this.state.json_totalPaid.totalPaidInUsd-400.000}
                               end={this.state.json_totalPaid.totalPaidInUsd}
                               duration={120}
                               separator=","
                               decimals={2}
                               prefix="$"
                      />
                    )
                  }

                  {/*${getFormattedNumber(this.state.json_totalPaid.totalPaidInUsd,2)}*/}
                </div>
                </a>
              </h2>
            </div>
            <div className="col-md-5 pr-0 pl-0 col-7" id="infoPool">
              <div className="sc-eilVRo jaXjyZ">
                <div className="sc-eerKOB bKbMab"><span className="sc-jzgbtB dwWyiU"></span>
                  <div className="sc-bnXvFD bcIrBV">
                    <a style={{borderRadius: '15px', marginRight: '1rem', padding: '2px 7px 2px'}} href="https://github.com/dypfinance/Avalanche-Bridge-and-Farming-contracts/tree/main/Audits" target="_blank" id="connect-wallet"
                       className="sc-gqjmRU gacWOr sc-iAyFgw sc-jWBwVP sc-cMhqgX sc-esOvli iivcTi"><p
                        className="sc-hMFtBS cxjZDP">Check Audits</p></a>
                  </div>
                  <div className="checkbox-drak">
                    <label className="ui-switcher" aria-checked={darkTheme}>
                    <input checked={darkTheme} autoComplete="off" id="myCheck" onChange={toggleTheme} className="form-check-input d-none" type="checkbox" name="inlineRadioOptions" />
                    </label>
                      {/* <input autocomplete="off" id="myCheck" onchange="myFunction()" className="form-check-input" type="checkbox" name="inlineRadioOptions" /> */}
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