<template>
  <SharedContainer>
    <div>
      <p class="text-center dark:text-white m-4">
        A curated collection of Dutch podcasts, organized from easiest to most complex. <br />
        Use them to improve your Dutch listening skills progressively.
      </p>

      <template v-for="level in podcastLevels" :key="level.label">
        <div class="mb-8">
          <h3 class="text-lg font-bold dark:text-white mb-3 flex items-center gap-2">
            <span
              class="text-xs font-semibold px-2 py-1 rounded-full text-white"
              :class="level.badgeClass"
            >{{ level.label }}</span>
            <span>{{ level.description }}</span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PodcastCard
              v-for="podcast in level.podcasts"
              :key="podcast.title"
              :title="podcast.title"
              :description="podcast.description"
              :embedUrl="podcast.embedUrl"
              :websiteUrl="podcast.websiteUrl"
            />
          </div>
        </div>
      </template>
    </div>
  </SharedContainer>
</template>

<script lang="ts" setup>
import PodcastCard from './PodcastCard.vue';

const podcastLevels = [
  {
    label: 'Beginner (A1–A2)',
    description: 'Slow, clear speech — perfect for new learners',
    badgeClass: 'bg-green-500',
    podcasts: [
      {
        title: 'Slow Dutch',
        description:
          'Short episodes spoken slowly and clearly, aimed at Dutch language learners. Ideal for absolute beginners.',
        embedUrl:
          'https://open.spotify.com/embed/show/5gHfYqTy3wV3BCiJWGASiM?utm_source=generator&theme=0',
        websiteUrl: 'https://open.spotify.com/show/5gHfYqTy3wV3BCiJWGASiM',
      },
      {
        title: 'Taal Thuis – Dutch for Beginners',
        description:
          'Simple everyday Dutch conversations and vocabulary practice for beginners and elementary learners.',
        embedUrl:
          'https://open.spotify.com/embed/show/0bUWMcHsXPBcKmgCeBUXTB?utm_source=generator&theme=0',
        websiteUrl: 'https://open.spotify.com/show/0bUWMcHsXPBcKmgCeBUXTB',
      },
    ],
  },
  {
    label: 'Intermediate (B1–B2)',
    description: 'Natural pace with everyday topics',
    badgeClass: 'bg-yellow-500',
    podcasts: [
      {
        title: 'NPO Radio 1 – De Nieuws BV',
        description:
          'A daily news program on NPO Radio 1. Clear and accessible Dutch about current affairs in the Netherlands.',
        embedUrl:
          'https://open.spotify.com/embed/show/1RaJZdCFOe7vVnSlj4BPFS?utm_source=generator&theme=0',
        websiteUrl: 'https://open.spotify.com/show/1RaJZdCFOe7vVnSlj4BPFS',
      },
      {
        title: 'VPRO Tegenlicht',
        description:
          'In-depth documentary journalism covering society, science and politics. Good for building vocabulary.',
        embedUrl:
          'https://open.spotify.com/embed/show/5eLPeYRQXBiMQJCKnLsIUX?utm_source=generator&theme=0',
        websiteUrl: 'https://open.spotify.com/show/5eLPeYRQXBiMQJCKnLsIUX',
      },
    ],
  },
  {
    label: 'Advanced (C1–C2)',
    description: 'Native-speed speech on complex topics',
    badgeClass: 'bg-red-500',
    podcasts: [
      {
        title: 'NRC Vandaag',
        description:
          'NRC journalists discuss the most important news stories of the day in depth. Fast, native-speed Dutch.',
        embedUrl:
          'https://open.spotify.com/embed/show/4gOJXAFSVkAmKTNJY5lFby?utm_source=generator&theme=0',
        websiteUrl: 'https://open.spotify.com/show/4gOJXAFSVkAmKTNJY5lFby',
      },
      {
        title: 'BNR Nieuwsradio',
        description:
          'Business, finance and politics discussed at a native pace. Challenging but rewarding for advanced learners.',
        embedUrl:
          'https://open.spotify.com/embed/show/1B9xJFb7WFxG7oQN8wAyBW?utm_source=generator&theme=0',
        websiteUrl: 'https://open.spotify.com/show/1B9xJFb7WFxG7oQN8wAyBW',
      },
    ],
  },
];
</script>
