import { useContext } from "react";
import Companies_application from "./Companies_application";
import { AuthContext } from "../../context/AuthContext";

const Applications = () => {
  const { applications, drives } = useContext(AuthContext);
  const counts = applications.reduce(
    (summary, application) => {
      const status = (application.status || "Applied").toLowerCase();
      if (status.includes("accept")) summary.accepted += 1;
      else if (status.includes("shortlist")) summary.shortlisted += 1;
      else if (status.includes("reject")) summary.rejected += 1;
      return summary;
    },
    { accepted: 0, shortlisted: 0, rejected: 0 },
  );

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-[#103d2c]">My Applications</h1>
        <p className="mt-1 text-gray-600">Track applications submitted to placement drives.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Accepted", counts.accepted],
          ["Shortlisted", counts.shortlisted],
          ["Rejected", counts.rejected],
        ].map(([label, count]) => (
          <div key={label} className="rounded-xl border bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-[#103d2c]">{count}</p>
            <p className="mt-1 text-sm text-gray-600">{label}</p>
          </div>
        ))}
      </div>
      {applications.length === 0 ? (
        <p className="rounded-xl border bg-white p-6 text-gray-500">
          You have not applied to any placement drives yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f5f6ef] text-gray-600">
              <tr>
                <th className="p-4">Company</th>
                <th className="p-4">Role</th>
                <th className="p-4">Applied</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => {
                const drive = drives.find((item) => item.id === application.driveId);
                return (
                  <tr key={application.id} className="border-t">
                    <td className="p-4">{drive?.company || "Placement company"}</td>
                    <td className="p-4">{drive?.role || "Placement drive"}</td>
                    <td className="p-4">
                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-4">{application.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Companies_application />
    </section>
  );
};

export default Applications;