import React from "react";
import { Route } from "react-router-dom";

import initStaking from "./components/staking";
import initBuybackStaking from "./components/buy-back-staking";
import initVesting from "./components/vesting";
import initVestingStaking from "./components/vesting-staking";

/* New Contracts */
// import initConstantStaking from './components/constant-staking'
import initConstantStaking from "./components/constant-staking-new-front";
// import initBuybackStakingNew from './components/buy-back-staking-new'

import initBuybackStakingNew from "./components/buy-back-staking-new-front";

// import initStakingNew from './components/staking-new'
import initStakingNew from "./components/staking-new-front";
// import initConstantStakingiDYP from './components/constant-staking-idyp'
import initConstantStakingiDYP from "./components/constant-staking-idyp-new-front";

import initConstantStakingDYP from "./components/constant-staking-new-front-v1";

// import initConstantStakingDai from './components/constant-staking-dai'
import initConstantStakingDai from "./components/constant-staking-dai-front";

import StakingList from "./components/staking-list";
import StakingListEth from "./components/staking-list-eth.js";

// import StakingStats from './components/staking-stats'
import StakingStats from "./components/staking-stats-new";
import FullStakingStats from "./components/full-staking-stats";
import Header from "./components/header";
import Footer from "./components/footer";

import getFormattedNumber from "./functions/get-formatted-number";
import setupnetwork from "./functions/setupnetwork";

import WalletConnectProvider from "@walletconnect/web3-provider";

//const eth_address = 'ETH'
const wbnb_address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";

const { rebase_factors } = window;

const BuybackStaking = initBuybackStaking({
  staking: window.buyback_staking,
  apr: 100,
  expiration_time: "1 December 2021",
});

const Staking3 = initStaking({
  token: window.token,
  staking: window.staking,
  liquidity: wbnb_address,
  lp_symbol: "DYP/AVAX",
  reward: "30,000",
  lock: "3 Days",
  rebase_factor: rebase_factors[0],
  expiration_time: "2 January 2022",
});
const Staking30 = initStaking({
  token: window.token_dyp_30,
  staking: window.staking_dyp_30,
  liquidity: wbnb_address,
  lp_symbol: "DYP/AVAX",
  reward: "45,000",
  lock: "30 Days",
  rebase_factor: rebase_factors[1],
  expiration_time: "2 January 2022",
});
const Staking60 = initStaking({
  token: window.token_dyp_60,
  staking: window.staking_dyp_60,
  liquidity: wbnb_address,
  lp_symbol: "DYP/AVAX",
  reward: "75,000",
  lock: "60 Days",
  rebase_factor: rebase_factors[2],
  expiration_time: "2 January 2022",
});
const Staking90 = initStaking({
  token: window.token_dyp_90,
  staking: window.staking_dyp_90,
  liquidity: wbnb_address,
  lp_symbol: "DYP/AVAX",
  reward: "100,000",
  lock: "90 Days",
  rebase_factor: rebase_factors[3],
  expiration_time: "2 January 2022",
});

const eth_address = "ETH";
const Vesting = initVesting({
  staking: window.constant_staking_30,
  buyers: true,
  apr: 0,
  liquidity: eth_address,
  expiration_time: "16 April 2022",
});
const VestingStaking = initVestingStaking({
  staking: window.constant_staking_60,
  apr: 0,
  liquidity: eth_address,
  expiration_time: "16 April 2022",
});
const VestingAirdrop = initVesting({
  staking: window.constant_staking_90,
  buyers: false,
  apr: 0,
  liquidity: eth_address,
  expiration_time: "23 November 2022",
});
const VestingStakingAirdrop = initVestingStaking({
  staking: window.constant_staking_120,
  apr: 0,
  liquidity: eth_address,
  expiration_time: "23 November 2022",
});

//Constant Staking New
const avax_address = "AVAX";
const ConstantStaking30 = initConstantStaking({
  staking: window.constant_staking_new1,
  apr: 25,
  liquidity: avax_address,
  expiration_time: "6 December 2022",
  fee: 0.25,
});
const ConstantStaking90 = initConstantStaking({
  staking: window.constant_staking_new2,
  apr: 50,
  liquidity: avax_address,
  expiration_time: "6 December 2022",
  fee: 0.5,
});

//Constant Staking NEW DYP -> DAI
const ConstantStakingDai = initConstantStakingDai({
  staking: window.constant_stakingdai,
  apr: 25,
  liquidity: avax_address,
  expiration_time: "Expired",
  other_info: true,
});

//Constant Staking NEW DYP -> DYP
const ConstantStakingDYP = initConstantStakingDYP({
  staking: window.constant_staking_new10,
  apr: 30,
  liquidity: avax_address,
  expiration_time: "14 July 2023",
  other_info: false,
  fee: 3.5,
});
const ConstantStakingDYP10APR = initConstantStakingDYP({
  staking: window.constant_staking_new11,
  apr: 10,
  liquidity: avax_address,
  expiration_time: "05 August 2023",
  other_info: false,
  fee: 1,
});

//Buyback New
const BuybackStaking1 = initBuybackStakingNew({
  staking: window.buyback_staking1_1,
  constant: window.constant_staking_new3,
  apr: 30,
  expiration_time: "6 December 2022",
  fee: 1,
});
const BuybackStaking2 = initBuybackStakingNew({
  staking: window.buyback_staking1_2,
  constant: window.constant_staking_new4,
  apr: 100,
  expiration_time: "6 December 2022",
  fee: 3.5,
});

//Farming New
const StakingNew1 = initStakingNew({
  token: window.token_new,
  staking: window.farming_new_1,
  constant: window.constant_staking_new5,
  liquidity: wbnb_address,
  lp_symbol: "USD",
  reward: "30,000",
  lock: "3 Days",
  rebase_factor: rebase_factors[0],
  expiration_time: "6 December 2022",
  fee: 0.3,
});
const StakingNew2 = initStakingNew({
  token: window.token_new,
  staking: window.farming_new_2,
  constant: window.constant_staking_new6,
  liquidity: wbnb_address,
  lp_symbol: "USD",
  reward: "30,000",
  lock: "3 Days",
  rebase_factor: rebase_factors[0],
  expiration_time: "6 December 2022",
  fee: 0.3,
});
const StakingNew3 = initStakingNew({
  token: window.token_new,
  staking: window.farming_new_3,
  constant: window.constant_staking_new7,
  liquidity: wbnb_address,
  lp_symbol: "USD",
  reward: "30,000",
  lock: "3 Days",
  rebase_factor: rebase_factors[0],
  expiration_time: "6 December 2022",
  fee: 0.4,
});
const StakingNew4 = initStakingNew({
  token: window.token_new,
  staking: window.farming_new_4,
  constant: window.constant_staking_new8,
  liquidity: wbnb_address,
  lp_symbol: "USD",
  reward: "30,000",
  lock: "3 Days",
  rebase_factor: rebase_factors[0],
  expiration_time: "6 December 2022",
  fee: 0.8,
});
const StakingNew5 = initStakingNew({
  token: window.token_new,
  staking: window.farming_new_5,
  constant: window.constant_staking_new9,
  liquidity: wbnb_address,
  lp_symbol: "USD",
  reward: "30,000",
  lock: "3 Days",
  rebase_factor: rebase_factors[0],
  expiration_time: "6 December 2022",
  fee: 1.2,
});

//Vesting Private
const VestingPrivate = initVestingStaking({
  staking: window.constant_staking_130,
  apr: 0,
  liquidity: eth_address,
  expiration_time: "28 May 2022",
});

//Constant Staking iDYP
const ConstantStakingiDYP1 = initConstantStakingiDYP({
  staking: window.constant_staking_idyp_1,
  apr: 20,
  liquidity: avax_address,
  expiration_time: "28 February 2023",
  other_info: true,
  fee_s: 0,
  fee_u: 0.25,
});
const ConstantStakingiDYP2 = initConstantStakingiDYP({
  staking: window.constant_staking_idyp_2,
  apr: 45,
  liquidity: avax_address,
  expiration_time: "28 February 2023",
  other_info: true,
  fee_s: 0,
  fee_u: 0.25,
});
const ConstantStakingiDYP3 = initConstantStakingiDYP({
  staking: window.constant_staking_idyp_5,
  apr: 15,
  liquidity: eth_address,
  expiration_time: "15 August 2023",
  other_info: false,
  fee_s: 1,
  fee_u: 0,
});
const ConstantStakingiDYP4 = initConstantStakingiDYP({
  staking: window.constant_staking_idyp_6,
  apr: 30,
  liquidity: eth_address,
  expiration_time: "15 August 2023",
  other_info: false,
  fee_s: 3.5,
  fee_u: 0,
});

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div
      className={showHideClassName}
      onClick={() => {
        // close modal when outside of modal is clicked
        handleClose();
      }}
    >
      <section className="modal-main">
        {children}
        {/*<button type="button" onClick={handleClose}>*/}
        {/*    Close*/}
        {/*</button>*/}
      </section>
    </div>
  );
};

let { BigNumber, LP_IDs } = window;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_wallet_connected: false,
      the_graph_result: JSON.parse(JSON.stringify(window.the_graph_result)),
      the_graph_result_AVAX_V2: JSON.parse(
        JSON.stringify(window.the_graph_result_avax_v2)
      ),
      referrer: "",
      darkTheme: false,
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  toggleTheme = () => {
    let darkTheme = !this.state.darkTheme;
    document.body.classList[darkTheme ? "add" : "remove"]("dark");
    this.setState({ darkTheme });
  };

  componentDidMount() {
    this.tvl().then();
    window.location.href='https://app.dypius.com'
  }

  tvl = async () => {
    try {
      let the_graph_result_AVAX_V2 = await window.get_the_graph_avax_v2();
      this.setState({
        the_graph_result_AVAX_V2: JSON.parse(
          JSON.stringify(the_graph_result_AVAX_V2)
        ),
      });
    } catch (e) {
      // window.alertify.error("Cannot fetch TVL");
      console.error("TVL AVAX V2 error: " + e);
    }

    try {
      let the_graph_result = await window.refresh_the_graph_result();
      this.setState({
        the_graph_result: JSON.parse(JSON.stringify(the_graph_result)),
      });
    } catch (e) {
      // window.alertify.error("Cannot fetch TVL");
      console.error("Cannot fetch TVL: " + e);
    }
  };

  getCombinedTvlUsd = () => {
    let tvl = 0;
    if (!this.state.the_graph_result.lp_data) return 0;

    let lp_ids = Object.keys(this.state.the_graph_result.lp_data);
    for (let id of lp_ids) {
      tvl += this.state.the_graph_result.lp_data[id].tvl_usd * 1 || 0;
    }
    return tvl;
  };

  getTvlFarming = () => {
    let tvl = 0;
    if (!this.state.the_graph_result.lp_data) return 0;

    tvl = window.TVL_FARMING_POOLS;

    return tvl;
  };

  getCombinedStakers = () => {
    let stakers = 0;
    if (!this.state.the_graph_result.lp_data) return 0;
    let lp_ids = Object.keys(this.state.the_graph_result.lp_data);
    for (let id of lp_ids) {
      stakers += this.state.the_graph_result.lp_data[id].stakers_num * 1 || 0;
    }
    return stakers;
  };

  handleConnection = async () => {
    try {
      let is_wallet_connected = await window.connectWallet(undefined, false);
      //await setupnetwork()
      let referrer = window.param("r");

      if (is_wallet_connected) {
        if (referrer) {
          referrer = String(referrer).trim().toLowerCase();
        }
        if (!window.web3.utils.isAddress(referrer)) {
          referrer = window.config.ZERO_ADDRESS;
        }
      }
      this.setState({
        is_wallet_connected,
        coinbase: await window.web3.eth.getCoinbase(),
        referrer,
      });

      try {
        let the_graph_result_AVAX_V2 = await window.get_the_graph_avax_v2();
        this.setState({
          the_graph_result_AVAX_V2: JSON.parse(
            JSON.stringify(the_graph_result_AVAX_V2)
          ),
        });
      } catch (e) {
        // window.alertify.error("Cannot fetch TVL");
        console.error("TVL AVAX V2 error: " + e);
      }

      try {
        let the_graph_result = await window.refresh_the_graph_result();
        this.setState({
          the_graph_result: JSON.parse(JSON.stringify(the_graph_result)),
        });
      } catch (e) {
        // window.alertify.error("Cannot fetch TVL");
        console.error("Cannot fetch TVL: " + e);
      }
    } catch (e) {
      window.alertify.error(String(e));
    }
  };

  handleConnectionWalletConnect = async () => {
    try {
      let provider = new WalletConnectProvider({
        rpc: {
          1: "https://api.avax.network/ext/bc/C/rpc",
        },
      });

      let is_wallet_connected = await window.connectWallet(provider, true);
      //await setupnetwork()
      let referrer = window.param("r");

      if (is_wallet_connected) {
        if (referrer) {
          referrer = String(referrer).trim().toLowerCase();
        }
        if (!window.web3.utils.isAddress(referrer)) {
          referrer = window.config.ZERO_ADDRESS;
        }
      }
      this.setState({
        is_wallet_connected,
        coinbase: await window.web3.eth.getCoinbase(),
        referrer,
      });

      try {
        let the_graph_result_AVAX_V2 = await window.get_the_graph_avax_v2();
        this.setState({
          the_graph_result_AVAX_V2: JSON.parse(
            JSON.stringify(the_graph_result_AVAX_V2)
          ),
        });
      } catch (e) {
        // window.alertify.error("Cannot fetch TVL");
        console.error("TVL AVAX V2 error: " + e);
      }

      try {
        let the_graph_result = await window.refresh_the_graph_result();
        this.setState({
          the_graph_result: JSON.parse(JSON.stringify(the_graph_result)),
        });
      } catch (e) {
        // window.alertify.error("Cannot fetch TVL");
        console.error("Cannot fetch TVL: " + e);
      }
    } catch (e) {
      window.alertify.error(String(e));
    }
  };

  render() {
    return (
      <div className="App App-header" style={{ overflowX: "hidden" }}>
        <Header
          darkTheme={this.state.darkTheme}
          toggleTheme={this.toggleTheme}
        />
        <div style={{ minHeight: "550px" }} className="App-container">
          <Route
            exact
            path="/staking-stats"
            render={(props) => (
              <StakingStats
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/full-staking-stats"
            render={(props) => (
              <FullStakingStats
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                {...props}
              />
            )}
          />

          {/*<Route exact path="/" render={props => <StakingListEth the_graph_result={this.state.the_graph_result} lp_id={[LP_IDs.eth[0], LP_IDs.eth[1], LP_IDs.eth[2], LP_IDs.eth[3]]} {...props} />} />*/}
          <Route
            exact
            path="/"
            render={(props) => (
              <StakingNew5
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                lp_id={LP_IDs.wavax[4]}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/staking-avax-3"
            render={(props) => (
              <Staking3
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                lp_id={LP_IDs.eth[0]}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/staking-avax-30"
            render={(props) => (
              <Staking30
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                lp_id={LP_IDs.eth[1]}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/staking-avax-60"
            render={(props) => (
              <Staking60
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                lp_id={LP_IDs.eth[2]}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/staking-avax-90"
            render={(props) => (
              <Staking90
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                lp_id={LP_IDs.eth[3]}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/staking-buyback"
            render={(props) => (
              <BuybackStaking
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/vesting"
            render={(props) => (
              <Vesting
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/vesting-staking"
            render={(props) => (
              <VestingStaking
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/airdrop"
            render={(props) => (
              <VestingAirdrop
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/airdrop-staking"
            render={(props) => (
              <VestingStakingAirdrop
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />

          {/*Constant Staking New*/}
          <Route
            exact
            path="/constant-staking-1"
            render={(props) => (
              <ConstantStaking30
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/constant-staking-2"
            render={(props) => (
              <ConstantStaking90
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />

          {/*Constant Staking DYP -> DAI*/}
          <Route
            exact
            path="/constant-staking-3"
            render={(props) => (
              <ConstantStakingDai
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />

          {/*Constant Staking DYP -> DYP 30%*/}
          <Route
            exact
            path="/constant-staking-180"
            render={(props) => (
              <ConstantStakingDYP
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/constant-staking-30"
            render={(props) => (
              <ConstantStakingDYP10APR
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />

          {/*Buyback New*/}
          <Route
            exact
            path="/staking-buyback-1"
            render={(props) => (
              <BuybackStaking1
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/staking-buyback-2"
            render={(props) => (
              <BuybackStaking2
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                {...props}
              />
            )}
          />

          {/*Farming New*/}
          <Route
            exact
            path="/farming-new-1"
            render={(props) => (
              <StakingNew1
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                lp_id={LP_IDs.wavax[0]}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/farming-new-2"
            render={(props) => (
              <StakingNew2
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                lp_id={LP_IDs.wavax[1]}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/farming-new-3"
            render={(props) => (
              <StakingNew3
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                lp_id={LP_IDs.wavax[2]}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/farming-new-4"
            render={(props) => (
              <StakingNew4
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                lp_id={LP_IDs.wavax[3]}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/farming-new-5"
            render={(props) => (
              <StakingNew5
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                lp_id={LP_IDs.wavax[4]}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/avaxvst-private"
            render={(props) => (
              <VestingPrivate
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/staking-idyp-1"
            render={(props) => (
              <ConstantStakingiDYP1
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/staking-idyp-2"
            render={(props) => (
              <ConstantStakingiDYP2
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/staking-idyp-3"
            render={(props) => (
              <ConstantStakingiDYP3
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/staking-idyp-4"
            render={(props) => (
              <ConstantStakingiDYP4
                is_wallet_connected={this.state.is_wallet_connected}
                handleConnection={this.handleConnection}
                handleConnectionWalletConnect={
                  this.handleConnectionWalletConnect
                }
                the_graph_result={this.state.the_graph_result_AVAX_V2}
                referrer={this.state.referrer}
                {...props}
              />
            )}
          />

          {/*<Route exact path='/' render={props => <StakingList tvl_all={getFormattedNumber(this.getCombinedTvlUsd(), 2)} tvl_farming={getFormattedNumber(this.getTvlFarming(), 2)} {...props} />} />*/}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
