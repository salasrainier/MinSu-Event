/**
 * test_render.js — tests if organizer_dashboard.xian renders without errors
 */
import hbs from 'hbs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Register all helpers (same as index.js)
hbs.registerHelper("ifCond", function (v1, operator, v2, options) {
  if (options === undefined) {
    options = v2;
    v2 = operator;
    operator = "===";
  }
  let result;
  switch (operator) {
    case "===": result = v1 === v2; break;
    case "!==": result = v1 !== v2; break;
    case "<":   result = v1 < v2;   break;
    case "<=":  result = v1 <= v2;  break;
    case ">":   result = v1 > v2;   break;
    case ">=":  result = v1 >= v2;  break;
    default:    result = v1 === v2;
  }
  return result ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("eq", function (a, b, options) {
  if (a === b) return options.fn(this);
  return options.inverse(this);
});
hbs.registerHelper("gt", function (a, b) { return a > b; });
hbs.registerHelper("formatDate", function (date, format) {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
});
hbs.registerHelper("substring", function (str, start, end) {
  if (!str) return "";
  return String(str).substring(start, end);
});
hbs.registerHelper("json", function (context) {
  return JSON.stringify(context || []);
});
hbs.registerHelper("plus", (a, b) => a + b);
hbs.registerHelper("minus", (a, b) => a - b);
hbs.registerHelper("multiply", (a, b) => Math.round(a * b));
hbs.registerHelper("divide", (a, b) => b !== 0 ? a / b : 0);

// Register partials
const partialsDir = path.join(__dirname, 'views', 'partials');
fs.readdirSync(partialsDir).forEach(file => {
  if (file.endsWith('.xian')) {
    const name = file.replace('.xian', '');
    const content = fs.readFileSync(path.join(partialsDir, file), 'utf8');
    hbs.registerPartial(name, content);
    console.log(`✅ Registered partial: ${name}`);
  }
});

// Mock data
const mockData = {
  title: 'Dashboard',
  user: { id: 4, name: 'Test Organizer', email: 'organizer@test.com', role: 'organizer', department: 'CCS' },
  events: [],
  success_msg: '',
  error_msg: '',
};

// Try rendering
const viewPath = path.join(__dirname, 'views', 'organizer_dashboard.xian');
const template = fs.readFileSync(viewPath, 'utf8');

try {
  const compiled = hbs.compile(template);
  const result = compiled(mockData);
  console.log('\n✅ Template rendered successfully! First 200 chars:');
  console.log(result.substring(0, 200));
} catch (err) {
  console.error('\n❌ TEMPLATE RENDER ERROR:', err.message);
  console.error('   Stack:', err.stack?.split('\n').slice(0, 8).join('\n'));
}
