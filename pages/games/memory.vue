<template>
    <Container>
        <UITitle orange="Memory" />
        <p>
            Play memory, the game that helps you with your
            Dutch vocabulary. Turn up your volume to hear
            the Dutch pronunciation
        </p>
        <UIAccordion
            title="Instructions"
            text="Select two cards, get a point if you match the same ones"
        />
        <div class="grid grid-cols-4 gap-4">
            <GamesMemoryCard
                :isCovered="true"
                :name="boek"
                :image="a"
            />
            <GamesMemoryCard
                :isCovered="true"
                :name="boek"
                :image="a"
            />
            <GamesMemoryCard
                :isCovered="true"
                :name="boek"
                :image="a"
            />
            <GamesMemoryCard
                :isCovered="true"
                :name="boek"
                :image="a"
            />
            <GamesMemoryCard
                :isCovered="true"
                :name="boek"
                :image="a"
            />
            <GamesMemoryCard
                :isCovered="true"
                :name="boek"
                :image="a"
            />
            <GamesMemoryCard
                :isCovered="true"
                :name="boek"
                :image="a"
            />
            <GamesMemoryCard
                :isCovered="true"
                :name="boek"
                :image="a"
            />
        </div>
    </Container>
</template>
