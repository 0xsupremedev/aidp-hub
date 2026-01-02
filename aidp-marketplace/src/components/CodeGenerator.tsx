import { useState } from 'react';
import { Terminal, Copy, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeGeneratorProps {
    apiKey: string;
}

export const CodeGenerator = ({ apiKey }: CodeGeneratorProps) => {
    const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python'>('curl');
    const [copied, setCopied] = useState(false);

    const snippets = {
        curl: `curl -X POST https://api.aidp.store/v1/inference \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "mistral-7b",
    "prompt": "Hello AIDP!"
  }'`,
        node: `import { AIDPSDK } from '@aidp-sdk/core';

const sdk = new AIDPSDK({
  apiKey: '${apiKey}'
});

const response = await sdk.inference.run({
  modelId: 'mistral-7b',
  prompt: 'Hello AIDP!'
});`,
        python: `from aidp import AIDP

client = AIDP(api_key="${apiKey}")

response = client.inference.run(
    model_id="mistral-7b",
    prompt="Hello AIDP!"
)`
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[activeLang]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-card-static flex flex-col overflow-hidden border-dashed border-primary/30">
            <div className="flex justify-between items-center p-4 bg-primary/5 border-b border-border">
                <div className="flex gap-4">
                    {(['curl', 'node', 'python'] as const).map(lang => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeLang === lang ? 'text-primary' : 'text-tertiary hover:text-secondary'}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
                <button onClick={handleCopy} className="p-1.5 hover:bg-glass rounded flex items-center gap-2 text-primary">
                    {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    <span className="text-[10px] uppercase font-bold">{copied ? 'Copied' : 'Copy'}</span>
                </button>
            </div>
            <div className="p-4 bg-black/40 font-mono text-[11px] leading-relaxed text-secondary overflow-x-auto min-h-[160px]">
                <pre><code>{snippets[activeLang]}</code></pre>
            </div>
        </div>
    );
};
