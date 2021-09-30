import React from 'react'
import moment from 'moment'
// import { NavLink } from 'react-router-dom'
import getFormattedNumber from '../functions/get-formatted-number'
import Address from './address'
// import Clipboard from 'react-clipboard.js'
// import ReactTooltip from 'react-tooltip'
import Boxes from './boxes'

export default function initStaking({ staking, apr, lock, expiration_time }) {

    let { reward_token, BigNumber, alertify } = window
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
                withdrawAmount: '',

                coinbase: '',
                tvl: '',
                stakingOwner: null,
                approxDeposit: 100 ,
                approxDays: 365,

                usdPerToken: '',

                selectedBuybackToken: Object.keys(window.buyback_tokens)[0],
                selectedTokenDecimals: window.buyback_tokens[Object.keys(window.buyback_tokens)[0]].decimals,
                selectedTokenBalance: '',
                selectedTokenSymbol: window.buyback_tokens[Object.keys(window.buyback_tokens)[0]].symbol,

                contractDeployTime: '',
                disburseDuration: ''
            }
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
            let deadline = Math.floor(Date.now()/1e3 + window.config.tx_max_wait_seconds)
            let router = await window.getUniswapRouterContract()
            let WETH = await router.methods.WAVAX().call()
            let platformTokenAddress = window.config.reward_token_address
            let path = [...new Set([selectedBuybackToken, WETH, platformTokenAddress].map(a => a.toLowerCase()))]
            let _amountOutMin = await router.methods.getAmountsOut(amount, path).call()
            _amountOutMin = _amountOutMin[_amountOutMin.length - 1]
            _amountOutMin = new BigNumber(_amountOutMin).times(100 - window.config.slippage_tolerance_percent).div(100).toFixed(0)
            console.log({amount, selectedBuybackToken, _amountOutMin, deadline})
            staking.stake(amount, selectedBuybackToken, _amountOutMin, deadline)
        }

        handleWithdraw = (e) => {
            e.preventDefault()
            let amount = this.state.withdrawAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            staking.unstake(amount)
        }

        handleClaimDivs = (e) => {
            e.preventDefault()
            staking.claim()
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
            let coinbase = window.coinbase_address
            this.setState({ coinbase })
            try {
                let _bal = reward_token.balanceOf(coinbase)
                let _pDivs = staking.getTotalPendingDivs(coinbase)
                let _tEarned = staking.totalEarnedTokens(coinbase)
                let _stakingTime = staking.stakingTime(coinbase)
                let _dTokens = staking.depositedTokens(coinbase)
                let _lClaimTime = staking.lastClaimedTime(coinbase)
                let _tvl = reward_token.balanceOf(staking._address)
                let tStakers = staking.getNumberOfHolders()
                let [token_balance, pendingDivs, totalEarnedTokens, stakingTime,
                    depositedTokens, lastClaimedTime, tvl,
                    total_stakers
                ] = await Promise.all([_bal, _pDivs, _tEarned, _stakingTime, _dTokens, _lClaimTime, _tvl, tStakers])

                this.setState({
                    token_balance,
                    pendingDivs,
                    totalEarnedTokens,
                    stakingTime,
                    depositedTokens,
                    lastClaimedTime,
                    tvl,
                    total_stakers,
                })
                let stakingOwner = await staking.owner()
                this.setState({ stakingOwner })
            } catch (e) {
                console.error(e)
            }


            staking.LOCKUP_TIME().then((cliffTime) => {
                this.setState({ cliffTime: Number(cliffTime) })
            }).catch(console.error)

            staking.contractStartTime().then(contractDeployTime => {
                this.setState({ contractDeployTime })
            })

            staking.REWARD_INTERVAL().then(disburseDuration => {
                this.setState({ disburseDuration })
            })

            let usdPerToken = await window.getPrice('defi-yield-protocol')
            this.setState({usdPerToken})

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

            let {disburseDuration, contractDeployTime, cliffTime, token_balance, pendingDivs, totalEarnedTokens, depositedTokens, stakingTime, coinbase, tvl } = this.state


            token_balance = new BigNumber(token_balance ).div(1e18).toString(10)
            token_balance = getFormattedNumber(token_balance, 6)


            pendingDivs = new BigNumber(pendingDivs).div(10 ** TOKEN_DECIMALS).toString(10)
            pendingDivs = getFormattedNumber(pendingDivs, 6)

            totalEarnedTokens = new BigNumber(totalEarnedTokens).div(10 ** TOKEN_DECIMALS).toString(10)
            totalEarnedTokens = getFormattedNumber(totalEarnedTokens, 6)

            depositedTokens = new BigNumber(depositedTokens).div(1e18).toString(10)
            depositedTokens = getFormattedNumber(depositedTokens, 6)

            tvl = new BigNumber(tvl ).div(1e18).toString(10)
            tvl = getFormattedNumber(tvl, 6)

            stakingTime = stakingTime * 1e3
            cliffTime = cliffTime * 1e3

            let showDeposit = true

            if (!isNaN(disburseDuration) && !isNaN(contractDeployTime)){
                let lastDay = parseInt(disburseDuration) + parseInt(contractDeployTime)
                let lockTimeExpire = parseInt(Date.now()) + parseInt(cliffTime)
                lockTimeExpire = lockTimeExpire.toString().substr(0,10)
                // console.log("now " + lockTimeExpire)
                // console.log('last ' + lastDay)
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
            let tvl_usd = this.state.tvl / 1e18 * this.state.usdPerToken

            tvl_usd = getFormattedNumber(tvl_usd, 2)
            total_stakers = getFormattedNumber(total_stakers, 0)

            //console.log(total_stakers)

            let isOwner = String(this.state.coinbase).toLowerCase() === String(window.config.admin_address).toLowerCase()

            let id = Math.random().toString(36)

            return (<div>

                    <div className='container'>
                        <div className='token-staking mt-5'>
                            <div className='row'>
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

                                                                <input value={Number(this.state.depositAmount) > 0 ? this.state.depositAmount  : this.state.depositAmount} onChange={e => this.setState({ depositAmount: e.target.value })} className='form-control left-radius' placeholder='0' type='text' />
                                                                <div className='input-group-append'>
                                                                    <button className='btn  btn-primary right-radius btn-max l-light-btn' style={{ cursor: 'pointer' }} onClick={this.handleSetMaxDeposit}>
                                                                        MAX
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div style={{ paddingRight: '0.3rem' }} className='col-6'>
                                                                <button onClick={this.handleApprove} className='btn  btn-block btn-primary ' type='button'>
                                                                    APPROVE
                                                                </button>
                                                            </div>
                                                            <div style={{ paddingLeft: '0.3rem' }} className='col-6'>
                                                                <button onClick={this.handleStake} className='btn  btn-block btn-primary l-outline-btn' type='submit'>
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
                                                            1. Before you deposit your funds, please make sure that you double-check the contract expiration date. At the end of a contract, you can withdraw your funds only after the expiration of your lock time. Consider a scenario wherein you deposit funds to a contract that expires in 30 days, but you lock the funds for 90 days; you will then be able to withdraw the funds 60 days after the expiration of the contract. Furthermore, you will not receive any rewards during this period.
                                                        </div>
                                                        <div className='col-md-12 d-block mb-0 text-muted small'
                                                             style={{fontSize: '15px'}}>
                                                            2. New contracts with improved strategies will be released after the current one expires.
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
                                                            <input value={this.state.withdrawAmount} onChange={e => this.setState({ withdrawAmount:e.target.value })} className='form-control left-radius' placeholder='0' type='text' />
                                                            <div className='input-group-append'>
                                                                <button className='btn  btn-primary right-radius btn-max l-light-btn' style={{ cursor: 'pointer' }} onClick={this.handleSetMaxWithdraw}>
                                                                    MAX
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button title={canWithdraw ? '' : `You recently staked, you can unstake ${cliffTimeInWords}`} disabled={!canWithdraw} className='btn  btn-primary btn-block l-outline-btn' type='submit'>
                                                        WITHDRAW
                                                    </button>
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
                                                                <p className='form-control  text-right' style={{ border: 'none', marginBottom: 0, paddingLeft: 0, background: 'transparent', color: 'var(--text-color)' }}><span style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>{pendingDivs}</span> <small className='text-bold'>DYP</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='form-row'>
                                                        <div className='col-md-12 mb-2'>
                                                            <button className='btn  btn-primary btn-block ' type='submit'>
                                                                CLAIM
                                                            </button>
                                                        </div>

                                                    </div>

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
                                    <Boxes items={[
                                        {
                                            title: 'TVL USD',
                                            number: '$'+tvl_usd
                                        },
                                        {
                                            title: `APR`,
                                            number: getFormattedNumber(apr, 2)+'%'
                                        }
                                    ]} />
                                    <div className='l-box'>
                                        <div className='table-responsive'>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', padding: '.3rem' }}>STATS</h3>
                                            <table className='table-stats table table-sm table-borderless'>
                                                <tbody>
                                                <tr>
                                                    <th>My Address</th>
                                                    <td className='text-right'>
                                                        <Address style={{ fontFamily: 'monospace' }} a={coinbase} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Contract Address</th>
                                                    <td className='text-right'>
                                                        <Address style={{ fontFamily: 'monospace' }} a={staking._address} />
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Contract Expiration</th>
                                                    <td className="text-right"><strong>{expiration_time}</strong></td>
                                                </tr>

                                                <tr>
                                                    <th>My DYP Balance</th>
                                                    <td className="text-right"><strong>{token_balance}</strong> <small>{token_symbol}</small></td>
                                                </tr>

                                                <tr>
                                                    <th>MY DYP Deposit</th>
                                                    <td className="text-right"><strong>{depositedTokens}</strong> <small>{token_symbol}</small></td>
                                                </tr>
                                                <tr>
                                                    <th>Total DYP Locked</th>
                                                    <td className="text-right"><strong>{tvl}</strong> <small>{token_symbol}</small></td>
                                                </tr>

                                                <tr>
                                                    <th>Total Earned DYP</th>
                                                    <td className="text-right"><strong>{totalEarnedTokens}</strong> <small>DYP</small></td>
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

                                                <tr>
                                                    <td style={{ fontSize: '1rem', paddingTop: '2rem' }} colSpan='2' className='text-center'>
                                                        <a target='_blank' rel='noopener noreferrer' href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}>View Transaction History on Avax Network</a> &nbsp; <i style={{ fontSize: '.8rem' }} className='fas fa-external-link-alt'></i>
                                                    </td>
                                                </tr>
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
            )
        }
    }


    return Staking
}
