// ===========================
// Mission Level 6/6+ - JavaScript
// Complete Functionality
// ===========================

// ===========================
// DATA MANAGEMENT
// ===========================

class MissionTracker {
    constructor() {
        this.loadData();
        this.init();
    }

    loadData() {
        const savedData = localStorage.getItem('missionTrackerData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.dayTracker = data.dayTracker || {};
            this.todoList = data.todoList || {};
            this.testScores = data.testScores || [];
            this.studyHours = data.studyHours || [];
            this.improvement = data.improvement || [];
        } else {
            this.dayTracker = {};
            this.todoList = {};
            this.testScores = [];
            this.studyHours = [];
            this.improvement = [];
        }
    }

    saveData() {
        const data = {
            dayTracker: this.dayTracker,
            todoList: this.todoList,
            testScores: this.testScores,
            studyHours: this.studyHours,
            improvement: this.improvement
        };
        localStorage.setItem('missionTrackerData', JSON.stringify(data));
    }

    init() {
        this.initializeTrackerUI();
        this.setupTodoListeners();
        this.setupTestListeners();
        this.setupStudyListeners();
        this.setupImprovementListeners();
        this.updateAllUI();
    }

    // ===========================
    // DAY TRACKER SECTION
    // ===========================

    initializeTrackerUI() {
        const grid = document.getElementById('dayTrackerGrid');
        grid.innerHTML = '';

        const startDate = new Date(2026, 8, 1); // September 1, 2026
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 1; i <= 365; i++) {
            const dayDate = new Date(startDate);
            dayDate.setDate(dayDate.getDate() + i - 1);
            dayDate.setHours(0, 0, 0, 0);

            const dayBox = document.createElement('div');
            dayBox.className = 'day-box';
            dayBox.textContent = i;
            dayBox.title = dayDate.toLocaleDateString();

            const dateKey = dayDate.toISOString().split('T')[0];

            if (this.dayTracker[dateKey]) {
                dayBox.classList.add('completed');
            }

            if (dayDate.getTime() === today.getTime()) {
                dayBox.classList.add('today');
            }

            dayBox.addEventListener('click', () => {
                this.toggleDay(dateKey, dayBox);
            });

            grid.appendChild(dayBox);
        }

        this.updateTrackerStats();
    }

    toggleDay(dateKey, element) {
        if (this.dayTracker[dateKey]) {
            delete this.dayTracker[dateKey];
            element.classList.remove('completed');
        } else {
            this.dayTracker[dateKey] = true;
            element.classList.add('completed');
        }
        this.saveData();
        this.updateTrackerStats();
    }

    updateTrackerStats() {
        const completed = Object.keys(this.dayTracker).length;
        const percentage = Math.round((completed / 365) * 100);
        const today = new Date().toISOString().split('T')[0];
        
        let streak = 0;
        let checkDate = new Date();
        checkDate.setHours(0, 0, 0, 0);

        while (this.dayTracker[checkDate.toISOString().split('T')[0]]) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }

        document.getElementById('daysCompleted').textContent = completed;
        document.getElementById('progressPercentage').textContent = percentage;
        document.getElementById('currentStreak').textContent = streak;
    }

    // ===========================
    // TODO LIST SECTION
    // ===========================

    setupTodoListeners() {
        const todoDate = document.getElementById('todoDate');
        const today = new Date();
        todoDate.valueAsDate = today;

        document.getElementById('todayBtn').addEventListener('click', () => {
            todoDate.valueAsDate = new Date();
            this.loadTodoList();
        });

        document.getElementById('tomorrowBtn').addEventListener('click', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            todoDate.valueAsDate = tomorrow;
            this.loadTodoList();
        });

        todoDate.addEventListener('change', () => this.loadTodoList());

        document.getElementById('addTodoBtn').addEventListener('click', () => {
            this.addTodo();
        });

        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        this.loadTodoList();
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const dateKey = document.getElementById('todoDate').value;
        const text = input.value.trim();

        if (!text) {
            alert('Please enter a task');
            return;
        }

        if (!this.todoList[dateKey]) {
            this.todoList[dateKey] = [];
        }

        if (this.todoList[dateKey].length >= 50) {
            alert('Maximum 50 tasks per day!');
            return;
        }

        this.todoList[dateKey].push({
            id: Date.now(),
            text: text,
            completed: false
        });

        this.saveData();
        input.value = '';
        this.loadTodoList();
    }

    loadTodoList() {
        const dateKey = document.getElementById('todoDate').value;
        const todos = this.todoList[dateKey] || [];
        const list = document.getElementById('todoList');

        list.innerHTML = '';

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="btn-complete" onclick="tracker.toggleTodo('${dateKey}', ${todo.id})">
                        ${todo.completed ? 'Undo' : 'Done'}
                    </button>
                    <button class="btn-delete" onclick="tracker.deleteTodo('${dateKey}', ${todo.id})">Delete</button>
                </div>
            `;

            list.appendChild(li);
        });

        document.getElementById('todoCount').textContent = todos.length;
    }

    toggleTodo(dateKey, todoId) {
        const todos = this.todoList[dateKey] || [];
        const todo = todos.find(t => t.id === todoId);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveData();
            this.loadTodoList();
        }
    }

    deleteTodo(dateKey, todoId) {
        if (this.todoList[dateKey]) {
            this.todoList[dateKey] = this.todoList[dateKey].filter(t => t.id !== todoId);
            this.saveData();
            this.loadTodoList();
        }
    }

    // ===========================
    // TEST SCORE SECTION
    // ===========================

    setupTestListeners() {
        const testDate = document.getElementById('testDate');
        testDate.valueAsDate = new Date();

        document.getElementById('addTestBtn').addEventListener('click', () => {
            this.addTestScore();
        });

        // Average score period buttons
        document.querySelectorAll('.average-period .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.average-period .btn-secondary').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateAverageScores(e.target.dataset.period);
            });
        });

        this.updateTestUI();
    }

    addTestScore() {
        const testType = document.getElementById('testType').value;
        const testDate = document.getElementById('testDate').value;
        const score = parseFloat(document.getElementById('testScore').value);
        const totalMarks = parseFloat(document.getElementById('testTotalMarks').value);

        if (!testType || !testDate || isNaN(score) || isNaN(totalMarks)) {
            alert('Please fill all fields correctly');
            return;
        }

        if (score > totalMarks) {
            alert('Score cannot be greater than total marks!');
            return;
        }

        // Validate that tests of same type aren't on same day
        const existingSameDay = this.testScores.find(t => 
            t.date === testDate && t.type === testType
        );

        if (existingSameDay) {
            alert('You cannot take the same test on the same day. Please choose a different day or test type.');
            return;
        }

        // Validate tier 2 tests aren't on same day
        const tier2Tests = ['tier2-s1', 'tier2-s2', 'tier2-computer'];
        if (tier2Tests.includes(testType)) {
            const existingTier2 = this.testScores.find(t => 
                t.date === testDate && tier2Tests.includes(t.type)
            );
            if (existingTier2) {
                alert('Tier 2 tests cannot be taken on the same day. Please choose a different day.');
                return;
            }
        }

        this.testScores.push({
            id: Date.now(),
            type: testType,
            date: testDate,
            score: score,
            totalMarks: totalMarks,
            percentage: (score / totalMarks * 100).toFixed(2)
        });

        this.saveData();
        this.clearTestForm();
        this.updateTestUI();
    }

    clearTestForm() {
        document.getElementById('testType').value = '';
        document.getElementById('testScore').value = '';
        document.getElementById('testTotalMarks').value = '100';
    }

    updateTestUI() {
        this.updateTestTable();
        this.updateAverageScores('daily');
    }

    updateTestTable() {
        const tbody = document.getElementById('testTableBody');
        tbody.innerHTML = '';

        const sorted = [...this.testScores].sort((a, b) => new Date(b.date) - new Date(a.date));

        sorted.forEach(test => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${test.date}</td>
                <td>${this.getTestTypeName(test.type)}</td>
                <td>${test.score}</td>
                <td>${test.totalMarks}</td>
                <td>${test.percentage}%</td>
                <td><button class="btn-delete" onclick="tracker.deleteTest(${test.id})">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    deleteTest(testId) {
        this.testScores = this.testScores.filter(t => t.id !== testId);
        this.saveData();
        this.updateTestUI();
    }

    updateAverageScores(period) {
        const container = document.getElementById('averageScoresContainer');
        container.innerHTML = '';

        let scores = [...this.testScores];
        const now = new Date();

        if (period === 'daily') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            scores = scores.filter(s => new Date(s.date) >= today);
        } else if (period === 'weekly') {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            scores = scores.filter(s => new Date(s.date) >= weekAgo);
        } else if (period === 'monthly') {
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            scores = scores.filter(s => new Date(s.date) >= monthAgo);
        }

        const testTypes = ['math', 'reasoning', 'english', 'gs', 'computer', 'full', 'tier2-s1', 'tier2-s2', 'tier2-computer'];
        
        testTypes.forEach(type => {
            const typeScores = scores.filter(s => s.type === type);
            if (typeScores.length > 0) {
                const avg = (typeScores.reduce((sum, s) => sum + parseFloat(s.percentage), 0) / typeScores.length).toFixed(2);
                const card = document.createElement('div');
                card.className = 'score-card';
                card.innerHTML = `
                    <h4>${this.getTestTypeName(type)}</h4>
                    <p>${avg}%</p>
                    <p style="font-size: 0.9rem; color: var(--dark-text); margin-top: 5px;">Tests: ${typeScores.length}</p>
                `;
                container.appendChild(card);
            }
        });

        if (container.innerHTML === '') {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No tests recorded for this period</p>';
        }
    }

    getTestTypeName(type) {
        const names = {
            'math': 'Mathematics',
            'reasoning': 'Reasoning',
            'english': 'English',
            'gs': 'General Studies',
            'computer': 'Computer',
            'full': 'Full Length Test',
            'tier2-s1': 'Tier 2 - Section 1',
            'tier2-s2': 'Tier 2 - Section 2',
            'tier2-computer': 'Tier 2 - Computer'
        };
        return names[type] || type;
    }

    // ===========================
    // STUDY HOURS SECTION
    // ===========================

    setupStudyListeners() {
        const studyDate = document.getElementById('studyDate');
        studyDate.valueAsDate = new Date();

        document.getElementById('addStudyBtn').addEventListener('click', () => {
            this.addStudyHours();
        });

        this.updateStudyUI();
    }

    addStudyHours() {
        const studyDate = document.getElementById('studyDate').value;
        const hours = parseFloat(document.getElementById('studyHours').value);
        const subject = document.getElementById('studySubject').value.trim();

        if (!studyDate || isNaN(hours) || !subject || hours <= 0) {
            alert('Please fill all fields correctly');
            return;
        }

        if (hours > 24) {
            alert('Study hours cannot exceed 24 hours in a day!');
            return;
        }

        this.studyHours.push({
            id: Date.now(),
            date: studyDate,
            hours: hours,
            subject: subject
        });

        this.saveData();
        this.clearStudyForm();
        this.updateStudyUI();
    }

    clearStudyForm() {
        document.getElementById('studyHours').value = '';
        document.getElementById('studySubject').value = '';
    }

    updateStudyUI() {
        this.updateStudyTable();
        this.updateStudyStats();
    }

    updateStudyTable() {
        const tbody = document.getElementById('studyTableBody');
        tbody.innerHTML = '';

        const sorted = [...this.studyHours].sort((a, b) => new Date(b.date) - new Date(a.date));

        sorted.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.hours} hrs</td>
                <td>${this.escapeHtml(record.subject)}</td>
                <td><button class="btn-delete" onclick="tracker.deleteStudyRecord(${record.id})">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    deleteStudyRecord(recordId) {
        this.studyHours = this.studyHours.filter(r => r.id !== recordId);
        this.saveData();
        this.updateStudyUI();
    }

    updateStudyStats() {
        const today = new Date().toISOString().split('T')[0];
        const thisWeek = new Date();
        thisWeek.setDate(thisWeek.getDate() - 7);
        const thisMonth = new Date();
        thisMonth.setMonth(thisMonth.getMonth() - 1);

        const todayHours = this.studyHours
            .filter(s => s.date === today)
            .reduce((sum, s) => sum + s.hours, 0)
            .toFixed(1);

        const weeklyHours = this.studyHours
            .filter(s => new Date(s.date) >= thisWeek)
            .reduce((sum, s) => sum + s.hours, 0);
        const weeklyAvg = (weeklyHours / 7).toFixed(1);

        const monthlyHours = this.studyHours
            .filter(s => new Date(s.date) >= thisMonth)
            .reduce((sum, s) => sum + s.hours, 0);
        const monthlyAvg = (monthlyHours / 30).toFixed(1);

        const totalHours = this.studyHours
            .reduce((sum, s) => sum + s.hours, 0)
            .toFixed(1);

        document.getElementById('todayStudyHours').textContent = `${todayHours} hrs`;
        document.getElementById('weeklyStudyAvg').textContent = `${weeklyAvg} hrs`;
        document.getElementById('monthlyStudyAvg').textContent = `${monthlyAvg} hrs`;
        document.getElementById('totalStudyHours').textContent = `${totalHours} hrs`;

        this.updateImprovementStatus(parseFloat(weeklyAvg), parseFloat(monthlyAvg));
    }

    updateImprovementStatus(weeklyAvg, monthlyAvg) {
        const statusDiv = document.getElementById('improvementStatus');
        let status = 'needs-improvement';
        let message = '⚠️ You need to increase your study hours. Aim for at least 6-8 hours per day!';

        if (weeklyAvg >= 8) {
            status = 'excellent';
            message = '🌟 Excellent! You are maintaining excellent study consistency. Keep it up!';
        } else if (weeklyAvg >= 6) {
            status = 'good';
            message = '✅ Good! Your study hours are in a healthy range. Continue this momentum!';
        }

        statusDiv.className = `status-message ${status}`;
        statusDiv.textContent = message;
    }

    // ===========================
    // IMPROVEMENT SECTION
    // ===========================

    setupImprovementListeners() {
        const textarea = document.getElementById('improvementText');

        textarea.addEventListener('input', (e) => {
            document.getElementById('charCount').textContent = e.target.value.length;
        });

        document.getElementById('saveImprovementBtn').addEventListener('click', () => {
            this.saveImprovementNotes();
        });

        document.getElementById('clearImprovementBtn').addEventListener('click', () => {
            if (confirm('Clear all text?')) {
                textarea.value = '';
                document.getElementById('charCount').textContent = '0';
            }
        });

        this.displayImprovementNotes();
    }

    saveImprovementNotes() {
        const text = document.getElementById('improvementText').value.trim();

        if (!text) {
            alert('Please write something to save');
            return;
        }

        this.improvement.push({
            id: Date.now(),
            text: text,
            date: new Date().toLocaleString()
        });

        this.saveData();
        document.getElementById('improvementText').value = '';
        document.getElementById('charCount').textContent = '0';
        this.displayImprovementNotes();
        alert('Improvement notes saved successfully!');
    }

    displayImprovementNotes() {
        const container = document.getElementById('improvementNotes');
        container.innerHTML = '';

        if (this.improvement.length === 0) {
            container.innerHTML = '<p style="color: #999; text-align: center;">No improvement notes yet. Start writing your goals!</p>';
            return;
        }

        this.improvement.slice().reverse().forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'improvement-note';
            noteDiv.innerHTML = `
                <div class="improvement-note-date">${note.date}</div>
                <div class="improvement-note-text">${this.escapeHtml(note.text)}</div>
                <button class="btn-delete" onclick="tracker.deleteImprovementNote(${note.id})" style="margin-top: 10px;">Delete</button>
            `;
            container.appendChild(noteDiv);
        });
    }

    deleteImprovementNote(noteId) {
        this.improvement = this.improvement.filter(n => n.id !== noteId);
        this.saveData();
        this.displayImprovementNotes();
    }

    // ===========================
    // UTILITY FUNCTIONS
    // ===========================

    updateAllUI() {
        this.updateTrackerStats();
        this.loadTodoList();
        this.updateTestUI();
        this.updateStudyUI();
        this.displayImprovementNotes();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ===========================
// INITIALIZATION
// ===========================

let tracker;

document.addEventListener('DOMContentLoaded', () => {
    tracker = new MissionTracker();
    console.log('Mission Level 6/6+ Tracker Initialized');
});

// Set current date inputs
window.addEventListener('load', () => {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    document.getElementById('studyDate').value = dateString;
    document.getElementById('testDate').value = dateString;
});
