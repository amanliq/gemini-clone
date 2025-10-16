import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const md = new MarkdownIt({
  highlight: (code, lang) => {
    let highlighted = "";
    if (lang && hljs.getLanguage(lang)) {
      highlighted = hljs.highlight(code, { language: lang }).value;
    } else {
      highlighted = md.utils.escapeHtml(code);
    }

    return `
      <div class='bg-[#f0f4f9] text-[#1b1c1d] text-[1rem] font-400 rounded-[16px] p-[10px]'>
        <pre><code class='hljs text-[0.875rem] p-[16px] text-[#575b5f] !bg-[#f0f4f9]'>${highlighted}</code></pre>
      </div>
    `;
  },
});

export function aiResponseToHTML(markdownText) {
  return md.render(markdownText);
}
