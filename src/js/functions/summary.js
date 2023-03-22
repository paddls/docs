export let isSummaryOpened = false;

export function toggleSummary() {
  isSummaryOpened = !isSummaryOpened;
  document.querySelector('.floating-summary-container')?.classList.remove('opened');

  if (isSummaryOpened) {
    document.querySelector('.floating-summary-container')?.classList.add('opened');
  }
}
