// Application Data
const appData = {
    commands: [
        {
            command: "nmap -sS 192.168.1.0/24",
            output: [
                "Starting Nmap scan...",
                "Scanning 254 hosts...",
                "192.168.1.1 - Router (VULNERABLE)",
                "192.168.1.105 - Windows PC (SSH: OPEN)",
                "192.168.1.203 - Linux Server (HTTPS: 443)",
                "Scan complete. 15 hosts found."
            ]
        },
        {
            command: "ssh root@target.gov.classified",
            output: [
                "Connecting to target.gov.classified...",
                "Authentication: BYPASSED",
                "Welcome to CLASSIFIED SYSTEM",
                "root@classified:~$ Access granted"
            ]
        },
        {
            command: "decrypt -f database.enc",
            output: [
                "Initializing decryption protocol...",
                "Key length: 4096 bits",
                "Progress: 23% complete",
                "Cracking AES encryption...",
                "SUCCESS: database.dec created"
            ]
        }
    ],
    systemStats: {
        cpu: [45, 67, 89, 34, 78, 56, 90, 23],
        memory: "15.2GB/32GB",
        network: "847 Mbps",
        temperature: "67°C",
        uptime: "72:14:33"
    },
    networkTargets: [
        {
            ip: "192.168.1.1",
            hostname: "router.local",
            status: "VULNERABLE",
            ports: ["22/SSH", "80/HTTP", "443/HTTPS"]
        },
        {
            ip: "10.0.0.15", 
            hostname: "server.corp",
            status: "SECURED",
            ports: ["22/SSH", "3389/RDP"]
        },
        {
            ip: "172.16.1.100",
            hostname: "classified.gov",
            status: "SCANNING...",
            ports: ["443/HTTPS", "8080/HTTP"]
        }
    ],
    fileSystem: [
        {
            name: "classified",
            type: "directory",
            size: "2.3TB",
            children: [
                {name: "government_docs.zip", type: "file", size: "1.2GB"},
                {name: "financial_records.db", type: "file", size: "857MB"}
            ]
        },
        {
            name: "encrypted", 
            type: "directory",
            size: "5.7TB",
            children: [
                {name: "passwords.txt.enc", type: "file", size: "45KB"},
                {name: "backup_codes.dat", type: "file", size: "12MB"}
            ]
        }
    ],
    matrixChars: "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alerts: [
        "INTRUSION DETECTED - Sector 7",
        "FIREWALL BREACH - Port 8080",
        "UNAUTHORIZED ACCESS - Database",
        "SYSTEM COMPROMISED - Server 3"
    ]
};

// Global state
let isGhostMode = false;
let commandIndex = 0;
let scanInProgress = false;
let decryptInProgress = false;
let simulationRunning = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeMatrix();
    startClock();
    initializeSystemMonitor();
    initializeFileBrowser();
    initializeEventListeners();
    startTerminalSimulation();
    showWelcomeMessage();
});

// Matrix Background Effect
function initializeMatrix() {
    const matrixContainer = document.getElementById('matrix-background');
    const chars = appData.matrixChars;
    
    function createMatrixColumn() {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = Math.random() * 100 + 'vw';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        column.className = 'matrix-char';
        column.textContent = chars[Math.floor(Math.random() * chars.length)];
        
        matrixContainer.appendChild(column);
        
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 5000);
    }
    
    // Create initial matrix characters
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createMatrixColumn(), Math.random() * 2000);
    }
    
    // Continue creating characters
    setInterval(() => {
        if (matrixContainer.children.length < 100) {
            createMatrixColumn();
        }
    }, 200);
}

// Clock functionality
function startClock() {
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleString('hi-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        document.getElementById('current-time').textContent = timeString;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// System Monitor
function initializeSystemMonitor() {
    let cpuIndex = 0;
    
    function updateSystemStats() {
        // Update CPU
        const cpuValue = appData.systemStats.cpu[cpuIndex];
        document.getElementById('cpu-value').textContent = cpuValue + '%';
        document.getElementById('cpu-bar').style.width = cpuValue + '%';
        cpuIndex = (cpuIndex + 1) % appData.systemStats.cpu.length;
        
        // Update other stats with slight variations
        const memoryBase = 15.2;
        const memoryVariation = memoryBase + (Math.random() * 0.8 - 0.4);
        document.getElementById('memory-value').textContent = `${memoryVariation.toFixed(1)}GB/32GB`;
        
        const networkBase = 847;
        const networkVariation = networkBase + Math.floor(Math.random() * 100 - 50);
        document.getElementById('network-value').textContent = `${networkVariation} Mbps`;
        
        const tempBase = 67;
        const tempVariation = tempBase + Math.floor(Math.random() * 10 - 5);
        document.getElementById('temp-value').textContent = `${tempVariation}°C`;
        
        // Update uptime
        const uptimeElement = document.getElementById('uptime-value');
        let currentUptime = uptimeElement.textContent;
        let [hours, minutes, seconds] = currentUptime.split(':').map(Number);
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        uptimeElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateSystemStats();
    setInterval(updateSystemStats, 2000);
}

// File Browser
function initializeFileBrowser() {
    const browserContent = document.querySelector('.browser-content .file-tree');
    
    function renderFileSystem(files, container, indent = 0) {
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.style.paddingLeft = (indent * 20) + 'px';
            
            const icon = file.type === 'directory' ? '📁' : '📄';
            const nameClass = file.type === 'directory' ? 'directory' : '';
            
            fileItem.innerHTML = `
                <span class="file-icon">${icon}</span>
                <span class="file-name ${nameClass}">${file.name}</span>
                <span class="file-size">${file.size}</span>
            `;
            
            container.appendChild(fileItem);
            
            if (file.children && file.type === 'directory') {
                renderFileSystem(file.children, container, indent + 1);
            }
        });
    }
    
    renderFileSystem(appData.fileSystem, browserContent);
}

// Terminal functionality
function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

function addTerminalLine(text, className = '', isTyped = false) {
    const terminal = document.getElementById('main-terminal');
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    if (className) {
        line.classList.add(className);
    }
    
    if (isTyped) {
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        return typeText(line, text, 30);
    } else {
        line.textContent = text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        return Promise.resolve();
    }
}

function addCommandPrompt() {
    const terminal = document.getElementById('main-terminal');
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = '<span class="prompt">root@quantum:~$</span><span class="cursor">|</span>';
    terminal.appendChild(promptLine);
    terminal.scrollTop = terminal.scrollHeight;
}

// Terminal simulation
function startTerminalSimulation() {
    simulationRunning = true;
    setTimeout(() => {
        simulateRandomCommands();
    }, 2000);
}

function stopTerminalSimulation() {
    simulationRunning = false;
}

async function simulateRandomCommands() {
    if (!simulationRunning) return;
    
    if (commandIndex >= appData.commands.length) {
        commandIndex = 0;
    }
    
    const command = appData.commands[commandIndex];
    
    // Remove cursor from last line
    const lastCursor = document.querySelector('.cursor');
    if (lastCursor) {
        lastCursor.remove();
    }
    
    // Type command
    const commandLine = document.querySelector('.terminal-line:last-child');
    if (commandLine) {
        await typeText(commandLine, ' ' + command.command, 80);
    }
    
    // Add output lines
    for (const outputLine of command.output) {
        if (!simulationRunning) return;
        await new Promise(resolve => setTimeout(resolve, 500));
        await addTerminalLine(outputLine, 'command-output', true);
    }
    
    if (!simulationRunning) return;
    await new Promise(resolve => setTimeout(resolve, 1000));
    addCommandPrompt();
    
    commandIndex++;
    
    // Schedule next command
    if (simulationRunning) {
        setTimeout(() => simulateRandomCommands(), Math.random() * 5000 + 3000);
    }
}

function showWelcomeMessage() {
    setTimeout(async () => {
        await addTerminalLine('QUANTUM SECURITY TERMINAL v2.1 INITIALIZED', 'success-text', true);
        await addTerminalLine('System Status: ONLINE', 'success-text', true);
        await addTerminalLine('All systems operational. Ready for commands.', '', true);
        await new Promise(resolve => setTimeout(resolve, 500));
        addCommandPrompt();
    }, 1000);
}

// Event Listeners
function initializeEventListeners() {
    // Scan button
    document.getElementById('scan-btn').addEventListener('click', initiateScan);
    
    // Decrypt button
    document.getElementById('decrypt-btn').addEventListener('click', initiateDecryption);
    
    // Ghost mode button
    document.getElementById('ghost-btn').addEventListener('click', toggleGhostMode);
    
    // Emergency exit button
    document.getElementById('emergency-btn').addEventListener('click', emergencyExit);
}

// Network scanning functionality
async function initiateScan() {
    if (scanInProgress) return;
    
    scanInProgress = true;
    const scanBtn = document.getElementById('scan-btn');
    const originalText = scanBtn.textContent;
    scanBtn.textContent = 'SCANNING...';
    scanBtn.disabled = true;
    
    const scannerContent = document.getElementById('scanner-content');
    const progressBar = document.getElementById('scan-progress');
    const progressText = document.querySelector('.progress-text');
    
    // Clear previous scan results
    const existingTargets = scannerContent.querySelectorAll('.scan-target');
    existingTargets.forEach(target => target.remove());
    
    progressText.textContent = 'Initializing network scan...';
    
    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            progressText.textContent = 'Scan complete. Analyzing results...';
        }
    }, 200);
    
    // Add scan results
    for (let i = 0; i < appData.networkTargets.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const target = appData.networkTargets[i];
        const targetElement = document.createElement('div');
        targetElement.className = 'scan-target';
        
        targetElement.innerHTML = `
            <div class="target-ip">${target.ip}</div>
            <div>${target.hostname}</div>
            <div class="target-status ${target.status.toLowerCase()}">${target.status}</div>
            <div>${target.ports.join(', ')}</div>
        `;
        
        scannerContent.appendChild(targetElement);
    }
    
    // Add terminal notification
    await addTerminalLine('Network scan initiated - Check scanner panel for results', 'success-text', true);
    
    // Generate random alert
    setTimeout(() => {
        showAlert(appData.alerts[Math.floor(Math.random() * appData.alerts.length)]);
    }, 3000);
    
    scanInProgress = false;
    scanBtn.textContent = originalText;
    scanBtn.disabled = false;
}

// Decryption functionality
async function initiateDecryption() {
    if (decryptInProgress) return;
    
    decryptInProgress = true;
    const decryptBtn = document.getElementById('decrypt-btn');
    const originalText = decryptBtn.textContent;
    decryptBtn.textContent = 'DECRYPTING...';
    decryptBtn.disabled = true;
    
    // Add file transfer to browser
    const browserContent = document.querySelector('.browser-content');
    const transferElement = document.createElement('div');
    transferElement.className = 'file-transfer';
    transferElement.innerHTML = `
        <div>Decrypting: classified_data.enc</div>
        <div class="transfer-progress">
            <div class="transfer-fill" id="decrypt-progress"></div>
        </div>
    `;
    
    browserContent.appendChild(transferElement);
    
    // Animate decryption progress
    const progressBar = document.getElementById('decrypt-progress');
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            transferElement.querySelector('div').textContent = 'Decryption complete!';
            setTimeout(() => {
                if (transferElement.parentNode) {
                    transferElement.remove();
                }
            }, 2000);
        }
    }, 150);
    
    // Add terminal notification
    await addTerminalLine('Decryption process initiated - Files being processed', 'success-text', true);
    
    setTimeout(() => {
        decryptInProgress = false;
        decryptBtn.textContent = originalText;
        decryptBtn.disabled = false;
        addTerminalLine('Decryption completed successfully', 'success-text', false);
    }, 5000);
}

// Ghost mode toggle
function toggleGhostMode() {
    isGhostMode = !isGhostMode;
    document.body.classList.toggle('ghost-mode', isGhostMode);
    
    const ghostBtn = document.getElementById('ghost-btn');
    ghostBtn.textContent = isGhostMode ? 'NORMAL MODE' : 'GHOST MODE';
    
    const statusText = isGhostMode ? 'GHOST MODE ACTIVATED - Interface secured' : 'NORMAL MODE RESTORED - Standard operations resumed';
    const statusClass = isGhostMode ? 'warning-text' : 'success-text';
    
    addTerminalLine(statusText, statusClass, true);
    
    // Change system status in header
    const systemStatus = document.querySelector('.system-status');
    systemStatus.textContent = isGhostMode ? 'SYSTEM: GHOST' : 'SYSTEM: SECURE';
    
    // Flash screen to show mode change
    flashScreen(isGhostMode ? '#9400D3' : '#00FF41', 150);
}

// Emergency exit - Fixed to properly clear terminal
function emergencyExit() {
    // Stop terminal simulation
    stopTerminalSimulation();
    
    // Flash screen red
    document.body.style.background = '#FF0000';
    setTimeout(() => {
        document.body.style.background = '#000000';
    }, 200);
    
    // Clear all terminal content immediately
    const terminal = document.getElementById('main-terminal');
    terminal.innerHTML = '';
    
    // Clear scanner content
    const scannerContent = document.getElementById('scanner-content');
    const existingTargets = scannerContent.querySelectorAll('.scan-target');
    existingTargets.forEach(target => target.remove());
    
    // Reset progress bars
    const progressBar = document.getElementById('scan-progress');
    const progressText = document.querySelector('.progress-text');
    progressBar.style.width = '0%';
    progressText.textContent = 'Ready to scan...';
    
    // Clear any file transfers
    const browserContent = document.querySelector('.browser-content');
    const transfers = browserContent.querySelectorAll('.file-transfer');
    transfers.forEach(transfer => transfer.remove());
    
    // Show emergency message in cleared terminal
    setTimeout(async () => {
        await addTerminalLine('>>> EMERGENCY PROTOCOL ACTIVATED <<<', 'error-text', true);
        await addTerminalLine('All active processes terminated', 'error-text', true);
        await addTerminalLine('Terminal session cleared', 'error-text', true);
        await addTerminalLine('Connection secured and sanitized', 'error-text', true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await addTerminalLine('System ready for new session...', 'success-text', true);
        addCommandPrompt();
        
        // Restart simulation after emergency exit
        commandIndex = 0;
        setTimeout(() => {
            startTerminalSimulation();
        }, 3000);
    }, 500);
    
    // Show critical alert
    showAlert('EMERGENCY EXIT ACTIVATED - ALL SYSTEMS CLEARED');
    
    // Reset system status
    const systemStatus = document.querySelector('.system-status');
    systemStatus.textContent = 'SYSTEM: SECURE';
    
    // Reset ghost mode
    if (isGhostMode) {
        isGhostMode = false;
        document.body.classList.remove('ghost-mode');
        const ghostBtn = document.getElementById('ghost-btn');
        ghostBtn.textContent = 'GHOST MODE';
    }
}

// Alert system
function showAlert(message) {
    const alertSystem = document.getElementById('alert-system');
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = message;
    
    alertSystem.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}

// Random alerts
setInterval(() => {
    if (Math.random() < 0.3) {
        const randomAlert = appData.alerts[Math.floor(Math.random() * appData.alerts.length)];
        showAlert(randomAlert);
    }
}, 15000);

// Screen flash effect for dramatic moments
function flashScreen(color = '#00FF41', duration = 100) {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.background = color;
    flash.style.opacity = '0.3';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        if (document.body.contains(flash)) {
            document.body.removeChild(flash);
        }
    }, duration);
}

// Add screen flash on key activities
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('control-btn')) {
        flashScreen('#00FF41', 50);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        initiateScan();
    } else if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        initiateDecryption();
    } else if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        toggleGhostMode();
    } else if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        emergencyExit();
    }
});