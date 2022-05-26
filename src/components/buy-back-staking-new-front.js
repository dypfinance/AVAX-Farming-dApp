import React from 'react'
import moment from 'moment'
// import { NavLink } from 'react-router-dom'
import getFormattedNumber from '../functions/get-formatted-number'
import Address from './address'
// import Clipboard from 'react-clipboard.js'
// import ReactTooltip from 'react-tooltip'
import Boxes from './boxes'
import Popup from "./popup";
import Tooltip from "@material-ui/core/Tooltip";
import {Button} from "@material-ui/core";
import Modal from "./modal";
import Dots from "./elements/dots";

export default function initStaking({ staking, constant, apr, lock, expiration_time }) {

    let { reward_token, BigNumber, alertify, reward_token_idyp, token_dyps } = window
    let token_symbol = 'DYP'

    // token, staking

    const TOKEN_DECIMALS = window.config.token_decimals

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function jsonToCsv(items) {
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(items[0])
        let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        csv.unshift(header.join(','))
        csv = csv.join('\r\n')
        return csv
    }

    window.handleDownload = ({ stakers, stakingTimes, lastClaimedTimes, stakedTokens }) => {
        let list = []
        stakers.forEach((staker, index) => {
            list.push({
                staker_address: staker,
                staking_timestamp_unix: stakingTimes[index],
                lastclaimed_timestamp_unix: lastClaimedTimes[index],
                staking_time: getDate(stakingTimes[index] * 1e3),
                lastclaimed_time: getDate(lastClaimedTimes[index] * 1e3),
                staked_tokens: stakedTokens[index]
            })
        })
        download('stakers-list.csv', jsonToCsv(list))

        function getDate(timestamp) {
            let a = new Date(timestamp)
            return a.toUTCString()
        }
    }

    class Staking extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                token_balance: '',
                pendingDivs: '',
                totalEarnedTokens: '',
                cliffTime: '',
                stakingTime: '',
                depositedTokens: '',
                lastClaimedTime: '',

                depositAmount: '',
                withdrawAmount: 0,

                coinbase: '0x0000000000000000000000000000000000000111',
                tvl: '',
                stakingOwner: null,
                approxDeposit: 100 ,
                approxDays: 365,

                usdPerToken: 0,

                selectedBuybackToken: Object.keys(window.buyback_tokens)[0],
                selectedTokenDecimals: window.buyback_tokens[Object.keys(window.buyback_tokens)[0]].decimals,
                selectedTokenBalance: '',
                selectedTokenSymbol: window.buyback_tokens[Object.keys(window.buyback_tokens)[0]].symbol,

                contractDeployTime: '',
                disburseDuration: '',

                show: false,
                popup: false,
                is_wallet_connected: false,
                tvlTotal: 0,
                tvlTotalBuyback1: 0,
                tvlTotalBuyback2: 0,
                apyBuyback1: 0,
                apyBuyback2: 0
            }

            this.showModal = this.showModal.bind(this)
            this.hideModal = this.hideModal.bind(this)

            this.showPopup = this.showPopup.bind(this)
            this.hidePopup = this.hidePopup.bind(this)
        }

        showModal = () => {
            this.setState({ show: true })
        }

        hideModal = () => {
            this.setState({ show: false })

        }

        showPopup = () => {
            this.setState({ popup: true })
        }

        hidePopup = () => {
            this.setState({ popup: false })

        }

        handleSelectedTokenChange = async (tokenAddress) => {
            let tokenDecimals = window.buyback_tokens[tokenAddress].decimals
            let selectedTokenSymbol = window.buyback_tokens[tokenAddress].symbol
            this.setState({selectedBuybackToken: tokenAddress, selectedTokenBalance: '', selectedTokenDecimals: tokenDecimals, selectedTokenSymbol})

            let selectedTokenBalance = await window.getTokenHolderBalance(tokenAddress, this.state.coinbase)
            this.setState({selectedTokenBalance})
        }

        handleListDownload = async (e) => {
            e.preventDefault()
            let m = window.alertify.message(`Processing...`)
            m.ondismiss = () => false
            let step = 100;
            let stakers = []
            let stakingTimes = []
            let lastClaimedTimes = []
            let stakedTokens = []
            let length = await staking.getNumberOfHolders()
            length = Number(length)
            try {
                for (let startIndex = 0; startIndex < length; startIndex += step) {
                    console.log({ startIndex, endIndex: startIndex + step })
                    let array = await staking.getStakersList(startIndex, Math.min(startIndex + step, length))
                    console.log(array)
                    stakers = stakers.concat(array.stakers)
                    stakingTimes = stakingTimes.concat(array.stakingTimestamps)
                    lastClaimedTimes = lastClaimedTimes.concat(array.lastClaimedTimeStamps)
                    stakedTokens = stakedTokens.concat(array.stakedTokens)
                }
                let result = { stakers, stakingTimes, lastClaimedTimes, stakedTokens }
                window.handleDownload(result)
            } catch (e) {
                console.error(e)
                alertify.error("Something went wrong while processing!")
            }
            finally {
                m.ondismiss = f => true
                m.dismiss()
            }
        }

        componentDidMount() {
            this.refreshBalance()
            window._refreshBalInterval = setInterval(this.refreshBalance, 3000)

            this.getPriceDYP()
        }

        getTotalTvl = async () =>
        {


            let usd_per_token = this.props.the_graph_result.token_data ? this.props.the_graph_result.token_data["0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"].token_price_usd : 1
            let usd_per_idyp = this.props.the_graph_result.token_data ? this.props.the_graph_result.token_data["0xbd100d061e120b2c67a24453cf6368e63f1be056"].token_price_usd : 1

            //apr is 30%
            let apy1_buyback1 = new BigNumber(0.225)
            let apy2_buyback1 = new BigNumber(0.25).div(usd_per_token).times(30).div(1e2).times(usd_per_idyp)

            // APR is 100% considering 1$ as initial investment, 0.75$ goes to Buyback
            let apy1_buyback2 = new BigNumber(0.75)
            let apy2_buyback2 = new BigNumber(0.25).div(usd_per_token).times(usd_per_idyp)

            let apyBuyback1 = new BigNumber(apy1_buyback1).plus(apy2_buyback1).times(1e2).toFixed(0)
            let apyBuyback2 = new BigNumber(apy1_buyback2).plus(apy2_buyback2).times(1e2).toFixed(0)

            this.setState({apyBuyback1, apyBuyback2})

        }

        getPriceDYP = async () => {
            let usdPerToken = await window.getPrice('defi-yield-protocol')
            this.setState({usdPerToken})
        }

        componentWillUnmount() {
            clearInterval(window._refreshBalInterval)
        }

        handleApprove = (e) => {
            e.preventDefault()
            let amount = this.state.depositAmount
            amount = new BigNumber(amount).times(10**this.state.selectedTokenDecimals).toFixed(0)
            window.approveToken(this.state.selectedBuybackToken, staking._address, amount)
        }

        handleStake = async (e) => {
            e.preventDefault()

            let selectedBuybackToken = this.state.selectedBuybackToken
            let amount = this.state.depositAmount

            amount = new BigNumber(amount).times(10**this.state.selectedTokenDecimals).toFixed(0)

            let _75Percent = new BigNumber(amount).times(75e2).div(100e2).toFixed(0)
            let _25Percent = new BigNumber(amount).minus(_75Percent).toFixed(0)

            let deadline = Math.floor(Date.now()/1e3 + window.config.tx_max_wait_seconds).toFixed(0)
            let router = await window.getPangolinRouterContract()
            let WETH = await router.methods.WAVAX().call()
            let platformTokenAddress = window.config.reward_token_idyp_address
            let platformTokenAddress_25Percent = window.config.reward_token_address

            let path = [...new Set([selectedBuybackToken, WETH, platformTokenAddress].map(a => a.toLowerCase()))]
            let _amountOutMin_75Percent = await router.methods.getAmountsOut(_75Percent, path).call()
            _amountOutMin_75Percent = _amountOutMin_75Percent[_amountOutMin_75Percent.length - 1]
            _amountOutMin_75Percent = new BigNumber(_amountOutMin_75Percent).times(100 - window.config.slippage_tolerance_percent).div(100).toFixed(0)

            let path_25Percent = [...new Set([selectedBuybackToken, WETH, platformTokenAddress_25Percent].map(a => a.toLowerCase()))]
            let _amountOutMin_25Percent = await router.methods.getAmountsOut(_25Percent, path_25Percent).call()
            _amountOutMin_25Percent = _amountOutMin_25Percent[_amountOutMin_25Percent.length - 1]
            _amountOutMin_25Percent = new BigNumber(_amountOutMin_25Percent).times(100 - window.config.slippage_tolerance_percent).div(100).toFixed(0)

            let _amountOutMin_stakingReferralFee = new BigNumber(0).toFixed(0)

            console.log({amount, selectedBuybackToken, _amountOutMin_75Percent, _amountOutMin_25Percent, _amountOutMin_stakingReferralFee, deadline})

            staking.stake(amount, selectedBuybackToken, _amountOutMin_75Percent, _amountOutMin_25Percent, _amountOutMin_stakingReferralFee, deadline)
        }

        handleWithdraw = async (e) => {
            e.preventDefault()

            let amountConstant = await constant.depositedTokens(this.state.coinbase)
            amountConstant = new BigNumber(amountConstant).toFixed(0)

            let amountBuyback = await staking.depositedTokens(this.state.coinbase)

            let router = await window.getPangolinRouterContract()
            let WETH = await router.methods.WAVAX().call()
            let platformTokenAddress = window.config.reward_token_address
            let rewardTokenAddress = window.config.reward_token_idyp_address
            let path = [...new Set([rewardTokenAddress, WETH, platformTokenAddress].map(a => a.toLowerCase()))]
            let _amountOutMin = await router.methods.getAmountsOut(amountBuyback, path).call()
            _amountOutMin = _amountOutMin[_amountOutMin.length - 1]
            _amountOutMin = new BigNumber(_amountOutMin).times(100 - window.config.slippage_tolerance_percent).div(100).toFixed(0)

            let deadline = Math.floor(Date.now()/1e3 + window.config.tx_max_wait_seconds)

            // console.log({amountBuyback, amountConstant, _amountOutMin})

            try {
                setTimeout(() => constant.unstake(amountConstant, 0, deadline), 10e3)
            }  catch(e) {
                console.error(e)
                return;
            }

            try {
                staking.unstake(amountBuyback, _amountOutMin, deadline)
            }  catch(e) {
                console.error(e)
                return;
            }
        }

        handleClaimDivs = async (e) => {
            e.preventDefault()

            let address = this.state.coinbase
            let amount = await staking.getTotalPendingDivs(address)

            let router = await window.getPangolinRouterContract()
            let WETH = await router.methods.WAVAX().call()
            let platformTokenAddress = window.config.reward_token_address
            let rewardTokenAddress = window.config.reward_token_idyp_address
            let path = [...new Set([rewardTokenAddress, WETH, platformTokenAddress].map(a => a.toLowerCase()))]
            let _amountOutMin = await router.methods.getAmountsOut(amount, path).call()
            _amountOutMin = _amountOutMin[_amountOutMin.length - 1]
            _amountOutMin = new BigNumber(_amountOutMin).times(100 - window.config.slippage_tolerance_percent).div(100).toFixed(0)

            let deadline = Math.floor(Date.now()/1e3 + window.config.tx_max_wait_seconds)

            //console.log({_amountOutMin, deadline})
            amount = await constant.getTotalPendingDivs(address)
            let _amountOutMinConstant = await router.methods.getAmountsOut(amount, path).call()
            _amountOutMinConstant = _amountOutMinConstant[_amountOutMinConstant.length - 1]
            _amountOutMinConstant = new BigNumber(_amountOutMinConstant).times(100 - window.config.slippage_tolerance_percent).div(100).toFixed(0)

            let referralFee = new BigNumber(_amountOutMinConstant).times(500).div(1e4).toFixed(0)
            referralFee = referralFee.toString()

            try {
                setTimeout(() => constant.claim(referralFee, _amountOutMinConstant, deadline),10e3)
            }  catch(e) {
                console.error(e)
                return;
            }

            try {
                staking.claim(_amountOutMin, deadline)
            }  catch(e) {
                console.error(e)
                return;
            }

        }

        handleReinvest = async (e) => {
            e.preventDefault()

            //Calculate for Constant Staking
            let address = this.state.coinbase
            let amount = await constant.getTotalPendingDivs(address)

            let router = await window.getPangolinRouterContract()
            let WETH = await router.methods.WAVAX().call()
            let platformTokenAddress = window.config.reward_token_address
            let rewardTokenAddress = window.config.reward_token_idyp_address
            let path = [...new Set([rewardTokenAddress, WETH, platformTokenAddress].map(a => a.toLowerCase()))]
            let _amountOutMin = await router.methods.getAmountsOut(amount, path).call()
            _amountOutMin = _amountOutMin[_amountOutMin.length - 1]
            _amountOutMin = new BigNumber(_amountOutMin).times(100 - window.config.slippage_tolerance_percent).div(100).toFixed(0)

            /* We don't have any referrer here because it is Staked from Buyback */

            // let referralFee = new BigNumber(_amountOutMin).times(500).div(1e4).toFixed(0)
            // referralFee = referralFee.toString()

            // _amountOutMin = _amountOutMin - referralFee
            // _amountOutMin = _amountOutMin.toString()

            let deadline = Math.floor(Date.now()/1e3 + window.config.tx_max_wait_seconds)

            console.log({_amountOutMin, deadline})

            try {
                setTimeout(() => constant.reInvest(0, _amountOutMin, deadline),10e3)
            }  catch(e) {
                console.error(e)
                return;
            }

            try {
                staking.reInvest()
            }  catch(e) {
                console.error(e)
                return;
            }
        }

        handleSetMaxDeposit = (e) => {
            e.preventDefault()
            this.setState({ depositAmount: new BigNumber(this.state.selectedTokenBalance).div(10**this.state.selectedTokenDecimals).toFixed(this.state.selectedTokenDecimals) })
        }
        handleSetMaxWithdraw = (e) => {
            e.preventDefault()
            this.setState({ withdrawAmount: new BigNumber(this.state.depositedTokens).div(1e18).toFixed(18) })
        }

        getAPY = () => {
            return apr
        }

        refreshBalance = async () => {
            let coinbase = this.state.coinbase

            if (window.coinbase_address){
                coinbase = window.coinbase_address
                this.setState({ coinbase })
            }

            this.getTotalTvl()

            let usd_per_dyps = this.props.the_graph_result.price_DYPS ? this.props.the_graph_result.price_DYPS : 1

            try {
                let amount = new BigNumber(1000000000000000000).toFixed(0)
                let router = await window.getPangolinRouterContract()
                let WETH = await router.methods.WAVAX().call()
                let platformTokenAddress = window.config.USDCe_address
                let rewardTokenAddress = window.config.reward_token_idyp_address
                let path = [...new Set([rewardTokenAddress, WETH, platformTokenAddress].map(a => a.toLowerCase()))]
                let _amountOutMin = await router.methods.getAmountsOut(amount, path).call()
                _amountOutMin = _amountOutMin[_amountOutMin.length - 1]
                _amountOutMin = new BigNumber(_amountOutMin).div(1e6).toFixed(18)

                //buyback
                let _bal = reward_token.balanceOf(coinbase)
                let _pDivs = staking.getTotalPendingDivs(coinbase)
                let _tEarned = staking.totalEarnedTokens(coinbase)
                let _stakingTime = staking.stakingTime(coinbase)
                let _dTokens = staking.depositedTokens(coinbase)
                let _dTokensBuyback = staking.depositedTokens(coinbase)
                let _lClaimTime = staking.lastClaimedTime(coinbase)
                let _tvl = reward_token_idyp.balanceOf(staking._address)
                let tStakers = staking.getNumberOfHolders()
                //constant Staking
                let _balConstant = constant.depositedTokens(coinbase) /* Balance of DYP on Constant Staking */
                let _pDivsConstant = constant.getTotalPendingDivs(coinbase) /* Pending Divs is iDYP */
                let _tvlConstant = reward_token.balanceOf(constant._address) /* TVL of DYP on Constant Staking */
                let _tvlConstantiDYP = reward_token_idyp.balanceOf(constant._address) /* TVL of iDYP on Constant Staking */
                let _tEarnedConstant = constant.totalEarnedTokens(coinbase)

                //Take DYPS Balance
                let _tvlDYPS = token_dyps.balanceOf(staking._address) /* TVL of DYPS */

                let [token_balance, pendingDivs, totalEarnedTokens, stakingTime,
                    depositedTokens, lastClaimedTime, tvl,
                    total_stakers, price_iDYP,
                    //constant staking
                    pendingDivsConstant, token_dyp_balance, tvlConstant, tvlConstantiDYP, totalEarnedTokensConstant,
                    depositedTokensBuyback, tvlDYPS
                ] = await Promise.all([_bal, _pDivs, _tEarned, _stakingTime, _dTokens, _lClaimTime, _tvl, tStakers, _amountOutMin,
                    _pDivsConstant, _balConstant, _tvlConstant, _tvlConstantiDYP, _tEarnedConstant, _dTokensBuyback, _tvlDYPS])

                pendingDivs = new BigNumber(pendingDivs).plus(pendingDivsConstant).times(_amountOutMin).toFixed(18)
                depositedTokens = new BigNumber(depositedTokens).times(_amountOutMin).toFixed(18)
                totalEarnedTokens = new BigNumber(totalEarnedTokens).plus(totalEarnedTokensConstant).times(_amountOutMin).toFixed(18)
                tvl =  new BigNumber(tvl).times(_amountOutMin).toFixed(18)

                //iDYP + DYP
                let dypValue = new BigNumber(token_dyp_balance).times(this.state.usdPerToken).toFixed(18)
                let tvlValue = new BigNumber(tvlConstant).times(this.state.usdPerToken).toFixed(18)
                let tvlValueiDYP = new BigNumber(tvlConstantiDYP).times(_amountOutMin).toFixed(18)

                depositedTokens = new BigNumber(depositedTokens).plus(dypValue).toFixed(18)
                tvl = new BigNumber(tvl).plus(tvlValue).plus(tvlValueiDYP).toFixed(18)

                let tvlDyps = new BigNumber(tvlDYPS).times(usd_per_dyps).toFixed(18)

                this.setState({
                    token_balance,
                    pendingDivs,
                    totalEarnedTokens,
                    stakingTime,
                    depositedTokens,
                    lastClaimedTime,
                    tvl,
                    tvlDyps,
                    total_stakers,
                    price_iDYP,
                    //constant staking
                    pendingDivsConstant,
                    token_dyp_balance,
                    tvlConstant,
                    totalEarnedTokensConstant,
                    //for Buyback Only depositedTokens unconverted
                    depositedTokensBuyback
                })
                let stakingOwner = await staking.owner()
                this.setState({ stakingOwner })
            } catch (e) {
                console.error(e)
            }

            //Set Value $ of iDYP & DYP for Withdraw Input
            this.setState({ withdrawAmount: new BigNumber(this.state.depositedTokens).div(1e18).toFixed(2) })

            staking.LOCKUP_TIME().then((cliffTime) => {
                this.setState({ cliffTime: Number(cliffTime) })
            }).catch(console.error)

            staking.contractStartTime().then(contractDeployTime => {
                this.setState({ contractDeployTime })
            })

            staking.REWARD_INTERVAL().then(disburseDuration => {
                this.setState({ disburseDuration })
            })

            try {
                let selectedTokenBalance = await window.getTokenHolderBalance(this.state.selectedBuybackToken, this.state.coinbase)
                this.setState({selectedTokenBalance})
            } catch (e) {
                console.warn(e)
            }

        }

        getUsdPerETH = () => {
            return this.props.the_graph_result.usd_per_eth || 0
        }

        getApproxReturn = () => {
            let APY = this.getAPY()
            let approxDays = this.state.approxDays
            let approxDeposit = this.state.approxDeposit

            return ( approxDeposit * APY / 100 / 365 * approxDays)
        }

        // getReferralLink = () => {
        //     return window.location.origin + window.location.pathname + '?r=' + this.state.coinbase
        // }

        render() {

            let {disburseDuration, contractDeployTime,  cliffTime, token_balance, pendingDivs, totalEarnedTokens, depositedTokens, stakingTime, coinbase, tvl } = this.state

            let { the_graph_result } = this.props

            let usd_per_token = the_graph_result.token_data ? the_graph_result.token_data["0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"].token_price_usd : 1
            let usd_per_idyp = the_graph_result.token_data ? the_graph_result.token_data["0xbd100d061e120b2c67a24453cf6368e63f1be056"].token_price_usd : 1

            token_balance = new BigNumber(token_balance ).div(1e18).toString(10)
            token_balance = getFormattedNumber(token_balance, 2)


            pendingDivs = new BigNumber(pendingDivs).div(10 ** TOKEN_DECIMALS).div(usd_per_token).toString(10)
            pendingDivs = getFormattedNumber(pendingDivs, 6)

            totalEarnedTokens = new BigNumber(totalEarnedTokens).div(10 ** TOKEN_DECIMALS).toString(10)
            totalEarnedTokens = getFormattedNumber(totalEarnedTokens, 2)

            depositedTokens = new BigNumber(depositedTokens).div(1e18).toString(10)
            depositedTokens = getFormattedNumber(depositedTokens, 2)

            tvl = new BigNumber(tvl ).div(1e18).toString(10)
            tvl = getFormattedNumber(tvl, 6)

            stakingTime = stakingTime * 1e3
            cliffTime = cliffTime * 1e3

            let showDeposit = true

            if (!isNaN(disburseDuration) && !isNaN(contractDeployTime)){
                let lastDay = parseInt(disburseDuration) + parseInt(contractDeployTime)
                let lockTimeExpire = parseInt(Date.now()) + parseInt(cliffTime)
                lockTimeExpire = lockTimeExpire.toString().substr(0,10)
                //console.log("now " + lockTimeExpire)
                //console.log('last ' + lastDay)
                if (lockTimeExpire > lastDay) {
                    showDeposit = false
                }
            }

            let cliffTimeInWords = 'lockup period'

            let canWithdraw = true
            if (!isNaN(cliffTime) && !isNaN(stakingTime)) {
                if (Date.now() - stakingTime <= cliffTime) {
                    canWithdraw = false
                    cliffTimeInWords = moment.duration((cliffTime - (Date.now() - stakingTime))).humanize(true)
                }
            }

            let total_stakers = this.state.total_stakers
            // let tvl_usd = this.state.tvl / 1e18 * this.state.usdPerToken
            let tvl_usd = this.state.tvl / 1e18

            let tvlDYPS = this.state.tvlDyps / 1e18
            tvl_usd = tvl_usd + tvlDYPS

            tvl_usd = getFormattedNumber(tvl_usd, 2)
            total_stakers = getFormattedNumber(total_stakers, 0)

            //console.log(total_stakers)

            let isOwner = String(this.state.coinbase).toLowerCase() === String(window.config.admin_address).toLowerCase()

            // APR is 100% considering 1$ as initial investment, 0.75$ goes to Buyback
            let apy1 = new BigNumber(0.75)
            let apy2 = new BigNumber(0.25).div(usd_per_token).times(usd_per_idyp)

            //apr is 30%
            if (apr == 30){
                apy1 = new BigNumber(0.225)
                apy2 = new BigNumber(0.25).div(usd_per_token).times(30).div(1e2).times(usd_per_idyp)

                //apr is 50%
                // apy1 = new BigNumber(0.375)
                // apy2 = new BigNumber(0.25).div(usd_per_token).div(2).times(usd_per_idyp)
            }

            let apy = new BigNumber(apy1).plus(apy2).times(1e2).toFixed(0)

            //console.log({usd_per_idyp})

            let id = Math.random().toString(36)

            let is_connected = this.props.is_wallet_connected

            let infoItems = [
                "75% from your deposit is added to PancakeSwap V2 BNB/iDYP LP",
                "25% from your deposit is sent to DYP Staking with % APR"
            ]
            let tooltip1 = infoItems.join('\n')

            let infoItems2 = [
                "75% WBNB/ETH rewards",
                "25% DYP rewards"
            ]
            let tooltip2 = infoItems2.join('\n')

            return (<div>

                    <div className='row'>
                        <div className="col-12" style={{background: 'url(img/banner/dyp_buyback_desk-11_avax.svg)', backgroundSize: 'cover', resize: 'both'}}>
                            <div className="container">
                                <Popup show={this.state.popup} handleClose={this.hidePopup} >
                                    <div className="earn-hero-content p4token-wrapper">
                                        <p className='h3'><b>DYP Buyback</b></p>
                                        <p>Deposit WAVAX, USDC.e, USDT.e, WETH.e, PNG, QI, DAI.e, XAVA, WBTC.e, or LINK.e, and earn {' '}
                                            {this.state.apyBuyback2 == 0 ? (
                                                <Dots />
                                            ) : (
                                                getFormattedNumber(this.state.apyBuyback2,0)
                                            )
                                            }% APR in DYP.
                                            To start earning, all you need is to deposit one of the supported
                                            assets into the Buyback contract. Then, all assets will automatically
                                            be converted into DYP + iDYP and deposited into a staking contract.
                                            You can choose from two different options, with rewards starting from {' '}
                                            {this.state.apyBuyback1 == 0 ? (
                                                <Dots />
                                            ) : (
                                                getFormattedNumber(this.state.apyBuyback1,0)
                                            )
                                            }% APR up to {this.state.apyBuyback2 == 0 ? (
                                                <Dots />
                                            ) : (
                                                getFormattedNumber(this.state.apyBuyback2,0)
                                            )
                                            }% APR, depending on the lock time from a minimum of
                                            zero-days up to a maximum of 90 days.</p>
                                        <p>The rewards are distributed automatically and can be claimed every day.
                                            When you unstake you will receive all the deposited amounts in DYP.</p>
                                    </div>

                                </Popup>
                                <Modal show={this.state.show} handleConnection={this.props.handleConnection} handleConnectionWalletConnect={this.props.handleConnectionWalletConnect} handleClose={this.hideModal} />
                                <div className='row'>
                                    <div className='col-12'>
                                        <p className="header-title-text">DYP Buyback</p>
                                    </div>
                                    <div className='col-7 col-md-7 col-lg-6 col-xl-5'>
                                        <div className='row'>
                                            <div className='col-9 col-md-5 mb-4'>
                                                <button onClick={this.showPopup}
                                                        className='btn  btn-block btn-primary button'
                                                        type='button'
                                                        style={{maxWidth: '100%', width: '100%'}}
                                                >
                                                    <img src="img/icon/bulb.svg" style={{float: 'left'}}
                                                         alt="wallet" />
                                                    More info
                                                </button>
                                            </div>
                                            <div className='col-11 col-md-5 mb-4'>
                                                <button className onClick={()=> window.open("https://www.youtube.com/watch?v=_WuIQUwwpGM&t=10s", "_blank")}
                                                        className='btn  btn-block btn-primary l-outline-btn button'
                                                        type='submit'
                                                        style={{maxWidth: '100%', width: '100%'}}
                                                >
                                                    <img src="img/icon/video.svg" style={{float: 'left'}}
                                                         alt="wallet" />
                                                    Video tutorial
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='container'>
                            <div className='token-staking mt-4'>
                                <div className='row p-3 p-sm-0 p-md-0'>
                                    <div className="col-12">
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <div className='row token-staking-form'>
                                                    <div className="col-12">
                                                        <div className="l-box">
                                                            {is_connected ?
                                                                <div className="row justify-content-center">
                                                                    <div className="col-9 col-sm-8 col-md-7 text-center text-md-left" style={{marginTop: '0px'}}>
                                                                        <img src="img/connected.png" style={{marginRight: '10px', marginTop: '3px'}}
                                                                             alt="wallet" />
                                                                        <span htmlFor="deposit-amount" style={{margin: '0', top: '3px', position: 'relative'}}>
                                                                    Wallet has been connected
                                                                </span>
                                                                    </div>
                                                                    <div className="col-8 col-sm-6 col-md-5 text-center">
                                                                        <div style={{marginTop: '5px', paddingRight: '15px'}}>
                                                                            <Address style={{fontFamily: 'monospace'}} a={coinbase} />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="row justify-content-center">
                                                                    <div className="col-11 col-sm-8 col-md-8 text-center text-md-left mb-3 mb-md-0" style={{marginTop: '0px'}}>
                                                                        <img src="img/icon/wallet.svg" style={{marginRight: '10px', marginTop: '3px'}}
                                                                             alt="wallet" />
                                                                        <label htmlFor="deposit-amount" style={{margin: '0', top: '3px', position: 'relative'}}>
                                                                            Please connect wallet to use this dApp
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-10 col-md-4 mb-3 mb-md-0">
                                                                        <button type="submit" onClick={this.showModal} className="btn  btn-block btn-primary l-outline-btn">
                                                                            Connect Wallet
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-xs-12'>
                                                <div className='row token-staking-form'>
                                                    <div className="col-12 padding-mobile">
                                                        <div className="" style={{background: 'linear-gradient(257.76deg, #E84142 6.29%, #CB2627 93.71%)',
                                                            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.06)', borderRadius: '6px', paddingLeft: '5px', padding: '10px'}}>
                                                            <div className="row">
                                                                <div style={{marginTop: '0px', paddingLeft: ''}} className='col-4 col-sm-4 col-md-3 mb-3 mb-md-0 pr-0'>
                                                                    <img src="img/icon/avax.svg"
                                                                         style={{marginRight: '4px', marginTop: '5px'}}
                                                                         alt="wallet" />
                                                                    <label htmlFor="deposit-amount"
                                                                           style={{margin: '0px', top: '3px', position: 'relative', color: 'white'}}>
                                                                        Avalanche
                                                                    </label>
                                                                </div>
                                                                <div className='col-8 col-sm-6 col-md-5 mb-3 mb-md-0 pr-2'>
                                                                    <div className='test'>
                                                                        <div className='tvl_test'>
                                                                            TVL USD <span className='testNumber'>$ {tvl_usd} </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-6 col-sm-4 col-md-4 mb-1 mb-md-0'>
                                                                    <div className='test'>
                                                                        <div className='tvl_test'>
                                                                            APR <span className='testNumber'> <img src='img/icon/vector.svg' /> {getFormattedNumber(apy, 2)}% </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className='row token-staking-form'>

                                            <div className='col-12'>
                                                <div className='l-box'>
                                                    {showDeposit == true ?
                                                        <form onSubmit={e => e.preventDefault()}>
                                                            <div className='form-group'>
                                                                <div className='row'>
                                                                    <label htmlFor='deposit-amount' className='col-md-8 d-block text-left'>DEPOSIT</label>
                                                                    {/*<div className='col-4'>*/}
                                                                    {/*    <a target='_blank' rel='noopener noreferrer' href={`https://app.uniswap.org/#/swap?inputCurrency=${liquidity}&outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17`} >*/}
                                                                    {/*        <button className='btn btn-sm btn-block btn-primary l-outline-btn' type='button'>*/}
                                                                    {/*            GET DYP*/}
                                                                    {/*        </button>*/}
                                                                    {/*    </a>*/}
                                                                    {/*</div>*/}
                                                                </div>
                                                                <div>
                                                                    <p>Balance: {getFormattedNumber(this.state.selectedTokenBalance/10**this.state.selectedTokenDecimals, 6)} {this.state.selectedTokenSymbol}</p>
                                                                    <select value={this.state.selectedBuybackToken} onChange={e => this.handleSelectedTokenChange(e.target.value)} className='form-control' className='form-control'>
                                                                        {Object.keys(window.buyback_tokens).map((t) => <option key={t} value={t}> {window.buyback_tokens[t].symbol} </option>)}
                                                                    </select>
                                                                    <br />
                                                                </div>
                                                                <div className='input-group '>

                                                                    <input disabled={!is_connected}  value={Number(this.state.depositAmount) > 0 ? this.state.depositAmount  : this.state.depositAmount} onChange={e => this.setState({ depositAmount: e.target.value })} className='form-control left-radius' placeholder='0' type='text' />
                                                                    <div className='input-group-append'>
                                                                        <button disabled={!is_connected}  className='btn  btn-primary right-radius btn-max l-light-btn' style={{ cursor: 'pointer' }} onClick={this.handleSetMaxDeposit}>
                                                                            MAX
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div style={{ paddingRight: '0.3rem' }} className='col-6'>
                                                                    <button disabled={!is_connected}  onClick={this.handleApprove} className='btn  btn-block btn-primary ' type='button'>
                                                                        APPROVE
                                                                    </button>
                                                                </div>
                                                                <div style={{ paddingLeft: '0.3rem' }} className='col-6'>
                                                                    <button disabled={!is_connected}  onClick={this.handleStake} className='btn  btn-block btn-primary l-outline-btn' type='submit'>
                                                                        DEPOSIT
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <p style={{ fontSize: '.8rem' }} className='mt-1 text-center mb-0 text-muted mt-3'>
                                                                {/* Some info text here.<br /> */}
                                                                Please approve before deposit. 0% fee for deposit.
                                                            </p>

                                                        </form>
                                                        :
                                                        <div className='row'>
                                                            <div className='col-md-12 d-block text-muted small'
                                                                 style={{fontSize: '15px'}}>
                                                                <b>NOTE:</b>
                                                            </div>
                                                            <div className='col-md-12 d-block text-muted small' style={{fontSize: '15px'}}>
                                                                Deposit not available because the contract expires faster than the pool lock time.
                                                            </div>
                                                            <div className='col-md-12 d-block mb-0 text-muted small'
                                                                 style={{fontSize: '15px'}}>
                                                                New contracts with improved strategies are coming soon, waiting for security audit results.
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='l-box'>
                                                    <form onSubmit={this.handleWithdraw}>
                                                        <div className='form-group'>
                                                            <label htmlFor='deposit-amount' className='d-block text-left'>WITHDRAW</label>
                                                            <div className='input-group '>
                                                                <input  value={`$${this.state.withdrawAmount}`} onChange={e => this.setState({ withdrawAmount:e.target.value })} className='form-control left-radius' placeholder='0' type='text' disabled />
                                                                {/*<div className='input-group-append'>*/}
                                                                {/*    <button className='btn  btn-primary right-radius btn-max l-light-btn' style={{ cursor: 'pointer' }} onClick={this.handleSetMaxWithdraw}>*/}
                                                                {/*        MAX*/}
                                                                {/*    </button>*/}
                                                                {/*</div>*/}
                                                            </div>
                                                        </div>
                                                        <button title={canWithdraw ? '' : `You recently staked, you can unstake ${cliffTimeInWords}`} disabled={!canWithdraw || !is_connected} className='btn  btn-primary btn-block l-outline-btn' type='submit'>
                                                            WITHDRAW
                                                        </button>
                                                        <p style={{fontSize: '.8rem'}}
                                                           className='mt-1 text-center mb-0 text-muted mt-3'>
                                                            To <strong>WITHDRAW</strong> you will be asked to sign <strong>2 transactions</strong>
                                                        </p>
                                                        <p style={{fontSize: '.8rem'}} className='mt-1 text-center text-muted mt-3'>0% fee for withdraw</p>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='l-box'>
                                                    <form onSubmit={this.handleClaimDivs}>
                                                        <div className='form-group'>
                                                            <label htmlFor='deposit-amount' className='text-left d-block'>REWARDS</label>
                                                            <div className='form-row'>
                                                                {/* <div className='col-md-6'>
                                                        <p className='form-control  text-right' style={{ border: 'none', marginBottom: 0, paddingLeft: 0, background: 'transparent', color: '#222' }}><span style={{ fontSize: '1.2rem', color: 'rgb(255, 0, 122)' }}>{pendingDivsEth}</span> <small className='text-bold'>WETH</small></p>
                                                    </div> */}
                                                                <div className='col-md-12'>
                                                                    {/*<p className='form-control  text-right' style={{ border: 'none', marginBottom: 0, paddingLeft: 0, background: 'transparent', color: 'var(--text-color)' }}><span style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>{pendingDivs}</span> <small className='text-bold'>DYP</small></p>*/}
                                                                    <input value={Number(pendingDivs) > 0 ? `${pendingDivs} DYP` : `${pendingDivs} DYP`} onChange={e => this.setState({pendingDivs: Number(e.target.value) > 0 ? e.target.value : e.target.value})} className='form-control left-radius' placeholder='0' type='text' disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='form-row'>
                                                            <div className='col-md-6 mb-2'>
                                                                <button disabled={!is_connected}  className='btn  btn-primary btn-block ' type='submit'>
                                                                    CLAIM
                                                                </button>
                                                            </div>
                                                            <div className='col-md-6 mb-2'>
                                                                <button disabled={!is_connected}  className='btn  btn-primary btn-block l-outline-btn' type='button' onClick={this.handleReinvest}>
                                                                    REINVEST
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p style={{fontSize: '.8rem'}}
                                                           className='mt-1 text-center mb-0 text-muted mt-3'>
                                                            To <strong>CLAIM</strong> you will be asked to sign <strong>2 transactions</strong>
                                                        </p>
                                                    </form>
                                                </div>
                                            </div>
                                            {/*<div className='col-12'>*/}
                                            {/*    <div className='l-box'>*/}
                                            {/*        <form onSubmit={(e) => e.preventDefault()}>*/}
                                            {/*            <div className='form-group'>*/}
                                            {/*                <label htmlFor='deposit-amount' className='d-block text-left'>RETURN CALCULATOR</label>*/}
                                            {/*                <div className='row'>*/}
                                            {/*                    <div className='col'>*/}
                                            {/*                        <label style={{ fontSize: '1rem', fontWeight: 'normal' }}>DYP to Deposit</label>*/}
                                            {/*                        <input className='form-control ' value={ this.state.approxDeposit} onChange={e => this.setState({ approxDeposit: e.target.value })} placeholder='0' type='text' />*/}
                                            {/*                    </div>*/}
                                            {/*                    <div className='col'>*/}
                                            {/*                        <label style={{ fontSize: '1rem', fontWeight: 'normal' }}>Days</label>*/}
                                            {/*                        <input className='form-control ' value={this.state.approxDays} onChange={e => this.setState({ approxDays: e.target.value })} type='text' />*/}
                                            {/*                    </div>*/}
                                            {/*                </div>*/}
                                            {/*            </div>*/}
                                            {/*            <p>*/}
                                            {/*                Approx. {getFormattedNumber(this.getApproxReturn(), 6)} DYP*/}
                                            {/*            </p>*/}
                                            {/*            /!*<p style={{ fontSize: '.8rem' }} className='mt-1 text-center'>Approx. Value Not Considering Staking / Unstakig Fees.</p>*!/*/}
                                            {/*        </form>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>

                                        <div className='l-box'>
                                            <div className='table-responsive'>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', padding: '.3rem' }}>STATS</h3>
                                                <table className='table-stats table table-sm table-borderless'>
                                                    <tbody>
                                                    {/*<tr>*/}
                                                    {/*    <th>My Address</th>*/}
                                                    {/*    <td className='text-right'>*/}
                                                    {/*        <Address style={{ fontFamily: 'monospace' }} a={coinbase} />*/}
                                                    {/*    </td>*/}
                                                    {/*</tr>*/}
                                                    {/*<tr>*/}
                                                    {/*    <th>Contract Address</th>*/}
                                                    {/*    <td className='text-right'>*/}
                                                    {/*        <Address style={{ fontFamily: 'monospace' }} a={staking._address} />*/}
                                                    {/*    </td>*/}
                                                    {/*</tr>*/}

                                                    <tr>
                                                        <th>Contract Expiration</th>
                                                        <td className="text-right"><strong>{expiration_time}</strong></td>
                                                    </tr>

                                                    <tr>
                                                        <th>My DYP Balance</th>
                                                        <td className="text-right"><strong>{token_balance}</strong> <small>{token_symbol}</small></td>
                                                    </tr>

                                                    <tr>
                                                        <th>My Deposit Value</th>
                                                        <td className="text-right"><strong>${depositedTokens}</strong> <small>USD</small></td>
                                                    </tr>
                                                    {/*<tr>*/}
                                                    {/*    <th>Total DYP Locked</th>*/}
                                                    {/*    <td className="text-right"><strong>{tvl}</strong> <small>{token_symbol}</small></td>*/}
                                                    {/*</tr>*/}

                                                    <tr>
                                                        <th>Total Earned</th>
                                                        <td className="text-right"><strong>${totalEarnedTokens}</strong> <small>USD</small></td>
                                                    </tr>

                                                    <tr>
                                                        <th>TVL USD</th>
                                                        <td className="text-right"><strong>${tvl_usd}</strong> <small>USD</small></td>
                                                    </tr>
                                                    {/* <tr>
                                               <th>Total Stakers</th>
                                               <td className="text-right"><strong>{total_stakers}</strong> <small></small></td>
                                            </tr> */}
                                                    {/* <tr>
                                        <th>Pending</th>
                                        <td className="text-right"><strong>{pendingDivs}</strong> <small>DYP</small></td>
                                    </tr> */}

                                                    {is_connected &&

                                                        <tr>
                                                            <td style={{ fontSize: '1rem', paddingTop: '2rem' }} colSpan='2' className='text-center'>
                                                                <a target='_blank' rel='noopener noreferrer' href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}>View Transaction History on SnowTrace</a> &nbsp; <i style={{ fontSize: '.8rem' }} className='fas fa-external-link-alt'></i>
                                                            </td>
                                                        </tr>
                                                    }

                                                    {/* <tr>
                                                <td style={{ fontSize: '1rem' }} colSpan='2' className='text-center'>
                                                    <span className='lp-link'>
                                                        <NavLink style={{fontSize: '1rem'}} to='/referral-stats'>View Referral Stats</NavLink>
                                                    </span>
                                                </td>
                                            </tr> */}
                                                    {/* <tr>
                                                <td colSpan='2'>
                                                    <div><span style={{fontSize: '.8rem'}}>

                                                        <span style={{ cursor: "pointer" }}>
                                                            <Clipboard
                                                                component="span"
                                                                onSuccess={e => {
                                                                    setTimeout(() => ReactTooltip.hide(), 2000);
                                                                }} data-event="click" data-for={id} data-tip="Copied To Clipboard!" data-clipboard-text={this.getReferralLink()}>Referral Link:  &nbsp; <span

                                                                title="Copy link to clipboard"
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }} className="fas fa-paste"></span></Clipboard>
                                                            <ReactTooltip id={id} effect="solid" />
                                                        </span>


                                                        <br /><a className='text-muted small' href={this.getReferralLink()}> {this.getReferralLink()} </a></span></div>
                                                </td>
                                            </tr> */}
                                                    <tr>

                                                    </tr>
                                                    {isOwner && <tr>
                                                        <td style={{ fontSize: '1rem' }} colSpan='2' className='text-center'>
                                                            <a onClick={this.handleListDownload} target='_blank' rel='noopener noreferrer' href='#'><i style={{ fontSize: '.8rem' }} className='fas fa-download'></i> Download Stakers List </a>
                                                        </td>
                                                    </tr>}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* <div className='mt-3 text-center'>
                    <p><small>Some info text here</small></p>
                </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }


    return Staking
}
