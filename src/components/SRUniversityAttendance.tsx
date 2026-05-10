import React, { useEffect, useState, useMemo } from "react";
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("68da82d100073f5fc5e0");

const databases = new Databases(client);

const databaseId = "68da835700145b9f708f";
const collectionId = "records";

interface StudentRecord {
  $id: string;
  name: string;
  timestamp: string;
  status: 'Present' | 'Absent' | 'Unknown';
}

interface AppwriteAttendanceDoc {
  $id: string;
  student_name?: string;
  name?: string;
  timestamp?: string | number;
  status?: string;
  attendance_status?: string;
}

const normalizeStatus = (value: unknown): 'Present' | 'Absent' | 'Unknown' => {
  if (typeof value !== 'string') return 'Unknown';
  const normalized = value.trim().toLowerCase();
  if (normalized === 'present') return 'Present';
  if (normalized === 'absent') return 'Absent';
  return 'Unknown';
};

const SRUniversityAttendance: React.FC = () => {
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await databases.listDocuments(databaseId, collectionId);
        const mapped = response.documents.map((rawDoc) => {
          const doc = rawDoc as unknown as AppwriteAttendanceDoc;
          return {
            $id: doc.$id,
            name: doc.student_name || doc.name || 'Unknown Student',
            timestamp: String(doc.timestamp ?? ''),
            // Use device/database-provided status; never hardcode attendance state.
            status: normalizeStatus(doc.status ?? doc.attendance_status),
          };
        });
        const sorted = mapped.sort((a, b) => parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10));
        setRecords(sorted);
      } catch (err: unknown) {
        console.error("Appwrite error:", err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to fetch records: ${message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const groupedRecords = useMemo(() => {
    return records.reduce((acc, record) => {
      const date = new Date(parseInt(record.timestamp, 10)).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {} as Record<string, StudentRecord[]>);
  }, [records]);

  if (loading) return <div>Loading attendance...</div>;
  if (error) return <div>{error}</div>;

  // Fake teachers data
  const teachers = [
    { id: 'SRU-T-001', name: 'Amit Sharma', subject: 'Mathematics', attendance: 'Present' },
    { id: 'SRU-T-002', name: 'Priya Verma', subject: 'Physics', attendance: 'Present' },
    { id: 'SRU-T-003', name: 'Rahul Mehta', subject: 'Chemistry', attendance: 'Present' },
    { id: 'SRU-T-004', name: 'Sneha Kapoor', subject: 'Biology', attendance: 'Present' },
    { id: 'SRU-T-005', name: 'Vikas Singh', subject: 'Computer Science', attendance: 'Present' },
    { id: 'SRU-T-006', name: 'Neha Gupta', subject: 'English', attendance: 'Present' },
    { id: 'SRU-T-007', name: 'Rohit Saini', subject: 'Economics', attendance: 'Present' },
    { id: 'SRU-T-008', name: 'Divya Joshi', subject: 'History', attendance: 'Present' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">SR University Attendance</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Vice Chancellor</p>
            <p className="font-medium">Deepak Garg</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Principal</p>
            <p className="font-medium">Dr. S.S. Rao</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Teachers</h2>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b">
                    <td className="px-4 py-2 font-medium">{teacher.name}</td>
                    <td className="px-4 py-2 text-gray-600">{teacher.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Student Attendance</h2>
            <div className="space-y-6">
              {Object.entries(groupedRecords).map(([date, dateRecords]) => (
                <div key={date}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">{date}</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full whitespace-nowrap">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dateRecords.map((record) => (
                          <tr key={record.$id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(parseInt(record.timestamp, 10)).toLocaleTimeString()}</td>
                            <td
                              className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                                record.status === 'Present'
                                  ? 'text-green-600'
                                  : record.status === 'Absent'
                                    ? 'text-red-600'
                                    : 'text-gray-500'
                              }`}
                            >
                              {record.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SRUniversityAttendance;
