'use client';

import { useState } from 'react';
import Link from 'next/link';

const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
];

const MEETING_TYPES = [
  { id: 'phone',    label: 'Phone Call',         icon: '📞', desc: '15–30 min quick consultation' },
  { id: 'video',    label: 'Video Meeting',       icon: '💻', desc: 'Zoom or Google Meet' },
  { id: 'in-person', label: 'In-Person Meeting',  icon: '🤝', desc: 'At Joel\'s office in Saint John' },
  { id: 'property', label: 'Property Tour',       icon: '🏠', desc: 'Visit a specific property together' },
];

const REASON_OPTS = [
  'Buying a Home', 'Selling a Home', 'Investment Property',
  'First-Time Buyer Consultation', 'Home Valuation',
  'General Real Estate Question', 'Other',
];

function getDates(count = 14) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1); // Start from tomorrow
    if (d.getDay() !== 0) dates.push(d); // Exclude Sundays
    if (dates.length >= 10) break;
  }
  return dates;
}

function formatDate(d) {
  return d.toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function ContactPage() {
  const [step,        setStep]        = useState(1); // 1: type, 2: date/time, 3: details, 4: confirm
  const [meetingType, setMeetingType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason,       setReason]      = useState('Buying a Home');
  const [form,         setForm]        = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [submitted,    setSubmitted]   = useState(false);
  const [submitting,   setSubmitting]  = useState(false);
  const [errors,       setErrors]      = useState({});

  const dates = getDates(14);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim())  e.lastName  = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    // Simulate form submission (replace with real API call or form service)
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label className="input-label">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: undefined })); }}
        placeholder={placeholder}
        className="input-field"
        style={errors[key] ? { borderColor: 'var(--exit-red, #EE3124)' } : {}}
        required={['firstName', 'lastName', 'email', 'phone'].includes(key)}
      />
      {errors[key] && <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: '#EE3124', marginTop: 3 }}>{errors[key]}</p>}
    </div>
  );

  if (submitted) {
    return (
      <>
        <div style={{ paddingTop: 80 }}>
          <div className="container-wide flex items-center justify-center" style={{ minHeight: '80vh' }}>
            <div className="text-center max-w-md">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'var(--teal)', boxShadow: '0 8px 32px rgba(0,140,154,0.35)', fontSize: 36 }}
              >
                ✓
              </div>
              <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: 16 }}>
                You're All Set!
              </h1>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: '#4a5568', lineHeight: 1.75, marginBottom: 8 }}>
                Thanks, <strong>{form.firstName}</strong>! Joel will be in touch within 1 business day to confirm your appointment.
              </p>
              {selectedDate && selectedTime && (
                <div className="rounded-xl p-5 my-6" style={{ background: 'rgba(0,140,154,0.08)', border: '1.5px solid rgba(0,140,154,0.2)' }}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--navy)' }}>
                    Requested Appointment
                  </p>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--teal)', marginTop: 4 }}>
                    {formatDate(selectedDate)} at {selectedTime}
                  </p>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)', marginTop: 4 }}>
                    {MEETING_TYPES.find(t => t.id === meetingType)?.label}
                  </p>
                </div>
              )}
              <Link href="/" className="btn-primary">Back to Home</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

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
            Get in Touch
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
            Book a Consultation
          </h1>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 480, lineHeight: 1.7 }}>
            Free, no-obligation consultation. Joel is here to answer your questions and help you plan your next real estate move.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-pad">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Booking form — steps */}
            <div className="lg:col-span-8">
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[
                  { n: 1, label: 'Meeting Type' },
                  { n: 2, label: 'Date & Time' },
                  { n: 3, label: 'Your Details' },
                ].map(({ n, label }, i, arr) => (
                  <div key={n} className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background:  step > n ? 'var(--teal)'  : step === n ? 'var(--navy)'       : 'var(--light)',
                          color:       step >= n ? 'white'       : 'var(--gray)',
                          fontFamily:  'Montserrat, sans-serif',
                          fontWeight:  700,
                          fontSize:    13,
                          transition:  'all 0.2s ease',
                        }}
                      >
                        {step > n ? '✓' : n}
                      </div>
                      <span
                        className="hidden sm:block"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600,
                          fontSize:   12,
                          color:      step >= n ? 'var(--navy)' : 'var(--gray)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex-1 h-[1.5px] mx-1" style={{ background: step > n ? 'var(--teal)' : 'var(--light)' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Meeting type */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    How would you like to meet?
                  </h2>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--gray)', marginBottom: 24 }}>
                    Choose the format that works best for you.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MEETING_TYPES.map(({ id, label, icon, desc }) => (
                      <button
                        key={id}
                        onClick={() => { setMeetingType(id); setStep(2); }}
                        className="rounded-xl p-5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-teal-500"
                        style={{
                          background:  meetingType === id ? 'rgba(0,140,154,0.08)' : 'white',
                          border:      `1.5px solid ${meetingType === id ? 'var(--teal)' : 'var(--light)'}`,
                          boxShadow:   meetingType === id ? '0 4px 20px rgba(0,140,154,0.12)' : '0 1px 6px rgba(0,49,73,0.04)',
                          cursor:      'pointer',
                          transform:   'none',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = meetingType === id ? 'var(--teal)' : 'var(--light)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        <div className="text-2xl mb-2">{icon}</div>
                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 4 }}>{label}</p>
                        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)' }}>{desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & time */}
              {step === 2 && (
                <div>
                  <button
                    onClick={() => setStep(1)}
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16, letterSpacing: '0.04em' }}
                  >
                    ← Back
                  </button>
                  <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    Choose a date and time
                  </h2>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--gray)', marginBottom: 24 }}>
                    Available Monday–Saturday. Times are Atlantic Standard Time (AST/ADT).
                  </p>

                  {/* Date picker */}
                  <div className="mb-6">
                    <label className="input-label" style={{ marginBottom: 10 }}>Select a Date</label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {dates.map(d => (
                        <button
                          key={d.toISOString()}
                          onClick={() => setSelectedDate(d)}
                          className="flex-shrink-0 rounded-xl p-3 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-teal-500"
                          style={{
                            minWidth: 72,
                            background: selectedDate?.toDateString() === d.toDateString() ? 'var(--navy)' : 'white',
                            border:     `1.5px solid ${selectedDate?.toDateString() === d.toDateString() ? 'var(--navy)' : 'var(--light)'}`,
                            cursor:     'pointer',
                          }}
                        >
                          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 10, color: selectedDate?.toDateString() === d.toDateString() ? 'var(--teal)' : 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {d.toLocaleDateString('en-CA', { weekday: 'short' })}
                          </p>
                          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 18, color: selectedDate?.toDateString() === d.toDateString() ? 'white' : 'var(--navy)', lineHeight: 1.2 }}>
                            {d.getDate()}
                          </p>
                          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 10, color: selectedDate?.toDateString() === d.toDateString() ? 'rgba(255,255,255,0.7)' : 'var(--gray)' }}>
                            {d.toLocaleDateString('en-CA', { month: 'short' })}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div>
                      <label className="input-label" style={{ marginBottom: 10 }}>Select a Time</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {TIME_SLOTS.map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className="py-2 px-2 rounded-lg text-center transition-all duration-150 focus-visible:outline-2 focus-visible:outline-teal-500"
                            style={{
                              fontFamily: 'Montserrat, sans-serif',
                              fontWeight: 600,
                              fontSize:   11,
                              background: selectedTime === time ? 'var(--teal)'  : 'white',
                              color:      selectedTime === time ? 'white'        : 'var(--navy)',
                              border:     `1.5px solid ${selectedTime === time   ? 'var(--teal)' : 'var(--light)'}`,
                              cursor:     'pointer',
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <button onClick={() => setStep(3)} className="btn-primary mt-6">
                      Continue →
                    </button>
                  )}
                </div>
              )}

              {/* Step 3: Contact details */}
              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16, letterSpacing: '0.04em' }}
                  >
                    ← Back
                  </button>
                  <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    Your contact details
                  </h2>

                  {/* Appointment summary */}
                  <div className="rounded-xl p-4 mb-8" style={{ background: 'rgba(0,140,154,0.08)', border: '1.5px solid rgba(0,140,154,0.2)' }}>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: 'Meeting Type', value: MEETING_TYPES.find(t => t.id === meetingType)?.label },
                        { label: 'Date',         value: selectedDate ? formatDate(selectedDate) : '' },
                        { label: 'Time',         value: selectedTime },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)' }}>{label}</p>
                          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {field('firstName',  'First Name',    'text',  'Jane')}
                    {field('lastName',   'Last Name',     'text',  'Smith')}
                    {field('email',      'Email Address', 'email', 'jane@example.com')}
                    {field('phone',      'Phone Number',  'tel',   '(506) 555-0100')}
                  </div>

                  <div className="mt-5">
                    <label className="input-label">Reason for Consultation</label>
                    <select
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      className="input-field"
                    >
                      {REASON_OPTS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div className="mt-5">
                    <label className="input-label">Additional Notes (optional)</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Any specific questions, properties you're interested in, or details that would help Joel prepare…"
                      rows={4}
                      className="input-field"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--gray)', marginTop: 16, lineHeight: 1.6 }}>
                    By submitting this form, you consent to Joel McElhinney contacting you regarding your real estate inquiry. Your information will never be shared with third parties.
                  </p>

                  <button
                    type="submit"
                    className="btn-primary mt-5"
                    disabled={submitting}
                    style={{ opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? 'Submitting…' : 'Request Appointment →'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 flex flex-col gap-5">
                {/* Joel's photo + quick info */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ boxShadow: '0 4px 24px rgba(0,49,73,0.10)' }}
                >
                  <img
                    src="/joel-photo.jpg"
                    alt="Joel McElhinney"
                    className="w-full object-cover object-top"
                    style={{ maxHeight: 260 }}
                  />
                  <div className="p-5" style={{ background: 'var(--navy)' }}>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 17, color: 'white' }}>
                      Joel McElhinney
                    </p>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--teal)', marginTop: 2 }}>
                      REALTOR® — EXIT Realty Specialists
                    </p>
                  </div>
                </div>

                {/* Contact details */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'white', border: '1.5px solid var(--light)', boxShadow: '0 2px 12px rgba(0,49,73,0.05)' }}
                >
                  <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                    Direct Contact
                  </h4>
                  {[
                    { icon: '📞', label: 'Phone',  value: '(506) 123-4567',       href: 'tel:+15061234567' },
                    { icon: '✉',  label: 'Email',  value: 'joel@joelmcelhinney.ca', href: 'mailto:joel@joelmcelhinney.ca' },
                    { icon: '🏢', label: 'Office', value: 'EXIT Realty Specialists\nSaint John, NB', href: null },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3 py-3" style={{ borderBottom: '1px solid var(--light)' }}>
                      <span style={{ fontSize: 16, marginTop: 1 }}>{icon}</span>
                      <div>
                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 2 }}>{label}</p>
                        {href ? (
                          <a href={href} style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--navy)' }} className="hover:text-teal-500 transition-colors duration-200">
                            {value}
                          </a>
                        ) : (
                          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--navy)', whiteSpace: 'pre-line' }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="mt-5">
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 10 }}>
                      Office Hours
                    </p>
                    {[
                      { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                      { day: 'Saturday',        hours: '9:00 AM – 4:00 PM' },
                      { day: 'Sunday',          hours: 'By Appointment' },
                    ].map(({ day, hours }) => (
                      <div key={day} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid var(--light)' }}>
                        <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)' }}>{day}</span>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--navy)' }}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Browse Listings',   href: '/listings',    icon: '🏠' },
                    { label: 'View Calculators',  href: '/calculators', icon: '💰' },
                  ].map(({ label, href, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: 'white', border: '1.5px solid var(--light)', boxShadow: '0 1px 6px rgba(0,49,73,0.04)' }}
                    >
                      <span style={{ fontSize: 20, display: 'block', marginBottom: 4 }}>{icon}</span>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--navy)' }}>{label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div style={{ background: 'var(--light)', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid var(--light)' }}>
        <div className="text-center">
          <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>📍</span>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--navy)' }}>
            EXIT Realty Specialists
          </p>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--gray)' }}>
            Saint John, New Brunswick
          </p>
        </div>
      </div>
    </>
  );
}
