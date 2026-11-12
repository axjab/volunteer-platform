import { useMemo, useState } from "react";
import type { Opportunity } from "../../domain/models";
import Button from "../ui/Button";
import Card from "../ui/Card";
import BadgePill from "../ui/BadgePill";
import { currentUser } from "../../data/mockData";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

function getAddressForLocation(location: string) {
  if (location === "Remote") {
    return "Online session link shared after registration";
  }

  return `${location} STEM Learning Centre`;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const address = useMemo(
    () => getAddressForLocation(opportunity.location),
    [opportunity.location]
  );

  function handleSignupSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSignedUp(true);
  }

  function closeSignupModal() {
    setShowSignup(false);
    setSignedUp(false);
    setName("");
    setEmail("");
    setNotes("");
  }

  return (
    <>
      <Card className="flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <BadgePill active>{opportunity.category}</BadgePill>
          <span className="rounded-full border border-gray-600 bg-gray-700 px-2 py-1 text-xs text-gray-300">
            {opportunity.format}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white">{opportunity.title}</h3>
        <p className="mt-3 text-sm text-gray-300">{opportunity.description}</p>

        <div className="mt-4 grid gap-2 text-sm text-gray-300">
          <p>
            <span className="text-white">Age group:</span> {opportunity.ageGroup}
          </p>
          <p>
            <span className="text-white">Location:</span> {opportunity.location}
          </p>
          <p>
            <span className="text-white">Duration:</span> {opportunity.duration}
          </p>
          <p>
            <span className="text-white">Participants:</span> {opportunity.participants}
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-gray-700 bg-gray-800 p-3">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-400">Impact goal</p>
          <p className="mt-2 text-sm text-gray-300">{opportunity.impact}</p>
        </div>

        <div className="mt-5 flex gap-3">
          <Button onClick={() => setShowDetails(true)}>Learn More</Button>
          <Button variant="secondary" onClick={() => setShowSignup(true)}>
            Sign Up
          </Button>
        </div>
      </Card>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <BadgePill active>{opportunity.category}</BadgePill>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  {opportunity.title}
                </h2>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="rounded-full border border-gray-600 bg-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-300">
              {opportunity.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                  Opportunity details
                </p>
                <div className="mt-3 space-y-2 text-sm text-gray-300">
                  <p><span className="text-white">Format:</span> {opportunity.format}</p>
                  <p><span className="text-white">Age group:</span> {opportunity.ageGroup}</p>
                  <p><span className="text-white">Participants:</span> {opportunity.participants}</p>
                  <p><span className="text-white">Duration:</span> {opportunity.duration}</p>
                  <p><span className="text-white">Location:</span> {opportunity.location}</p>
                  <p><span className="text-white">Venue:</span> {address}</p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                  What you will do
                </p>
                <div className="mt-3 space-y-2 text-sm text-gray-300">
                  <p>• Share your experience and STEM career journey</p>
                  <p>• Help students understand real-world applications</p>
                  <p>• Support awareness of STEM pathways and future careers</p>
                  <p>• Represent Thales in a positive and engaging way</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-gray-400">Impact</p>
              <p className="mt-2 text-sm text-gray-300">{opportunity.impact}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="secondary" onClick={() => setShowDetails(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowDetails(false);
                  setShowSignup(true);
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4">
          <div className="w-full max-w-lg rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
            {!signedUp ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                      Sign up
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      {opportunity.title}
                    </h2>
                  </div>
                  <button
                    onClick={closeSignupModal}
                    className="rounded-full border border-gray-600 bg-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleSignupSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Name</label>
                    <input
                      value={currentUser.name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 text-white outline-none placeholder:text-gray-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Email</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 text-white outline-none placeholder:text-gray-500"
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 text-white outline-none placeholder:text-gray-500"
                      placeholder="Optional notes"
                    />
                  </div>

                  <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm text-gray-300">
                    You are signing up for <span className="text-white">{opportunity.title}</span> in{" "}
                    <span className="text-white">{opportunity.location}</span>.
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit">Confirm Sign Up</Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={closeSignupModal}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-emerald-300">
                    Success
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    You're signed up
                  </h2>
                  <p className="mt-3 text-sm text-gray-300">
                    Thanks for signing up for{" "}
                    <span className="text-white">{opportunity.title}</span>. A confirmation
                    email and next steps will be shared shortly.
                  </p>
                </div>

                <div className="mt-4 rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm text-gray-300">
                  <p><span className="text-white">Volunteer:</span> {currentUser.name}</p>
                  <p><span className="text-white">Email:</span> {currentUser.email}</p>
                  <p><span className="text-white">Location:</span> {opportunity.location}</p>
                  <p><span className="text-white">Venue:</span> {address}</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button onClick={closeSignupModal}>Done</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}