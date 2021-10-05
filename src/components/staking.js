import React from 'react'
import moment from 'moment'
import getFormattedNumber from '../functions/get-formatted-number'
import Address from './address'
import Boxes from './boxes'

export default function initStaking({token, staking, liquidity, lp_symbol, reward, lock, rebase_factor, expiration_time}) {

    let {reward_token, BigNumber, alertify} = window

    // token, staking
    
    const LP_AMPLIFY_FACTOR = rebase_factor || window.config.lp_amplify_factor
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
    
    window.handleDownload = ({stakers, stakingTimes, lastClaimedTimes, stakedTokens}) => {
        let list = []
        stakers.forEach((staker, index) => {
            list.push({
                staker_address: staker,
                staking_timestamp_unix: stakingTimes[index],
                lastclaimed_timestamp_unix: lastClaimedTimes[index],
                staking_time: getDate(stakingTimes[index]*1e3),
                lastclaimed_time: getDate(lastClaimedTimes[index]*1e3),
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
                reward_token_balance: '',
                pendingDivs: '',
                totalEarnedTokens: '',
                cliffTime: '',
                stakingTime: '',
                depositedTokens: '',
                lastClaimedTime: '',
    
                depositAmount: '',
                withdrawAmount: '',
    
                totalEarnedEth: '',
                pendingDivsEth: '',
                wethBalance: '',
    
                tokensToBeSwapped: '',
                tokensToBeDisbursedOrBurnt: '',
    
                coinbase: '',
                tvl: '',
                stakingOwner: null,
                approxDeposit: 100/LP_AMPLIFY_FACTOR,
                approxDays: 365,

                lastSwapExecutionTime: '',
                swapAttemptPeriod: '',

                contractDeployTime: '',
                disburseDuration: ''
    
            }
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
                    console.log({startIndex, endIndex: startIndex+step})
                    let array = await staking.getDepositorsList(startIndex, Math.min(startIndex+step, length))
                    console.log(array)
                    stakers = stakers.concat(array.stakers)
                    stakingTimes = stakingTimes.concat(array.stakingTimestamps)
                    lastClaimedTimes = lastClaimedTimes.concat(array.lastClaimedTimeStamps)
                    stakedTokens = stakedTokens.concat(array.stakedTokens)
                }
                let result = {stakers, stakingTimes, lastClaimedTimes, stakedTokens}
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
    
        handleDeposit = (e) => {
            e.preventDefault()
            let amount = this.state.depositAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            staking.depositTOKEN(amount)
        }
    
        handleApprove = (e) => {
            e.preventDefault()
            let amount = this.state.depositAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            token.approve(staking._address, amount)
        }
        handleStake = (e) => {
            let amount = this.state.depositAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            staking.deposit(amount)
        }
    
        handleWithdraw = (e) => {
            e.preventDefault()
            let amount = this.state.withdrawAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            staking.withdraw(amount)
        }
    
        handleClaimDivs = (e) => {
            e.preventDefault()
            staking.claim()
        }
    
        handleSetMaxDeposit = (e) => {
            e.preventDefault()
            this.setState({depositAmount: new BigNumber(this.state.token_balance).div(1e18).toFixed(18)})
        }
        handleSetMaxWithdraw = (e) => {
            e.preventDefault()
            this.setState({withdrawAmount: new BigNumber(this.state.depositedTokens).div(1e18).toFixed(18)})
        }

        getAPY = () => {
            let lp_data = this.props.the_graph_result.lp_data
            //console.log({lp_data})
            let apy = lp_data ? lp_data[this.props.lp_id].apy : 0
            return (Number(apy) || 0)
        }
        
        refreshBalance = async () => {
            let coinbase = window.coinbase_address
            this.setState({coinbase})
            try {
                let _bal = token.balanceOf(coinbase)
                let _rBal = reward_token.balanceOf(coinbase)
                let _pDivs = staking.getPendingDivs(coinbase)
                let _pDivsEth = staking.getPendingDivsEth(coinbase)
                let _tEarned = staking.totalEarnedTokens(coinbase)
                let _tEarnedEth = staking.totalEarnedEth(coinbase)
                let _stakingTime = staking.depositTime(coinbase)
                let _dTokens = staking.depositedTokens(coinbase)
                let _lClaimTime = staking.lastClaimedTime(coinbase)
                let _tvl = token.balanceOf(staking._address)
                let [token_balance,reward_token_balance, pendingDivs, totalEarnedTokens, stakingTime, 
                depositedTokens, lastClaimedTime, tvl,
                totalEarnedEth, pendingDivsEth
            ] = await Promise.all([_bal, _rBal, _pDivs, _tEarned, _stakingTime, _dTokens, _lClaimTime, _tvl,
                _tEarnedEth, _pDivsEth])
    
                this.setState({
                    token_balance, 
                    reward_token_balance,
                    pendingDivs, 
                    totalEarnedTokens,
                    stakingTime, 
                    depositedTokens,
                    lastClaimedTime,
                    tvl,
                    totalEarnedEth,
                    pendingDivsEth
                })
                let stakingOwner = await staking.owner()
                this.setState({stakingOwner})
            } catch (e) {
                console.error(e)
            }
    
            staking.cliffTime().then((cliffTime) => {
                this.setState({cliffTime: Number(cliffTime)})
            }).catch(console.error)
    
            staking.tokensToBeDisbursedOrBurnt().then(tokensToBeDisbursedOrBurnt => {
                this.setState({tokensToBeDisbursedOrBurnt})
            }).catch(console.error)
    
            staking.tokensToBeSwapped().then(tokensToBeSwapped => {
                this.setState({tokensToBeSwapped})
            })
    
            window.weth.balanceOf(coinbase).then((wethBalance) => {
                this.setState({wethBalance})
            }).catch(console.error)

            staking.lastSwapExecutionTime().then(lastSwapExecutionTime => {
                this.setState({ lastSwapExecutionTime })
            })

            staking.swapAttemptPeriod().then(swapAttemptPeriod => {
                this.setState({ swapAttemptPeriod })
            })

            staking.contractDeployTime().then(contractDeployTime => {
                this.setState({ contractDeployTime })
            })

            staking.disburseDuration().then(disburseDuration => {
                this.setState({ disburseDuration })
            })
        }

        getUsdPerETH = () => {
            return this.props.the_graph_result.usd_per_eth || 0
        }

        getApproxReturnUSD = () => {
            let APY = this.getAPY()
            let approxDays = this.state.approxDays
            let approxDeposit = this.state.approxDeposit
            let lp_data = this.props.the_graph_result.lp_data
            let usd_per_lp = lp_data ? lp_data[this.props.lp_id].usd_per_lp : 0

            return (usd_per_lp*approxDeposit*APY/100/365*approxDays)
        }
    
        render() {
    
            let {disburseDuration, contractDeployTime, cliffTime, swapAttemptPeriod, lastSwapExecutionTime, tokensToBeDisbursedOrBurnt, tokensToBeSwapped, wethBalance, pendingDivsEth, totalEarnedEth, token_balance, reward_token_balance, pendingDivs, totalEarnedTokens, depositedTokens, stakingTime, coinbase, tvl} = this.state
    
            let myShare = ((depositedTokens/ tvl)*100).toFixed(2)
            myShare = getFormattedNumber(myShare, 2)
    
            token_balance = new BigNumber(token_balance*LP_AMPLIFY_FACTOR).div(1e18).toString(10)
            token_balance = getFormattedNumber(token_balance, 6)
    
            wethBalance = new BigNumber(wethBalance).div(1e18).toString(10)
            wethBalance = getFormattedNumber(wethBalance, 6)
    
            tokensToBeSwapped = new BigNumber(tokensToBeSwapped).div(1e18).toString(10)
            tokensToBeSwapped = getFormattedNumber(tokensToBeSwapped, 6)
    
            tokensToBeDisbursedOrBurnt = new BigNumber(tokensToBeDisbursedOrBurnt).div(1e18).toString(10)
            tokensToBeDisbursedOrBurnt = getFormattedNumber(tokensToBeDisbursedOrBurnt, 6)
    
            pendingDivsEth = new BigNumber(pendingDivsEth).div(1e18).toString(10)
            pendingDivsEth = getFormattedNumber(pendingDivsEth, 6)
    
            totalEarnedEth = new BigNumber(totalEarnedEth).div(1e18).toString(10)
            totalEarnedEth = getFormattedNumber(totalEarnedEth, 6)
    
            reward_token_balance = new BigNumber(reward_token_balance).div(10**TOKEN_DECIMALS).toString(10)
            reward_token_balance = getFormattedNumber(reward_token_balance, 6)
    
            pendingDivs = new BigNumber(pendingDivs).div(10**TOKEN_DECIMALS).toString(10)
            pendingDivs = getFormattedNumber(pendingDivs, 6)
    
            totalEarnedTokens = new BigNumber(totalEarnedTokens).div(10**TOKEN_DECIMALS).toString(10)
            totalEarnedTokens = getFormattedNumber(totalEarnedTokens, 6)
    
            depositedTokens = new BigNumber(depositedTokens*LP_AMPLIFY_FACTOR).div(1e18).toString(10)
            depositedTokens = getFormattedNumber(depositedTokens, 6)
    
            tvl = new BigNumber(tvl*LP_AMPLIFY_FACTOR).div(1e18).toString(10)
            tvl = getFormattedNumber(tvl, 6)
    
            stakingTime = stakingTime*1e3
            cliffTime = cliffTime*1e3
            swapAttemptPeriod = swapAttemptPeriod*1e3
            lastSwapExecutionTime = lastSwapExecutionTime*1e3

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

            let claimTitle = "Feel free to execute claim"

            if (!isNaN(swapAttemptPeriod) && !isNaN(lastSwapExecutionTime)) {
                if (Date.now() - lastSwapExecutionTime <= swapAttemptPeriod) {
                    claimTitle = `You can execute claim for the latest rewards ${moment.duration((swapAttemptPeriod - (Date.now() - lastSwapExecutionTime))).humanize(true)}`
                }
            }

            let canWithdraw = true
            if (!isNaN(cliffTime) && !isNaN(stakingTime)) {
                if (Date.now() - stakingTime <= cliffTime) {
                    canWithdraw = false
                    cliffTimeInWords = moment.duration((cliffTime - (Date.now() - stakingTime))).humanize(true)
                }
            }

            let lp_data = this.props.the_graph_result.lp_data
            let apy = lp_data ? lp_data[this.props.lp_id].apy : 0

            //let total_stakers = lp_data ? lp_data[this.props.lp_id].stakers_num : 0
            let tvl_usd = lp_data ? lp_data[this.props.lp_id].tvl_usd : 0

            apy = getFormattedNumber(apy, 2)
            tvl_usd = getFormattedNumber(tvl_usd, 2)
            //total_stakers = getFormattedNumber(total_stakers, 0)

            //console.log(total_stakers)
    
            let isOwner = String(this.state.coinbase).toLowerCase() === String(window.config.admin_address).toLowerCase()
    
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
                                                    <label htmlFor='deposit-amount' className='col-7 d-block text-left'>DEPOSIT</label>
                                                    <div className='col-5 text-truncate'>
                                                        <a target='_blank' rel='noopener noreferrer' href={`https://app.pangolin.exchange/#/add/AVAX/0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17`} >
                                                            <button className='btn btn-sm btn-block btn-primary l-outline-btn' type='button'>
                                                                ADD LIQUIDITY
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                                {/*<div className='row'>
                                                    <div className='col-md-12 d-block text-muted small' style={{ fontSize: '15px' }}>
                                                        <b>NOTE:</b> The staking dApp works ONLY with the PancakeSwap V1 (old) LP tokens!
                                                    </div>
                                                    <div className='col-md-12 d-block mb-3 text-muted small' style={{ fontSize: '15px' }}>
                                                        When you add your liquidity to PancakeSwap be sure that you add it on the old version <a href={'https://pancakeswap-v1.dyp.finance/#/pool'} target={'_blank'} ><u>https://pancakeswap-v1.dyp.finance/#/pool</u></a>
                                                    </div>
                                                </div> */}
                                                <div className='input-group '>
                                                    <input value={Number(this.state.depositAmount)>0?this.state.depositAmount*LP_AMPLIFY_FACTOR:this.state.depositAmount} onChange={e => this.setState({depositAmount: Number(e.target.value) > 0? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} className='form-control left-radius' placeholder='0' type='text' />
                                                    <div className='input-group-append'>
                                                        <button className='btn  btn-primary right-radius btn-max l-light-btn' style={{cursor: 'pointer'}} onClick={this.handleSetMaxDeposit}>
                                                            MAX
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div style={{paddingRight: '0.3rem'}} className='col-6'>
                                                    <button onClick={this.handleApprove} className='btn  btn-block btn-primary ' type='button'>
                                                        APPROVE
                                                    </button>
                                                </div>
                                                <div style={{paddingLeft: '0.3rem'}} className='col-6'>
                                                    <button onClick={this.handleStake} className='btn  btn-block btn-primary l-outline-btn' type='submit'>
                                                        DEPOSIT
                                                    </button>
                                                </div>
                                            </div>
                                            <p style={{fontSize: '.8rem'}} className='mt-1 text-center mb-0 text-muted mt-3'>
                                                {/* Some info text here.<br /> */}
                                                Please approve before deposit.
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
                                            <input value={Number(this.state.withdrawAmount) > 0 ? this.state.withdrawAmount*LP_AMPLIFY_FACTOR:this.state.withdrawAmount} onChange={e => this.setState({withdrawAmount: Number(e.target.value) > 0 ? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} className='form-control left-radius' placeholder='0' type='text' />
                                            <div className='input-group-append'>
                                                <button className='btn  btn-primary right-radius btn-max l-light-btn' style={{cursor: 'pointer'}} onClick={this.handleSetMaxWithdraw}>
                                                    MAX
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button title={canWithdraw?'':`You recently staked, you can unstake ${cliffTimeInWords}`} disabled={!canWithdraw} className='btn  btn-primary btn-block l-outline-btn' type='submit'>
                                        WITHDRAW
                                    </button>
                                    {/* <p style={{fontSize: '.8rem'}} className='mt-1 text-center'>Some info text here.</p> */}
                                </form>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='l-box'>
                                <form onSubmit={this.handleClaimDivs}>
                                    <div className='form-group'>
                                        <label htmlFor='deposit-amount' className='text-left d-block'>REWARDS</label>
                                        <div className='form-row'>
                                            <div className='col-md-6'>
                                                <p className='form-control  text-right' style={{border: 'none', marginBottom: 0, paddingLeft: 0,  background: 'transparent', color: 'var(--text-color)'}}><span style={{fontSize: '1.2rem', color: 'var(--text-color)'}}>{pendingDivsEth}</span> <small className='text-bold'>WAVAX</small></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className='form-control  text-right' style={{border: 'none', marginBottom: 0, paddingLeft: 0,  background: 'transparent', color: 'var(--text-color)'}}><span style={{fontSize: '1.2rem', color: 'var(--text-color)'}}>{pendingDivs}</span> <small className='text-bold'>DYP</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <button title={claimTitle} className='btn  btn-primary btn-block l-outline-btn' type='submit'>
                                        CLAIM AS WAVAX
                                    </button>
                                    <button onClick={e => {
                                        e.preventDefault()
                                        staking.claimAs(window.config.claim_as_eth_address)
                                    }} className='btn  btn-primary btn-block l-outline-btn' type='button'>
                                        CLAIM AS ETH
                                    </button>
                                    <button onClick={e => {
                                        e.preventDefault()
                                        staking.claimAs(window.config.reward_token_address)
                                    }} className='btn  btn-primary btn-block l-outline-btn' type='button'>
                                        CLAIM AS DYP
                                    </button>
                                </form>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='l-box'>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className='form-group'>
                                        <label htmlFor='deposit-amount' className='d-block text-left'>RETURN CALCULATOR</label>
                                        <div className='row'>
                                            <div className='col'>
                                                <label style={{fontSize: '1rem', fontWeight: 'normal'}}>LP to Deposit</label>
                                                <input className='form-control ' value={Number(this.state.approxDeposit) > 0 ? this.state.approxDeposit*LP_AMPLIFY_FACTOR:this.state.approxDeposit} onChange={e => this.setState({approxDeposit: Number(e.target.value) > 0 ? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} placeholder='0' type='text' />
                                            </div>
                                            <div className='col'>
                                                <label style={{fontSize: '1rem', fontWeight: 'normal'}}>Days</label>
                                                <input className='form-control ' value={this.state.approxDays} onChange={e => this.setState({approxDays: e.target.value})} type='text' />
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        Approx. ${getFormattedNumber(this.getApproxReturnUSD(), 2)} USD ({getFormattedNumber(this.getApproxReturnUSD()/this.getUsdPerETH(), 6)} WAVAX)
                                    </p>
                                    <p style={{fontSize: '.8rem'}} className='mt-1 text-center text-muted'>Approx. Value Not Considering Burns</p>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                    <Boxes items={[
                                {
                                    title: 'TVL USD',
                                    number: '$' + tvl_usd
                                },
                                {
                                    title: `APY`,
                                    number: apy + '%',
                                }
                            ]} />
                        <div className='l-box pl-3 pr-3'>
                        <div className='table-responsive container'>
                            <div className='row' style={{marginLeft: '0px'}}>
                                <label className='col-md-8 d-block text-left' style={{fontSize: '1.1rem', fontWeight: '600', padding: '.3rem'}}>MY STATS</label>
                                <div className='col-4'>
                                    <a rel='noopener noreferrer' href={'/staking-stats'} >
                                        <button className='btn btn-sm btn-block btn-primary l-outline-btn' type='button'>
                                            VIEW ALL
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <table className='table-stats table table-sm table-borderless'>
                                <tbody>
                                    <tr>
                                        <th>My Address</th>
                                        <td className='text-right'>
                                            <Address style={{fontFamily: 'monospace'}} a={coinbase} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Contract Address</th>
                                        <td className='text-right'>
                                            <Address style={{fontFamily: 'monospace'}} a={staking._address} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Contract Expiration</th>
                                        <td className="text-right"><strong>{expiration_time}</strong></td>
                                    </tr>

                                    <tr>
                                        <th>My LP Balance</th>
                                        <td className="text-right"><strong>{token_balance}</strong> <small>{lp_symbol}</small></td>
                                    </tr>
                                    <tr>
                                        <th>My DYP Balance</th>
                                        <td className="text-right"><strong>{reward_token_balance}</strong> <small>DYP</small></td>
                                    </tr>
                                    <tr>
                                        <th>My WETH Balance</th>
                                        <td className="text-right"><strong>{wethBalance}</strong> <small>WETH</small></td>
                                    </tr>
                                    <tr>
                                        <th>MY LP Deposit</th>
                                        <td className="text-right"><strong>{depositedTokens}</strong> <small>{lp_symbol}</small></td>
                                    </tr>
                                    <tr>
                                        <th>Total LP Deposited</th>
                                        <td className="text-right"><strong>{tvl}</strong> <small>{lp_symbol}</small></td>
                                    </tr>
                                    <tr>
                                        <th>My Share</th>
                                        <td className="text-right"><strong>{myShare}</strong> <small>%</small></td>
                                    </tr>
                                    <tr>
                                        <th>Total Earned DYP</th>
                                        <td className="text-right"><strong>{totalEarnedTokens}</strong> <small>DYP</small></td>
                                    </tr>
                                    <tr>
                                        <th>Total Earned WAVAX</th>
                                        <td className="text-right"><strong>{totalEarnedEth}</strong> <small>WAVAX</small></td>
                                    </tr>
                                    <tr>
                                        <th>To be Swapped</th>
                                        <td className="text-right"><strong>{tokensToBeSwapped}</strong> <small>DYP</small></td>
                                    </tr>
                                    <tr>
                                        <th>To be burnt / disbursed</th>
                                        <td className="text-right"><strong>{tokensToBeDisbursedOrBurnt}</strong> <small>DYP</small></td>
                                    </tr>
                                    <tr>
                                        <th>APY (AT NO BURN)</th>
                                        <td className="text-right"><strong>{apy}</strong> <small>%</small></td>
                                    </tr>
                                    <tr>
                                        <th>TVL USD</th>
                                        <td className="text-right"><strong>${tvl_usd}</strong> <small>USD</small></td>
                                    </tr>
                                    {/*<tr>*/}
                                    {/*    <th>Total Stakers</th>*/}
                                    {/*    <td className="text-right"><strong>{total_stakers}</strong> <small></small></td>*/}
                                    {/*</tr>*/}
                                    {/* <tr>
                                        <th>Pending</th>
                                        <td className="text-right"><strong>{pendingDivs}</strong> <small>DYP</small></td>
                                    </tr> */}

                                    <tr>
                                        <td style={{fontSize: '1rem', paddingTop: '2rem'}} colSpan='2' className='text-center'>
                                            <a target='_blank' rel='noopener noreferrer' href={`${window.config.etherscan_baseURL}/address/${coinbase}/tokens/${token._address}/token-transfers`}>View Transaction History on Avax Network</a> &nbsp; <i style={{fontSize: '.8rem'}} className='fas fa-external-link-alt'></i>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td style={{fontSize: '1rem'}} colSpan='2' className='text-center'>
                                            <span className='lp-link'>
                                                <a target='_blank' rel='noopener noreferrer' href='#'>Some External Link Here</a> &nbsp; <i style={{fontSize: '1rem'}} className='fas fa-external-link-alt'></i>
                                            </span>
                                        </td>
                                    </tr> */}
                                    {isOwner && <tr>
                                        <td style={{fontSize: '1rem'}} colSpan='2' className='text-center'>
                                            <a onClick={this.handleListDownload} target='_blank' rel='noopener noreferrer' href='#'><i style={{fontSize: '.8rem'}} className='fas fa-download'></i> Download Stakers List </a>
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
