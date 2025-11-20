// src/composables/useTruncateHTML.js
export function useTruncateHTML() {
  /**
   * Truncate HTML by number of sentences while preserving tags.
   */
  function truncateHTML(html, sentenceLimit) {
    if (!html || typeof html !== "string") return "";

    const container = document.createElement("div");
    container.innerHTML = html;

    let output = "";
    let count = 0;

    function walk(node) {
      if (count >= sentenceLimit) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;

        // sentence tokenize
        const regex = /[^.!?]+[.!?]+/g;
        const parts = text.match(regex) || [text];

        const allowed = parts.slice(0, sentenceLimit - count);
        output += allowed.join(" ");

        count += allowed.length;
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        output += `<${tag}>`;

        node.childNodes.forEach(child => walk(child));

        output += `</${tag}>`;
      }
    }

    container.childNodes.forEach(n => walk(n));

    return output;
  }

  /**
   * Returns formatted HTML for Vue use.
   */
  function getDisplayHTML(html, showFull, limit) {
    return showFull ? html : truncateHTML(html, limit);
  }

  return {
    truncateHTML,
    getDisplayHTML,
  };
}
