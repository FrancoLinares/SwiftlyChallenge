import Logo from '@/components/Logo';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-9xl sm:px-7 lg:px-8 h-full">
        <header className="flex flex-row items-center py-8">
          <Logo />
        </header>
        <div className="relative isolate overflow-hidden px-6 text-center sm:px-16">
          <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Didn't find Star Wars character you were looking for?
          </h1>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
