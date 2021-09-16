import React from 'react'
import { NavLink } from 'react-router-dom'
import getFormattedNumber from "../functions/get-formatted-number";

const VaultCard = ({logo, link, name, description, return_heading, return_description}) => (
    <NavLink to={link}>
        <div className='container vault-container'>
            <div className='row vault-row'>
                <div className='col-sm-2 col-md-1 text-center'>
                    <img className='mb-3' src={logo} height='45' width='45' style={{objectFit: 'contain'}} />
                </div>
                <div style={{whiteSpace: 'pre-line'}} className='col-sm-3 col-md-4'>
                    <span className='vault-name'>{name} </span>
                </div>
                <div className='col-sm-4'>
                    {description}
                </div>
                <div className='col-sm-3 text-right'>
                    <h4>{return_heading}</h4>
                    <p>{return_description} </p>
                </div>
            </div>
        </div>
    </NavLink>
)

let vaults = window.vaultsUsdt

export default class VaultListUsdt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        let lp_data = this.props.the_graph_result.lp_data

        let tvl_usd = lp_data ? lp_data[this.props.lp_id[0]].tvl_usd + lp_data[this.props.lp_id[1]].tvl_usd + lp_data[this.props.lp_id[2]].tvl_usd + lp_data[this.props.lp_id[3]].tvl_usd : 0

        tvl_usd = getFormattedNumber(tvl_usd, 2)

        return (
            <div className="">
                
                <div className='container'>
                    <h3 className='text-center mt-5' style={{fontWeight: 600}}>DYP Staking Pools</h3>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className='l-box mb-0' style={{display: 'grid', maxWidth: '100%', width: '250px'}}>
                            <p className='text-center text-muted small' style={{margin: '0'}}>
                                Total Value Locked
                                {/*TVL: ${getFormattedNumber(this.getCombinedTvlUsd(), 2)}, Total Stakers: {getFormattedNumber(this.getCombinedStakers(), 0)}*/}
                            </p>
                            <p className='text-center' style={{margin: '0', fontSize: '1.5rem', fontWeight: 'bold'}}>
                                ${tvl_usd}
                            </p>
                        </div>
                    </div>
                    <div className='vaults-list'>
                        {vaults.filter(v => !v.hidden).map((props,i) => <VaultCard {...props} key={i} />)}
                    </div>
                </div>
            </div>
        )
    }
}