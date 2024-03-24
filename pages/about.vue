<template>
  <SharedContainer>
    <UIBlogWrapper>
      <UITitle blue="this project" orange="About" />
      <UIImage
        src="about-us/cafe-in-the-netherlands.webp"
        alt="A cafe in The Netherlands"
        extraspacing
        rounded
      />
      <div class="flex items-center flex-col">
        <UIArticleBlock>
          Dutch for developers is my first project that follows the philosophy
          of "<UILink href="https://www.swyx.io/learn-in-public/" target="_new"
            >Learning in public</UILink
          >". I wrote down all my notes from my dutch courses, reorganized them,
          had them reviewed by Dutch native speakers and published them here.<br />
          Aside from the notes, I created some small games that help to memorise
          Dutch words and grammar rules in a fun way. I followed the same
          approach as the
          <UILink href="https://dutchlanguagecafe.com/" target="_new"
            >Dutch language café</UILink
          >
          in Den Haag (The Hague for English speakers). Of course, games are
          more fun if you can play with your friends, classmates or developers,
          but you can play anytime and anywhere.
        </UIArticleBlock>
        <UITitle blue="are you?" orange="Who" />
        <UIArticleBlock>
          I am Giovanni Mazzuoccolo, a front-end developer working in The
          Netherlands, if you want to get in touch, you can follow me on
          <UILink href="https://github.com/giovannimazzuoccolo">Github</UILink>,
          or if you want to talk, on
          <UILink href="https://twitter.com/mazzjoe">Twitter</UILink>.<br />
          <em
            >Do you have an idea for a collaboration with Dutch for developers? </em
          ><br />
          If you want to improve this website, feel free to open an issue on
          Github. If you want a commercial collaboration, write an email to hoi
          at dutchfordevelopers.com
        </UIArticleBlock>
        <UITitle blue="technology?" orange="Which" />
        <UIArticleBlock>
          Ok, this is getting technical, so feel free to skip this part if you
          are not interested :) <br />
          The frontend is built in nuxt.js, a vue.js framework. From 2017 to
          2022, I always used React.js to build SaSS products, and I just wanted
          to try something new. The backend is Supabase, which just keeps the
          progress of the courses.
        </UIArticleBlock>
      </div>
    </UIBlogWrapper>
  </SharedContainer>
</template>
<script setup lang="ts">
useHead({
  title: "About this project - Dutch for Developers",
});
</script>
