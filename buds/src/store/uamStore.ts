import { create } from 'zustand';

interface CMSFormControl {
    update : boolean,
    handleRefreshUAM: () => void;
}
const uamStore = create<CMSFormControl>(set => ({
    update: false,
    handleRefreshUAM : () => set(state => ({ update : !state.update}))
}));

export default uamStore;