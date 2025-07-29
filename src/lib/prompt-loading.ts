export interface PromptLoadingState {
  isLoading: boolean;
  content: string;
  error: string | null;
}

export const initialPromptState: PromptLoadingState = {
  isLoading: false,
  content: "",
  error: null,
};

export function createLoadingState(): PromptLoadingState {
  return {
    isLoading: true,
    content: "",
    error: null,
  };
}

export function createSuccessState(content: string): PromptLoadingState {
  return {
    isLoading: false,
    content,
    error: null,
  };
}

export function createErrorState(error: string): PromptLoadingState {
  return {
    isLoading: false,
    content: "",
    error,
  };
}

export async function loadPromptWithState(
  promptId: string,
  loadPromptFn: (id: string) => Promise<string>
): Promise<PromptLoadingState> {
  try {
    const content = await loadPromptFn(promptId);
    return createSuccessState(content);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to load prompt";
    return createErrorState(errorMessage);
  }
}