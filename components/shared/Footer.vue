<template>
    <footer class="w-full bg-main-blue py-4">
        <SharedContainer>
            <div class="flex flex-col md:flex-row md:justify-between">
                <p class="text-white max-w-md mb-2 md:mb-0 md:mr-2">
                    <strong>Dutch for developers</strong> is a side project of <br />
                    <UILink href="" :dark="true">Giovanni Mazzuoccolo.</UILink> -
                    <UILink href="/privacy-policy" :dark="true">Privacy Policy</UILink>
                </p>
                <p class="text-white max-w-md mb-2 md:mb-0 md:mr-2">
                    Have you found an error or some improvements? Do you want to contribute?
                    <UILink
                        href="https://github.com/giovannimazzuoccolo/dutchfordevelopers"
                        target="_new"
                        :dark="true"
                        >Check out the github repository</UILink
                    >.
                </p>
            </div>
        </SharedContainer>
    </footer>
</template>
<script setup lang="ts"></script>
