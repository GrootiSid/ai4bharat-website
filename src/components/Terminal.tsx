'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

type LineType = 'info' | 'warn' | 'error' | 'success' | 'command' | 'dim' | 'prompt';

interface TerminalLine {
  type: LineType;
  content: ReactNode;
  id: string;
}

const INITIAL_LOGS: TerminalLine[] = [
  { id: '1', type: 'dim', content: 'AI4Bharat Autonomous Agent v2.4.1 · Enterprise' },
  { id: '2', type: 'dim', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
  { id: '3', type: 'success', content: '[ACTIVE] Monitoring 3 production environments' },
  { id: '4', type: 'dim', content: 'Observability integrations: Datadog, PagerDuty, GitHub' },
];

export default function Terminal() {
  const [logs, setLogs] = useState<TerminalLine[]>(INITIAL_LOGS);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (type: LineType, content: ReactNode) => {
    setLogs((prev) => [...prev, { id: Math.random().toString(36).substr(2, 9), type, content }]);
  };

  const runSimulation = async () => {
    setIsProcessing(true);
    const steps = [
      { type: 'dim', content: 'Initiating incident investigation: Database Query Degradation', delay: 400 },
      { type: 'dim', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 100 },
      { type: 'info', content: <><span style={{ color: 'var(--red)' }}>[ALERT]</span> Datadog incident #DD-4456 · Severity: P1</>, delay: 600 },
      { type: 'info', content: <><span style={{ color: 'var(--yellow)' }}>[SIGNAL]</span> p95 query latency exceeds SLA threshold (5.2s / 500ms)</>, delay: 800 },
      { type: 'dim', content: '→ Correlating 234 slow query events across 3 replicas...', delay: 1200 },
      { type: 'dim', content: '→ Cross-referencing deployment history, schema changes, index stats...', delay: 1500 },
      { type: 'info', content: <><span style={{ color: 'var(--red)' }}>[ROOT CAUSE]</span> Missing composite index on users.email · users.created_at</>, delay: 1000 },
      { type: 'dim', content: '→ Generating remediation: CREATE INDEX CONCURRENTLY...', delay: 1000 },
      { type: 'dim', content: '→ Validating on staging replica (1.2M rows)...', delay: 1200 },
      { type: 'info', content: <><span style={{ color: 'var(--green)' }}>[VERIFIED]</span> Latency reduction: 5.2s → 0.08s · 98.5% improvement</>, delay: 1000 },
      { type: 'dim', content: '→ Authoring pull request with migration, rollback plan, and test coverage...', delay: 1500 },
      { type: 'info', content: <><span style={{ color: 'var(--green)' }}>[COMPLETE]</span> PR #3021 opened · 'perf: add composite index on users(email, created_at)'</>, delay: 1000 },
      { type: 'success', content: 'Resolution time: 5m 12s · Engineer pages sent: 0', delay: 500 },
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.delay));
      addLog(step.type as LineType, step.content);
    }
    setIsProcessing(false);
  };

  const processCommand = async (cmd: string) => {
    const input = cmd.toLowerCase().trim();
    addLog('prompt', `❯ ${input}`);

    if (isProcessing) return;

    switch (input) {
      case 'help':
        addLog('info', 'Available commands:');
        addLog('dim', '  investigate - Start a simulated incident resolution');
        addLog('dim', '  status      - Display production environment health');
        addLog('dim', '  neofetch    - Show platform and agent specifications');
        addLog('dim', '  clear       - Reset the terminal log');
        addLog('dim', '  help        - Show this menu');
        break;
      
      case 'status':
        addLog('success', '[ONLINE] Cluster-A (Oregon) - 100% healthy');
        addLog('success', '[ONLINE] Cluster-B (Ireland) - 100% healthy');
        addLog('success', '[ONLINE] Cluster-C (Singapore) - 100% healthy');
        addLog('info', 'Recent incidents: 0 in last 24h');
        break;

      case 'investigate':
      case 'demo':
        await runSimulation();
        break;

      case 'clear':
        setLogs([]);
        break;

      case 'neofetch':
        addLog('info', 'AI4BHARAT OS v2.4.1');
        addLog('dim', '-------------------');
        addLog('info', 'Kernel: Autonomous reasoning engine v3.1');
        addLog('info', 'Uptime: 342 days, 15:23:01');
        addLog('info', 'Packages: 1,421 (Datadog, PagerDuty, GitHub, AWS)');
        addLog('info', 'Shell: interactive-agent-v2');
        addLog('info', 'Memory: 128.4 TiB Distributed Neural Memory');
        break;

      default:
        if (input !== '') {
          addLog('error', `Command not found: ${input}. Type 'help' for options.`);
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    processCommand(inputValue);
    setInputValue('');
  };

  return (
    <div className="terminal-wrapper" id="terminal" ref={terminalRef}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <span className="terminal-title">ai4bharat — autonomous agent · production</span>
      </div>
      <div className="terminal-body" ref={scrollRef} style={{ overflowY: 'auto', maxHeight: '500px' }}>
        {logs.map((log) => (
          <span 
            key={log.id} 
            className={`t-line ${log.type === 'dim' ? 't-dim' : ''} ${log.type === 'success' ? 't-green' : ''} ${log.type === 'prompt' ? 't-prompt' : ''} visible`}
            style={{ 
              opacity: 1, 
              display: 'block',
              color: log.type === 'error' ? 'var(--red)' : log.type === 'warn' ? 'var(--yellow)' : undefined 
            }}
          >
            {log.content}
          </span>
        ))}

        {!isProcessing && (
          <div className="terminal-input-row" style={{ marginTop: '4px' }}>
            <span className="t-prompt-char">❯</span>
            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
              <input 
                type="text" 
                className="terminal-input" 
                placeholder="Enter command..." 
                autoComplete="off" 
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </form>
          </div>
        )}
        
        <p className="terminal-hint" style={{ marginTop: '12px' }}>
          Try <span className="hint-cmd" onClick={() => processCommand('investigate')}>investigate</span> or <span className="hint-cmd" onClick={() => processCommand('help')}>help</span>
        </p>
      </div>
    </div>
  );
}
