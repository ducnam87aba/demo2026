const interval = setInterval(() => console.info(JSON.stringify({ event: 'worker_heartbeat', service: 'worker' })), 30_000);
console.info(JSON.stringify({ event: 'worker_started', service: 'worker', note: 'Job claiming is implemented in W06.' }));
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => { clearInterval(interval); process.exit(0); });