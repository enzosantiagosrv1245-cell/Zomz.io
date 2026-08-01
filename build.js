/*
 * Build de ofuscação do código do cliente.
 *
 * Lê os arquivos-fonte editáveis em src/ e gera versões ofuscadas em public/,
 * que são as únicas servidas ao navegador. Rode com: npm run build
 *
 * Os originais ficam em src/ (nunca são servidos), então o que aparece no F12
 * é apenas o código embaralhado.
 */
const fs = require('fs');
const path = require('path');

let JavaScriptObfuscator;
try {
    JavaScriptObfuscator = require('javascript-obfuscator');
} catch (err) {
    // Em produção as devDependencies podem não estar instaladas.
    // Nesse caso mantemos os arquivos ofuscados já versionados em public/.
    console.warn('javascript-obfuscator não instalado; usando os arquivos ofuscados já existentes em public/.');
    process.exit(0);
}

const SRC_DIR = path.join(__dirname, 'src');
const OUT_DIR = path.join(__dirname, 'public');

// Arquivos do cliente a ofuscar: src/<nome> -> public/<nome>
const FILES = ['i18n.js', 'menu.js', 'game.js'];

// Opções balanceadas: forte o suficiente para afastar curiosos do F12,
// sem destruir a performance do loop de renderização do jogo.
const OBFUSCATOR_OPTIONS = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: false,
    numbersToExpressions: true,
    simplify: true,
    // NÃO renomear globais: menu.js, game.js e o script inline compartilham
    // variáveis/funções globais (ex.: socket). Renomear quebraria o jogo.
    renameGlobals: false,
    identifierNamesGenerator: 'hexadecimal',
    // Desativado para evitar que o bundle gere anti-debug / console.clear spam
    // no navegador e polua o console do jogador.
    selfDefending: false,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    transformObjectKeys: false,
    unicodeEscapeSequence: false,
};

function build() {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    for (const file of FILES) {
        const srcPath = path.join(SRC_DIR, file);
        const outPath = path.join(OUT_DIR, file);

        if (!fs.existsSync(srcPath)) {
            throw new Error(`Arquivo-fonte não encontrado: ${srcPath}`);
        }

        const code = fs.readFileSync(srcPath, 'utf8');
        const result = JavaScriptObfuscator.obfuscate(code, OBFUSCATOR_OPTIONS);
        fs.writeFileSync(outPath, result.getObfuscatedCode(), 'utf8');

        const inKb = (Buffer.byteLength(code) / 1024).toFixed(1);
        const outKb = (Buffer.byteLength(result.getObfuscatedCode()) / 1024).toFixed(1);
        console.log(`ofuscado ${file}: ${inKb} KB -> ${outKb} KB`);
    }

    console.log('Build concluído.');
}

build();
