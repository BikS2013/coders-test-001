import { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  // Sample users
  const allUsers = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
  ];

  // Time period options
  const timePeriods = [
    { id: 'last_day', name: 'Last Day', fromDate: subtractDays(new Date(), 1), toDate: new Date() },
    { id: 'last_week', name: 'Last Week', fromDate: subtractDays(new Date(), 7), toDate: new Date() },
    { id: 'last_month', name: 'Last Month', fromDate: subtractDays(new Date(), 30), toDate: new Date() },
    { id: 'last_quarter', name: 'Last Quarter', fromDate: subtractDays(new Date(), 90), toDate: new Date() },
    { id: 'last_year', name: 'Last Year', fromDate: subtractDays(new Date(), 365), toDate: new Date() },
  ];

  // Rating categories
  const ratingCategories = [
    { id: 'all', name: 'All Ratings', min: -10, max: 10 },
    { id: 'positive', name: 'Positive (1 to 10)', min: 1, max: 10 },
    { id: 'negative', name: 'Negative (-10 to -1)', min: -10, max: -1 },
    { id: 'neutral', name: 'Relatively Neutral (-3 to +3)', min: -3, max: 3 },
    { id: 'heavily_positive', name: 'Heavily Positive (7 to 10)', min: 7, max: 10 },
    { id: 'heavily_negative', name: 'Heavily Negative (-10 to -7)', min: -10, max: -7 },
    { id: 'mild_positive', name: 'Mild Positive (1 to 6)', min: 1, max: 6 },
    { id: 'mild_negative', name: 'Mild Negative (-6 to -1)', min: -6, max: -1 },
  ];

  // State variables
  const [expandUsers, setExpandUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([...allUsers.map(u => u.id), 'all']);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriods[1].id);
  const [fromDate, setFromDate] = useState(formatDate(timePeriods[1].fromDate));
  const [toDate, setToDate] = useState(formatDate(timePeriods[1].toDate));
  const [selectedRatingCategories, setSelectedRatingCategories] = useState(['all']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Helper function to subtract days from a date
  function subtractDays(date, days) {
    const result = new Date(date);
    result.setDate(date.getDate() - days);
    return result;
  }

  // Format date to dd/mm/yyyy
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Parse date from dd/mm/yyyy
  function parseDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  // Handle user selection
  const handleUserSelect = (userId) => {
    if (userId === 'all') {
      if (selectedUsers.includes('all')) {
        setSelectedUsers([]);
      } else {
        setSelectedUsers(['all', ...allUsers.map(u => u.id)]);
      }
    } else {
      let newSelected = [...selectedUsers];
      
      if (newSelected.includes(userId)) {
        newSelected = newSelected.filter(id => id !== userId);
        if (newSelected.includes('all')) {
          newSelected = newSelected.filter(id => id !== 'all');
        }
      } else {
        newSelected.push(userId);
        if (newSelected.length === allUsers.length + 1 && !newSelected.includes('all')) {
          newSelected.push('all');
        }
      }
      
      setSelectedUsers(newSelected);
    }
  };

  // Handle time period selection
  const handleTimePeriodSelect = (periodId) => {
    setSelectedTimePeriod(periodId);
    const period = timePeriods.find(p => p.id === periodId);
    setFromDate(formatDate(period.fromDate));
    setToDate(formatDate(period.toDate));
    setIsTimeDropdownOpen(false);
  };

  // Handle rating category selection
  const handleRatingCategorySelect = (categoryId) => {
    if (categoryId === 'all') {
      if (selectedRatingCategories.includes('all')) {
        setSelectedRatingCategories([]);
      } else {
        setSelectedRatingCategories(['all']);
      }
    } else {
      let newSelected = [...selectedRatingCategories];
      
      if (newSelected.includes(categoryId)) {
        newSelected = newSelected.filter(id => id !== categoryId);
      } else {
        if (newSelected.includes('all')) {
          newSelected = newSelected.filter(id => id !== 'all');
        }
        newSelected.push(categoryId);
      }
      
      setSelectedRatingCategories(newSelected);
    }
  };

  // Calendar component (simplified)
  const SimpleCalendar = ({ selectedDate, onDateSelect, onClose }) => {
    const [viewDate, setViewDate] = useState(parseDate(selectedDate));
    
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    const handleDateClick = (day) => {
      if (day) {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        onDateSelect(formatDate(newDate));
        onClose();
      }
    };
    
    const changeMonth = (offset) => {
      const newDate = new Date(viewDate);
      newDate.setMonth(newDate.getMonth() + offset);
      setViewDate(newDate);
    };
    
    return (
      <div className="absolute z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200 w-64">
        <div className="flex justify-between mb-2">
          <button onClick={() => changeMonth(-1)} className="px-2">←</button>
          <div>
            {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
          </div>
          <button onClick={() => changeMonth(1)} className="px-2">→</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-xs font-semibold">{day}</div>
          ))}
          {days.map((day, index) => (
            <div 
              key={index} 
              onClick={() => handleDateClick(day)}
              className={`text-center text-sm p-1 cursor-pointer hover:bg-blue-100 ${day ? '' : 'invisible'}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Generate sample chart data
  const generateChartData = () => {
    const startDate = parseDate(fromDate);
    const endDate = parseDate(toDate);
    const data = [];
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Generate random data for each rating category
      const entry = {
        date: formatDate(currentDate),
        heavily_negative: Math.floor(Math.random() * 10),
        mild_negative: Math.floor(Math.random() * 15),
        neutral: Math.floor(Math.random() * 25),
        mild_positive: Math.floor(Math.random() * 20),
        heavily_positive: Math.floor(Math.random() * 15)
      };
      
      data.push(entry);
      
      // Move to next date
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
  };
  
  const chartData = generateChartData();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-12' : 'w-64'} bg-white shadow-md overflow-y-auto transition-all duration-300 relative`}>
        <div className="absolute right-0 top-2 p-1">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="bg-gray-200 rounded-l-md p-1 hover:bg-gray-300"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {!sidebarCollapsed && <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Dashboard Settings</h1>
        
        {/* Users Selection */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Users</h2>
          <div className="flex items-center mb-2">
            <div className={`relative w-full ${expandUsers ? 'opacity-50 pointer-events-none' : ''}`}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex justify-between items-center w-full px-3 py-2 text-sm border rounded-md bg-white"
                disabled={expandUsers}
              >
                <span>{selectedUsers.includes('all') ? 'All Users' : `${selectedUsers.length} selected`}</span>
                <ChevronDown size={16} />
              </button>
              
              {isDropdownOpen && !expandUsers && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                  <div className="p-2">
                    <label className="flex items-center p-2 hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes('all')}
                        onChange={() => handleUserSelect('all')}
                        className="mr-2"
                      />
                      <span>All</span>
                    </label>
                    
                    {allUsers.map(user => (
                      <label key={user.id} className="flex items-center p-2 hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                          className="mr-2"
                        />
                        <span>{user.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <label className="flex items-center ml-2">
              <input
                type="checkbox"
                checked={expandUsers}
                onChange={() => {
                  setExpandUsers(!expandUsers);
                  setIsDropdownOpen(false);
                }}
                className="mr-1"
              />
              <span className="text-xs">Expand</span>
            </label>
          </div>
          
          {expandUsers && (
            <div className="border rounded-md p-2 mt-2 bg-white">
              <label className="flex items-center p-1 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes('all')}
                  onChange={() => handleUserSelect('all')}
                  className="mr-2"
                />
                <span>All</span>
              </label>
              
              {allUsers.map(user => (
                <label key={user.id} className="flex items-center p-1 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    className="mr-2"
                  />
                  <span>{user.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        
        {/* Time Period Selection */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Time Period</h2>
          <div className="relative w-full mb-3">
            <button
              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
              className="flex justify-between items-center w-full px-3 py-2 text-sm border rounded-md bg-white"
            >
              <span>{timePeriods.find(p => p.id === selectedTimePeriod)?.name || 'Select period'}</span>
              <ChevronDown size={16} />
            </button>
            
            {isTimeDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {timePeriods.map(period => (
                  <div
                    key={period.id}
                    onClick={() => handleTimePeriodSelect(period.id)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {period.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Date Range Pickers */}
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <label className="text-xs text-gray-600">From:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                  placeholder="dd/mm/yyyy"
                />
                <button 
                  onClick={() => setShowFromCalendar(!showFromCalendar)}
                  className="absolute right-2 top-6"
                >
                  <Calendar size={16} />
                </button>
              </div>
              {showFromCalendar && (
                <SimpleCalendar
                  selectedDate={fromDate}
                  onDateSelect={setFromDate}
                  onClose={() => setShowFromCalendar(false)}
                />
              )}
            </div>
            
            <div className="relative">
              <label className="text-xs text-gray-600">To:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                  placeholder="dd/mm/yyyy"
                />
                <button 
                  onClick={() => setShowToCalendar(!showToCalendar)}
                  className="absolute right-2 top-6"
                >
                  <Calendar size={16} />
                </button>
              </div>
              {showToCalendar && (
                <SimpleCalendar
                  selectedDate={toDate}
                  onDateSelect={setToDate}
                  onClose={() => setShowToCalendar(false)}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Ratings Selection */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Rating Categories</h2>
          <div className="border rounded-md p-2 bg-white">
            {ratingCategories.map(category => (
              <label key={category.id} className="flex items-center p-1 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedRatingCategories.includes(category.id)}
                  onChange={() => handleRatingCategorySelect(category.id)}
                  className="mr-2"
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        </div>}
      </div>

      {/* Main Dashboard Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Top panel - Selection Criteria Summary */}
        <div className="bg-white p-4 shadow mb-4">
          <h1 className="text-xl font-bold mb-3">Chatbot Ratings Dashboard</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded p-2">
              <h3 className="text-sm font-semibold mb-1">Users</h3>
              <p className="text-sm">
                {selectedUsers.includes('all') ? 'All Users' : `${selectedUsers.length} selected`}
              </p>
            </div>
            <div className="border rounded p-2">
              <h3 className="text-sm font-semibold mb-1">Time Period</h3>
              <p className="text-sm">{fromDate} - {toDate}</p>
            </div>
            <div className="border rounded p-2">
              <h3 className="text-sm font-semibold mb-1">Rating Categories</h3>
              <p className="text-sm">
                {selectedRatingCategories.includes('all') ? 'All Ratings' : 
                  selectedRatingCategories.map(id => 
                    ratingCategories.find(cat => cat.id === id)?.name
                  ).join(', ')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Bar Chart Panel */}
        <div className="bg-white p-4 shadow mb-4">
          <h2 className="text-lg font-semibold mb-3">Ratings Distribution Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="heavily_negative" stackId="stack" name="Heavily Negative (-10 to -7)" fill="#ef4444" />
                <Bar dataKey="mild_negative" stackId="stack" name="Mild Negative (-6 to -1)" fill="#f97316" />
                <Bar dataKey="neutral" stackId="stack" name="Neutral (-3 to +3)" fill="#a3a3a3" />
                <Bar dataKey="mild_positive" stackId="stack" name="Mild Positive (1 to 6)" fill="#22c55e" />
                <Bar dataKey="heavily_positive" stackId="stack" name="Heavily Positive (7 to 10)" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Additional dashboard panels could go here */}
        <div className="bg-white p-4 shadow mb-4">
          <h2 className="text-lg font-semibold mb-3">Rating Summary</h2>
          <div className="grid grid-cols-5 gap-4 text-center">
            <div className="bg-red-100 p-3 rounded">
              <div className="text-xl font-bold text-red-600">
                {chartData.reduce((sum, item) => sum + item.heavily_negative, 0)}
              </div>
              <div className="text-sm">Heavily Negative</div>
            </div>
            <div className="bg-orange-100 p-3 rounded">
              <div className="text-xl font-bold text-orange-600">
                {chartData.reduce((sum, item) => sum + item.mild_negative, 0)}
              </div>
              <div className="text-sm">Mild Negative</div>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <div className="text-xl font-bold text-gray-600">
                {chartData.reduce((sum, item) => sum + item.neutral, 0)}
              </div>
              <div className="text-sm">Neutral</div>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <div className="text-xl font-bold text-green-600">
                {chartData.reduce((sum, item) => sum + item.mild_positive, 0)}
              </div>
              <div className="text-sm">Mild Positive</div>
            </div>
            <div className="bg-emerald-100 p-3 rounded">
              <div className="text-xl font-bold text-emerald-600">
                {chartData.reduce((sum, item) => sum + item.heavily_positive, 0)}
              </div>
              <div className="text-sm">Heavily Positive</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
