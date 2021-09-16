import React from 'react'

class ReferralStat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalStakersList: [],
            activeStakersList: [],
            totalStakersCount: '',
            activeStakersCount: '',
            isLoading: true
        }
    }

    componentDidMount() {
        this.refreshStakersList()
    }

    refreshStakersList = async () => {
        let coinbase = await window.getCoinbase()
        let referredStakers = await this.props.staking.getNumberOfReferredStakers(coinbase)
        let totalStakersCount = referredStakers._totalStakers
        let activeStakersCount = referredStakers._activeStakers
        this.setState({
            totalStakersCount,
            activeStakersCount
        })

        if (this.state.isLoading && this.state.totalStakersList.length > 0) return;
        this.setState({ isLoading: true })

        try {
            {
                let total_stakers = Number(totalStakersCount)
                let totalStakersList = this.state.totalStakersList
                let newStakersList = []
                let step = window.config.max_referral_addresses_per_call

                for (let i = total_stakers - 1 - totalStakersList.length; i >= Math.max(0, total_stakers - totalStakersList.length - step); i--) {
                    newStakersList.push(this.props.staking.getReferredStaker(coinbase, i))
                }
                newStakersList = await Promise.all(newStakersList)

                totalStakersList = totalStakersList.concat(newStakersList.map(a => a._staker))
                this.setState({ totalStakersList })
            }


            {
                let total_stakers = Number(activeStakersCount)
                let totalStakersList = this.state.activeStakersList
                let newStakersList = []
                let step = window.config.max_referral_addresses_per_call

                for (let i = total_stakers - 1 - totalStakersList.length; i >= Math.max(0, total_stakers - totalStakersList.length - step); i--) {
                    newStakersList.push(this.props.staking.getActiveReferredStaker(coinbase, i))
                }
                newStakersList = await Promise.all(newStakersList)

                totalStakersList = totalStakersList.concat(newStakersList.map(a => a._staker))
                this.setState({ activeStakersList: totalStakersList })
            }
        } finally {
            this.setState({ isLoading: false })
        }
    }

    render() {
        return (
            <div className='l-referral-stats bg-white p-3'>
                <h4>{this.props.name} </h4>
                <div className='table-responsive'>
                    <table className='table table-bordered table-sm'>
                        <thead>
                        <tr>
                            <th> Total ({this.state.totalStakersCount}) </th>
                            <th> Active ({this.state.activeStakersCount}) </th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.totalStakersList)
                            .map((_staker, i) => {
                                return (
                                    <tr key={i}>
                                        <td> {this.state.totalStakersList[i]} </td>
                                        <td> {this.state.activeStakersList[i]} </td>
                                    </tr>
                                )
                            })}

                        {this.state.totalStakersList.length < this.state.totalStakersCount*1 &&
                        <tr><td colSpan='2'><a style={{ color: 'rgb(255, 0, 122)' }} href='#' onClick={e => {
                            e.preventDefault()
                            this.refreshStakersList()
                        }}>{this.state.isLoading ? 'Loading...' : 'Load More'}</a></td></tr>}

                        {!this.state.isLoading && this.state.totalStakersList.length == 0 &&
                        <tr>
                            <td colSpan='2'>No Referred Stakers to Display
                            </td>
                        </tr>}


                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default class ReferralStats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            referralCounts: {}
        }
    }

    handleReferralCount = ({name, active, total}) => {
        let referralCounts = {...this.state.referralCounts}
        referralCounts[name] = {active, total}
        this.setState({referralCounts})
    }

    render() {
        return (
            <div>
                <div style={{ background: 'white' }}>
                    <div className="container mr-0 ml-0" style={{ maxWidth: '100%' }}>
                        <div className="row">
                            <div className="col-md-7 mt-3 mb-3 logo-column header-logo col-5">
                                <h2 className='container text-left' style={{ position: 'relative', maxWidth: '100%', marginLeft: '-10px' }}>
                                    <a href='https://dyp.finance/#/earn' style={{ display: 'flex' }}>
                                        <img style={{ position: 'relative', maxWidth: '90%', objectFit: 'contain', paddingRight: '10px', height: '100px' }} alt='Staking DAPP' src='/logo192.png'
                                             height='125' />
                                        {' '}<p className="header-title-1" style={{ paddingLeft: '10px', marginBottom: '1rem', marginTop: 'revert' }}>DYP Farming dApp</p>
                                    </a>
                                </h2>
                            </div>
                            <div className="col-md-5 mt-3 mb-3 pr-0 pl-0 col-7" id="infoPool">
                                <div className="sc-eilVRo jaXjyZ">
                                    <div className="sc-eerKOB bKbMab"><span className="sc-jzgbtB dwWyiU"></span>
                                        <div className="sc-bnXvFD bcIrBV">
                                            <a href="https://github.com/dypfinance/staking-governance-security-audits" target="_blank" id="connect-wallet"
                                               className="sc-gqjmRU gacWOr sc-iAyFgw sc-jWBwVP sc-cMhqgX sc-esOvli iivcTi"><p
                                                className="sc-hMFtBS cxjZDP">Check Security Audit Results</p></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <h2 className='text-center mt-4 mb-4'>
                        DYP Referral Stats
                    </h2>
                    {this.props.staking_list.map((props, i) => <ReferralStat key={i} onReferralCount={this.handleReferralCount} {...props} />)}
                </div>
            </div>
        )
    }
}