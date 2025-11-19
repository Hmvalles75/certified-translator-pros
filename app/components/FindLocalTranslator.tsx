"use client";

import { useRouter } from "next/navigation";
import SectionContainer from "./SectionContainer";

export default function FindLocalTranslator() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/find-a-translator");
  };

  return (
    <SectionContainer background="white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Need a local translator? Browse our verified directory.
        </h2>
        <p className="text-gray-600 mb-8">
          Find certified translators in your city for in-person services, notarization,
          and face-to-face consultations. All vetted professionals.
        </p>

        <form onSubmit={handleSearch} className="bg-background p-6 rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                City or ZIP Code
              </label>
              <input
                type="text"
                id="location"
                placeholder="Enter city or ZIP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Language
              </label>
              <select
                id="language"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none bg-white"
              >
                <option value="">Select a language</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
                <option value="arabic">Arabic</option>
                <option value="russian">Russian</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
          >
            Search Local Pros
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
