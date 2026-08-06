process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION');
  console.error('Message:', err.message);
  console.error('Code:', err.code);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION');
  console.error('Reason:', reason);
  process.exit(1);
});

try {
  const m = await import('./index.js');
  console.error('SUCCESS');
} catch (err) {
  console.error('IMPORT FAILED');
  console.error('Message:', err.message);
  process.exit(1);
}
