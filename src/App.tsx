import Logo from '@/components/Logo';
import ErrorBoundary from '@/ErrorBoundary';
import Search from '@/components/Search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <div className="mx-auto max-w-9xl sm:px-7 lg:px-8 h-full">
          <header className="flex flex-row items-center py-8">
            <Logo />
          </header>
          <div className="relative isolate overflow-hidden px-6 text-center sm:px-16">
            <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Didn't find Star Wars character you were looking for?
            </h1>
            <Search />
          </div>
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
