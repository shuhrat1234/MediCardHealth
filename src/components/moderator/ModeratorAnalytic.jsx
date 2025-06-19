import React from 'react';
import { Users, Building, User, TrendingUp, BarChart3 } from 'lucide-react';

function ModeratorAnalytic() {
  const stats = [
    {
      title: 'Klinikalar soni',
      value: '25',
      change: 'Bu oyda +2 ta',
      icon: <Building className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Shifokorlar soni', 
      value: '142',
      change: 'Bu oyda +8 ta',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Bemorlar soni',
      value: '1 876', 
      change: 'Bu oyda +156 ta',
      icon: <User className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-50'
    }
  ];

  const chartData = [
    { month: 'Yan', klinikalar: 20, shifokorlar: 120, bemorlar: 1650, growth: 5 },
    { month: 'Fev', klinikalar: 21, shifokorlar: 125, bemorlar: 1680, growth: 8 },
    { month: 'Mar', klinikalar: 22, shifokorlar: 130, bemorlar: 1720, growth: 12 },
    { month: 'Apr', klinikalar: 23, shifokorlar: 135, bemorlar: 1780, growth: 15 },
    { month: 'May', klinikalar: 24, shifokorlar: 138, bemorlar: 1820, growth: 18 },
    { month: 'Iyun', klinikalar: 25, shifokorlar: 142, bemorlar: 1876, growth: 22 }
  ];

  // Calculate percentages for visual representation
  const maxClinic = Math.max(...chartData.map(d => d.klinikalar));
  const minClinic = Math.min(...chartData.map(d => d.klinikalar));
  const maxDoctor = Math.max(...chartData.map(d => d.shifokorlar));
  const minDoctor = Math.min(...chartData.map(d => d.shifokorlar));
  const maxGrowth = Math.max(...chartData.map(d => d.growth));

  return (
    <div className="min-h-full w-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Statistika</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
                <div className="text-3xl font-bold text-blue-500 mb-1">{stat.value}</div>
                <p className="text-gray-500 text-sm">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Simulation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Oylik o'sish dinamikasi</h2>
          </div>
          
          <div className="space-y-4">
            {/* Legend */}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Klinikalar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Shifokorlar</span>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="relative h-64 bg-gray-50 rounded-lg p-4">
              <div className="absolute inset-4">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="absolute border-b border-gray-200" style={{top: `${i * 25}%`, left: 0, right: 0}}></div>
                  ))}
                </div>
                
                {/* Data visualization */}
                <div className="relative h-full flex items-end justify-between">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div className="flex items-end gap-1" style={{height: '200px'}}>
                        {/* Clinic bar */}
                        <div 
                          className="w-6 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors cursor-pointer"
                          style={{height: `${((item.klinikalar - minClinic) / (maxClinic - minClinic)) * 160 + 20}px`}}
                          title={`Klinikalar: ${item.klinikalar}`}
                        ></div>
                        {/* Doctor bar */}
                        <div 
                          className="w-6 bg-green-500 rounded-t-sm hover:bg-green-600 transition-colors cursor-pointer"
                          style={{height: `${((item.shifokorlar - minDoctor) / (maxDoctor - minDoctor)) * 160 + 20}px`}}
                          title={`Shifokorlar: ${item.shifokorlar}`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Percentage Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Bemorlar soni o'sishi (%)</h2>
          </div>
          
          <div className="space-y-4">
            <div className="relative h-64 bg-gray-50 rounded-lg p-4">
              <div className="absolute inset-4">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="absolute border-b border-gray-200" style={{top: `${i * 25}%`, left: 0, right: 0}}></div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500">
                  <span>{maxGrowth}%</span>
                  <span>{Math.round(maxGrowth * 0.75)}%</span>
                  <span>{Math.round(maxGrowth * 0.5)}%</span>
                  <span>{Math.round(maxGrowth * 0.25)}%</span>
                  <span>0%</span>
                </div>
                
                {/* Bar chart */}
                <div className="relative h-full flex items-end justify-between gap-2 ml-10">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer shadow-sm"
                        style={{height: `${(item.growth / maxGrowth) * 180}px`}}
                        title={`O'sish: ${item.growth}%`}
                      ></div>
                      <span className="text-xs text-gray-600 font-medium">{item.month}</span>
                      <span className="text-xs text-blue-600 font-semibold">{item.growth}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModeratorAnalytic;   