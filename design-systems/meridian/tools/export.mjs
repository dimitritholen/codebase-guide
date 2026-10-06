// Export a Meridian HTML draft to one self-contained offline file.
// Usage: node export.mjs <input.html> <output.html>
// Reads assets from this design-system directory and writes only <output.html>,
// so it works from a read-only plugin install. Node built-ins only.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path, encoding = 'utf8') => readFile(resolve(root, path), encoding);
const usage = 'Usage: node export.mjs <input.html> <output.html>';
const [input, output, ...extra] = process.argv.slice(2);
if (!input || !output || extra.length) fail(usage);
if (!/\.html$/i.test(input)) fail(`Input must be an .html file: ${input}`);
const source = resolve(process.cwd(), input);
const target = resolve(process.cwd(), output);
if (!existsSync(source)) fail(`Input not found: ${source}`);
function fail(message) {
  console.error(message);
  process.exit(1);
}
let tokens = await read('assets/tokens.css');
for (const font of ['newsreader-roman', 'newsreader-italic', 'public-sans']) {
  const encoded = (await read(`assets/fonts/${font}.woff2`, null)).toString('base64');
  tokens = tokens.replace(`fonts/${font}.woff2`, `data:font/woff2;base64,${encoded}`);
}
const styles = (await read('assets/meridian.css')).replace('@import url("tokens.css");', () => tokens);
const script = await read('assets/meridian.js');
const favicon = (await read('assets/favicon.svg', null)).toString('base64');
const licenses = await Promise.all(['NEWSREADER', 'PUBLIC-SANS'].map(font => read(`assets/fonts/${font}-LICENSE.txt`)));
const notice = `<!-- Embedded font licenses\n${licenses.join('\n\n').replaceAll('--', '- -')}\n-->`;
// Drafts may point at assets/, ../assets/ or an absolute path to this directory's assets/.
const asset = name => `["'](?:[^"']*/)?assets/${name.replace('.', '\\.')}["']`;
const file = basename(source);
let html = await readFile(source, 'utf8');
const stylesheet = new RegExp(`<link\\b[^>]*\\bhref\\s*=\\s*${asset('meridian.css')}[^>]*>`, 'gi');
if (!stylesheet.test(html)) fail(`${file} must link assets/meridian.css`);
html = html.replace(stylesheet, () => `<style>\n${styles}\n</style>`);
html = html.replace(new RegExp(`<script\\b[^>]*\\bsrc\\s*=\\s*${asset('meridian.js')}[^>]*>\\s*</script>`, 'gi'), '');
html = html.replace(new RegExp(`href\\s*=\\s*${asset('favicon.svg')}`, 'gi'), `href="data:image/svg+xml;base64,${favicon}"`);
if (!/<\/body\s*>/i.test(html)) fail(`${file} needs a closing body tag`);
html = html.replace(/<\/body\s*>/i, () => `<script>\n${script}\n</script>\n${notice}\n</body>`);
await mkdir(dirname(target), { recursive: true });
await writeFile(target, html);
console.log(`Exported ${target} (styles, fonts, graphics and script embedded)`);
