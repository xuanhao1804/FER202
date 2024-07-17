import LayoutUser from "../../layout/LayoutUser";
import "../../style/FAQ.css";

export default function FAQ() {
    return (
        <LayoutUser>
            <h1><b>FAQ</b></h1>
           
            <div className="container">
                <h2>Booking Bed</h2>
                
                <b>1. Can't click Confirm button to book bed</b>
                
                <p>Please wait to a few second until policy popup is shown. If it takes too long, please reload the page.</p>
                
                <b>2. Can't book bed because of unpaid bill</b>
                
                <p>Please deposit enough money in fap wallet and wait until the dormitory manager makes deducts the bill.</p>
                
                <h2>Other</h2>
                
                <b>How to use the OCD website</b>
                
                <p>Please contact Dormitory management.</p>
                
                <h2>System</h2>
                
                <b>For problems related to website operation</b>
                
                <p>- Features misbehaving (Click create a request but no request is generated, ...)</p>
                <p>- Website return error</p>
                <p>- Any feature of the website loads very slowly</p>
                <p>** Please contact : <a href="mailto:luongtxhe172593@fpt.edu.vn">luongtxhe172593@fpt.edu.vn</a></p>
            </div>
        </LayoutUser>
    );
}