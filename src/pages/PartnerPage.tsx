import React, { useEffect, useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { MISSION_INFO } from '../data/missionData';
import { BankAccountsGrid } from '../components/BankAccountsGrid';

interface SubmittedRecord {
  id: string;
  type: string;
  name: string;
  createdAt: string;
  message: string;
}

export const PartnerPage: React.FC = () => {
  const [requestType, setRequestType] = useState<'Regular Support Partner' | 'Go on Mission' | 'Prayer & Counseling'>('Regular Support Partner');
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [history, setHistory] = useState<SubmittedRecord[]>(() => {
    try {
      const raw = localStorage.getItem('hf_partner_requests');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hf_partner_requests', JSON.stringify(history));
    } catch {
      // ignore storage errors
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneOrEmail.trim()) return;
    const entry: SubmittedRecord = {
      id: `${Date.now()}`,
      type: requestType,
      name: name.trim(),
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      message: message.trim() || 'Requested partnership follow-up from Harvest Field Mission.',
    };
    setHistory((prev) => [entry, ...prev].slice(0, 5));
    setSubmittedSuccess(true);
    setName('');
    setPhoneOrEmail('');
    setCity('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-harvest-600">
          Partner, Give &amp; Connect
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-forest-950 leading-tight">
          Stand with the harvest through going, prayer, or regular support.
        </h1>
        <p className="text-base text-stone-700 leading-relaxed">
          Every gift and partnership commitment directly strengthens rural and foreign missions
          across Omoku, Northern Cameroon, Tchad Republic, Côte d&apos;Ivoire, and Harvest Field
          Academy.
        </p>
      </section>

      {/* Verified Banking Accounts */}
      <section className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-forest-950">
            Official Mission Bank Accounts
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Tap &ldquo;Copy&rdquo; on any account number to copy directly to your clipboard.
          </p>
        </div>
        <BankAccountsGrid />
      </section>

      {/* Partnership Form + Office Directory */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6 border-t border-stone-200">
        {/* Form */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl font-semibold text-forest-950">
              Partner Commitment, Counseling &amp; Prayer Desk
            </h2>
            <p className="text-sm text-stone-600">
              Let us know how you wish to partner, volunteer for field trips, or request prayer.
            </p>
          </div>

          {submittedSuccess ? (
            <div className="bg-[#faf8f4] border border-stone-200 rounded-xl p-8 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-forest-900 mx-auto" />
              <h3 className="font-serif text-2xl font-semibold text-forest-950">
                Thank you for partnering with us.
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Your note has been recorded. For immediate ministry follow-up during office hours
                (Mon–Fri, 9:00 AM – 3:00 PM), call +234 813 288 6893.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedSuccess(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 rounded-lg cursor-pointer"
              >
                Submit Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {(
                  ['Regular Support Partner', 'Go on Mission', 'Prayer & Counseling'] as const
                ).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRequestType(type)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      requestType === type
                        ? 'bg-forest-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="p-name" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="p-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#faf8f4] border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label htmlFor="p-contact" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Phone or Email
                  </label>
                  <input
                    id="p-contact"
                    type="text"
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="+234 ... or email"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#faf8f4] border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="p-city" className="block text-xs font-semibold text-stone-700 mb-1.5">
                  City / Country (Optional)
                </label>
                <input
                  id="p-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Omoku, Port Harcourt, Yaoundé"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf8f4] border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label htmlFor="p-msg" className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Message, Support Pledge, or Prayer Need
                </label>
                <textarea
                  id="p-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share how you would like to support, join a field team, or receive counseling..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf8f4] border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-forest-900 hover:bg-forest-800 rounded-lg transition-colors cursor-pointer"
              >
                Send Partnership &amp; Prayer Note
              </button>
            </form>
          )}

          {history.length > 0 && (
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  Your Recent Submissions
                </p>
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  Clear Log
                </button>
              </div>
              <div className="space-y-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-lg bg-[#faf8f4] border border-stone-200 text-xs space-y-1"
                  >
                    <p className="font-semibold text-forest-950">
                      {item.type} <span aria-hidden="true">·</span> {item.name}{' '}
                      <span className="font-normal text-stone-500">({item.createdAt})</span>
                    </p>
                    <p className="text-stone-600">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Physical Office & Direct Contact Card */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-limestone/70 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="font-serif text-2xl font-semibold text-forest-950">
              Visit or Reach the Mission Office
            </h2>

            <div className="space-y-4 text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-forest-900 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-900">Head Office</p>
                  <p className="leading-relaxed">{MISSION_INFO.headOffice}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-forest-900 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-900">Fellowship Venue</p>
                  <p className="leading-relaxed">{MISSION_INFO.fellowshipVenue}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-forest-900 mt-1 shrink-0" />
                <div className="space-y-1 tabular-nums">
                  <p className="font-semibold text-stone-900">Direct Lines</p>
                  {MISSION_INFO.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="block hover:text-forest-900 hover:underline"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-forest-900 mt-1 shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold text-stone-900">Emails</p>
                  {MISSION_INFO.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block hover:text-forest-900 hover:underline break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-300/70">
              <p className="text-xs font-medium text-stone-500">Office &amp; Counseling Hours</p>
              <p className="text-sm font-semibold text-forest-950 mt-0.5 tabular-nums">
                {MISSION_INFO.officeHours}
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
