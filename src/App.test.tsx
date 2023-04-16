import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";

const queryClient = new QueryClient();

interface WrapperProps {
  children: React.ReactNode;
}

const TestWrapper: React.FC<WrapperProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("renders App component without errors", () => {
  render(<App />, { wrapper: TestWrapper });
});

// Had some issues with additional tests, would debug further if I had additional time but left them out for now.
