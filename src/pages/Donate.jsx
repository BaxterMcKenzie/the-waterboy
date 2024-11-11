import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

import Seo from "../components/Seo";

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donationFrequency, setDonationFrequency] = useState("one-time");

  const handleDonationSubmit = (event) => {
    event.preventDefault();
    // Handle the donation logic here, e.g., send to an API or process the payment
    console.log(
      `Donated $${donationAmount} as a ${donationFrequency} donation.`
    );
  };

  return (
    <>
      <Seo
        title="Donate - The Waterboy"
        description="Browse this amazing Donate page"
        url={window.location.href}
      />

      <PageHeader title="Donation" image_url="/header-bg-img/donate.webp" />
      <div className="donation">
        <h1>Make a Donation</h1>
        <table>
          <thead>
            <tr>
              <th>Donation Amount</th>
              <th>Frequency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </td>
              <td>
                <select
                  value={donationFrequency}
                  onChange={(e) => setDonationFrequency(e.target.value)}
                >
                  <option value="one-time">One-Time</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </td>
              <td>
                <button onClick={handleDonationSubmit}>Donate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Donate;
