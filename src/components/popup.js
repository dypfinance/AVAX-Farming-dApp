import React from "react";

export default function Popup ({ handleClose, show, children })
{
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (

        <div className={showHideClassName} onClick={() => {
            // close modal when outside of modal is clicked
            handleClose()
        }}>
            <section className="popup-main" >
                <div className='col-12 md-12'  >
                    <div className="sc-feJyhm iTaYul">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" className="sc-iELTvK cvCpgS">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <div className="sc-cmTdod kjSopy" style={{padding: '15px'}}>
                        <div className="sc-lhVmIH xuOEC">

                            <br />
                            {children}
                        </div>

                    </div>
                </div>

                {/*{children}*/}
                {/*<button type="button" onClick={handleClose}>*/}
                {/*    Close*/}
                {/*</button>*/}
            </section>

        </div>
    )
}