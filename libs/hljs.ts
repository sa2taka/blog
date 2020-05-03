// import hljs from 'highlight.js'; はバンドルサイズがやばい
// @ts-ignore
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/atom-one-dark.css';

// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import typescript from 'highlight.js/lib/languages/typescript';
// @ts-ignore
import ruby from 'highlight.js/lib/languages/ruby';
// @ts-ignore
import xml from 'highlight.js/lib/languages/xml';
// @ts-ignore
import css from 'highlight.js/lib/languages/css';
// @ts-ignore
import java from 'highlight.js/lib/languages/java';
// @ts-ignore
import scala from 'highlight.js/lib/languages/scala';
// @ts-ignore
import kotlin from 'highlight.js/lib/languages/kotlin';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('java', java);
hljs.registerLanguage('scala', scala);
hljs.registerLanguage('kotlin', kotlin);

export default hljs;
