'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Mortgage Calculator ─────────────────────────────────────────────────────
function MortgageCalc() {
  const [price,      setPrice]      = useState(450000);
  const [down,       setDown]       = useState(90000);
  const [rate,       setRate]       = useState(5.5);
  const [amort,      setAmort]      = useState(25);
  const [freq,       setFreq]       = useState('monthly');
  const [result,     setResult]     = useState(null);

  useEffect(() => {
    const downPct = (down / price) * 100;
    const loanAmt = price - down;

    // CMHC insurance
    let cmhcRate = 0;
    if (downPct < 20) {
      if (downPct < 10)       cmhcRate = 0.04;
      else if (downPct < 15)  cmhcRate = 0.031;
      else                    cmhcRate = 0.028;
    }
    const cmhcPremium    = loanAmt * cmhcRate;
    const totalMortgage  = loanAmt + cmhcPremium;

    // Payment calculation
    const freqMap = { monthly: 12, 'bi-weekly': 26, weekly: 52 };
    const n      = amort * freqMap[freq];
    const rPer   = (rate / 100) / freqMap[freq];
    const payment = totalMortgage * (rPer * Math.pow(1 + rPer, n)) / (Math.pow(1 + rPer, n) - 1);

    setResult({
      payment:         payment,
      totalMortgage:   totalMortgage,
      cmhcPremium,
      totalInterest:   payment * n - totalMortgage,
      totalPaid:       payment * n,
      downPct:         downPct.toFixed(1),
      insured:         downPct < 20,
    });
  }, [price, down, rate, amort, freq]);

  const fmt = n => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
  const fmtD = n => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const freqLabel = { monthly: '/month', 'bi-weekly': '/2 weeks', weekly: '/week' };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="flex flex-col gap-5">
        <SliderInput label="Home Price" value={price} min={100000} max={2000000} step={5000} onChange={setPrice} format={fmt} />
        <SliderInput label="Down Payment" value={down} min={price * 0.05} max={price * 0.5} step={1000} onChange={setDown} format={fmt}
          note={`${((down/price)*100).toFixed(1)}% of purchase price`}
        />
        <SliderInput label="Interest Rate (%)" value={rate} min={1} max={15} step={0.05} onChange={setRate} format={v => `${v.toFixed(2)}%`} />
        <SliderInput label="Amortization (years)" value={amort} min={5} max={30} step={5} onChange={setAmort} format={v => `${v} years`} />

        <div>
          <label className="input-label">Payment Frequency</label>
          <div className="flex gap-2">
            {['monthly', 'bi-weekly', 'weekly'].map(f => (
              <button
                key={f}
                onClick={() => setFreq(f)}
                className="flex-1 py-2 rounded transition-all duration-150 focus-visible:outline-2 focus-visible:outline-teal-500"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  textTransform: 'capitalize',
                  background: freq === f ? 'var(--teal)' : 'var(--light)',
                  color:      freq === f ? 'white'       : 'var(--navy)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {f.replace('-', '-\n')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-4">
          {/* Primary result */}
          <div
            className="rounded-xl p-6 text-center"
            style={{ background: 'var(--teal)', boxShadow: '0 8px 32px rgba(0,140,154,0.25)' }}
          >
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 8 }}>
              Estimated Payment
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 48, letterSpacing: '-0.04em', color: 'white', lineHeight: 1 }}>
              {fmtD(result.payment)}
            </p>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>
              {freqLabel[freq]}
            </p>
          </div>

          {/* Breakdown */}
          <div className="rounded-xl p-5" style={{ background: 'white', border: '1.5px solid var(--light)' }}>
            {[
              { label: 'Purchase Price',         value: fmt(price) },
              { label: 'Down Payment',            value: `${fmt(down)} (${result.downPct}%)` },
              { label: 'Mortgage Amount',         value: fmt(price - down) },
              ...(result.insured ? [{ label: 'CMHC Insurance Premium', value: fmt(result.cmhcPremium), note: true }] : []),
              { label: 'Total Mortgage (incl. CMHC)', value: fmt(result.totalMortgage) },
              { label: 'Total Interest Paid',     value: fmt(result.totalInterest) },
              { label: 'Total Amount Paid',       value: fmt(result.totalPaid) },
            ].map(({ label, value, note }) => (
              <div key={label} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid var(--light)' }}>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: note ? 'var(--teal)' : 'var(--gray)' }}>{label}</span>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)' }}>{value}</span>
              </div>
            ))}
          </div>

          {result.insured && (
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--gray)', lineHeight: 1.6 }}>
              * CMHC mortgage default insurance is required for down payments under 20%.
            </p>
          )}

          <Link href="/contact" className="btn-primary justify-center mt-1">
            Get Pre-Approved Today
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Affordability Calculator ────────────────────────────────────────────────
function AffordabilityCalc() {
  const [income,      setIncome]      = useState(100000);
  const [monthly,     setMonthly]     = useState(500);   // other monthly debts
  const [propTax,     setPropTax]     = useState(300);   // monthly property tax estimate
  const [heatCost,    setHeatCost]    = useState(150);   // monthly heat
  const [downPmt,     setDownPmt]     = useState(50000);
  const [rate,        setRate]        = useState(5.5);
  const [result,      setResult]      = useState(null);

  useEffect(() => {
    const grossMonthly  = income / 12;
    const stressRate    = Math.max(rate + 2, 5.25);
    const rMonthly      = stressRate / 100 / 12;
    const n             = 25 * 12;

    // Max housing cost from GDS (39%)
    const maxHousing    = grossMonthly * 0.39 - propTax - heatCost;
    const maxPIFromGDS  = maxHousing;

    // Max total debt from TDS (44%)
    const maxTotal      = grossMonthly * 0.44 - monthly - propTax - heatCost;

    const effectiveMaxPI = Math.min(maxPIFromGDS, maxTotal);

    // Reverse mortgage formula to get principal
    const maxMortgage = effectiveMaxPI > 0
      ? effectiveMaxPI * (1 - Math.pow(1 + rMonthly, -n)) / rMonthly
      : 0;

    const maxPrice = maxMortgage + downPmt;

    setResult({
      maxPrice:   Math.max(0, maxPrice),
      maxMortgage: Math.max(0, maxMortgage),
      stressRate,
      gdsRatio:   ((maxPIFromGDS + propTax + heatCost) / grossMonthly * 100).toFixed(1),
    });
  }, [income, monthly, propTax, heatCost, downPmt, rate]);

  const fmt = n => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-5">
        <SliderInput label="Annual Household Income" value={income} min={40000} max={500000} step={5000} onChange={setIncome} format={fmt} />
        <SliderInput label="Monthly Debt Payments" value={monthly} min={0} max={5000} step={50} onChange={setMonthly} format={n => `$${n.toLocaleString()}`}
          note="Car loans, student loans, credit cards"
        />
        <SliderInput label="Monthly Property Tax (est.)" value={propTax} min={0} max={2000} step={25} onChange={setPropTax} format={n => `$${n.toLocaleString()}`} />
        <SliderInput label="Monthly Heating Cost (est.)" value={heatCost} min={50} max={500} step={10} onChange={setHeatCost} format={n => `$${n.toLocaleString()}`} />
        <SliderInput label="Down Payment" value={downPmt} min={0} max={500000} step={5000} onChange={setDownPmt} format={fmt} />
        <SliderInput label="Interest Rate (%)" value={rate} min={1} max={15} step={0.1} onChange={setRate} format={v => `${v.toFixed(2)}%`} />
      </div>

      {result && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl p-6 text-center" style={{ background: 'var(--navy)', boxShadow: '0 8px 32px rgba(0,49,73,0.25)' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 8 }}>
              Estimated Max Home Price
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 44, letterSpacing: '-0.04em', color: 'white', lineHeight: 1 }}>
              {fmt(result.maxPrice)}
            </p>
          </div>

          <div className="rounded-xl p-5" style={{ background: 'white', border: '1.5px solid var(--light)' }}>
            {[
              { label: 'Max Mortgage Amount',   value: fmt(result.maxMortgage) },
              { label: 'Down Payment',          value: fmt(downPmt) },
              { label: 'Qualifying Rate (Stress Test)', value: `${result.stressRate.toFixed(2)}%` },
              { label: 'GDS Ratio Used',        value: `${result.gdsRatio}%` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid var(--light)' }}>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)' }}>{label}</span>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)' }}>{value}</span>
              </div>
            ))}
          </div>

          <div className="rounded-lg p-4" style={{ background: 'rgba(0,140,154,0.07)', border: '1px solid rgba(0,140,154,0.15)' }}>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--navy)', lineHeight: 1.6 }}>
              <strong>Disclaimer:</strong> This is an estimate based on OSFI's stress test (contract rate + 2%, minimum 5.25%). Your actual qualification depends on your full credit profile. Speak with a licensed mortgage professional for personalized advice.
            </p>
          </div>

          <Link href="/contact" className="btn-primary justify-center">
            Discuss Your Budget with Joel
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Land Transfer Tax (NB) ──────────────────────────────────────────────────
function LandTransferCalc() {
  const [price,   setPrice]   = useState(350000);
  const [result,  setResult]  = useState(null);

  useEffect(() => {
    // New Brunswick Real Property Transfer Tax
    // Rate: $1 per $100 (1%) of the greater of purchase price or assessed value
    // Note: There is also a base registration fee
    // Source: NB Service New Brunswick
    let tax = 0;
    let breakdown = [];

    // NB Land Transfer Tax (County registration fee schedule)
    // Bracket 1: First $30,000 at 0.5%
    // Bracket 2: $30,001 – $100,000 at 1.0%
    // Bracket 3: Above $100,000 at 1.5%
    const b1 = Math.min(price, 30000);
    const b2 = price > 30000 ? Math.min(price - 30000, 70000) : 0;
    const b3 = price > 100000 ? price - 100000 : 0;

    const t1 = b1 * 0.005;
    const t2 = b2 * 0.01;
    const t3 = b3 * 0.015;
    tax = t1 + t2 + t3;

    breakdown = [
      { bracket: `First $30,000 @ 0.5%`,       amount: b1, tax: t1 },
      { bracket: `$30,001–$100,000 @ 1.0%`,    amount: b2, tax: t2 },
      { bracket: `Above $100,000 @ 1.5%`,       amount: b3, tax: t3 },
    ];

    // Approximate legal fees (not included in LTT but good to know)
    const legalFees = 900 + price * 0.001;

    setResult({ tax, breakdown, legalFees, total: tax + legalFees });
  }, [price]);

  const fmt  = n => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 2 });
  const fmtR = n => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-5">
        <SliderInput label="Purchase Price" value={price} min={50000} max={3000000} step={5000} onChange={setPrice} format={fmtR} />

        <div className="rounded-xl p-5" style={{ background: 'white', border: '1.5px solid var(--light)' }}>
          <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)', marginBottom: 12 }}>
            NB Land Transfer Tax Brackets
          </h4>
          {[
            { range: 'First $30,000',        rate: '0.5%' },
            { range: '$30,001 – $100,000',   rate: '1.0%' },
            { range: 'Above $100,000',       rate: '1.5%' },
          ].map(({ range, rate }) => (
            <div key={range} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--light)' }}>
              <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)' }}>{range}</span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--teal)' }}>{rate}</span>
            </div>
          ))}
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: 'var(--gray)', marginTop: 10, lineHeight: 1.5 }}>
            * Rates are approximate. Verify with your real estate lawyer for exact amounts.
          </p>
        </div>
      </div>

      {result && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl p-6 text-center" style={{ background: 'var(--teal)', boxShadow: '0 8px 32px rgba(0,140,154,0.25)' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 8 }}>
              NB Land Transfer Tax
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 48, letterSpacing: '-0.04em', color: 'white', lineHeight: 1 }}>
              {fmt(result.tax)}
            </p>
          </div>

          <div className="rounded-xl p-5" style={{ background: 'white', border: '1.5px solid var(--light)' }}>
            <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)', marginBottom: 12 }}>
              Tax Breakdown
            </h4>
            {result.breakdown.map(({ bracket, amount, tax }) => amount > 0 && (
              <div key={bracket} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid var(--light)' }}>
                <div>
                  <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)' }}>{bracket}</span>
                  <br />
                  <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: '#aaa' }}>{fmt(amount)}</span>
                </div>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)' }}>{fmt(tax)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-2.5 mt-2" style={{ borderTop: '2px solid var(--navy)' }}>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)' }}>Total LTT</span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 15, color: 'var(--teal)' }}>{fmt(result.tax)}</span>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: 'white', border: '1.5px solid var(--light)' }}>
            <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)', marginBottom: 12 }}>
              Estimated Closing Costs
            </h4>
            {[
              { label: 'Land Transfer Tax',   value: fmt(result.tax) },
              { label: 'Legal Fees (est.)',    value: fmt(result.legalFees) },
              { label: 'Title Insurance (est.)', value: '$300–$500' },
              { label: 'Home Inspection (est.)', value: '$400–$600' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--light)' }}>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)' }}>{label}</span>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Rent vs. Buy ───────────────────────────────────────────────────────────
function RentVsBuyCalc() {
  const [homePrice,      setHomePrice]      = useState(400000);
  const [downPmt,        setDownPmt]        = useState(80000);
  const [mortRate,       setMortRate]       = useState(5.5);
  const [monthlyRent,    setMonthlyRent]    = useState(1800);
  const [rentIncrease,   setRentIncrease]   = useState(3);
  const [homeAppreciation, setHomeApp]      = useState(3);
  const [years,          setYears]          = useState(5);
  const [result,         setResult]         = useState(null);

  useEffect(() => {
    // Buying costs
    const mortgage = homePrice - downPmt;
    const r        = mortRate / 100 / 12;
    const n        = 25 * 12;
    const payment  = mortgage * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    let equity = downPmt;
    let balance = mortgage;
    let totalMortgagePaid = 0;

    for (let i = 0; i < years * 12; i++) {
      const interest = balance * r;
      const principal = payment - interest;
      balance -= principal;
      totalMortgagePaid += payment;
      equity += principal;
    }

    const appreciation    = homePrice * (Math.pow(1 + homeAppreciation / 100, years) - 1);
    const homeValueEnd    = homePrice + appreciation;
    const lttAndClosing   = homePrice * 0.025; // ~2.5% closing costs
    const sellingCosts    = homeValueEnd * 0.04; // ~4% selling costs
    const netBuyGain      = homeValueEnd - balance - sellingCosts - lttAndClosing - homePrice + downPmt * (Math.pow(1 + 0.05, years) - 1); // opportunity cost of down payment at 5%

    // Renting costs
    let totalRent = 0;
    let r_monthly = monthlyRent;
    for (let y = 0; y < years; y++) {
      totalRent += r_monthly * 12;
      r_monthly *= (1 + rentIncrease / 100);
    }
    const rentEndMonthly = monthlyRent * Math.pow(1 + rentIncrease / 100, years);
    const downPmtInvested = downPmt * Math.pow(1 + 0.05, years) - downPmt;

    const breakEvenApprox = years; // simplified

    setResult({
      buyMonthlyPayment: payment,
      totalMortgagePaid: totalMortgagePaid,
      homeValueEnd,
      buyEquity: homeValueEnd - balance,
      buyNetWorth: homeValueEnd - balance - sellingCosts,
      totalRent,
      rentEndMonthly,
      rentSavings: downPmtInvested,
      cheaper: totalRent < totalMortgagePaid ? 'rent' : 'buy',
      diffAmount: Math.abs(totalRent - totalMortgagePaid),
    });
  }, [homePrice, downPmt, mortRate, monthlyRent, rentIncrease, homeAppreciation, years]);

  const fmt  = n => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
  const fmtD = n => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Buying
        </h4>
        <SliderInput label="Home Price" value={homePrice} min={100000} max={1500000} step={5000} onChange={setHomePrice} format={fmt} />
        <SliderInput label="Down Payment" value={downPmt} min={homePrice * 0.05} max={homePrice * 0.5} step={5000} onChange={setDownPmt} format={fmt} />
        <SliderInput label="Mortgage Rate (%)" value={mortRate} min={1} max={15} step={0.1} onChange={setMortRate} format={v => `${v.toFixed(2)}%`} />

        <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--light)' }}>
          <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
            Renting
          </h4>
          <SliderInput label="Monthly Rent" value={monthlyRent} min={500} max={5000} step={50} onChange={setMonthlyRent} format={n => `$${n.toLocaleString()}`} />
          <div className="mt-5">
            <SliderInput label="Annual Rent Increase (%)" value={rentIncrease} min={0} max={10} step={0.5} onChange={setRentIncrease} format={v => `${v}%`} />
          </div>
        </div>

        <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--light)' }}>
          <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
            Assumptions
          </h4>
          <SliderInput label="Annual Home Appreciation (%)" value={homeAppreciation} min={0} max={10} step={0.5} onChange={setHomeApp} format={v => `${v}%`} />
          <div className="mt-5">
            <SliderInput label="Time Horizon (years)" value={years} min={1} max={30} step={1} onChange={setYears} format={v => `${v} years`} />
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Winner banner */}
          <div
            className="rounded-xl p-5 text-center"
            style={{
              background: result.cheaper === 'buy'
                ? 'linear-gradient(135deg, var(--navy) 0%, #004a6e 100%)'
                : 'linear-gradient(135deg, var(--teal) 0%, #00a8b8 100%)',
              boxShadow: '0 8px 32px rgba(0,49,73,0.25)',
            }}
          >
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>
              Over {years} year{years !== 1 ? 's' : ''}…
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 22, color: 'white', letterSpacing: '-0.02em' }}>
              {result.cheaper === 'rent' ? '🏠 Renting costs less' : '🏡 Buying builds more wealth'}
            </p>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 6 }}>
              Difference: {fmt(result.diffAmount)} in {result.cheaper === 'rent' ? 'lower rent payments' : 'greater net equity'}
            </p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-5" style={{ background: 'white', border: '1.5px solid var(--light)' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 12, color: 'var(--navy)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                Buying
              </p>
              {[
                { label: 'Monthly Payment',     value: fmtD(result.buyMonthlyPayment) },
                { label: 'Total Paid',           value: fmt(result.totalMortgagePaid) },
                { label: `Home Value (yr ${years})`, value: fmt(result.homeValueEnd) },
                { label: 'Net Equity',           value: fmt(result.buyEquity) },
              ].map(({ label, value }) => (
                <div key={label} className="py-2" style={{ borderBottom: '1px solid var(--light)' }}>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: 'var(--gray)' }}>{label}</p>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)' }}>{value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-5" style={{ background: 'white', border: '1.5px solid var(--light)' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 12, color: 'var(--teal)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                Renting
              </p>
              {[
                { label: 'Current Monthly Rent',    value: fmtD(monthlyRent) },
                { label: `Rent (yr ${years})`,      value: fmtD(result.rentEndMonthly) },
                { label: 'Total Rent Paid',          value: fmt(result.totalRent) },
                { label: 'Down Pmt Invested (est.)', value: fmt(result.rentSavings) },
              ].map(({ label, value }) => (
                <div key={label} className="py-2" style={{ borderBottom: '1px solid var(--light)' }}>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: 'var(--gray)' }}>{label}</p>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-4" style={{ background: 'rgba(0,140,154,0.07)', border: '1px solid rgba(0,140,154,0.15)' }}>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--navy)', lineHeight: 1.6 }}>
              <strong>Note:</strong> This is a simplified illustration. Real returns depend on your investment strategy, local market conditions, maintenance costs, and personal circumstances. Speak with Joel for a personalized analysis.
            </p>
          </div>

          <Link href="/contact" className="btn-primary justify-center">
            Discuss Your Options with Joel
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Shared slider component ─────────────────────────────────────────────────
function SliderInput({ label, value, min, max, step, onChange, format, note }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="input-label" style={{ marginBottom: 0 }}>{label}</label>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 16, color: 'var(--teal)', letterSpacing: '-0.02em' }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--teal) 0%, var(--teal) ${((value - min) / (max - min)) * 100}%, var(--light) ${((value - min) / (max - min)) * 100}%, var(--light) 100%)`,
        }}
      />
      {note && <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: 'var(--gray)', marginTop: 4 }}>{note}</p>}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'mortgage',     icon: '💰', label: 'Mortgage',     shortLabel: 'Mortgage' },
  { id: 'affordability', icon: '🏡', label: 'Affordability', shortLabel: 'Affordability' },
  { id: 'land-transfer', icon: '📋', label: 'Land Transfer Tax (NB)', shortLabel: 'Land Tax' },
  { id: 'rent-vs-buy',  icon: '🔄', label: 'Rent vs. Buy', shortLabel: 'Rent vs Buy' },
];

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState('mortgage');

  // Handle hash routing
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (TABS.find(t => t.id === hash)) setActiveTab(hash);
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(150deg, #001e2d 0%, #003149 70%, #005a7a 100%)',
          paddingTop: 120,
          paddingBottom: 64,
        }}
      >
        <div className="container-wide">
          <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 10, marginBottom: 14 }}>
            Free Tools
          </p>
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.04em',
              color: 'white',
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            Real Estate Calculators
          </h1>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 500, lineHeight: 1.7 }}>
            Plan smarter with these free tools. Estimate payments, affordability, taxes, and compare renting vs. buying.
          </p>
        </div>
      </section>

      {/* Tab nav */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--light)', position: 'sticky', top: 68, zIndex: 30 }}>
        <div className="container-wide">
          <div className="flex overflow-x-auto scrollbar-hide">
            {TABS.map(({ id, icon, label, shortLabel }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  window.history.pushState(null, '', `#${id}`);
                }}
                className="flex items-center gap-2 px-5 py-4 flex-shrink-0 border-b-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-teal-500"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  borderBottomColor: activeTab === id ? 'var(--teal)' : 'transparent',
                  color:             activeTab === id ? 'var(--teal)' : 'var(--gray)',
                  background:        'none',
                  cursor:            'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{icon}</span>
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator content */}
      <section className="section-pad">
        <div className="container-wide">
          <div
            className="rounded-2xl p-6 lg:p-10"
            style={{ background: 'white', border: '1.5px solid var(--light)', boxShadow: '0 4px 32px rgba(0,49,73,0.07)' }}
          >
            {activeTab === 'mortgage'      && <><h2 style={headingStyle}>Mortgage Calculator</h2><MortgageCalc /></>}
            {activeTab === 'affordability' && <><h2 style={headingStyle}>Affordability Calculator</h2><AffordabilityCalc /></>}
            {activeTab === 'land-transfer' && <><h2 style={headingStyle}>NB Land Transfer Tax Calculator</h2><LandTransferCalc /></>}
            {activeTab === 'rent-vs-buy'   && <><h2 style={headingStyle}>Rent vs. Buy Calculator</h2><RentVsBuyCalc /></>}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--off-white, #F8F9FA)', padding: '48px 0' }}>
        <div className="container-wide text-center">
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 8 }}>
            Numbers making sense? Ready to take the next step?
          </p>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--gray)', marginBottom: 24 }}>
            Joel can help you turn these estimates into a real, actionable plan.
          </p>
          <Link href="/contact" className="btn-primary">Book a Free Consultation</Link>
        </div>
      </section>
    </>
  );
}

const headingStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 900,
  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
  letterSpacing: '-0.03em',
  color: 'var(--navy)',
  marginBottom: 32,
};
