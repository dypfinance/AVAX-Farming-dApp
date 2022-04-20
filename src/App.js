import React from 'react';

import { Route } from 'react-router-dom'

import initStaking from './components/staking'
import initBuybackStaking from './components/buy-back-staking'
import initVesting from './components/vesting'
import initVestingStaking from "./components/vesting-staking"

/* New Contracts */
// import initConstantStaking from './components/constant-staking'
import initConstantStaking from './components/constant-staking-new-front'
// import initBuybackStakingNew from './components/buy-back-staking-new'

import initBuybackStakingNew from './components/buy-back-staking-new-front'

// import initStakingNew from './components/staking-new'
import initStakingNew from './components/staking-new-front'
// import initConstantStakingiDYP from './components/constant-staking-idyp'
import initConstantStakingiDYP from './components/constant-staking-idyp-new-front'

import StakingList from './components/staking-list'
import StakingListEth from './components/staking-list-eth.js'

// import StakingStats from './components/staking-stats'
import StakingStats from './components/staking-stats-new'
import FullStakingStats from './components/full-staking-stats'
import Header from './components/header'
import Footer from './components/footer'

import getFormattedNumber from './functions/get-formatted-number';
import setupnetwork from './functions/setupnetwork';

import WalletConnectProvider from "@walletconnect/web3-provider";

//const eth_address = 'ETH'
const wbnb_address = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'

const { rebase_factors } = window

const BuybackStaking = initBuybackStaking({ staking: window.buyback_staking, apr: 100, expiration_time: '1 December 2021' })

const Staking3 = initStaking({token: window.token, staking: window.staking, liquidity: wbnb_address, lp_symbol:'DYP/AVAX', reward: '30,000', lock: '3 Days', rebase_factor: rebase_factors[0], expiration_time: '2 January 2022'})
const Staking30 = initStaking({token: window.token_dyp_30, staking: window.staking_dyp_30, liquidity: wbnb_address, lp_symbol:'DYP/AVAX', reward: '45,000', lock: '30 Days', rebase_factor: rebase_factors[1], expiration_time: '2 January 2022'})
const Staking60 = initStaking({token: window.token_dyp_60, staking: window.staking_dyp_60, liquidity: wbnb_address, lp_symbol:'DYP/AVAX', reward: '75,000', lock: '60 Days', rebase_factor: rebase_factors[2], expiration_time: '2 January 2022'})
const Staking90 = initStaking({token: window.token_dyp_90, staking: window.staking_dyp_90, liquidity: wbnb_address, lp_symbol:'DYP/AVAX', reward: '100,000', lock: '90 Days', rebase_factor: rebase_factors[3], expiration_time: '2 January 2022'})


const eth_address = 'ETH'
const Vesting = initVesting({ staking: window.constant_staking_30, buyers: true, apr: 0, liquidity: eth_address, expiration_time: '16 April 2022' })
const VestingStaking = initVestingStaking({ staking: window.constant_staking_60, apr: 0, liquidity: eth_address, expiration_time: '16 April 2022' })
const VestingAirdrop = initVesting({ staking: window.constant_staking_90, buyers: false, apr: 0, liquidity: eth_address, expiration_time: '23 November 2022' })
const VestingStakingAirdrop = initVestingStaking({ staking: window.constant_staking_120, apr: 0, liquidity: eth_address, expiration_time: '23 November 2022' })


//Constant Staking New
const avax_address = 'AVAX'
const ConstantStaking30 = initConstantStaking({ staking: window.constant_staking_new1, apr: 25, liquidity: avax_address, expiration_time: '6 December 2022' })
const ConstantStaking90 = initConstantStaking({ staking: window.constant_staking_new2, apr: 50, liquidity: avax_address, expiration_time: '6 December 2022' })

//Buyback New
const BuybackStaking1 = initBuybackStakingNew({ staking: window.buyback_staking1_1, constant: window.constant_staking_new3, apr: 30, expiration_time: '6 December 2022' })
const BuybackStaking2 = initBuybackStakingNew({ staking: window.buyback_staking1_2, constant: window.constant_staking_new4, apr: 100, expiration_time: '6 December 2022' })

//Farming New
const StakingNew1 = initStakingNew({token: window.token_new, staking: window.farming_new_1, constant: window.constant_staking_new5, liquidity: wbnb_address, lp_symbol:'USD', reward: '30,000', lock: '3 Days', rebase_factor: rebase_factors[0], expiration_time: '6 December 2022'})
const StakingNew2 = initStakingNew({token: window.token_new, staking: window.farming_new_2, constant: window.constant_staking_new6, liquidity: wbnb_address, lp_symbol:'USD', reward: '30,000', lock: '3 Days', rebase_factor: rebase_factors[0], expiration_time: '6 December 2022'})
const StakingNew3 = initStakingNew({token: window.token_new, staking: window.farming_new_3, constant: window.constant_staking_new7, liquidity: wbnb_address, lp_symbol:'USD', reward: '30,000', lock: '3 Days', rebase_factor: rebase_factors[0], expiration_time: '6 December 2022'})
const StakingNew4 = initStakingNew({token: window.token_new, staking: window.farming_new_4, constant: window.constant_staking_new8, liquidity: wbnb_address, lp_symbol:'USD', reward: '30,000', lock: '3 Days', rebase_factor: rebase_factors[0], expiration_time: '6 December 2022'})
const StakingNew5 = initStakingNew({token: window.token_new, staking: window.farming_new_5, constant: window.constant_staking_new9, liquidity: wbnb_address, lp_symbol:'USD', reward: '30,000', lock: '3 Days', rebase_factor: rebase_factors[0], expiration_time: '6 December 2022'})

//Vesting Private
const VestingPrivate = initVestingStaking({ staking: window.constant_staking_130, apr: 0, liquidity: eth_address, expiration_time: '28 May 2022' })

//Constant Staking iDYP
const ConstantStakingiDYP1 = initConstantStakingiDYP({ staking: window.constant_staking_idyp_1, apr: 20, liquidity: avax_address, expiration_time: '28 February 2023' })
const ConstantStakingiDYP2 = initConstantStakingiDYP({ staking: window.constant_staking_idyp_2, apr: 45, liquidity: avax_address, expiration_time: '28 February 2023' })


const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName} onClick={() => {
            // close modal when outside of modal is clicked
            handleClose()
        }}>
            <section className="modal-main">
                {children}
                {/*<button type="button" onClick={handleClose}>*/}
                {/*    Close*/}
                {/*</button>*/}
            </section>
        </div>
    )
}

let { BigNumber, LP_IDs } = window

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        is_wallet_connected: false,
        the_graph_result: JSON.parse(JSON.stringify(window.the_graph_result)),
        the_graph_result_AVAX_V2: JSON.parse(JSON.stringify(window.the_graph_result_avax_v2)),
        referrer: '',
        darkTheme: false,
        show: false
    }
      this.showModal = this.showModal.bind(this)
      this.hideModal = this.hideModal.bind(this)
  }


    showModal = () => {
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false })
    }

  toggleTheme = () => {
    let darkTheme = !this.state.darkTheme
    document.body.classList[darkTheme?'add':'remove']('dark')
    this.setState({ darkTheme })
  }

  componentDidMount() {

      this.tvl().then()
  }

    tvl = async () => {
      try {
          let the_graph_result_AVAX_V2 = await window.get_the_graph_avax_v2()
          this.setState({ the_graph_result_AVAX_V2: JSON.parse(JSON.stringify(the_graph_result_AVAX_V2)) })
      } catch (e) {
          // window.alertify.error("Cannot fetch TVL");
          console.error("TVL AVAX V2 error: "+e)
      }

      try {
          let the_graph_result = await window.refresh_the_graph_result()
          this.setState({ the_graph_result: JSON.parse(JSON.stringify(the_graph_result)) })
      } catch (e) {
          // window.alertify.error("Cannot fetch TVL");
          console.error("Cannot fetch TVL: "+e)
      }
  }

  getCombinedTvlUsd = () => {
      let tvl = 0
      if (!this.state.the_graph_result.lp_data) return 0

      let lp_ids = Object.keys(this.state.the_graph_result.lp_data)
      for (let id of lp_ids) {
          tvl += this.state.the_graph_result.lp_data[id].tvl_usd*1 || 0
      }
      return tvl
  }

  getTvlFarming = () => {
        let tvl = 0
        if (!this.state.the_graph_result.lp_data) return 0

        tvl = window.TVL_FARMING_POOLS

        return tvl
    }

  getCombinedStakers = () => {
      let stakers = 0
      if (!this.state.the_graph_result.lp_data) return 0
      let lp_ids = Object.keys(this.state.the_graph_result.lp_data)
      for (let id of lp_ids) {
          stakers += this.state.the_graph_result.lp_data[id].stakers_num*1 || 0
      }
      return stakers
  }

    handleConnection = async () => {
        try {
            let is_wallet_connected = await window.connectWallet(undefined, false)
            //await setupnetwork()
            let referrer = window.param('r')

            if (is_wallet_connected) {
                if (referrer) {
                    referrer = String(referrer).trim().toLowerCase()
                }
                if (!window.web3.utils.isAddress(referrer)) {
                    referrer = window.config.ZERO_ADDRESS
                }
            }
            this.setState({is_wallet_connected, coinbase: await window.web3.eth.getCoinbase(), referrer})

            try {
                let the_graph_result_AVAX_V2 = await window.get_the_graph_avax_v2()
                this.setState({ the_graph_result_AVAX_V2: JSON.parse(JSON.stringify(the_graph_result_AVAX_V2)) })
            } catch (e) {
                // window.alertify.error("Cannot fetch TVL");
                console.error("TVL AVAX V2 error: "+e)
            }

            try {
                let the_graph_result = await window.refresh_the_graph_result()
                this.setState({ the_graph_result: JSON.parse(JSON.stringify(the_graph_result)) })
            } catch (e) {
                // window.alertify.error("Cannot fetch TVL");
                console.error("Cannot fetch TVL: "+e)
            }
        } catch (e) {
            window.alertify.error(String(e))
        }
    }

    handleConnectionWalletConnect = async () => {
        try {

            let provider = new WalletConnectProvider({
                rpc: {
                    1: "https://api.avax.network/ext/bc/C/rpc"
                }
            })

            let is_wallet_connected = await window.connectWallet(provider, true)
            //await setupnetwork()
            let referrer = window.param('r')

            if (is_wallet_connected) {
                if (referrer) {
                    referrer = String(referrer).trim().toLowerCase()
                }
                if (!window.web3.utils.isAddress(referrer)) {
                    referrer = window.config.ZERO_ADDRESS
                }
            }
            this.setState({is_wallet_connected, coinbase: await window.web3.eth.getCoinbase(), referrer})

            try {
                let the_graph_result_AVAX_V2 = await window.get_the_graph_avax_v2()
                this.setState({ the_graph_result_AVAX_V2: JSON.parse(JSON.stringify(the_graph_result_AVAX_V2)) })
            } catch (e) {
                // window.alertify.error("Cannot fetch TVL");
                console.error("TVL AVAX V2 error: "+e)
            }

            try {
                let the_graph_result = await window.refresh_the_graph_result()
                this.setState({ the_graph_result: JSON.parse(JSON.stringify(the_graph_result)) })
            } catch (e) {
                // window.alertify.error("Cannot fetch TVL");
                console.error("Cannot fetch TVL: "+e)
            }
        } catch (e) {
            window.alertify.error(String(e))
        }
    }

render() {

  return (
    <div className="App App-header">
      <Header darkTheme={this.state.darkTheme} toggleTheme={this.toggleTheme} />
      <div style={{minHeight: '550px'}} className="App-container">
      <Route exact path="/staking-stats" render={props => <StakingStats is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} {...props} />} />
      <Route exact path="/full-staking-stats" render={props => <FullStakingStats is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} {...props} />} />

      {/*<Route exact path="/" render={props => <StakingListEth the_graph_result={this.state.the_graph_result} lp_id={[LP_IDs.eth[0], LP_IDs.eth[1], LP_IDs.eth[2], LP_IDs.eth[3]]} {...props} />} />*/}
      <Route exact path='/' render={props => <StakingNew5 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} lp_id={LP_IDs.wavax[4]} {...props} />} />


      <Route exact path="/staking-avax-3" render={props => <Staking3 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} lp_id={LP_IDs.eth[0]} {...props} />} />
      <Route exact path="/staking-avax-30" render={props => <Staking30 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} lp_id={LP_IDs.eth[1]} {...props} />} />
      <Route exact path="/staking-avax-60" render={props => <Staking60 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} lp_id={LP_IDs.eth[2]} {...props} />} />
      <Route exact path="/staking-avax-90" render={props => <Staking90 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} lp_id={LP_IDs.eth[3]} {...props} />} />

      <Route exact path='/staking-buyback' render={props => <BuybackStaking is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} {...props} />} />

      <Route exact path='/vesting' render={props => <Vesting is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} referrer={this.state.referrer} {...props} />} />
      <Route exact path='/vesting-staking' render={props => <VestingStaking is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} referrer={this.state.referrer} {...props} />} />

      <Route exact path='/airdrop' render={props => <VestingAirdrop is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} referrer={this.state.referrer} {...props} />} />
      <Route exact path='/airdrop-staking' render={props => <VestingStakingAirdrop is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} referrer={this.state.referrer} {...props} />} />

      {/*Constant Staking New*/}
      <Route exact path='/constant-staking-1' render={props => <ConstantStaking30 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} referrer={this.state.referrer} {...props} />} />
      <Route exact path='/constant-staking-2' render={props => <ConstantStaking90 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} referrer={this.state.referrer} {...props} />} />

      {/*Buyback New*/}
      <Route exact path='/staking-buyback-1' render={props => <BuybackStaking1 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} {...props} />} />
      <Route exact path='/staking-buyback-2' render={props => <BuybackStaking2 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} {...props} />} />

      {/*Farming New*/}
      <Route exact path='/farming-new-1' render={props => <StakingNew1 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} lp_id={LP_IDs.wavax[0]} {...props} />} />
      <Route exact path='/farming-new-2' render={props => <StakingNew2 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} lp_id={LP_IDs.wavax[1]} {...props} />} />
      <Route exact path='/farming-new-3' render={props => <StakingNew3 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} lp_id={LP_IDs.wavax[2]} {...props} />} />
      <Route exact path='/farming-new-4' render={props => <StakingNew4 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} lp_id={LP_IDs.wavax[3]} {...props} />} />
      <Route exact path='/farming-new-5' render={props => <StakingNew5 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} lp_id={LP_IDs.wavax[4]} {...props} />} />

      <Route exact path='/avaxvst-private' render={props => <VestingPrivate is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result} referrer={this.state.referrer} {...props} />} />

      <Route exact path='/staking-idyp-1' render={props => <ConstantStakingiDYP1 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} referrer={this.state.referrer} {...props} />} />
      <Route exact path='/staking-idyp-2' render={props => <ConstantStakingiDYP2 is_wallet_connected={this.state.is_wallet_connected} handleConnection={this.handleConnection} handleConnectionWalletConnect={this.handleConnectionWalletConnect} the_graph_result={this.state.the_graph_result_AVAX_V2} referrer={this.state.referrer} {...props} />} />

      {/*<Route exact path='/' render={props => <StakingList tvl_all={getFormattedNumber(this.getCombinedTvlUsd(), 2)} tvl_farming={getFormattedNumber(this.getTvlFarming(), 2)} {...props} />} />*/}
      </div>
      <Footer />

    </div>
  );
}
}

export default App;
