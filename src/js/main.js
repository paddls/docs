import {init, onArticleScroll} from "./functions/toc";
import {isSummaryOpened, toggleSummary} from './functions/summary';
import {nextCodeSnippetToClipboard, toClipboard} from './functions/clipboard';

export {nextCodeSnippetToClipboard, toClipboard} from './functions/clipboard';
export {isSummaryOpened, toggleSummary} from './functions/summary';
export {onArticleScroll} from './functions/toc';

window.nextCodeSnippetToClipboard = nextCodeSnippetToClipboard;
window.toClipboard = toClipboard;
window.isSummaryOpened = isSummaryOpened;
window.toggleSummary = toggleSummary;
window.onArticleScroll = onArticleScroll;

init();
onArticleScroll();
