import './style.css';
import { ErrorBoundary, mountApp, useState } from '@riadh-adrani/ruvy';

const host = document.querySelector('#app') as HTMLElement;

const App = () => {
  const [count, setCount] = useState(0);

  const onClick = () => setCount(count + 1);

  return (
    <ErrorBoundary fallback={'Something went wrong'}>
      <div>
        <div style={{ display: 'flex' }}>
          <img src={'./vite.svg'} class={'logo vite-logo'} alt="Vite logo" />
          <img src={'./ruvy.svg'} class={'logo ruvy-logo'} alt="Ruvy logo" />
        </div>
        <h1>Vite + Ruvy</h1>
        <p style={{ marginTop: '-20px' }}>
          <sub>Ruvy is a front-end framework inspired from React.</sub>
          <br />
          <sub>It is built for showcase purposes only.</sub>
        </p>
        <button onClick={onClick}>
          You clicked : {count} time{count > 1 ? 's' : ''}
        </button>
        <p>
          <a href="https://github.com/RiadhAdrani/ruvy" target="_blank">
            <span>Ruvy on GitHub</span>
          </a>
        </p>
      </div>
    </ErrorBoundary>
  );
};

mountApp({ host, app: <App /> });
