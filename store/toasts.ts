import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
    state: () => ({
        message: '',
        duration: 3000,
        show: false,
    }),
    actions: {
        showToast(message:string, duration = 3000) {
            this.message = message;
            this.duration = duration;
            this.show = true;

            setTimeout(() => {
                this.show = false;
            }, duration);
        },
    },
});