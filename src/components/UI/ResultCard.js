import React from 'react';
import { Badge, Jumbotron, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faWallet, faCalendar } from '@fortawesome/free-solid-svg-icons'
import Tooltips from './Tooltips';
import PopUp from './PopUp';

export default function ResultCard(props) {
    const invest = props.invest > 0;
    let investText = '';
    if (invest) investText = '$' + props.invest;
    else {
        if (props.totBal > 100) investText = "Don't invest yet";
        else investText = "Can't invest";
    }

    return (
       
        <Col className="mt-3" xs={3}>
            <div style={{ backgroundColor: invest ? '#73EFC2' : '#EFECEC', fontFamily: 'Bahnschrift' }} className="h-100 text-left p-2 rounded-sm font-weight-lighter">
                <div style={{ backgroundColor: invest ? '#05C945' : '#F5A10E' }} className="py-1 pl-3 text-left w-100 rounded-sm d-flex align-items-center font-weight-bold"><FontAwesomeIcon size="2x" icon={faCalendar} className="pr-3" />Week {props.week}</div>
                <div style={{overflow:"hidden",maxWidth:"80%"}} className=" d-inline-flex pt-2 text-truncate"  >Total Payout: {props.payout.join(" + ")} </div>
                <div className="d-inline-flex"><PopUp data={props.payout} bg={ invest ? '#73EFC2' : '#EFECEC'} /></div>
                <div className="pt-2 text-truncate">Bal W{props.week}: <strong>${props.balPrevW.toFixed(2)} + <span style={{ color: '#039B54' }}>${props.totPayout}</span></strong></div>
                <div className="pt-2">Total Bal: <strong>${props.totBal.toFixed(2)}</strong></div>
                <div className="pt-2">Invest: <strong>{investText}</strong> </div>
                <div className="pt-2 pb-2">Rem: <strong style={{ color: '#039B54' }}>${props.rem}</strong></div>
                <div style={{ backgroundColor: invest ? '#056424' : '#05C945' }} className="text-white rounded-sm py-1 pl-3 w-100 d-flex align-items-center">
                    <FontAwesomeIcon icon={faWallet} className="pr-3 d-none" size="2x" /><span className="pr-3 font-weight-lighter">W{props.week} Bal :</span> <strong>${props.rem}</strong>
                </div>
                <hr />
                <div>Total Packages:</div>
                <div className="d-flex" style={{ overflowX: 'auto' }}>
                 {props.activePacks.map(({ leftWeeks, amount }) =>
                        <>
                            {leftWeeks > 0 ? <div className="position-relative pr-3">
                                <FontAwesomeIcon className="" size="2x" color="#05C945" icon={faFolder} />
                                <span className="position-absolute text-white small" style={{ top: 0, transform: 'translate(calc(-1rem - 50%), 10px)', zIndex: 3 }}>{amount}</span>
                                <Badge className="rounded-circle float-right" style={{ top: 0, transform: 'translateX(-1.5rem)', zIndex: 2 }} color="danger">-{leftWeeks}</Badge>
                            </div> : ''}
                        </>)}
                </div>
            </div>
        </Col>

    )
}
