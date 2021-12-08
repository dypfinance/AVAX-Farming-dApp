import React from 'react'

import getFormattedNumber from '../functions/get-formatted-number'

const f = getFormattedNumber

const pool_names = [
    "avax_3_V1",
    "avax_30_V1",
    "avax_60_V1",
    "avax_90_V1",
    "wavax_0_V2",
    "wavax_3_V2",
    "wavax_30_V2",
    "wavax_60_V2",
    "wavax_90_V2"
]

const WETH_ADDRESS = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'

const ACCESS_WALLET_LIST = [
    '0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F',
    '0x2312D7126a0a87114D018E762dc6CAf8A74f04a8'
].map(a => a.toLowerCase())

let { BigNumber } = window

export default class StakingStats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pools_info: {},
            coinbase: null
        }
        window.LP_ID_LIST.forEach(lp_id => this.state.pools_info[lp_id] = {})
    }

    getWethBalance = async (contractAddress) => {
        let contract = new window.web3.eth.Contract(window.TOKEN_ABI, WETH_ADDRESS)
        return (await contract.methods.balanceOf(contractAddress).call())
    }

    getDepositedLP = async (contractAddress) => {
        let coinbase = window.coinbase_address
        let contract = new window.web3.eth.Contract(window.STAKING_ABI, contractAddress)
        return (await contract.methods.depositedTokens(coinbase).call())
    }

    getDepositedDyp = async (contractAddress) => {

        let coinbase = window.coinbase_address

        let constantStaking = ''
        let lp_id = window.FarmingStakingAddresses

        let found = 0

        for (let id of lp_id){
            let contractAdd = id.split('-')[0]
            let constant = id.split('-')[1]
            if (contractAddress == contractAdd){
                constantStaking = new window.web3.eth.Contract(window.CONSTANT_STAKINGNEW_ABI, constant)
                found = 1
                break;
            }
            else {
                //constantStaking = new window.web3.eth.Contract(window.STAKING_ABI, contractAdd)
                found = 0
            }
        }
        if (found == 1)
            return (await constantStaking.methods.depositedTokens(coinbase).call())
        else
            return 0
    }

    getClaimableTokens = async (contractAddress) => {

        let constantStaking = ''
        let lp_id = window.FarmingStakingAddresses

        for (let id of lp_id){
            let contractAdd = id.split('-')[0]
            let constant = id.split('-')[1]
            if (contractAddress == contractAdd){
                constantStaking = new window.web3.eth.Contract(window.CONSTANT_STAKINGNEW_ABI, constant)
                break;
            }
            else {
                constantStaking = new window.web3.eth.Contract(window.STAKING_ABI, contractAdd)
            }
        }

        let coinbase = window.coinbase_address

        return (await constantStaking.methods.getPendingDivs(coinbase).call())
    }

    getClaimableWeth = async (contractAddress) => {
        let coinbase = window.coinbase_address
        let contract = new window.web3.eth.Contract(window.STAKING_ABI, contractAddress)
        return (await contract.methods.getPendingDivsEth(coinbase).call())
    }

    getTotalEarnedWeth = async (contractAddress) => {
        let coinbase = window.coinbase_address
        let contract = new window.web3.eth.Contract(window.STAKING_ABI, contractAddress)
        return (await contract.methods.totalEarnedEth(coinbase).call())
    }

    handleClaim = async (contractAddress) => {

        let constantStaking = ''
        let lp_id = window.FarmingStakingAddresses
        let farming = new window.web3.eth.Contract(window.FARMING_NEW_ABI, contractAddress)

        for (let id of lp_id){
            let contractAdd = id.split('-')[0]
            let constant = id.split('-')[1]
            if (contractAddress == contractAdd)
                constantStaking = new window.web3.eth.Contract(window.CONSTANT_STAKINGNEW_ABI, constant)
        }


        let deadline = Math.floor(Date.now()/1e3 + window.config.tx_max_wait_seconds)

        let address = this.state.coinbase

        let amount = await constantStaking.methods.getTotalPendingDivs(address).call()

        let router = await window.getPangolinRouterContract()
        let WETH = await router.methods.WAVAX().call()
        let platformTokenAddress = window.config.reward_token_address
        let rewardTokenAddress = window.config.reward_token_idyp_address
        let path = [...new Set([rewardTokenAddress, WETH, platformTokenAddress].map(a => a.toLowerCase()))]
        let _amountOutMinConstant = await router.methods.getAmountsOut(amount, path).call()
        _amountOutMinConstant = _amountOutMinConstant[_amountOutMinConstant.length - 1]
        _amountOutMinConstant = new BigNumber(_amountOutMinConstant).times(100 - window.config.slippage_tolerance_percent).div(100).toFixed(0)

        let referralFee = new BigNumber(_amountOutMinConstant).times(500).div(1e4).toFixed(0)
        referralFee = referralFee.toString()

        //Claim Parameters for Farm
        /*
            _amountOutMin_claimAsToken_dyp
            _amountOutMin_attemptSwap
            _deadline
        */


        try {
            constantStaking.methods.claim(referralFee, _amountOutMinConstant, deadline).send({ from: address, gasPrice: window.config.default_gasprice_gwei * 1e9, gas: window.config.default_gas_amount })
        }  catch(e) {
            console.error(e)
            return;
        }

        try {
            await farming.methods.claim(0, 0, deadline).send({ from: address, gasPrice: window.config.default_gasprice_gwei * 1e9, gas: window.config.default_gas_amount })
        }  catch(e) {
            console.error(e)
            return;
        }
    }

    getWethPaidOut = async (contractAddress) => {
        let contract = new window.web3.eth.Contract(window.STAKING_ABI, contractAddress)
        let wethPaidOut = await contract.methods.totalClaimedRewardsEth().call()
        let wethBalance = await this.getWethBalance(contractAddress)
        return new window.BigNumber(wethBalance).plus(wethPaidOut).toString(10)
    }

    componentDidMount() {
        this.refreshPoolsInfo()
    }

    refreshPoolsInfo = () => {
        let coinbase = window.coinbase_address
        this.setState({coinbase})
        window.LP_ID_LIST.forEach(async (lp_id) => {
            let contractAddress = lp_id.split('-')[1]


            let [depositedLp, claimableTokens, claimableEth, wethPaidOut, wethEarned, depositedDyp]
                = await Promise.all([this.getDepositedLP(contractAddress), this.getClaimableTokens(contractAddress), this.getClaimableWeth(contractAddress), this.getWethPaidOut(contractAddress), this.getTotalEarnedWeth(contractAddress), this.getDepositedDyp(contractAddress)])

            // console.log({contractAddress, depositedDyp})

            let pools_info = this.state.pools_info

            pools_info[lp_id] = { depositedLp, claimableTokens, claimableEth, wethPaidOut, wethEarned, depositedDyp }

            this.setState({ pools_info })
        })
    }

    getTotalUsdValueOfLpDeposited = () => {
        let usdValue = 0, lp_data

        if (!(lp_data = this.props.the_graph_result.lp_data)) {
            return 0
        }

        let usd_per_token = this.props.the_graph_result.token_data ? this.props.the_graph_result.token_data["0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"].token_price_usd : 0

        for (let lp_id of window.LP_ID_LIST) {
            let pool_info;
            if (!(pool_info = this.state.pools_info[lp_id])) continue;
            let usdValueLp = pool_info.depositedLp/1e18 * lp_data[lp_id].usd_per_lp
            if (usdValueLp) {
                usdValue += usdValueLp
                let depositedDyp =  pool_info.depositedDyp/1e18 * usd_per_token
                usdValue = usdValue + depositedDyp
            }
        }

        return usdValue
    }

    getTotalClaimableEth = () => {
        let claimableEth = 0

        for (let lp_id of window.LP_ID_LIST) {
            let pool_info;
            if (!(pool_info = this.state.pools_info[lp_id])) continue;
            let ethLp = pool_info.claimableEth/1e18
            if (ethLp) claimableEth += ethLp
        }

        return claimableEth
    }
    getCombinedWethEarnings = () => {
        let ethEarned = 0

        for (let lp_id of window.LP_ID_LIST) {
            let pool_info;
            if (!(pool_info = this.state.pools_info[lp_id])) continue;
            let ethLp = pool_info.wethEarned / 1e18
            if (ethLp) ethEarned += ethLp
        }

        return ethEarned
    }
    getTotalClaimedEth = () => {
        let wethPaidOut = 0

        for (let lp_id of window.LP_ID_LIST) {
            let pool_info;
            if (!(pool_info = this.state.pools_info[lp_id])) continue;
            let ethLp = pool_info.wethPaidOut/1e18
            if (ethLp) wethPaidOut += ethLp
        }

        return wethPaidOut
    }
    getTotalClaimableTokens = () => {
        let claimableTokens = 0

        for (let lp_id of window.LP_ID_LIST) {
            let pool_info;
            if (!(pool_info = this.state.pools_info[lp_id])) continue;
            let tokenLp = pool_info.claimableTokens/1e18
            if (tokenLp) claimableTokens += tokenLp
        }

        return claimableTokens
    }

    render() {

        const { pools_info } = this.state

        //console.log({pools_info})

        let { the_graph_result } = this.props

        let usd_per_token = the_graph_result.token_data ? the_graph_result.token_data["0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"].token_price_usd : 0
        let usd_per_idyp = the_graph_result.token_data ? the_graph_result.token_data["0xbd100d061e120b2c67a24453cf6368e63f1be056"].token_price_usd : 0
        let usd_per_eth = the_graph_result.usd_per_eth || 0

        let can_access = this.state.coinbase && ACCESS_WALLET_LIST.includes( String(this.state.coinbase).toLowerCase() )

        // // if the weth paid out is public - uncomment the below line.
        // can_access = true

        return (
            <div>


                <div className='container mb-5 mt-2'>
                    <h2 className='text-center mt-4 mb-4'>My Stats</h2>
                    <div className='l-box pl-0 pr-0'>
                        <div className='table-responsive col' style={{ overflowY: 'hidden', }}>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th>Pool</th>
                                    <th>Deposited LP + DYP</th>
                                    <th>Claimable DYP</th>
                                    <th>Claimable WBNB</th>
                                    <th>Earned WBNB</th>
                                    {can_access && <th>Claimed WBNB</th>}
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    window.LP_ID_LIST.map((lp_id, i) => {

                                        let usd_per_lp = the_graph_result.lp_data ? the_graph_result.lp_data[lp_id].usd_per_lp : 0

                                        let { depositedLp, claimableTokens, claimableEth, wethPaidOut, wethEarned, depositedDyp } = pools_info[lp_id]

                                        //console.log({usd_per_token})

                                        let contractAddress = lp_id.split('-')[1]
                                        let displayNone = 'visible'
                                        let displayNone2

                                        if (depositedLp == '0')
                                        {
                                            displayNone = 'collapse'
                                            displayNone2 = 'none'
                                        }
                                        //console.log('display+',displayNone)
                                        //console.log(pool_names[i])

                                        //parse string name
                                        let str = pool_names[i]
                                        let res = str.split('_')
                                        let addressImg = ''

                                        if (res[0] == 'avax')
                                            addressImg = '/images/avax.png'
                                        if (res[0] == 'wavax')
                                            addressImg = '/images/avax.png'
                                        // if (res[0] == 'usdt')
                                        //     addressImg = '/images/USDT.png'

                                        //parse pool name
                                        let poolName = pool_names[i]
                                        let string = poolName.split('_')
                                        let combineName = string[0].toUpperCase() + ' ' + string[1] + ' ' + string[2]

                                        return (
                                            <tr key={lp_id} style={{visibility: displayNone, display: displayNone2}}>
                                                <td> <img src={addressImg} width={'20px'} /> {combineName} </td>
                                                {/*<td className={Number(depositedLp) > 0 ? 'text-bold' : 'text-muted'}> {f( depositedLp/1e18 * window.rebase_factors[i], 6)} (${f( ((depositedLp/1e18*usd_per_lp) + (depositedDyp/1e18*usd_per_token)), 2 )}) </td>*/}
                                                <td className={Number(depositedLp) > 0 ? 'text-bold' : 'text-muted'}> ${f( ((depositedLp/1e18*usd_per_lp) + (depositedDyp/1e18*usd_per_token)), 2 )} </td>
                                                {/*<td className={Number(claimableTokens) > 0 ? 'text-bold' : 'text-muted'}> {f( claimableTokens/1e18, 6)} (${f( claimableTokens/1e18 * usd_per_idyp, 2 )}) </td>*/}
                                                <td className={Number(claimableTokens) > 0 ? 'text-bold' : 'text-muted'}> ${f( claimableTokens/1e18 * usd_per_idyp, 2 )} </td>
                                                <td className={Number(claimableEth) > 0 ? 'text-bold' : 'text-muted'}> {f(claimableEth / 1e18, 6)} (${f(claimableEth / 1e18 * usd_per_eth, 2)}) </td>
                                                <td className={Number(wethEarned) > 0 ? 'text-bold' : 'text-muted'}> {f(wethEarned / 1e18, 6)} (${f(wethEarned / 1e18 * usd_per_eth, 2)}) </td>
                                                {can_access && <td className={Number(wethPaidOut) > 0 ? 'text-bold' : 'text-muted'}> {f( wethPaidOut/1e18, 6)} (${f( wethPaidOut/1e18 * usd_per_eth , 2 )}) </td>}
                                                <td> <button onClick={() => this.handleClaim(contractAddress)} className='btn btn-primary'>CLAIM</button> </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td>Total</td>
                                    <td> ${f( this.getTotalUsdValueOfLpDeposited(), 2)} </td>
                                    {/*<td> {f( this.getTotalClaimableTokens(), 6)} (${f( this.getTotalClaimableTokens() * usd_per_token, 2 )}) </td>*/}
                                    <td> ${f( this.getTotalClaimableTokens() * usd_per_idyp, 2 )} </td>
                                    <td> {f(this.getTotalClaimableEth(), 6)} (${f(this.getTotalClaimableEth() * usd_per_eth, 2)}) </td>
                                    <td> {f( this.getCombinedWethEarnings(), 6)} (${f( this.getCombinedWethEarnings() * usd_per_eth , 2 )}) </td>
                                    {can_access && <td> {f( this.getTotalClaimedEth(), 6)} (${f( this.getTotalClaimedEth() * usd_per_eth , 2 )}) </td>}
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}