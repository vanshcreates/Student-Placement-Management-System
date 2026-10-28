import { useContext } from "react";
import { Building2, BriefcaseBusiness, MapPin, Globe } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Companies_application = () => {
  const { companies } = useContext(AuthContext);

  return (
    <section className="mx-auto w-[85%] py-8">
      <h2 className="mb-5 text-2xl font-bold text-[#103d2c]">Hiring Companies</h2>
      {companies.length === 0 ? (
        <p className="rounded-2xl border bg-white p-6 text-gray-500">
          No companies have been added yet.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {companies.map((company) => (
            <article
              key={company.id || company.email}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6eee7] text-[#52745a]">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#103d2c]">{company.name}</h3>
                    <p className="text-sm text-[#52745a]">{company.industry || "Hiring company"}</p>
                  </div>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Listed
                </span>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                <p className="flex items-center gap-2">
                  <BriefcaseBusiness size={16} />
                  {company.role || "Placement opportunities"}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  {company.location || "Location to be announced"}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-[#103d2c]">CTC</span>
                  {company.package ? `${company.package} LPA` : "As per role"}
                </p>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[#52745a] hover:underline"
                  >
                    <Globe size={16} />
                    Company website
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Companies_application;
