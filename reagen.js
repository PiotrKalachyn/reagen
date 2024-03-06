#!/usr/bin/env node

/** Generate React component boilerplate */
const fs = require('fs');
const path = require('path');
const VALID_COMPONENT_NAME = /[a-z][a-z\d]+/gi;

const options = process.argv.reduce((options, arg, index) => {
    if (index >= 2) {
        if (arg.substring(0, 2) === '--') {
            options[arg.substring(2)] = true;
        } else if (VALID_COMPONENT_NAME.test(arg)) {
            options.componentName = arg;
        }
    }
    return options;
}, {});

const {componentName, loading, effect, param} = options;

if (!componentName) {
    console.error('Please supply at least a valid component name (like MyButton123)');
    console.error('Options:');
    console.error('--effect: useEffect for []');
    console.error('--loading: use loading state');
    console.error('--param: read a routing param');
    process.exit(1);
}

const tsxFilePath = path.join(`${componentName}.tsx`);
if (fs.existsSync(tsxFilePath)) {
    console.error(`The file ${tsxFilePath} already exists.`);
    process.exit(1);
}

const scssFilePath = path.join(`${componentName}.module.scss`);
if (fs.existsSync(scssFilePath)) {
    console.error(`The file ${scssFilePath} already exists.`);
    process.exit(1);
}

const scssTemplate = `// ${scssFilePath}
.${componentName} {
  --dummy: 'replace with your styles';
}
`;

const tsxTemplate = `// ${tsxFilePath}
import React, {ReactNode${effect ? ', useEffect' : ''}${loading ? ', useState' : ''} } from 'react';
${param ? 'import {useParams} from \'react-router-dom\';' : ''}
import styles from './${componentName}.module.scss';

interface ${componentName}Props {
  children?: ReactNode | ReactNode[];
}

export function ${componentName}({children}: ${componentName}Props) {
  ${loading ? 'const [isLoading, setLoading] = useState(false);' : ''}
  ${param ? 'const {someParam} = useParams();' : ''}
  ${effect ? `useEffect(() => {\n    console.info('Component ${componentName} has mounted');\n  }, [] );` : ''}

  return <div className={styles.${componentName}}>
  {children}
  </div>;
}
`;

fs.writeFileSync(scssFilePath, scssTemplate);
fs.writeFileSync(tsxFilePath, tsxTemplate);
console.log(`${componentName} component and styles scaffolded.`);
