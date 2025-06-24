import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Calendar data for September 3 - December 19, 2025
  const generateCalendarData = () => {
    const startDate = new Date(2025, 8, 3); // September 3, 2025 (month is 0-indexed)
    const endDate = new Date(2025, 11, 19); // December 19, 2025
    const calendarWeeks = [];
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const week = [];
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start from Sunday
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        
        let classes = [];
        if (date.getDay() === 3) { // Wednesday
          classes = [
            { time: '12:45 PM - 3:00 PM', course: 'DHY 202', name: 'Oral Pathology', instructor: 'Dr. Ricca' },
            { time: '3:45 PM - 6:00 PM', course: 'RAD 111', name: 'Intro to Radiology', instructor: 'Dr. Manjra' }
          ];
        } else if (date.getDay() === 5) { // Friday
          classes = [
            { time: '12:45 PM - 3:00 PM', course: 'DHY 202', name: 'Oral Pathology', instructor: 'Dr. Ricca' },
            { time: '3:45 PM - 6:00 PM', course: 'RAD 111', name: 'Intro to Radiology', instructor: 'Dr. Manjra' }
          ];
        }
        
        week.push({
          date: new Date(date),
          classes: classes,
          isCurrentMonth: date >= startDate && date <= endDate
        });
      }
      
      calendarWeeks.push(week);
      currentDate.setDate(currentDate.getDate() + 7);
      
      if (currentDate > endDate) break;
    }
    
    return calendarWeeks;
  };

  const calendarData = generateCalendarData();

  const courses = [
    {
      code: 'DHY 202',
      name: 'Oral Pathology',
      instructor: 'Dr. Ricca',
      credits: 3,
      schedule: 'WF 12:45-3:00 PM',
      room: 'Health Sciences Building 201'
    },
    {
      code: 'RAD 111',
      name: 'Intro to Radiology',
      instructor: 'Dr. Manjra',
      credits: 3,
      schedule: 'WF 3:45-6:00 PM',
      room: 'Medical Technology Center 105'
    }
  ];

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { id: 'assignments', name: 'Assignments', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'inbox', name: 'Inbox', icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0L12 8 4 13' },
    { id: 'grades', name: 'Grades', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'todo', name: 'To Do', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { id: 'calendar', name: 'Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'bill', name: 'My Bill', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, James!</h2>
              <p className="text-blue-100">Fall 2025 Semester • Mount Wachusett Community College</p>
            </div>

            {/* Current Courses */}
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.code}</h3>
                      <p className="text-gray-600 font-medium">{course.name}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {course.credits} Credits
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                    <p><span className="font-medium">Schedule:</span> {course.schedule}</p>
                    <p><span className="font-medium">Room:</span> {course.room}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-600">Active Courses</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-sm text-gray-600">Total Credits</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">$1,380</div>
                <div className="text-sm text-gray-600">Semester Bill</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-green-600">15</div>
                <div className="text-sm text-gray-600">Weeks Remaining</div>
              </div>
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assignments Yet</h3>
            <p className="text-gray-600">Your assignments will appear here once posted by your instructors.</p>
          </div>
        );

      case 'inbox':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0L12 8 4 13" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inbox Empty</h3>
            <p className="text-gray-600">No new messages from instructors or classmates.</p>
          </div>
        );

      case 'grades':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Grades Posted</h3>
            <p className="text-gray-600">Your grades will be displayed here once available.</p>
          </div>
        );

      case 'todo':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">You have no pending tasks at the moment.</p>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Schedule - Fall 2025</h3>
              <p className="text-gray-600 mb-6">September 3, 2025 - December 19, 2025</p>
              
              {/* Calendar Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {calendarData.slice(0, 12).map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 gap-2">
                      {week.map((day, dayIndex) => (
                        <div key={dayIndex} className={`p-2 min-h-[80px] border rounded ${
                          day.isCurrentMonth 
                            ? (day.classes.length > 0 ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200')
                            : 'bg-gray-50 border-gray-100'
                        }`}>
                          <div className={`text-sm font-medium mb-1 ${
                            day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {day.date.getDate()}
                          </div>
                          {day.classes.map((classItem, classIndex) => (
                            <div key={classIndex} className="text-xs bg-blue-600 text-white p-1 rounded mb-1">
                              <div className="font-medium">{classItem.course}</div>
                              <div>{classItem.time.split(' - ')[0]}</div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Class Schedule Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Wednesday</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">DHY 202 - Oral Pathology</p>
                        <p className="text-sm text-blue-700">Dr. Ricca</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-900">12:45 - 3:00 PM</p>
                        <p className="text-sm text-blue-700">Health Sciences 201</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">RAD 111 - Intro to Radiology</p>
                        <p className="text-sm text-green-700">Dr. Manjra</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-900">3:45 - 6:00 PM</p>
                        <p className="text-sm text-green-700">Med Tech Center 105</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Friday</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">DHY 202 - Oral Pathology</p>
                        <p className="text-sm text-blue-700">Dr. Ricca</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-900">12:45 - 3:00 PM</p>
                        <p className="text-sm text-blue-700">Health Sciences 201</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">RAD 111 - Intro to Radiology</p>
                        <p className="text-sm text-green-700">Dr. Manjra</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-900">3:45 - 6:00 PM</p>
                        <p className="text-sm text-green-700">Med Tech Center 105</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bill':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Fall 2025 Semester Bill</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Student:</span>
                  <span className="text-gray-700">James Pham</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Student ID:</span>
                  <span className="text-gray-700">MW2025001</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Semester:</span>
                  <span className="text-gray-700">Fall 2025</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Course Charges</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">DHY 202 - Oral Pathology</p>
                      <p className="text-sm text-gray-600">3 Credits • Dr. Ricca</p>
                    </div>
                    <span className="font-semibold text-gray-900">$690.00</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">RAD 111 - Intro to Radiology</p>
                      <p className="text-sm text-gray-600">4 Credits • Dr. Manjra</p>
                    </div>
                    <span className="font-semibold text-gray-900">$690.00</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Subtotal (6 Credits)</span>
                  <span className="text-gray-700">$1,380.00</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Fees</span>
                  <span className="text-gray-700">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-4 border-t border-gray-300">
                  <span>Total Amount Due</span>
                  <span>$1,380.00</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Payment Information</h5>
                <p className="text-sm text-blue-700 mb-2">Due Date: August 15, 2025</p>
                <p className="text-sm text-blue-700">Payment can be made online through the student portal or at the Bursar's Office.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img 
                src="https://mwcc.edu/wp-content/themes/mwcc/assets/images/mwcc_full_logo.svg" 
                alt="Mount Wachusett Community College" 
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden" style={{display: 'none'}}>
                <div className="h-12 w-48 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MWCC</span>
                </div>
              </div>
              <div className="border-l border-gray-300 pl-4 ml-4">
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Mount Wachusett Community College</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">James Pham</p>
              <p className="text-sm text-gray-600">Fall 2025 Semester</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;