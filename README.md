# 🌟 Mission Level 6/6+ - Study Tracker

## हर हर महादेव

A comprehensive web-based study tracking application designed to help you achieve your UPSC/SSC examination goals with systematic progress monitoring, task management, test scoring, and study hour analytics.

---

## 📋 Features

### 1. **📅 365-Day Progress Tracker**
- Visual calendar displaying all 365 days starting from **September 1, 2026**
- Click on any day to mark it as completed
- Track your:
  - **Days Completed**: Total days marked as complete
  - **Current Streak**: Consecutive days of study
  - **Progress Percentage**: Overall completion rate (0-100%)
- Color-coded days:
  - **Saffron gradient**: Completed days
  - **Red border**: Today's date
  - **Light saffron**: Incomplete days

### 2. **✓ Daily To-Do List (50 Tasks/Day)**
- Add up to 50 tasks per day
- **Date flexibility**: Write tasks a day before or on the same day
- Easy-to-use interface with quick buttons:
  - **Today**: Jump to today's date
  - **Tomorrow**: Plan tomorrow's tasks
- Task management:
  - Mark tasks as complete/incomplete
  - Delete unwanted tasks
  - Real-time task counter
- Clean, organized display with hover effects

### 3. **📊 Test Score Tracker (30+ Tests)**
Each test suite includes 4 subjects:
- **Mathematics**
- **Reasoning**
- **English**
- **General Studies**
- **Computer Skills**
- **Full Length Tests**
- **Tier 2 Tests** (Section 1, Section 2, Computer)

**Smart Validation Rules:**
- ✅ Same test type cannot be taken on the same day
- ✅ Tier 2 tests cannot be on the same day
- ✅ Can take different test types on the same day
- ✅ Tests can be taken alternatively or on any day

**Test Features:**
- Input test score and customizable total marks
- Automatic percentage calculation
- Comprehensive test records table
- Delete previous test scores

### 4. **📈 Average Score Analysis**
View average scores by period:
- **Daily**: Today's average performance
- **Weekly**: Last 7 days average
- **Monthly**: Last 30 days average
- **Total**: All-time average

Statistics shown for each test type with:
- Average percentage score
- Number of tests completed
- Subject-wise breakdown

### 5. **⏰ Study Hours Tracker**
Comprehensive study hour monitoring system:

**Add Study Sessions:**
- Date of study
- Hours studied (up to 24 hrs/day)
- Subject/Topic studied

**Study Statistics:**
- **Today's Study Hours**: Current day total
- **Weekly Average**: Last 7 days average
- **Monthly Average**: Last 30 days average
- **Total Study Hours**: All-time total

**Improvement Analysis:**
- 🌟 **Excellent**: 8+ hours per day average
- ✅ **Good**: 6-8 hours per day average
- ⚠️ **Needs Improvement**: Below 6 hours per day average

Real-time feedback and encouragement based on your study patterns.

### 6. **🎯 Improvement Plan Section**
Personal notes area for:
- Write improvement goals for upcoming days
- Track your learning objectives
- Update strategies and focus areas
- Maximum 2000 characters per note
- All notes are timestamped
- Delete old notes as needed
- Real-time character counter

---

## 🎨 Design Features

### Color Theme: **Saffron**
- **Primary Color**: #FF9933 (Saffron Orange)
- **Secondary Color**: #FFB84D (Light Saffron)
- **Background**: #FFE4B5 (Pale Saffron)
- **Text**: Dark and bold for readability

### Responsive Design
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface with single-column layout

### User Experience
- Smooth animations and transitions
- Sticky header for easy navigation
- Intuitive button controls
- Real-time data updates
- Visual feedback for all interactions

---

## 💾 Data Storage

All data is stored locally in your browser using **localStorage**:
- ✅ Automatic saving after each action
- ✅ Persistent data across browser sessions
- ✅ No server required
- ✅ Private - data stays on your device
- ✅ Export option (copy localStorage data)

**Backup your data periodically** by saving the browser's localStorage content.

---

## 🚀 How to Use

### Getting Started
1. Open `index.html` in any modern web browser
2. No installation or registration required
3. All data is saved automatically

### Daily Workflow

**Morning:**
1. View your 365-day progress
2. Check today's to-do list
3. Plan tomorrow's tasks if needed

**During Day:**
1. Update study hours as you study
2. Add new tasks as they come up
3. Mark completed tasks

**Evening:**
1. Add test scores if you completed any tests
2. Review daily study statistics
3. Update improvement notes for tomorrow

---

## 📱 Technical Specifications

### Files Included
1. **index.html** - Main webpage structure
2. **styles.css** - Saffron-themed styling and responsive design
3. **script.js** - Complete functionality and data management
4. **README.md** - This documentation file

### Browser Compatibility
- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

### Requirements
- Modern web browser with JavaScript enabled
- No internet connection required (fully offline-capable)
- Minimum screen resolution: 320px (mobile)

---

## 🎯 Test Score Rules & Validation

### Subject Rules
- Each subject (Math, Reasoning, English, GS, Computer) allows multiple tests
- Tests of the **same type cannot be on the same day**
- Different test types can be taken on the same day

### Tier 2 Rules
- Tier 2 has 3 components: Section 1, Section 2, Computer
- **No two Tier 2 tests on the same day**
- Tier 2 can be on different days from regular tests

### Full Length Tests
- Can be taken anytime
- No same-day restrictions with other Full Length tests
- Can be combined with subject tests on same day

### Example Valid Scenarios
✅ Monday: Mathematics + English + General Studies
✅ Tuesday: Mathematics (different from Monday) + Computer
✅ Wednesday: Tier 2 Section 1 + Full Length Test
✅ Thursday: Tier 2 Section 2 (different from Wednesday)

### Example Invalid Scenarios
❌ Monday: Mathematics + Mathematics (same test, same day)
❌ Tuesday: Tier 2 Section 1 + Tier 2 Section 2 (both Tier 2, same day)

---

## 📊 Statistics & Analytics

### Progress Tracking
- Visual calendar with completion percentage
- Current study streak calculation
- Days completed counter
- Overall progress bar

### Test Performance
- Score-to-total-marks ratio
- Percentage calculation
- Subject-wise averages
- Performance trends over time

### Study Consistency
- Daily study hours monitoring
- Weekly and monthly averages
- Improvement recommendations
- Comparative analysis

---

## 💡 Tips for Success

1. **Daily Check-in**: Visit the tracker every day to maintain your streak
2. **Plan Ahead**: Add tomorrow's tasks today
3. **Consistent Testing**: Take regular tests to track progress
4. **Study Goals**: Aim for 6-8 hours of study daily
5. **Review Notes**: Read improvement notes regularly
6. **Flexible Dates**: Use the date picker to plan tasks and tests
7. **Monitor Trends**: Review weekly/monthly averages to identify patterns

---

## 🔐 Privacy & Security

- **No Cloud Storage**: All data stays on your device
- **No Tracking**: No analytics or monitoring
- **No Authentication**: No login or personal data required
- **Local Storage Only**: Uses browser's localStorage API

**Important:** Clear browser data will delete your progress. Backup important milestones!

---

## 📝 Customization

### Adjustable Parameters
- **Total Test Marks**: Change per test (default: 100)
- **Study Hours Target**: Set your daily goal
- **Task Limit**: Fixed at 50 per day (can be modified in code)
- **Improvement Notes**: Unlimited notes with 2000 char limit per note

### Color Theme Modification
Edit `styles.css`:
```css
:root {
    --saffron-dark: #FF9933;      /* Change primary color */
    --saffron-light: #FFB84D;     /* Change secondary color */
    --saffron-pale: #FFE4B5;      /* Change background color */
}
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Data not saving | Ensure localStorage is enabled in browser settings |
| Page looks broken | Clear browser cache and reload (Ctrl+Shift+Del) |
| Tasks not appearing | Check if correct date is selected |
| Test validation error | Verify test type and date haven't been used together |
| Mobile layout issues | Update browser or try different mobile browser |

---

## 📈 Future Enhancements

Potential features for future versions:
- 📊 Advanced analytics dashboard
- 📤 Data export to CSV/PDF
- 🔄 Cloud synchronization
- 📱 Mobile app version
- 🎓 Subject-wise weak area analysis
- 📧 Email reminders
- 🌙 Dark mode theme
- 🗣️ Multilingual support

---

## 📞 Support

For issues or suggestions:
1. Check this README first
2. Review the browser console for error messages (F12)
3. Clear cache and restart browser
4. Try a different browser

---

## 📄 License

This project is open-source and free to use for educational purposes.

---

## 🙏 Dedication

**हर हर महादेव**

This tracker is dedicated to all aspirants pursuing their dreams. Remember:
- Success is a marathon, not a sprint
- Consistent efforts always pay off
- Believe in yourself and keep pushing
- One day at a time, one test at a time

**Best of luck on your Mission Level 6/6+ journey!** 🌟

---

## 🎉 Version Info

**Mission Level 6/6+ Tracker**
- **Version**: 1.0
- **Release Date**: September 1, 2026
- **Status**: Production Ready

---

**Last Updated**: September 1, 2026

Keep pushing towards excellence! 💪

*हर हर महादेव*
