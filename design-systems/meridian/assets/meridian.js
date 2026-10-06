/* Optional enhancements. Reading, navigation, diagrams and disclosures need no JS. */
document.querySelectorAll('[data-print]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
});

document.querySelectorAll('[data-copy]').forEach(button => {
  const code = document.getElementById(button.dataset.copy);
  const status = document.querySelector('[data-copy-status]');
  if (!code || !status) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'Copied to clipboard.';
    } catch {
      status.textContent = 'Clipboard unavailable. Select the code and copy it manually.';
    }
  });
});

// Include disclosure content in print, then restore the reader's original state.
let closedDetails = [];
window.addEventListener('beforeprint', () => {
  closedDetails = [...document.querySelectorAll('details:not([open])')];
  closedDetails.forEach(details => { details.open = true; });
});
window.addEventListener('afterprint', () => {
  closedDetails.forEach(details => { details.open = false; });
  closedDetails = [];
});
