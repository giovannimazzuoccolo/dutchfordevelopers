<template>
    <div>
        <Container>
        <LandingHero/>
          <LandingApproach />
        <LandingLessionList />
        </Container>
    </div>
</template>

<script lang="ts">
import Container from "~/components/shared/Container.vue";

export default {
  name: 'IndexPage',
  components: {Container},
}
</script>
