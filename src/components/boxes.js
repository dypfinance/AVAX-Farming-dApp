import React from 'react'

export default class Boxes extends React.Component {
    render() {
        return (
            <div className='row text-center'>
                {this.props.items.map((item, i) => <div key={i} className='col-md-6'>
                    <div className='l-box'>
                        <p className='text-muted small mb-0'>{item.title}</p>
                        <p style={{fontSize: '1.5rem', fontWeight: 'bold'}} className='mb-0'>{item.number}</p>
                        <p className='text-muted small mb-0'>{item.symbol}</p>
                    </div>
                </div>)}
            </div>
        )
    }
}