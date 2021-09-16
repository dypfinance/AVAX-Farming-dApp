import React from 'react'
import ReactTooltip from 'react-tooltip'
import Clipboard from 'react-clipboard.js'


export default function Address(props) {
  let id=Math.random().toString(36)
  return (
    <span {...props}>
      <a rel="noopener noreferrer" target="_blank" href={`${window.config.etherscan_baseURL}/${props.token?"token":"address"}/${props.a}`}>{props.a.slice(0,8)+'...'+props.a.slice(props.a.length-5)}</a>
      <Clipboard 
        component="span"
        onSuccess={e => {
          setTimeout(() => ReactTooltip.hide(), 2000);
        }} data-event="click" data-for={id} data-tip="Address Copied To Clipboard!" data-clipboard-text={props.a}><span

        title="Copy address to clipboard"
        style={{
        cursor:'pointer',
        // position: 'absolute',
        paddingLeft: '.4rem',
        paddingTop: '.4rem'
      }} className="fas fa-paste address-component-icon"></span></Clipboard>
      <ReactTooltip id={id} effect="solid" />
    </span>
  )
}
