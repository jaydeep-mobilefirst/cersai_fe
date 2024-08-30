import create from 'zustand';
import { axiosTokenInstance } from '../utils/axios';

// Define the types for the store's state
interface State {
  data: any | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

// Create the Zustand store
const useStore = create<State>((set) => ({
  data: null,
  loading: false,
  error: null,

  // Action to fetch data from the API using axios
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosTokenInstance.get('/approval-engine/access');
      set({ data: response.data?.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'An error occurred', loading: false });
    }
  },
}));

export default useStore;
