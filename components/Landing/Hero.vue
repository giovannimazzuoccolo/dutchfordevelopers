<template>
    <Container>
        <div
            class="flex w-full gap-4 justify-between flex-col items-center my-8 md:flex-row"
        >
            <div class="w-4/7">
                <h1
                    class="uppercase font-bold xl text-main-blue text-4xl md:text-6xl"
                >
                    Learn dutch as you are learning a
                    <span class="text-main-orange"
                        >programming language</span
                    >
                </h1>
                <p class="py-4 text-lg">
                    A pragmatic approach for developers (and
                    not) living in The Netherlands
                </p>
                <UIButton text="Start now for free" />
            </div>
            <div class="w-3/7 hidden md:flex">
                <img
                    src="/dutch-pictures.jpg"
                    alt="Some pictures of The Netherlands"
                />
            </div>
        </div>
    </Container>
</template>
