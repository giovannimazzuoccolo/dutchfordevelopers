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
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
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
                        placeholder="Your email"
                    />
                </div>
                <input type="hidden" name="form-name" value="dfd_contacts" />
                <UIButton> Send </UIButton>
            </form>
        </UIBlogWrapper>
    </Container>
</template>
