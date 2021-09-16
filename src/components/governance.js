import React, { useState } from 'react'
import moment from 'moment'
import { NavLink, Route } from 'react-router-dom'
import Address from './address'

import getFormattedNumber from '../functions/get-formatted-number'

const {governance, reward_token, BigNumber} = window

const LP_AMPLIFY_FACTOR = 1

const AddProposal = (props) => {
    let [formState, setFormState] = useState({
        action: '0', // 0 - disburse or burn, 1 - upgrade governance
        stakingPool: window.vaults.filter(v => !v.hidden)[0].contract_address,
        newGovernance: ''
    })

    const setState = obj => setFormState({...formState, ...obj})

    return (
        <div>
            <h3>Submit a Proposal</h3>
            <form onSubmit={props.onSubmit(formState)}>
                <div>
                    <label htmlFor='staking-pool'>Select Pool</label>
                    <select className='form-control' id='staking-pool' value={formState.stakingPool} onChange={e => setState({stakingPool: e.target.value})}>
                        {window.vaults.filter(v => !v.hidden).map((v, i) => <option value={v.contract_address} key={i}> {v.short_name} </option>)}
                    </select>
                </div>
                <br />
                <div>
                    <label htmlFor='proposal-action'>Select Action</label>
                    <select value={formState.action} onChange={e => setState({action: e.target.value})} className='form-control' id='proposal-action'>
                        <option value='0'>Disburse or Burn</option>
                        <option value='1'>Upgrade Governance</option>
                    </select>
                </div>
                {formState.action == '1' && <div className='pt-3'>
                    <input required className='form-control' type='text' placeholder='New Governance Contract Address' value={formState.newGovernance} onChange={e => setState({newGovernance: e.target.value})} />
                </div>}
                <div className='pt-3'>
                    <button className='btn btn-lg btn-primary btn-block' type='submit'>SUBMIT PROPOSAL</button>
                    <small className='form-text text-muted'>{/*<i className='fas fa-info-circle'></i> */}Submitting a proposal requires a minimum of {(window.config.MIN_BALANCE_TO_INIT_PROPOSAL/1e18).toFixed(2)} DYP Governance Token Balance.</small>
                </div>
            </form>
        </div>
    )
}

const ProposalCard = (props) => (
    <NavLink to={`/governance/proposals/${props._proposalId}`}>
        <div className='container vault-container'>
            <div className='row vault-row'>
                <div className='col-sm-2 col-md-1 text-center'>
                    <img className='mb-3' src={props.vault.logo} height='45' width='45' style={{objectFit: 'contain'}} />
                </div>
                <div style={{whiteSpace: 'pre-line'}} className='col-sm-3 col-md-4'>
                    <span className='vault-name'>{props.vault.name} </span>
                </div>
                <div className='col-sm-4'>
                    {props._proposalAction == '0' ? 'Disburse / Burn' : 'Upgrade Governance'}
                </div>
                <div className='col-sm-3 text-right'>
                    <h4>Expires</h4>
                    <p>{moment.duration(props._proposalStartTime*1e3 + window.config.vote_duration_in_seconds*1e3 - Date.now()).humanize(true)}</p>
                </div>
            </div>
        </div>
    </NavLink>
)

function getVaultByAddress(contract_address) {
    contract_address = contract_address.toLowerCase()
    let v = window.vaults.filter(v => v.contract_address.toLowerCase() == contract_address)[0]
    return v
}

export default class Governance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            proposals: [],
            total_proposals: 0,
            isLoading: true,
            token_balance: '',
            totalDeposited: '',
            lastVotedProposalStartTime: ''
        }
    }

    refreshProposals = async () => {
        if (this.state.isLoading && this.state.proposals.length > 0) return;
        this.setState({isLoading: true})
        try {
            let total_proposals = Number(await window.governance.lastIndex())
            let proposals = this.state.proposals
            let newProposals = []
            let step = window.config.max_proposals_per_call
            for (let i = total_proposals - proposals.length; i >= Math.max(1, total_proposals - proposals.length - step + 1); i--) {
                newProposals.push(this.getProposal(i))
            }
            newProposals = await Promise.all(newProposals)
            // newProposals = newProposals.map(p => {
            //     p.vault = getVaultByAddress(p._stakingPool)
            //     return p
            // })
            proposals = proposals.concat(newProposals)
            this.setState({total_proposals, proposals, isLoading: false})
        } finally {
            this.setState({isLoading: false})
        }
    }

    getProposal = async (_proposalId) => {
        let p = await window.governance.getProposal(_proposalId)
        p.vault = getVaultByAddress(p._stakingPool)
        return p
    }

    componentDidMount() {
        this.refreshProposals()
        this.refreshBalance()
        window.gRefBalInterval = setInterval(this.refreshBalance, 7e3)
    }
    componentWillUnmount() {
        clearInterval(window.gRefBalInterval)
    }

    handleProposalSubmit = formState => e => {
        e.preventDefault()
        if (Number(this.state.token_balance) < window.config.MIN_BALANCE_TO_INIT_PROPOSAL) {
            window.alertify.error("Insufficiet Governance Token Balance!")
            return;
        }
        if (formState.action == '1') {
            if (!window.web3.utils.isAddress(formState.newGovernance)) {
                window.alertify.error("Invalid Address!");
                return;
            }
            window.governance.proposeUpgradeGovernance(formState.stakingPool, formState.newGovernance)
        } else {
            window.governance.proposeDisburseOrBurn(formState.stakingPool)
        }
    }

    refreshBalance = async () => {

        let coinbase = await window.getCoinbase()
        this.setState({coinbase})
        try {
            let _rBal = reward_token.balanceOf(coinbase)
            let _totalDeposited = governance.totalDepositedTokens(coinbase)
            let _lvsTime = governance.lastVotedProposalStartTime(coinbase)

            let [token_balance, totalDeposited, lastVotedProposalStartTime] = await Promise.all([ _rBal, _totalDeposited, _lvsTime,])

            this.setState({
                token_balance, 
                totalDeposited,
                lastVotedProposalStartTime,
            })

            
        } catch (e) {
            console.error(e)
        }
        
    }

    handleClaim = (e) => {
        e.preventDefault()
        governance.withdrawAllTokens()
    }

    handleClaim = () => {

    }

    render() {

        let {totalDeposited} = this.state
        totalDeposited = getFormattedNumber(totalDeposited/1e18, 6)

        let canWithdrawAll = false
        let withdrawableTitleText = ''
        let canWithdrawAllAfter = this.state.lastVotedProposalStartTime*1e3 + window.config.vote_duration_in_seconds*1e3
        if (Date.now() > canWithdrawAllAfter) {
            canWithdrawAll = true
        } else if (canWithdrawAllAfter) {
            withdrawableTitleText = `You'll be able to withdraw `+moment.duration(canWithdrawAllAfter - Date.now()).humanize(true)
        }


        return (
            <div>
                <Route exact path='/governance'>
                    <div className='row pb-5'>
                        <div className='col-lg-4'>
                            <AddProposal onSubmit={this.handleProposalSubmit} />

                            <form className='mt-5' onSubmit={this.handleClaim}>
                                <div className='form-group'>
                                    <label htmlFor='deposit-amount' className='text-left d-block'>TOTAL IN VOTING</label>
                                    <div className='form-row'>
                                        <div className='col-12'>
                                            <p className='form-control  text-right' style={{border: 'none', marginBottom: 0, paddingLeft: 0,  background: 'transparent', color: '#222'}}><span style={{fontSize: '1.2rem', color: 'rgb(255, 0, 122)'}}>{totalDeposited}</span> <small className='text-bold'>DYP</small></p>
                                        </div>
                                    </div>
                                </div>
                                <button title={withdrawableTitleText} disabled={!canWithdrawAll} className='btn btn-lg btn-primary btn-block ' type='submit'>
                                    WITHDRAW ALL
                                </button>
                            </form>
                        </div>
                        <div className='col-lg-8'>
                            <h3>Governance Proposals</h3>
                            {this.state.proposals.map((props, i) => <ProposalCard {...props} key={i} />)}
                            <div className='text-center'>
                                {this.state.proposals.length < this.state.total_proposals &&  
                                    <a style={{color: 'rgb(255, 0, 122)'}} href='#' onClick={e => {
                                            e.preventDefault()
                                            this.refreshProposals()
                                        }}>{this.state.isLoading ? 'Loading...':'Load More'}</a>}

                                {!this.state.isLoading && this.state.proposals.length == 0 &&
                                <div className='pt-5'>
                                    <p>No Proposals to Display</p>
                                </div>}
                            </div>
                            
                        </div>
                    </div>
                </Route>
                <Route exact path='/governance/proposals/:id' render={props => <ProposalDetails refreshBalance={this.refreshBalance} {...props} />} />
            </div>
        )
    }
}

class ProposalDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            depositAmount: '',
            withdrawAmount: '',
            depositedTokens: '',
            token_balance: '',
            coinbase: '',
            totalDeposited: '',
            option: '', // 0, 1.  0 = yes/disburse, 1 = no/burn 
            lastVotedProposalStartTime: '',

            is_proposal_executible: false,

            proposal: {

            }
        }
    }
    componentDidMount() {
        this.refreshBalance()
        window._refreshVoteBalInterval = setInterval(this.refreshBalance, 3000)
    }

    componentWillUnmount() {
        clearInterval(window._refreshVoteBalInterval)
    }

    refreshProposal = () => {
        this.getProposal(this.props.match.params.id)
            .then(proposal => this.setState({proposal}))
            .catch(console.error)
    }

    getProposal = async (_proposalId) => {
        let p = await window.governance.getProposal(_proposalId)
        p.vault = getVaultByAddress(p._stakingPool)
        return p
    }

    handleApprove = (e) => {
        e.preventDefault()
        let amount = this.state.depositAmount
        amount = new BigNumber(amount).times(1e18).toFixed(0)
        reward_token.approve(governance._address, amount)
    }
    handleAddVote = (e) => {
        let amount = this.state.depositAmount
        amount = new BigNumber(amount).times(1e18).toFixed(0)
        governance.addVotes(this.props.match.params.id, this.state.option , amount)
    }

    handleRemoveVote = (e) => {
        e.preventDefault()
        let amount = this.state.withdrawAmount
        amount = new BigNumber(amount).times(1e18).toFixed(0)
        governance.removeVotes(this.props.match.params.id, amount)
    }

    handleClaim = (e) => {
        e.preventDefault()
        governance.withdrawAllTokens()
    }

    handleSetMaxDeposit = (e) => {
        e.preventDefault()
        this.setState({depositAmount: new BigNumber(this.state.token_balance).div(1e18).toFixed(18)})
    }
    handleSetMaxWithdraw = (e) => {
        e.preventDefault()
        this.setState({withdrawAmount: new BigNumber(this.state.depositedTokens).div(1e18).toFixed(18)})
    }

    
    refreshBalance = async () => {
        this.refreshProposal()
        this.props.refreshBalance()

        let coinbase = await window.getCoinbase()
        this.setState({coinbase})
        try {
            let _rBal = reward_token.balanceOf(coinbase)
            let _myVotes = governance.votesForProposalByAddress(coinbase, this.props.match.params.id)
            let _totalDeposited = governance.totalDepositedTokens(coinbase)
            let _option = governance.votedForOption(coinbase, this.props.match.params.id)
            let _lvsTime = governance.lastVotedProposalStartTime(coinbase)
            let _isExecutible = governance.isProposalExecutible(this.props.match.params.id)

            let [token_balance, depositedTokens, totalDeposited, option, lastVotedProposalStartTime, is_proposal_executible] = await Promise.all([ _rBal, _myVotes, _totalDeposited, _option, _lvsTime, _isExecutible])

            this.setState({
                token_balance, 
                depositedTokens,
                totalDeposited,
                lastVotedProposalStartTime,
                is_proposal_executible
            })

            if (this.state.option == '' || Number(depositedTokens) > 0) this.setState({option})
            
        } catch (e) {
            console.error(e)
        }

        
    }

    getOptionText = (option) => {
        if (this.state.proposal._proposalAction == '0') {
            return ({0: 'DISBURSE', 1: 'BURN'})[option]
        }
        return ({0: 'YES', 1: 'NO'})[option]
    }

    handleSetOption = option => {
        if (Number(this.state.depositedTokens) > 0) return;
        this.setState({option})
    }

    handleExecute = () => {
        governance.executeProposal(this.props.match.params.id)
    }

    render() {
        let id =  this.props.match.params.id

        let {coinbase, token_balance, proposal, totalDeposited, depositedTokens} = this.state

        if (!proposal._proposalId) return '';

        token_balance = getFormattedNumber(token_balance/1e18, 6)
        totalDeposited = getFormattedNumber(totalDeposited/1e18, 6)

        let optionOneVotes = proposal._optionOneVotes
        let optionTwoVotes = proposal._optionTwoVotes
        let action = proposal._proposalAction

        let actionText = action == '0' ? 'Disburse / Burn' : action == '1' ? 'Upgrade Governance' : ''

        optionOneVotes = getFormattedNumber(optionOneVotes/1e18, 6)
        optionTwoVotes = getFormattedNumber(optionTwoVotes/1e18, 6)
        depositedTokens = getFormattedNumber(depositedTokens/1e18, 6)

        let endsOn = proposal._proposalStartTime*1e3 + window.config.vote_duration_in_seconds*1e3

        let expires = moment.duration(endsOn - Date.now()).humanize(true)

        let canRemoveVotes = false

        if (Date.now() < endsOn) {
            canRemoveVotes = true
        }

        let canWithdrawAll = false
        let withdrawableTitleText = ''
        let canWithdrawAllAfter = this.state.lastVotedProposalStartTime*1e3 + window.config.vote_duration_in_seconds*1e3
        if (Date.now() > canWithdrawAllAfter) {
            canWithdrawAll = true
        } else if (canWithdrawAllAfter) {
            withdrawableTitleText = `You'll be able to withdraw `+moment.duration(canWithdrawAllAfter - Date.now()).humanize(true)
        }

        return (
        <div className='token-staking'>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='row token-staking-form'>
                        <div className='col-12'>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className='form-group'>
                                    <label htmlFor='deposit-amount' className='d-block text-left'>ADD VOTES</label>
                                    <div className='input-group input-group-lg'>
                                        <input value={Number(this.state.depositAmount)>0?this.state.depositAmount*LP_AMPLIFY_FACTOR:this.state.depositAmount} onChange={e => this.setState({depositAmount: Number(e.target.value) > 0? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} className='form-control left-radius' placeholder='0' type='text' />
                                        <div className='input-group-append'>
                                            <button className='btn btn-lg btn-primary right-radius btn-max' style={{cursor: 'pointer'}} onClick={this.handleSetMaxDeposit}>
                                                MAX
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div style={{paddingRight: '0.3rem'}} className='col-6'>
                                        <button onClick={() => this.handleSetOption('0')} className={`btn btn-lg btn-block btn-primary ${this.state.option == '0' ? 'btn-outline':''}`} type='button'>
                                            <i className={(this.state.option == '0')?'fas fa-check-square':'far fa-square'}></i> {this.getOptionText('0')}
                                        </button>
                                    </div>
                                    <div style={{paddingLeft: '0.3rem'}} className='col-6'>
                                        <button onClick={() => this.handleSetOption('1')} className={`btn btn-lg btn-block btn-primary ${this.state.option == '1' ? 'btn-outline':''}`} type='button'>
                                            <i className={(this.state.option == '1')?'fas fa-check-square':'far fa-square'}></i> {this.getOptionText('1')}
                                        </button>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div style={{paddingRight: '0.3rem'}} className='col-6'>
                                        <button onClick={this.handleApprove} className='btn btn-lg btn-block btn-primary' type='button'>
                                            APPROVE
                                        </button>
                                    </div>
                                    <div style={{paddingLeft: '0.3rem'}} className='col-6'>
                                        <button disabled={!canRemoveVotes} onClick={this.handleAddVote} className='btn btn-lg btn-block btn-primary ' type='submit'>
                                            ADD VOTES
                                        </button>
                                    </div>
                                </div>
                                <p style={{fontSize: '.8rem'}} className='mt-1 text-center mb-0'>
                                    {/* Some info text here.<br /> */}
                                    Please approve before voting.
                                </p>

                            </form>
                        </div>
                        <div className='col-12'>
                            <form onSubmit={this.handleRemoveVote}>
                                <div className='form-group'>
                                    <label htmlFor='deposit-amount' className='d-block text-left'>REMOVE VOTES</label>
                                    <div className='input-group input-group-lg'>
                                        <input value={Number(this.state.withdrawAmount) > 0 ? this.state.withdrawAmount*LP_AMPLIFY_FACTOR:this.state.withdrawAmount} onChange={e => this.setState({withdrawAmount: Number(e.target.value) > 0 ? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} className='form-control left-radius' placeholder='0' type='text' />
                                        <div className='input-group-append'>
                                            <button className='btn btn-lg btn-primary right-radius btn-max' style={{cursor: 'pointer'}} onClick={this.handleSetMaxWithdraw}>
                                                MAX
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button disabled={!canRemoveVotes} className='btn btn-lg btn-primary btn-block ' type='submit'>
                                    REMOVE VOTES
                                </button>
                                {/* <p style={{fontSize: '.8rem'}} className='mt-1 text-center'>Some info text here.</p> */}
                            </form>
                        </div>
                        <div className='col-12'>
                            <form onSubmit={this.handleClaim}>
                                <div className='form-group'>
                                    <label htmlFor='deposit-amount' className='text-left d-block'>TOTAL IN VOTING</label>
                                    <div className='form-row'>
                                        <div className='col-12'>
                                            <p className='form-control  text-right' style={{border: 'none', marginBottom: 0, paddingLeft: 0,  background: 'transparent', color: '#222'}}><span style={{fontSize: '1.2rem', color: 'rgb(255, 0, 122)'}}>{totalDeposited}</span> <small className='text-bold'>DYP</small></p>
                                        </div>
                                    </div>
                                </div>
                                <button title={withdrawableTitleText} disabled={!canWithdrawAll} className='btn btn-lg btn-primary btn-block ' type='submit'>
                                    WITHDRAW ALL
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='table-responsive-'>
                        <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', padding: '.3rem'}}>STATS</h3>
                        <table className='table-stats table table-sm table-borderless'>
                            <tbody>
                                <tr>
                                    <th>Pool</th>
                                    <td className="text-right"><strong>{proposal.vault && proposal.vault.short_name}</strong> <small></small></td>
                                </tr>
                                <tr>
                                    <th>Proposal Action</th>
                                    <td className="text-right"><strong>{actionText}</strong> <small></small></td>
                                </tr>
                                
                                <tr>
                                    <th>Expires</th>
                                    <td className="text-right"><strong>{expires}</strong> <small></small></td>
                                </tr>
                                {proposal._proposalAction == '1' && <tr>
                                    <th>New Gov. Address</th>
                                    <td className='text-right'>
                                        <Address style={{fontFamily: 'monospace'}} a={proposal._newGovernance} />
                                    </td>
                                </tr>}
                                <tr>
                                    <th>My Address</th>
                                    <td className='text-right'>
                                        <Address style={{fontFamily: 'monospace'}} a={coinbase} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Contract Address</th>
                                    <td className='text-right'>
                                        <Address style={{fontFamily: 'monospace'}} a={governance._address} />
                                    </td>
                                </tr>

                                
                                <tr>
                                    <th>My DYP Balance</th>
                                    <td className="text-right"><strong>{token_balance}</strong> <small>DYP</small></td>
                                </tr>

                                <tr>
                                    <th>{this.getOptionText('0')} Votes </th>
                                    <td className="text-right"><strong>{optionOneVotes}</strong> <small>DYP</small></td>
                                </tr>

                                <tr>
                                    <th>{this.getOptionText('1')} Votes </th>
                                    <td className="text-right"><strong>{optionTwoVotes}</strong> <small>DYP</small></td>
                                </tr>
                               
                                <tr>
                                    <th>My {this.getOptionText(this.state.option)} Votes </th>
                                    <td className="text-right"><strong>{depositedTokens}</strong> <small>DYP</small></td>
                                </tr>
                                <tr>
                                    <td colSpan='2' className="text-left text-muted" style={{fontSize: '.8rem'}}>Proposals may be executed within {moment.duration(window.config.execution_allowance_in_seconds*1e3).humanize()} after voting ends. Quorum requirement is a minimum of {(window.config.QUORUM/1e18).toFixed(2)} DYP, proposals with winning votes less than QUORUM will not be executed. Disburse proposals will disburse a maximum amount of DYP with a -2.5% Price Impact.</td>
                                </tr>

                                {this.state.is_proposal_executible && <tr>
                                    <td colSpan='2'>
                                        <button onClick={this.handleExecute} className='btn btn-block btn-primary mt-3' type='button'>EXECUTE PROPOSAL</button>
                                    </td>
                                </tr>}
                                
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
            

        </div>
        )
    }
}