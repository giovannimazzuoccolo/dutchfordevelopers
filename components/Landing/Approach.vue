<template>
    <div
        class="flex justify-center my-8 md:my-20 flex-col w-full"
    >
        <UITitle orange="The" blue="Approach" center />

        <div
            class="mx-auto p-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12 rounded flex gap-4 my-4 flex-col items-center md:flex-row md:shadow"
        >
            <LandingApproachItem
                text="Discover common patterns, learn the
                    grammar and build your dutch sentences"
            >
                <LandingIconsCode />
            </LandingApproachItem>
            <LandingApproachItem
                text=" Play games that helps you to learn the
                    grammar and the vocabulary of Dutch"
            >
                <LandingIconsGames />
            </LandingApproachItem>
            <LandingApproachItem
                text=" Read the blog, where we discuss online
                    courses, books and dutch culture!"
            >
                <LandingIconsReader />
            </LandingApproachItem>
        </div>
        <div class="flex my-2 justify-center">
            <UIButton text="Start now for free" />
        </div>
    </div>
</template>
