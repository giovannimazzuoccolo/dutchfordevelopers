<template>
    <Container>
        <UIBlogWrapper>
            <UITitle blue="form" orange="Contact" />
            <UIImage
                src="contact-us/two-guys-talking.webp"
                alt="Two guys talking"
                extraspacing
                rounded
            />
            <UIArticleBlock>
                Use the following form to contact Dutch for Developers. All fields are required.
            </UIArticleBlock>
            <form
                name="dfd_contacts"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                @submit.prevent="handleSubmit"
            >
                <div class="mb-4">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                        for="name"
                    >
                        Name
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Your name"
                    />
                </div>
                <div class="mb-4">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                        for="email"
                    >
                        Email
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Your email"
                    />
                </div>
                <div class="mb-4">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                        for="text"
                    >
                        Your request
                    </label>
                    <Textarea
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="textarea"
                        placeholder="Your request"
                    />
                    <input type="hidden" name="form-name" value="myForm" />
                </div>
                <input type="hidden" name="form-name" value="dfd_contacts" />
                <UIButton type="submit"> Send </UIButton>
            </form>
        </UIBlogWrapper>
    </Container>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'ContactPage',
    methods: {
        route() {
            this.$router.replace('thank-you')
        },
        handleSubmit(event: Event) {
            event.preventDefault()

            const myForm = event.currentTarget as HTMLFormElement
            if (myForm) {
                const formData = new FormData(myForm)

                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData as any).toString(), //ugly, but necessary for now
                })
                    .then(() => this.route())
                    .catch((error) => alert(error))
            }
        },
    },
})
</script>
