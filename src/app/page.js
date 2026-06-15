import EmployeeDetailsCard from "@/components/profile/EmployeeDetailsCard";
import EmergencyContactsCard from "@/components/contacts/EmergencyContactsCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">

      {/* Header */}
      <div className="w-full border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="h2">Employee Profile</h1>
        </div>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-4xl mx-auto p-6 space-y-6">

        {/* Main Card */}
        <div className="border rounded-xl p-6 space-y-10 shadow-sm">

          {/* Employee Details Section */}
          <EmployeeDetailsCard/>

          {/* Emergency Contact Section */}
          <EmergencyContactsCard/>
        </div>

      </main>
    </div>
  );
}