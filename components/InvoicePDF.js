"use client";
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function InvoiceHTML() {
  const contentRef = useRef();

  const handleDownload = () => {
    const opt = {
      margin: 0.5,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(contentRef.current).save();
  };

  return (
    <>
      <div ref={contentRef} id="invoice" style={{ padding: 40, fontFamily: 'Arial' }}>
        <h2 style={{ textAlign: 'right' }}>mable</h2>
        <p style={{ textAlign: 'right', margin: 0 }}>Mable Payment Services Pty Ltd</p>
        <p style={{ textAlign: 'right', margin: 0 }}>Level 12/255 Pitt Street Sydney</p>
        <p style={{ textAlign: 'right', margin: 0 }}>ABN 55 635 828 170</p>

        <h3 style={{ marginTop: 30 }}>Tax Invoice</h3>

        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: 0 }}><strong>Invoice Number:</strong> 743804131</p>
          <p style={{ margin: 0 }}><strong>Amount Due:</strong> $5,459.73</p>
          <p style={{ margin: 0 }}><strong>Invoice Date:</strong> 20/11/2024</p>
          <p style={{ margin: 0 }}><strong>Please pay by:</strong> 27/11/2024</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h4 style={{ margin: '10px 0 5px 0' }}>Account</h4>
          <p style={{ margin: 0 }}>Client: Edson Pineiro</p>
          <p style={{ margin: 0 }}>Participant(s): Edson Pineiro</p>
          <p style={{ margin: 0 }}>NDIS number: 431513777</p>
          <p style={{ margin: 0 }}>3/4 Gardeners Road</p>
          <p style={{ margin: 0 }}>Eastlakes, New South Wales, 2018</p>

          <h4 style={{ margin: '10px 0 5px 0' }}>Support for Edson Pineiro</h4>
          <p style={{ margin: 0 }}>C/O: Effective Plan Management</p>
          <p style={{ margin: 0 }}>ABN/ACN:</p>
          <p style={{ margin: 0 }}>1/429 High St, Penrith NSW 2750</p>
          <p style={{ margin: 0 }}>Penrith, New South Wales, 2750</p>
        </div>

        <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', marginTop: 20, fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>Session start date</th>
              <th>Description</th>
              <th>Support item</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Worker GST</th>
              <th>Mable GST</th>
              <th>Total GST</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/11/2024</td>
              <td>Elizabeth Santos Silva ABN: 76106319713- Access Community Social and Rec Activ Standard - Weekday Daytime Friday-10:00am-4:00pm</td>
              <td>04_104_0125_6_1</td>
              <td>6</td>
              <td>$67.55</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$405.30</td>
            </tr>
            <tr>
              <td>01/11/2024</td>
              <td>Elizabeth Santos Silva ABN: 76106319713 - Travel (km rate) - Friday -10:00am-4:00pm (17.9kms)</td>
              <td>04_590_0125_6_1</td>
              <td>18.97</td>
              <td>1</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$18.97</td>
            </tr>
            <tr>
              <td>11/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Access Community Social and Rec Activ Standard - Weekday Daytime</td>
              <td>04_104_0125_6_1</td>
              <td>9</td>
              <td>$67.55</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$607.95</td>
            </tr>
            <tr>
              <td></td>
              <td>Monday -10:00am-7:00pm</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>11/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Travel (km rate) Monday -10:00am-7:00pm (37.0kms)</td>
              <td>04_590_0125_6_1</td>
              <td>35.52</td>
              <td>1</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$35.52</td>
            </tr>
            <tr>
              <td>12/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Access Community Social and Rec Activ Standard - Weekday Daytime - Tuesday -10:00am-7:00pm</td>
              <td>04_104_0125_6_1</td>
              <td>9</td>
              <td>$67.55</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$607.95</td>
            </tr>
            <tr>
              <td>13/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Access Community Social and Rec Activ Standard - Weekday Daytime - Wednesday-10:00am-7:00pm</td>
              <td>04_104_0125_6_1</td>
              <td>9</td>
              <td>$67.55</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$607.95</td>
            </tr>
            <tr>
              <td>13/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Travel (km rate) Wednesday -10:00am-7:00pm (42.0kms)</td>
              <td>04_590_0125_6_1</td>
              <td>40.32</td>
              <td>1</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$40.32</td>
            </tr>
            <tr>
              <td>14/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Access Community Social and Rec Activ Standard - Weekday Daytime - Thursday -10:00am-7:00pm</td>
              <td>04_104_0125_6_1</td>
              <td>9</td>
              <td>$67.55</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$607.95</td>
            </tr>
            <tr>
              <td>14/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Travel (km rate) Thursday -10:00am-7:00pm (52.0kms)</td>
              <td>04_590_0125_6_1</td>
              <td>49.92</td>
              <td>1</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$49.92</td>
            </tr>
            <tr>
              <td>15/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Access Community Social and Rec Activ Standard - Weekday Daytime - Friday -10:00am-7:00pm</td>
              <td>04_104_0125_6_1</td>
              <td>9</td>
              <td>$67.55</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$607.95</td>
            </tr>
            <tr>
              <td>15/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Travel (km rate) Friday -10:00am-7:00pm (72.0kms)</td>
              <td>04_590_0125_6_1</td>
              <td>69.12</td>
              <td>1</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$69.12</td>
            </tr>
            <tr>
              <td>16/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Access Community Social and Rec Activ Standard - Saturday Saturday -10:00am-7:00pm</td>
              <td>04_105_0125_6_1</td>
              <td>9</td>
              <td>$95.07</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$855.63</td>
            </tr>
            <tr>
              <td>16/11/2024</td>
              <td>Neha Neha ABN: 54585670217 - Travel (km rate) Saturday -10:00am-7:00pm (85.0kms)</td>
              <td>04_590_0125_6_1</td>
              <td>81.6</td>
              <td>1</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$81.60</td>
            </tr>
            <tr>
              <td>17/11/2024</td>
              <td>Sandhya Shrestha ABN: 42798973646-Access Community Social and Rec Activ Standard - Sunday Sunday -12:00pm-8:00pm</td>
              <td>04_106_0125_6_1</td>
              <td>8</td>
              <td>$107.95</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$863.60</td>
            </tr>
            <tr>
              <td colSpan="6" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</td>
              <td></td>
              <td>$0.00</td>
              <td>$5,459.73</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <table border="1" cellPadding="5" cellSpacing="0" style={{ width: 'auto', marginLeft: 'auto', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Total</td>
                <td>$5,459.73</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Amount paid</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Amount due</td>
                <td>$5,459.73</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 30 }}>
          <h4 style={{ margin: '10px 0 5px 0' }}>Payment details</h4>
          <p style={{ margin: 0 }}>Payment is due Wednesday 27/11/2024, 7 days from the date this invoice was issued.</p>
          <p style={{ margin: 0 }}>Please send remittance advice to <a href="mailto:remittance@mable.com.au">remittance@mable.com.au</a></p>

          <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', marginTop: 10, fontSize: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th>Account name</th>
                <th>BSB</th>
                <th>Account number</th>
                <th>Payment reference</th>
                <th>Amount due</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mable Payment Services Pty Ltd</td>
                <td>082-356</td>
                <td>84-769-8985</td>
                <td>743804131</td>
                <td>$5,459.73</td>
              </tr>
            </tbody>
          </table>
          <p style={{ margin: '10px 0 0 0' }}>Please note that our new email address for sending remittance advices is: <a href="mailto:remittance@mable.com.au">remittance@mable.com.au</a>.</p>
          <p style={{ margin: 0 }}>We appreciate your cooperation in using this updated contact. Thank you!</p>
        </div>

        <div style={{ marginTop: 30 }}>
          <h4 style={{ margin: '10px 0 5px 0' }}>Contact us</h4>
          <p style={{ margin: 0 }}>Please contact <a href="mailto:accounts@mable.com.au">accounts@mable.com.au</a> or 1300 736 573 with any queries.</p>
        </div>

        <div style={{ marginTop: 30, fontSize: 10, color: '#555' }}>
          <p style={{ margin: '5px 0' }}>Mable Payment Services Pty Ltd (MPS) collects payment as an agent on behalf of Mable Technologies Pty Ltd and the Independent Support Workers using the platform.</p>
          <p style={{ margin: '5px 0' }}>The Mable platform fees and the Support Worker fees together make up the total cost of support.</p>
          <p style={{ margin: '5px 0' }}>Mable Technologies and the Independent Support Workers have agreed to appoint MPS, MPS acting as an agent, is acting as a collection agent for the parties.</p>
          <p style={{ margin: '5px 0' }}>MPS is a related party of Mable Technologies, but is not affiliated with the Independent Support Worker other than for the purposes of serving as an agent for payment services.</p>
          <p style={{ margin: '5px 0' }}>Mable technologies provides its platform services to the client via MPS </p>
          <p style={{ margin: '5px 0' }}>The Platform services include the search, Agreement, timesheet and processing services.</p>
        </div>
      </div>

      <button onClick={handleDownload} style={{ marginTop: 20, padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}>
        Download PDF
      </button>
    </>
  );
}