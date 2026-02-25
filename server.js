// ═══════════════════════════════════════════════
// BRICK PARTY CAMPAIGN SERVER
// Express server with login, users.json auth
// ═══════════════════════════════════════════════

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// ═══════════ HELPERS ═══════════

function readUsers() {
    const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8');
    return JSON.parse(data);
}

function writeUsers(data) {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(data, null, 2));
}

// ═══════════ API ROUTES ═══════════

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const db = readUsers();
    const user = db.users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

    if (user) {
        res.json({
            success: true,
            message: 'Login successful!',
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role,
                email: user.email
            }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
});

// Get current user info (by id)
app.get('/api/user/:id', (req, res) => {
    const db = readUsers();
    const user = db.users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role,
                email: user.email
            }
        });
    } else {
        res.status(404).json({ success: false, message: 'User not found.' });
    }
});

// Register new supporter
app.post('/api/register', (req, res) => {
    const { firstName, lastName, email, grade, reason, username, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required including username and password.' });
    }

    if (username.length < 3) {
        return res.status(400).json({ success: false, message: 'Username must be at least 3 characters.' });
    }

    if (password.length < 4) {
        return res.status(400).json({ success: false, message: 'Password must be at least 4 characters.' });
    }

    const db = readUsers();

    // Check for duplicate email
    if (db.users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase())) {
        return res.status(409).json({ success: false, message: 'This email is already registered.' });
    }

    // Check for duplicate username
    if (db.users.find(u => u.username && u.username.toLowerCase() === username.toLowerCase())) {
        return res.status(409).json({ success: false, message: 'This username is already taken. Please choose another.' });
    }

    const newUser = {
        id: Date.now(),
        username: username.toLowerCase(),
        password: password,
        name: `${firstName} ${lastName}`,
        role: 'supporter',
        email: email,
        grade: grade || '',
        reason: reason || '',
        createdAt: new Date().toISOString().split('T')[0]
    };

    db.users.push(newUser);
    writeUsers(db);

    res.json({
        success: true,
        message: `Welcome to the Brick Party, ${firstName}! You can now log in.`,
        user: {
            id: newUser.id,
            name: newUser.name,
            role: newUser.role
        }
    });
});

// Get all supporters (for admin dashboard)
app.get('/api/supporters', (req, res) => {
    const db = readUsers();
    const supporters = db.users
        .filter(u => u.role === 'supporter')
        .map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            grade: u.grade,
            reason: u.reason,
            createdAt: u.createdAt
        }));
    res.json({ success: true, count: supporters.length, supporters });
});

// Get stats for dashboard
app.get('/api/stats', (req, res) => {
    const db = readUsers();
    const total = db.users.length;
    const supporters = db.users.filter(u => u.role === 'supporter').length;
    const today = new Date().toISOString().split('T')[0];
    const todaySignups = db.users.filter(u => u.createdAt === today).length;

    res.json({
        success: true,
        stats: {
            totalUsers: total,
            totalSupporters: supporters,
            todaySignups,
            policies: 6
        }
    });
});

// Delete a supporter
app.delete('/api/supporters/:id', (req, res) => {
    const db = readUsers();
    const id = parseInt(req.params.id);
    const user = db.users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ success: false, message: 'Supporter not found.' });
    }

    if (user.role === 'candidate') {
        return res.status(403).json({ success: false, message: 'Cannot delete the candidate account.' });
    }

    db.users = db.users.filter(u => u.id !== id);
    writeUsers(db);

    res.json({ success: true, message: `${user.name} has been removed.` });
});

// Update password
app.put('/api/user/:id/password', (req, res) => {
    const db = readUsers();
    const id = parseInt(req.params.id);
    const { password } = req.body;

    if (!password || password.length < 4) {
        return res.status(400).json({ success: false, message: 'Password must be at least 4 characters.' });
    }

    const user = db.users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.password = password;
    writeUsers(db);

    res.json({ success: true, message: 'Password updated successfully.' });
});

// ═══════════ MESSAGES API ═══════════

function readMessages() {
    const data = fs.readFileSync(path.join(__dirname, 'messages.json'), 'utf8');
    return JSON.parse(data);
}

function writeMessages(data) {
    fs.writeFileSync(path.join(__dirname, 'messages.json'), JSON.stringify(data, null, 2));
}

// Send a message (from the public site)
app.post('/api/messages', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const db = readMessages();
    const newMsg = {
        id: Date.now(),
        name,
        email,
        subject: subject || 'No Subject',
        message,
        date: new Date().toLocaleString(),
        read: false,
        replies: []
    };

    db.messages.unshift(newMsg);
    writeMessages(db);

    res.json({ success: true, message: 'Message sent! The candidate will review it soon.' });
});

// Get all messages (for dashboard)
app.get('/api/messages', (req, res) => {
    const db = readMessages();
    res.json({ success: true, count: db.messages.length, unread: db.messages.filter(m => !m.read).length, messages: db.messages });
});

// Mark message as read
app.put('/api/messages/:id/read', (req, res) => {
    const db = readMessages();
    const msg = db.messages.find(m => m.id === parseInt(req.params.id));
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' });
    msg.read = true;
    writeMessages(db);
    res.json({ success: true });
});

// Reply to a message
app.post('/api/messages/:id/reply', (req, res) => {
    const { reply } = req.body;
    if (!reply) return res.status(400).json({ success: false, message: 'Reply text is required.' });

    const db = readMessages();
    const msg = db.messages.find(m => m.id === parseInt(req.params.id));
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' });

    msg.read = true;
    msg.replies.push({
        text: reply,
        date: new Date().toLocaleString(),
        from: 'Arnav Gupta (Candidate)'
    });
    writeMessages(db);

    res.json({ success: true, message: 'Reply sent!' });
});

// Delete a message
app.delete('/api/messages/:id', (req, res) => {
    const db = readMessages();
    const id = parseInt(req.params.id);
    if (!db.messages.find(m => m.id === id)) return res.status(404).json({ success: false, message: 'Message not found.' });
    db.messages = db.messages.filter(m => m.id !== id);
    writeMessages(db);
    res.json({ success: true, message: 'Message deleted.' });
});

// Candidate sends a message to supporters
app.post('/api/messages/compose', (req, res) => {
    const { recipients, subject, message, senderName } = req.body;

    if (!recipients || !recipients.length || !message) {
        return res.status(400).json({ success: false, message: 'Recipients and message are required.' });
    }

    const db = readMessages();
    const newMsg = {
        id: Date.now(),
        name: senderName || 'Arnav Gupta (Candidate)',
        email: 'candidate@brickparty.com',
        subject: subject || 'No Subject',
        message,
        date: new Date().toLocaleString(),
        read: true,
        type: 'sent',
        recipients: recipients,
        replies: []
    };

    db.messages.unshift(newMsg);
    writeMessages(db);

    res.json({ success: true, message: `Message sent to ${recipients.length} supporter(s)!` });
});

// ═══════════ PAGE ROUTES ═══════════

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/supporter-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'supporter-dashboard.html'));
});

// Get supporter's own data
app.get('/api/supporter/:id', (req, res) => {
    const db = readUsers();
    const user = db.users.find(u => u.id === parseInt(req.params.id));
    if (!user || user.role !== 'supporter') {
        return res.status(404).json({ success: false, message: 'Supporter not found.' });
    }
    res.json({
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            grade: user.grade,
            reason: user.reason,
            createdAt: user.createdAt
        }
    });
});

// Get announcements (public)
app.get('/api/announcements', (req, res) => {
    res.json({ success: true, announcements: [] });
});

// ═══════════ START ═══════════

app.listen(PORT, () => {
    console.log('');
    console.log('  🧱 ═══════════════════════════════════════════');
    console.log('  🧱  BRICK PARTY CAMPAIGN SERVER');
    console.log('  🧱 ═══════════════════════════════════════════');
    console.log('');
    console.log(`  🌐  Website:    http://localhost:${PORT}`);
    console.log(`  🔑  Login:      http://localhost:${PORT}/login`);
    console.log(`  📊  Dashboard:  http://localhost:${PORT}/dashboard`);
    console.log('');
    console.log('  👤  Candidate Login:');
    console.log('      Username:  arnav');
    console.log('      Password:  brickparty2026');
    console.log('');
    console.log('  🧱 ═══════════════════════════════════════════');
    console.log('');
});
