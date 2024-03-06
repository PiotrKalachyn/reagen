# ReaGen
Generate a React component's boilerplate

## Summary

Wanting to avoid typing boilerplate while creating React components, I wrote a script (reagen.js) to generate them, kind of in the style of Angular schematics:

```
ng generate component
```

## Installation

```
npm install -g @lingo-daily/reagen
```

You may need to run the installation in the `sudo` mode if lacking privileges.

```
sudo npm install -g @lingo-daily/reagen
```

## How to Use

So now when you run

```
reagen SampleComponent
```

…it creates two files: a modular stylesheet placeholder:

```
// SampleComponent.module.scss
.SampleComponent {
--dummy: 'replace with your styles';
}
```

…and a TSX with the component’s function:

```
// SampleComponent.tsx
import React, { ReactNode } from 'react';
import styles from './SampleComponent.module.scss';


interface SampleComponentProps {
children?: ReactNode | ReactNode[];
}


export function SampleComponent({children}: SampleComponentProps) {
return <div className={styles.SampleComponent}>
{children}
  </div>;
}
```
### Optional Keys

Some options for frequently needed features:

```
reagen SampleComponent --loading --param --effect
```

…to include one or all of the following (along with the relevant imports):

```
const [isLoading, setLoading] = useState(false);
```

```
const {someParam} = useParams();
```

```
useEffect(() => {
    console.info('Component SampleComponent has mounted');
}, [] );
```

## Links

### npm

https://www.npmjs.com/package/@lingo-daily/reagen

### Author

[Piotr Kalachyn](https://www.linkedin.com/in/piotr-kalachyn/)
