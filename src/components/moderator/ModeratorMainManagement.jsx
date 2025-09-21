import { Plus, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { moderatorGet } from "../../api/services/moderatorService"

export default function ModeratorMainManagement() {
  const [moderator, setModerator] = useState([])

  // get-all-moderator

  const fetchModerator = async () => {
    try {
      const { data } = await moderatorGet();
      console.log("Fetched moderator:", data);
      setModerator(data);
    } catch (error) {
      console.error(
        "Error fetching moderator:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchModerator()
  }, [])

  return (
    <div className='bg-gray-50 p-6 font-sans'>
      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Moderatorni qidirish..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button
          className="cursor-pointer w-full sm:w-auto bg-[#3d99f5] hover:bg-[#2d89e5] text-white px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Moderator qo'shish</span>
        </button>
      </div>

      {/* Table Moderator */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                FIO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tajriba
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Eslatmalar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TELEFON
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fillial
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                HOLATI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AMALLAR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              
          </tbody>
        </table>
      </div>
    </div>
  )
}
