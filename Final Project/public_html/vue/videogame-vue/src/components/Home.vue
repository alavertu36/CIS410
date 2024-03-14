<template>
    <div class="my-container-outer hero" id="hero-blog">
        <div class="my-container-row">
            <!-- left side container -->
            <div class="my-item my-item-center-horizontal">
                <div id="headline-title-container">
                    <h1>Popular Games and More</h1>
                </div>
            </div>
        </div>
    </div>

    <!-- CONTENT SECTION -->
    <div class="my-container-outer">
        <div class="my-container-row">
            <!-- left side container -->
            <div class="my-item">
                <iframe src="https://giphy.com/embed/lga1f2f5pbs5VkKdSr" width="480" height="270" frameBorder="0"
                    class="giphy-embed" allowFullScreen></iframe>
                <p><a href="https://www.playstation.com/en-us/games/marvels-spider-man-2/" target="_blank">Amazing Spiderman 2</a></p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/yJumrR_bbg0?si=PCvc_oVMEPLNDLJh"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                <p>Forza Motorsport</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/gmA6MrX81z4?si=z6zr1e05PuwFAzMH"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                <p>Red Dead Redemption 2</p>
            </div>

            <!-- right side container -->
            <div class="my-item">
                <!-- 1st article block -->
                <div class="side-article" id="headline-title-container">
                    <h2>Some of Our Favorites</h2>
                    <ul id = "normal-alignment">
                        <li><a href="https://www.halowaypoint.com/" target="_blank">Halo</a></li>
                        <li><a href="https://www.cyberpunk.net/us/en/" target="_blank">CyberPunk</a></li>
                        <li><a href="https://en.wikipedia.org/wiki/WWE_%2713" target="_blank">WWE 2K13</a></li>
                    </ul>
                    <p><a href="https://williamlim3.medium.com/defying-the-odds-time-and-time-again-the-story-of-bungie-and-halo-cc2b661af4b" target="_blank">Bungie</a> (the creator of Halo) is a prominent video game developer, famed for franchises like Halo and Destiny, known for their innovation and impact on the gaming industry.</p>
                </div>
                <!-- 2nd article block -->
                <div class="side-article" id="headline-title-container">
                    <h2>Shopping</h2>
                    <h4>Want to Purchase a Game?</h4>
                    <p><a href="https://www.gamestop.com/" target="_blank">Gamestop</a> is a retail company specializing in video games, electronics, and merchandise, known for its brick-and-mortar stores and a significant presence in the gaming community.</p>
                </div>
                <!-- 3rd article block -->
                <div class="side-article" id="headline-title-container">
                    <h2>Videogame History</h2>
                    <p>Click "<a href="https://www.history.com/topics/inventions/history-of-video-games" target="_blank">Videogame History</a>" for an updated timeline on the evoultion of video games.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script></script>
<style>
/* Now, style my CSS classes */
.my-container-outer {
    /* border: 3px dashed yellow; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.my-container-row {
    /* border: 3px solid red; */
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.my-item {
    /* border: 3px dotted green; */
    /* Expand by 1 / Shrink by 1 / Original size is 300px */
    flex: 1 1 300px;
    padding: 20px;
}

.hero {
    padding: 50px 10px;
}

.my-item-center-horizontal {
    display: flex;
    justify-content: center;
}

.side-article {
    margin-top: 30px;
    margin-bottom: 20px;

    h5,
    h3,
    p {
        margin: 10px 0px;
    }
}
#normal-alignment {
    text-align: left;
}

#headline-title-container {
    box-shadow: 0px 0px 30px rgba(0, 0, .3);
    padding: 30px 30px 30px 40px;
    max-width: 1000px;
    text-align: center;
    margin-left: auto;
}
</style>