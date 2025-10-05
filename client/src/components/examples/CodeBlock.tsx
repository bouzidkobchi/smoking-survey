import CodeBlock from '../CodeBlock';

export default function CodeBlockExample() {
  const sampleCode = `import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

  return <CodeBlock code={sampleCode} language="javascript" />;
}
